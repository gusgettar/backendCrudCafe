import { Router } from "express";
import { crearProducto, leerPrueba } from "../controllers/productos.controllers.js";

const router = Router();
router.route("/prueba").get(leerPrueba);
router.route("/productos").post(crearProducto);

export default router;
