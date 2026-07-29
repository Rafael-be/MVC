const pool = require('../../config/db');

const UsuarioModel = {
  create: async ({ nome, senha}) => {
    const sql = 'INSERT INTO usuarios (nome, senha) VALUES (?, ?);';
    const [resultado] = await pool.execute(sql, [nome, senha]);
    return { id: resultado.insertId, nome, senha};
  },

  findByNome: async (nome) => {
    const sql = 'SELECT * FROM usuarios WHERE nome = ? LIMIT 1;';
    const [rows] = await pool.execute(sql, [nome]);
    return rows[0];
  },

  findById: async (id_usuario) => {
    const sql = 'SELECT * FROM usuarios WHERE id_usuario = ? LIMIT 1;';
    const [rows] = await pool.execute(sql, [id_usuario]);
    return rows[0];
  },

  deletar: async (id) => {
    const sql = 'DELETE FROM usuarios WHERE id_usuario = ?;';
    const [resultado] = await pool.execute(sql, [id]);
    return resultado.affectedRows;
  },

  atualizar: async (id_usuario, dados) => {
    const campos = [];
    const valores = [];

    if (dados.nome !== undefined) {
      campos.push('nome = ?');
      valores.push(dados.nome);
    }

    if (dados.senha !== undefined) {
      campos.push('senha = ?');
      valores.push(dados.senha);
    }

    if (campos.length === 0) {
      const erro = new Error('Voce deve por um campo para ser atualizado');
      erro.statusCode = 400;
      throw erro;
    }

    valores.push(id_usuario);
    const parametros = campos.join(', ');

    const sql = `UPDATE usuarios SET ${parametros} WHERE id_usuario = ?;`;
    const [resultado] = await pool.execute(sql, valores);
    return resultado;
  }
};

module.exports = UsuarioModel;
