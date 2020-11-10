//JWT
const JWT = require("jsonwebtoken");

//variables de entorno
require("dotenv").config();

//validando el token
const validarToken = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        JWT.verify(token, process.env.secreto);
        console.log(token + process.env.secreto)
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json('token no válido');
    }
}

//validando rol administrador
const rolAdministrador = (req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodificado = JWT.decode(token);
    if(decodificado.rolUsuario == 2){
        next();
    }else {res.status(404).json("no tiene acceso a este servicio")}
    
}

module.exports ={
    validarToken,
    rolAdministrador,
};