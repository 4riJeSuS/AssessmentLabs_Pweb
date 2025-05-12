// controllers/authController.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET_KEY = 'chave-secreta-super-segura'; // usa .env depois se quiseres

// Utilizador simulado
const fakeUser = {
    id: 1,
    nome: 'Utilizador Exemplo',
    email: 'utilizador@example.com',
    password: '123456' // em produção, usar hash!
};

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email !== fakeUser.email || password !== fakeUser.password) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Criar token JWT
    const token = jwt.sign({
        id: fakeUser.id,
        nome: fakeUser.nome,
        email: fakeUser.email
    }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ token });
});

module.exports = router;
