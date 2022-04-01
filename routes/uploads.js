const { Router } = require("express");
const { check } = require("express-validator");

const {
  cargarArchivos,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
} = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers/db-validators");
const { validarCampos, validarArchivoSubir } = require("../middlewares");

const router = Router();
router.put("/", [validarArchivoSubir], cargarArchivos);
router.put(
  "/:collection/:id",
  [
    //validarArchivoSubir,
    check("id", "El Id debe ser uno válido").isMongoId(),
    check("collection").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  // actualizarImagen
  actualizarImagenCloudinary
);
router.get(
  "/:collection/:id",
  [
    // validarArchivoSubir,
    check("id", "El Id debe ser uno válido").isMongoId(),
    check("collection").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarCampos,
  ],
  mostrarImagen
);
module.exports = router;
