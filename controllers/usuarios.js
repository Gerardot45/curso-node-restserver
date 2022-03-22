const { response } = require("express");

const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "No definido", apiKey } = req.query;

  res.json({
    msg: "get API - controller",
    q,
    nombre,
    apiKey,
  });
};

const usuariosPut = (req, res) => {
  const id = req.params.id;

  res.json({
    msg: "put API - controller",
    id,
  });
};

const usuariosPost = async (req, res) => {
  //vamos a destructurar el body
  const body = req.body; //vamos a limpiar esto de cualquier petición maliciosa
  const usuario = new Usuario(body);
  await usuario.save()
  res.json({
    msg: "post API - controller",
    usuario,
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete API - controller",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
