const { Router } = require("express");
const { check } = require("express-validator");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios");

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const {
  esRolValido,
  existeEmail,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const router = Router();
router.get("/", usuariosGet);

const USARIOS_EMPRESA = ["ADMIN_ROLE", "VENTAS_ROLE", "OTRO_ROLE"];

router.put(
  "/:id",
  check("id", "No es un id válido").isMongoId(),
  check("id").custom(existeUsuarioPorId),
  check("rol").custom(esRolValido),
  validarCampos,
  usuariosPut
);

router.post(
  "/",
  check("correo", "El nombre es obligatorio").not().isEmpty(), //si no está vacío...
  check("password", "El password debe ser de más de 6 letras").isLength({
    min: 6,
  }),
  check("correo", "El correo no es válido").isEmail(),
  check("correo").custom(existeEmail),
  // check("rol", "No es un rol permitido").isIn("ADMIN_ROLE", "USER_ROLE"),
  check("rol").custom(esRolValido),
  validarCampos,
  usuariosPost
);

router.delete("/:id", [
  validarJWT,
  // esAdminRole,
  tieneRole(USARIOS_EMPRESA),
  check("id", "No es un id válido").isMongoId(),
  check("id").custom(existeUsuarioPorId),
  validarCampos,
  usuariosDelete,
]);

module.exports = router;
