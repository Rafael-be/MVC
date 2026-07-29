const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/autenticacaoMiddleware');

router.post('/login', userController.login);

router.post('/cadastro', userController.cadastro);

router.delete('/:id', authMiddleware.verificarToken, userController.deletar);

router.patch('/:id', authMiddleware.verificarToken, userController.atualizarUsuario);

module.exports = router;
