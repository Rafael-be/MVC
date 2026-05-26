module.exports = (req, res, next) => {
    // Verifica se existe o objeto 'user' na sessão
    if (req.session && req.session.user) {
        return next();
    } else {
        // Se não estiver logado, manda para o login (Critério de Aceite A)
        return res.redirect('/login');
    }
};