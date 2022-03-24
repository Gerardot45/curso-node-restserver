const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");
const { validarCampos, validarJWT, esAdminRole } = require("../middlewares");

const router = Router();

/**
 * {{url}}/api/categorias
 */

//obtener todas las categorias - público
router.get("/", obtenerCategorias);

//obtener una categoria por id
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  obtenerCategoria
);

//crear categoria - privado
//el validarJWT pasó
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().notEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//Actualizar un producto con un token válido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().notEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

//Borrar una categoria - Sólo admin true -> false
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);
module.exports = router;
