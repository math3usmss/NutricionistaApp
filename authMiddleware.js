// authMiddleware.js

function verificaAutenticacao(req, res, next) {
    if (req.session && req.session.userId) {
        // O usuário está autenticado, permita o acesso à rota
        return next();
    } else {
        // Redirecione para a página de login se o usuário não estiver autenticado
        res.redirect('/login');
    }
}

module.exports = verificaAutenticacao;
