const mongoose = require("mongoose");

const opcionesDeBD = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //los siguientes métodos ya no están soportados
  //   useCreateIndex: true,
  //   useFindAndModify: false,
};

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, opcionesDeBD);

    console.log("BD en linea");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos\n");
  }
};

module.exports = {
  dbConnection,
};
