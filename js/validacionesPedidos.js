const datosCompletosPedido = (req, res, next)=>{
    const {id_Producto, id_Usuario, id_EstadoPedido, id_MetodoPago, descripcionPedido} = req.body;

    if (id_Producto && id_Usuario && id_EstadoPedido && id_MetodoPago && descripcionPedido){
        return next();

    } else res.status(404).json("Datos incompletos");
}


module.exports ={
    datosCompletosPedido
}