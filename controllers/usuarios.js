const { response } = require("express");

const usuariosGet = (req = request, res = response) => {
  // const query = req.query;

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

const usuariosPost = (req, res) => {
  //vamos a destructurar el body
  const { nombre, edad } = req.body; //vamos a limpiar esto de cualquier petición maliciosa

  res.json({
    msg: "post API - controller",
    nombre,
    edad,
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
