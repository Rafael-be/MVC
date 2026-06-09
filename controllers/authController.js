const { usuarios } = require("../models/userModel");

/**
 * Autentica um usuario usando as credenciais enviadas pelo formulario de login.
 *
 * Quando as credenciais sao validas, os dados basicos do usuario sao salvos na
 * sessao e o usuario e redirecionado para a pagina de CRUD. Caso contrario, a
 * view de login e renderizada com uma mensagem de erro.
 *
 * @param {import("express").Request<{}, {}, {username: string, password: string}>} req - Requisicao HTTP com usuario e senha no corpo.
 * @param {import("express").Response} res - Resposta HTTP usada para renderizar a view ou redirecionar.
 * @returns {void}
 */
exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = usuarios.find(u => u.username === username && u.password === password);

    if (user) {
        // Salva os dados do usuário na sessão (Requisito B)
        req.session.user = {
            id: user.id,
            username: user.username
        };
        return res.redirect('/CRUD');
    }
    
    res.render("login", { error: "E-mail ou senha incorretos!" });
};

/**
 * Encerra a sessao do usuario autenticado e limpa o cookie da sessao.
 *
 * @param {import("express").Request} req - Requisicao HTTP contendo a sessao atual.
 * @param {import("express").Response} res - Resposta HTTP usada para limpar o cookie e redirecionar.
 * @returns {void}
 */
exports.logout = (req, res) => {
    // Destrói a sessão (Requisito B / Critério D)
    req.session.destroy((err) => {
        res.clearCookie('connect.sid'); // Limpa o cookie da sessão
        res.redirect('/login');
    });
};
