const { validationResult } = require("express-validator");
const {NextFunction, request} = require('express');
const { response } = require("express");
//el next nos permitirá salir de este middleware
const validarCampos = (req = request, res = response, next = Nex) => {
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
