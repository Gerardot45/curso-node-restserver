const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");

const { validarCampos, validarJWT, esAdminRole } = require("../middlewares");

const {
  existeCategoriaPorId,
  existeProductoPorId,
} = require("../helpers/db-validators");

const router = Router();

//Obtener una producto
router.get("/", obtenerProductos);

//obtener una producto por id
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  obtenerProducto
);

//Crear un producto con un token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().notEmpty(),
    check("categoria", "No es un id de Mongo").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

//Actualizar un producto con un token válido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().notEmpty(),
    // check("categoria", "No es un id de Mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

//Borrar una categoria - Sólo admin true -> false
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);
module.exports = router;
