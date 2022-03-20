//IMPORTACIONES DE TERCEROS
require("dotenv").config();

//IMPORTACIONES PROPIAS
const Server = require("./models/server");

const server = new Server();

server.listen();
