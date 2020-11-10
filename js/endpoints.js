
const conexion = require("./conexion");
//conexion.app.use(express.json());
const validacionesPedidos = require("./validacionesPedidos");
const validacionesProductos = require("./validacionesProductos");
const validacionesUsuarios = require("./validacionesUsuarios");
const validacionesGenerales = require("./validacionesGenerales")
//JWT
const JWT = require("jsonwebtoken");

//Abriendo la conexión de Express
let puerto = 3000;
conexion.app.listen(puerto, ()=>{
    console.log("servidor corriendo en el puerto "+puerto)
});


/////////////////////////////////////////////////////ENDPOINTS USUARIOS/////////////////////////////////////////////////////

conexion.app.post("/usuarios", validacionesUsuarios.datosCompletosUsuarios, validacionesUsuarios.usuarioExistenteCreacion, (req, res)=>{
    
    const {usuario, nombreCompleto, email, telefono, direccionEnvio, contraseña, rolUsuario} =req.body;
    conexion.sequelize.query("INSERT INTO usuarios (usuario, nombreCompleto, email, telefono, direccionEnvio, contraseña, rolUsuario) VALUES (?,?,?,?,?,?,?)",
    {
        replacements: [usuario, nombreCompleto, email, telefono, direccionEnvio, contraseña, rolUsuario],
        type:conexion.sequelize. QueryTypes. INSERT
    }).then((respuesta)=>
        {res.status(200).json("usuario creado exitosamente, su ID es " + respuesta[0]);
    }).catch((error)=>
        {res.status(500).json(error)})
});


conexion.app.post("/login", validacionesUsuarios.usuarioExistenteRegistroYContraseña, (req, res)=>{
    
    conexion.sequelize.query("SELECT * FROM usuarios WHERE email=?",
    {
        replacements: [req.body.email],
        type:conexion.sequelize.QueryTypes.SELECT
    }).then((respuesta)=>{
        console.log(respuesta[0])
        let usuario = respuesta[0]

       const payload = {
            usuario : usuario.usuario,
            nombre : usuario.nombreCompleto,
            email: usuario.email,
            telefono: usuario.telefono,
            direccionEnvio: usuario.direccionEnvio,
            rolUsuario: usuario.rolUsuario,
        };
        const Token = JWT.sign(payload, process.env.secreto) 

    res.status(200).json(Token)
    }).catch((error)=>{res.status(500).json(error)})

});


conexion.app.get("/usuarios/:id", validacionesGenerales.rolAdministrador, (req, res)=>{

    if(req.params.id){
        conexion.sequelize.query("SELECT * FROM usuarios WHERE id=?",
        {
            replacements: [req.params.id],
            type: conexion.sequelize.QueryTypes.SELECT
        }).then((respuesta)=>{
            res.status(200).json(respuesta[0])
        }).catch((error)=>{
            console.log(error);
            res.status(500).json(500)
        })

    }else{
        res.status(400).json("debe ingresar el id del usuario que desea consultar")
    }
});



/////////////////////////////////////////////////////ENDPOINTS PRODUCTOS/////////////////////////////////////////////////////

conexion.app.post("/producto", validacionesProductos.datosCompletosProductos, validacionesGenerales.rolAdministrador, (req, res)=>{
    conexion.sequelize.query("INSERT INTO productos(nombreProducto, precio) VALUES(?,?)",
    {
        replacements:[req.body.nombreProducto, req.body.precio],
        type:conexion.sequelize. QueryTypes. INSERT
    }).then((respuesta)=>{
        console.log(respuesta)
        res.status(200).json("el producto " + req.body.nombreProducto + " se creó exitosamente con el id " + respuesta[0])
    }).catch((error)=>{
        console.log(error)
        res.status(500).json(error)
    })
})


conexion.app.put('/producto', validacionesProductos.datosCompletosProductos, validacionesGenerales.rolAdministrador, (req, res) => {
    conexion.sequelize.query("UPDATE productos SET nombreProducto=?, precio=? WHERE id=?;",
    {
        replacements:[req.body.nombreProducto, req.body.precio, req.body.id],
        type:conexion.sequelize.QueryTypes.UPDATE
    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json("Producto actualizado con exito")

    }).catch((error)=>{
        console.log(error)

    })
});


conexion.app.delete("/producto/:id", validacionesGenerales.rolAdministrador, (req, res)=>{
    let idProducto = req.params.id;
    conexion.sequelize.query("DELETE FROM productos WHERE id = ?",
    {
        replacements:[idProducto],
        type:conexion.sequelize.QueryTypes.DELETE
    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json("Producto eliminado exitosamente")
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error)
    })
});



conexion.app.get("/producto/:id", validacionesGenerales.validarToken, (req, res)=>{
    let paramId = req.params.id;
    conexion.sequelize.query("SELECT * FROM productos WHERE id= ?",
    {
        replacements: [paramId],
        type: conexion.sequelize.QueryTypes.GET
    }).then((respuesta)=>{
        //console.log(respuesta);
        res.status(200).json(respuesta[0])
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error)
    })
});

conexion.app.get("/productos", validacionesGenerales.validarToken, (req, res)=>{
    conexion.sequelize.query("SELECT * FROM productos ",
    {
        type:conexion.sequelize.QueryTypes.GET
    }).then((respuesta)=>{
        //console.log(respuesta);
        res.status(200).json(respuesta[0])
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error)
    })
});


/////////////////////////////////////////////////////ENDPOINTS PEDIDOS/////////////////////////////////////////////////////

conexion.app.post("/pedidos", validacionesPedidos.datosCompletosPedido, validacionesGenerales.validarToken, (req, res)=>{
    conexion.sequelize.query("INSERT INTO pedidos (id_Producto, id_Usuario, id_EstadoPedido, id_MetodoPago, descripcionPedido) VALUES (?,?,?,?,?)",{
        replacements:[req.body.id_Producto, req.body.id_Usuario, req.body.id_EstadoPedido, req.body.id_MetodoPago, req.body.descripcionPedido],
        type:conexion.sequelize.QueryTypes.INSERT
    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json("pedidod de ID " + respuesta[0] + " creado con exito con super cambios");
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error);
    })
}); 


conexion.app.put("/pedidos", validacionesPedidos.datosCompletosPedido, validacionesGenerales.rolAdministrador, (req, res)=>{
    conexion.sequelize.query("UPDATE pedidos SET id_Producto=?, id_Usuario=?, id_EstadoPedido=?, id_MetodoPago=?, descripcionPedido=? WHERE id=?;",
    {
        replacements:[req.body.id_Producto, req.body.id_Usuario, req.body.id_EstadoPedido, req.body.id_MetodoPago, req.body.descripcionPedido, req.body.id],
        type:conexion.sequelize.QueryTypes.UPDATE
    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json("pedido actualizado con exito");
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error);

    })
});

conexion.app.get("/pedidos/:id", validacionesGenerales.validarToken, (req, res) => {
    let parametroId = req.params.id
    conexion.sequelize.query("SELECT * FROM pedidos WHERE id=?",
    {
        replacements:[parametroId],
        type:conexion.sequelize.QueryTypes.GET

    }).then((respuesta)=>{
        console.log(respuesta);
        res.status(200).json(respuesta[0])
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error);
    })
});

conexion.app.delete("/pedidos/:id", validacionesGenerales.rolAdministrador, (req, res)=>{
    if(req.params.id){
        conexion.sequelize.query("DELETE FROM pedidos WHERE ID=?",
    {
        replacements: [req.params.id],
        type: conexion.sequelize.QueryTypes.DELETE
    }).then(()=>{
        res.status(200).json("Pedido eliminado con exito")
    }).catch((error)=>{
        console.log(error);
        res.status(500).json(error)
    })

    }else{
        res.status(400).json("debe ingresar el id del producto que desea eliminar")
    }    
})