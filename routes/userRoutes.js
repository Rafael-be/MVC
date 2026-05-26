const express = require("express");
const router = express.Router();
const productController = require("../controllers/userController");

// Não precisa mais do router.use(authMiddleware) aqui se você colocou no server.js
// Mas se quiser garantir, pode deixar.

router.post("/CRUD", productController.criarProduto);
router.get("/CRUD", productController.getProdutos);
router.post("/CRUD/delete/:id", productController.deletarProduto);
router.post("/CRUD/update/:id", productController.atualizarProduto);

module.exports = router;