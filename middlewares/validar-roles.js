const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token primero",
    });
  }

  const { rol, nombre } = req.usuario;
  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador - no puede realizar esto`,
    });
  }
  next();
};

const tieneRole = (...roles) => {
  //operador rest Spread

  //aquí se ejecutarán las respeuesta y peticiones
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token primero",
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere alguno de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
