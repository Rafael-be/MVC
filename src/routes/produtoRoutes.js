const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const autenticacaoMiddleware = require('../middlewares/autenticacaoMiddleware');

router.use(autenticacaoMiddleware.verificarToken);

router.post('/produto', produtoController.criarProduto);

router.patch('/produto/:id', produtoController.atualizarProduto);

router.delete('/produto/:id', produtoController.deletarProduto);

module.exports = router;
