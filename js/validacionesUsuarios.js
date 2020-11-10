const conexion = require("./conexion");

const datosCompletosUsuarios = (req, res, next)=>{
    const {usuario, nombreCompleto, email, telefono, direccionEnvio, contraseña, rolUsuario} =req.body;
    //console.log(usuario)
    if(usuario && nombreCompleto && email && telefono && direccionEnvio && contraseña && rolUsuario){
        console.log(usuario);
        if(typeof(nombreCompleto) === "string" 
        && typeof(email) === "string" 
        && typeof(telefono) ==="number" 
        && typeof(direccionEnvio) === "string" 
        && typeof(contraseña) ==="string"
        && typeof(rolUsuario === "integer") ){
            //validando RolUsuario
            if (rolUsuario !== 1 && rolUsuario !== 2 ) {
                return res.send('Debe ingresar el número 1 para Rol de ADMIN ó el número 2 para Rol CLIENTE');
            }
            //validando constraseña 
            if(contraseña.length < 5){
                return res.send("La constraseña debe ser de mas de 5 caracteres")
            }
            next();
        }else{res.send("Valida que los tipos datos sean correctos")}
    }else{res.send("datos incompletos o incorrectos")}
};


//validando si el usuario existe en la base de datos para no crear uno repetido
const usuarioExistenteCreacion =(req, res, next)=>{
    conexion.sequelize.query("SELECT * FROM usuarios WHERE email=?",
{
    replacements: [req.body.email],
    type:conexion.sequelize.QueryTypes.SELECT
}).then((respuesta)=>{
    console.log(respuesta.length);
    if(respuesta.length>0){
        res.status(409).json("El usuario ya existe");
        return;
    }
    next();
});
}

//validando si el usuario existe en la base de datos y si su contraseña es correcta para darle acceso
const usuarioExistenteRegistroYContraseña =(req, res, next)=>{
    conexion.sequelize.query("SELECT * FROM usuarios WHERE email=?",
{
    replacements: [req.body.email],
    type:conexion.sequelize.QueryTypes.SELECT
}).then((respuesta)=>{
    console.log(respuesta.length);
    if(respuesta.length == 0){
        res.status(409).json("El usuario no existe, para poder ingresar debe registrarse");
        return;
    }else if(respuesta[0].contraseña == req.body.contraseña){
        next();
    }else{res.status(404).json("Contraseña o usuario invalido");}
    
});
}

module.exports={
    datosCompletosUsuarios,
    usuarioExistenteCreacion,
    usuarioExistenteRegistroYContraseña
}