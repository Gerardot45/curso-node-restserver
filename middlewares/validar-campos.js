const { validationResult } = require("express-validator");

//el next nos permitirá salir de este middleware
const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  //se acumulan los errores...
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  next();
};

module.exports = {
  validarCampos,
};
