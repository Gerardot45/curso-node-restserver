const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config.js");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosRoutePath = "/api/usuarios";

    //Conectar a mi BD
    this.conectarDB()

    //middlewares
    this.middlewares();

    //rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //use -> palabra clave para saber que es un middleware

    //CORS
    this.app.use(cors());

    //lect5ura y parseo del body

    this.app.use(express.json()); //función que podrá manejar los formatos json

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosRoutePath, require("../routes/usuarios.js"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
