const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config.js");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      categorias: "/api/categorias",
      productos: "/api/productos",
      usuarios: "/api/usuarios",
    };

    //Conectar a mi BD
    this.conectarDB();

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
    this.app.use(this.paths.auth, require("../routes/auth.js"));
    this.app.use(this.paths.categorias, require("../routes/categorias.js"));
    this.app.use(this.paths.productos, require("../routes/productos.js"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios.js"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
