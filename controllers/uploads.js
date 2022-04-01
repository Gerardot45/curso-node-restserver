const { request } = require("express");
const { response } = require("express");
const path = require("path");
const fs = require("fs");
const { Usuario, Producto } = require("../models");
const subirArchivo = require("../helpers/subir-archivo");

const cargarArchivos = async (req = request, res = response) => {
  try {
    // const nombre = await subirArchivo(req.files, ["txt", "md"],'textos');
    const nombre = await subirArchivo(req.files, undefined, "imgs");
    res.json({ nombre });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const actualizarImagen = async (req, res = response) => {
  const { id, collection } = req.params;
  let modelo;

  switch (collection) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un producto con el id ${id}` });
      }
      break;
    default:
      return res.status(500).json({ msg: `Olvidé validar esto` });
  }

  //limpiar imagenes previas
  if (modelo.img) {
    //borrar imagen del servidor
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      collection,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  const nombre = await subirArchivo(req.files, undefined, collection);
  modelo.img = nombre;
  await modelo.save();
  res.json(modelo);
};

const mostrarImagen = async (req, res = response) => {
  const { id, collection } = req.params;
  let modelo;

  switch (collection) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un usuario con el id ${id}` });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe un producto con el id ${id}` });
      }
      break;
    default:
      return res.status(500).json({ msg: `Olvidé validar esto` });
  }

  //limpiar imagenes previas
  if (modelo.img) {
    //borrar imagen del servidor
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      collection,
      modelo.img
    );
    console.log(pathImagen)
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen)
    }
  }

  res.json({msg:`Falta poner el place holder`})
};
module.exports = {
  cargarArchivos,
  actualizarImagen,
  mostrarImagen,
};
