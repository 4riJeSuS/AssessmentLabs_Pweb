// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'chave-secreta-super-segura'; // Podes usar process.env mais tarde

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Adiciona os dados do user ao request
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
};
