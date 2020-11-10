const datosCompletosProductos = (req, res, next)=>{
    const {nombreProducto, precio} = req.body;
    if(nombreProducto && precio){
            next();
    }else res.status(404).json('Datos incompletos');    
}


module.exports ={
    datosCompletosProductos
}