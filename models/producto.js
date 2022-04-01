const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
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
  precio: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.Types.ObjectId, //tiene que ser un objeto de referencia
    ref: "Categoria",
    required: true,
  },
  descripcion: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String,
  },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject(); //elimina la versión y únicamente deja el resto de la información
  return data;
};

module.exports = model("Producto", ProductoSchema);
