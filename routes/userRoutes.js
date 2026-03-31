const express = require("express");
const router = express.Router();
const controlarProduto = require("../controllers/userController");


router.post("/CRUD", controlarProduto.criarProduto);
router.get("/CRUD", controlarProduto.getProdutos);


router.post("/CRUD/delete/:id", controlarProduto.deletarProduto);

router.post("/CRUD/update/:id", controlarProduto.atualizarProduto);

module.exports = router;