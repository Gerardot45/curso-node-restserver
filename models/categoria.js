const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  //usuario
  usuario: {
    type: Schema.Types.ObjectId, //tiene que ser un objeto de referencia
    ref: "Usuario",
    required: true,
  },
});

CategoriaSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject(); //elimina la versión y únicamente deja el resto de la información
  return data;
};

module.exports = model("Categoria", CategoriaSchema);
