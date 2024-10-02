import e from "express"
import Producto from "../database/model/producto.js"

export const leerPrueba =  (req,res)=>{
    res.send('Desde el backend del proyecto crudCafe')
   
}
export const crearProducto =  async (req,res)=>{
    try {
        //validar los datos para crear el producto
        //pedir al modelo Producto que genere uno nuevo
      
      
       const productoNuevo = new Producto(req.body)

        //guardo en la base de datos
        await productoNuevo.save()

        //envio una respuesta al front
        res.status(201).json({
            mensaje: "El producto fue creado correctamente"
        })
    } catch (error) {
        //envio una respuesta al front algo fallo
        console.error(error)
        res.status(500).json({
            mensaje: "Ocurrio un error, no se pudo crear el producto"
        })
    }  
   
}

export const listarProductos = async(req,res)=>{
    try {
        //pedirle a la BD la collection de productos
        //enviar en la respuesta la lista de productos
        const productos = await Producto.find()
        res.status(200).json(productos)
    } catch (error) {
        //enviar un mensaje de error si falla
        res.status(404).json({
            mensaje: "Ocurrio un error, no se encontraron los productos"
        })
    }
}
export const obtenerProducto = async(req,res)=>{
    try {
        //extraer de la solicitud el ID
        
        //pedirle a la BD que busque ese producto
        const productoBuscado = await Producto.findById(req.params.id)
        if(!productoBuscado){
            return res.status(404).json({mensaje: "El producto no fue encontrado"})
        }
        //enviar el producto
        res.status(200).json(productoBuscado)
    } catch (error) {
        //enviar un mensaje de error si falla
        res.status(404).json({
            mensaje: "Ocurrio un error, no se pudo obtener el producto"
        })
    }
}

export const borrarProducto = async (req,res)=>{
    try {
        //Primero quiero saber si esta el id, si no esta contesto con un codigo de error
        const productoBuscado = await Producto.findById(req.params.id)
        if(!productoBuscado){
            return res.status(404).json({mensaje: "El producto no fue encontrado"})
        }
        //si esta le pido a la bd que borre el producto
        await Producto.findByIdAndDelete(req.params.id)
        res.status(200).json({mensaje: 'El producto fue eliminado correctamente'})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: "Ocurrio un error, al intentar borrar un producto"})
    }
}

export const editarProducto = async (req,res)=>{
    try {
        //necesito el id y el body
        //validar los datos del body
        //pedirle a la bd que busque si esta el id y edite el producto
        const productoBuscado = await Producto.findById(req.params.id)
        if(!productoBuscado)
        return  res.status(404).json({mensaje: "El producto no fue encontrado"})
        await Producto.findByIdAndUpdate(req.params.id, req.body)
        
        res.status(200).json({mensaje: "El producto fue editado correctamente"})
    } catch (error) {
        console.error(error)
        res.status(500).json({mensaje: "Ocurrio un error, al intentar editar el producto"})
    
    }
}
