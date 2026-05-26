const { usuarios } = require("../models/userModel");

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

exports.logout = (req, res) => {
    // Destrói a sessão (Requisito B / Critério D)
    req.session.destroy((err) => {
        res.clearCookie('connect.sid'); // Limpa o cookie da sessão
        res.redirect('/login');
    });
};