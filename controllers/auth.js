const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require("../models/usuario");
const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //verficar si existe el email
    const usuario = await Usuario.findOne({ correo });
    if (!usuario)
      return res.status(400).json({
        msg: "Usuario o contraseña no son correctos - correo",
      });
    //verificar si el usuario está ctivo
    if (!usuario.estado)
      return res.status(400).json({
        msg: "Usuario o contraseña no son correctos - estado:false",
      });
    //verificar contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario o contraseña no son correctos - contraseña",
      });
    }
    //generar el JWT

    const token = await generarJWT(usuario.id, generarJWT);

    res.json({
      msg: "login ok",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el adminsitrador",
    });
  }
};

module.exports = {
  login,
};
