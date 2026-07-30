const Produto = require('../models/produtoModel');

const verificarPermissaoEstrita = (req) => {
  if (!req.user || !req.user.id_usuario) {
    const erro = new Error('Acesso negado. ID do usuario nao validado no token.');
    erro.statusCode = 403;
    throw erro;
  }
};

const normalizarDadosProduto = (body) => {
  return {
    nome: body.nome,
    valor: body.valor
  };
};

const camposObrigatoriosPresentes = ({ nome, valor, estoque, categorias_id_categoria }) => {
  return nome !== undefined
    && valor !== undefined
};


exports.listarProdutos = async (req, res) => {
  try {
    verificarPermissaoEstrita(req);
    const produtos = await Produto.listarTodos();
    res.status(200).json({ status: 'success', resultados: produtos.length, data: produtos });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

exports.criarProduto = async (req, res) => {
  try {
    verificarPermissaoEstrita(req);
    const dadosProduto = normalizarDadosProduto(req.body);

    if (!camposObrigatoriosPresentes(dadosProduto)) {
      return res.status(400).json({
        message: 'Informe nome e valor'
      });
    }

    const idGerado = await Produto.criar(dadosProduto);
    res.status(201).json({ status: 'success', message: 'Produto criado', id_produto: idGerado });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

exports.atualizarProduto = async (req, res) => {
  try {
    verificarPermissaoEstrita(req);
    const dadosProduto = normalizarDadosProduto(req.body);
    const linhasAfetadas = await Produto.atualizar(req.params.id, dadosProduto);

    if (linhasAfetadas === 0) return res.status(404).json({ message: 'Produto nao encontrado' });

    res.status(200).json({ status: 'success', message: 'Produto atualizado com sucesso' });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

exports.deletarProduto = async (req, res) => {
  try {
    verificarPermissaoEstrita(req);

    const linhasAfetadas = await Produto.deletar(req.params.id);
    if (linhasAfetadas === 0) return res.status(404).json({ message: 'Produto nao encontrado' });

    res.status(200).json({ status: 'success', message: 'Produto removido com sucesso' });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};
