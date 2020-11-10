//aplicación de Express
let express = require("express");
let app = express();
app.use(express.json());

//variables de entorno
require("dotenv").config();

//aplicación de Sequelieze
let Sequelize = require("sequelize");

//Conexión a base de datos
let sequelize = new Sequelize ("proyecto3", process.env.u, process.env.c, 
{ 
    dialect: "mariadb",
    host: "127.0.0.1"
});

sequelize.authenticate().then(
    ()=>{console.log("conectado a la base de datos")}
).catch(
    (error)=>{console.log(error)}
);

module.exports ={
    app,
    sequelize
}