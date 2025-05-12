const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use((req, res, next) => {
    const timestamp = new Date().toLocaleString('pt-PT');
    console.log(`[${timestamp}] ${req.method} request received at ${req.url}`);
    next(); 
});

// ...existing code...

mongoose.connect('mongodb+srv://arivjpacheco:admin@progweb.rtyws0o.mongodb.net/')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const clientController = require('./controllers/clientController');
const notasController = require('./controllers/notasController');
const authController = require('./controllers/authController');

app.use('/notas', notasController);
app.use('/cliente', clientController);
app.use('/auth', authController);

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(port, () => {
    console.log(`Servidor de consumo energético a correr em http://localhost:${port}`);
});

