const pool = require('../../config/db');

const ProdutoModel = {

  listarTodos: async () => {
    const [linhas] = await pool.query('SELECT * FROM produtos');
    return linhas;
  },

  
  buscarPorId: async (id) => {
    const [linhas] = await pool.query('SELECT * FROM produtos WHERE id_produto = ?', [id]);
    return linhas[0];
  },

  
  criar: async ({ nome, valor }) => {
    const sql = `INSERT INTO produtos (nome, valor) VALUES (?, ?)`;
    const [resultado] = await pool.query(sql, [nome, valor ]);
    return resultado.insertId;
  },

 
  atualizar: async (id, { nome, valor }) => {
    const campos = [];
    const valores = [];

    if (nome !== undefined) {
      campos.push('nome = ?');
      valores.push(nome);
    }

    if (valor !== undefined) {
      campos.push('valor = ?');
      valores.push(valor);
    }

    if (campos.length === 0) {
      const erro = new Error('Voce deve por um campo para ser atualizado');
      erro.statusCode = 400;
      throw erro;
    }

    valores.push(id);
    const parametros = campos.join(', ');

    const sql = `UPDATE produtos SET ${parametros} WHERE id_produto = ?;`;
    const [resultado] = await pool.execute(sql, valores);
    return resultado;
  },


  deletar: async (id) => {
    const [resultado] = await pool.query('DELETE FROM produtos WHERE id_produto = ?', [id]);
    return resultado.affectedRows;
  }
};

module.exports = ProdutoModel;
