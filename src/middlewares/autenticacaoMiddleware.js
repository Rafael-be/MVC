const jwt = require('jsonwebtoken');
const Usuario = require('../models/userModel');

exports.verificarToken = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Voce nao esta logado! Token ausente.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuarioAtual = await Usuario.findById(decoded.id);

    if (!usuarioAtual) {
      return res.status(401).json({ message: 'O usuario deste token nao existe mais.' });
    }

    req.user = {
      id_usuario: usuarioAtual.id_usuario,
      nome: usuarioAtual.nome
    };

    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token invalido ou expirado.' });
    }

    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.verificarMesmoUsuario = (req, res, next) => {
  const idParam = req.params.id;
  const idUsuario = req.user?.id_usuario;

  if (!idParam || !idUsuario) {
    return res.status(403).json({ message: 'Nao foi possivel validar o usuario desta acao.' });
  }

  if (idParam.toString() !== idUsuario.toString()) {
    return res.status(403).json({ message: 'Token e id nao coincidem ao mesmo usuario' });
  }

  next();
};
