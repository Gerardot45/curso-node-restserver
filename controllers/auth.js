const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;
  try {
    const { nombre, correo, img } = await googleVerify(id_token);
    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    //si el usuario en BD tiene su estado en false
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el admin - usuario bloqueado",
      });
    }

    const token = await generarJWT(usuario.id);
    // console.log(id_token);
    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "El token del usuario no es válido",
      error,
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
