const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { request } = require("express");

const usuariosGet = async (req = request, res = response) => {
  // const { q, nombre = "No definido", apiKey } = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const total = await Usuario.countDocuments(query);

  //Promise.all() nos permite mandar un arreglo con todas las promesas
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({ total, usuarios });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //validar contra BD
  if (password) {
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuarioDB);
};

const usuariosPost = async (req, res) => {
  //vamos a destructurar el body
  const { nombre, correo, password, rol } = req.body; //vamos a limpiar esto de cualquier petición maliciosa
  const usuario = new Usuario({ nombre, correo, password, rol });

  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar en BD
  await usuario.save();
  res.json({
    msg: "post API - controller",
    usuario,
  });
};

const usuariosDelete = async (req = request, res) => {
  const { id } = req.params;

  //físicamente lo borramos
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
