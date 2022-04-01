const { request } = require("express");
const { response } = require("express");
const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { Usuario, Producto } = require("../models");
const subirArchivo = require("../helpers/subir-archivo");

const cargarArchivos = async (req = request, res = response) => {
  try {
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

const actualizarImagenCloudinary = async (req, res = response) => {
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
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr - 1];
    const [public_id] = nombre.split(".");
    console.log(public_id);
  }

  const { tempFilePath } = req.files.archivo;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  modelo.img = secure_url;
  await modelo.save(secure_url);
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
    const pathImagen = path.resolve(
      //en lugar de path.join, pusimos el path.resolve
      __dirname,
      "../uploads",
      collection,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }

  const pathImagen = path.resolve(__dirname, "../assets/no-image.jpg");
  res.sendFile(pathImagen);
};
module.exports = {
  cargarArchivos,
  actualizarImagen,
  actualizarImagenCloudinary,
  mostrarImagen,
};
