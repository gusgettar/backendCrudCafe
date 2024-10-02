import { Router } from "express";
import { crearProducto, leerPrueba, listarProductos, obtenerProducto, borrarProducto, editarProducto } from "../controllers/productos.controllers.js";

const router = Router();
router.route("/prueba").get(leerPrueba);
router.route("/productos").post(crearProducto).get(listarProductos)
router.route("/productos/:id").get(obtenerProducto).delete(borrarProducto).put(editarProducto)



export default router;
