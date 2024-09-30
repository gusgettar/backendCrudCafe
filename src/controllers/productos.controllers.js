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


