const express = require('express');
const router = express.Router();
const Nota = require('../Models/notas');
const verifyJWT = require('../middlewares/authMiddleware'); // <-- importa

// Get all notas
router.get('/', async (req, res) => {
    try {
        const notas = await Nota.find();
        res.status(200).json(notas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get nota by código
router.get('/:codigo', async (req, res) => {
    try {
        const nota = await Nota.findOne({ codigoDisciplina: req.params.codigo });
        if (!nota) {
            return res.status(404).json({ error: 'Nota não encontrada' });
        }
        res.status(200).json(nota);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new nota
router.post('/', async (req, res) => {
    try {
        const nota = new Nota(req.body);
        await nota.save();
        res.status(201).json(nota);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors });
        }
        res.status(500).json({ error: error.message });
    }
});

// Update nota
router.put('/:codigo', async (req, res) => {
    try {
        const nota = await Nota.findOneAndUpdate(
            { codigoDisciplina: req.params.codigo },
            req.body,
            { new: true, runValidators: true }
        );
        if (!nota) {
            return res.status(404).json({ error: 'Nota não encontrada' });
        }
        res.status(200).json(nota);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ errors });
        }
        res.status(500).json({ error: error.message });
    }
});

// Delete nota
router.delete('/:codigo', async (req, res) => {
    try {
        const nota = await Nota.findOneAndDelete({ codigoDisciplina: req.params.codigo });
        if (!nota) {
            return res.status(404).json({ error: 'Nota não encontrada' });
        }
        res.status(200).json({ message: 'Nota removida com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;