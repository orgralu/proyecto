const express = require("express");
const {index, guardar, modificar, listar_categoria, eliminar} = require("./../controladores/producto.controlador");

const router = express.Router();

router.get("/producto", index);
router.get("/producto/categoria", listar_categoria);
router.post("/producto", guardar);
router.put("/producto/:id", modificar);
router.delete("/producto/:id", eliminar);

module.exports = router;