const express = require("express");
const router = express.Router();
const productController = require("../controllers/userController");


router.post("/CRUD", productController.criarProduto);
router.get("/CRUD", productController.getProdutos);


router.post("/CRUD/delete/:id", productController.deletarProduto);

router.post("/CRUD/update/:id", productController.atualizarProduto);

module.exports = router;