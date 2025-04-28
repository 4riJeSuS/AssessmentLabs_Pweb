const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Caminho para o ficheiro onde guardamos as notas
const ficheiroNotas = path.join(__dirname, '../Shared/Notas.json');

// Função para ler as notas do ficheiro
function lerNotas() {
    try {
        const data = fs.readFileSync(ficheiroNotas, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao ler o ficheiro de notas:', err);
        return [];
    }
}

// Função para escrever as notas no ficheiro
function escreverNotas(notas) {
    try {
        fs.writeFileSync(ficheiroNotas, JSON.stringify(notas));
    } catch (err) {
        console.error('Erro ao escrever no ficheiro de notas:', err);
    }
}

// Carregar notas ao iniciar o servidor
let minhasnotas = lerNotas();

router.use(express.json());

// Endpoints

router.get('/', (req, res) => {
    res.status(200).send('Servidor Express em funcionamento!');
});

// Devolve todas as notas
router.get('/nota', (req, res) => {
    res.status(200).json(minhasnotas);
});

// Devolve a nota de acordo com o código da disciplina
router.get('/nota/:cod', (req, res) => {
    const cod = req.params.cod;
    const nota = minhasnotas.find(n => n.cod === cod);

    if (nota) {
        res.json(nota);
    } else {
        res.status(404).json({ error: 'Disciplina não encontrada' });
    }
});

// Adiciona uma nova disciplina e nota
router.post('/', (req, res) => {
    const { cod, nota, disciplina, professor } = req.body;

    if (!cod || !disciplina || !professor || nota === undefined ||
        isNaN(nota) || nota < 0 || nota > 20) {
        return res.status(400).json({ error: 'Dados inválidos' });
    }

    const novaNota = {
        cod,
        nota: Number(nota),
        disciplina,
        professor
    };

    minhasnotas.push(novaNota);
    escreverNotas(minhasnotas);
    res.status(201).json({ message: 'Nota adicionada com sucesso!' });
});

// Atualiza a nota de uma disciplina pelo código
router.patch('/nota/:cod', (req, res) => {
    const cod = req.params.cod;
    const novaNota = req.body.nota;

    const nota = minhasnotas.find(n => n.cod === cod);

    if (!nota) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
    }

    if (novaNota === undefined || isNaN(novaNota) || novaNota < 0 || novaNota > 20) {
        return res.status(400).json({ error: 'Nota inválida' });
    }

    nota.nota = Number(novaNota);
    escreverNotas(minhasnotas);
    res.status(200).json({ message: 'Nota atualizada com sucesso!' });
});

// Remove uma disciplina pelo código
router.delete('/nota/:cod', (req, res) => {
    const cod = req.params.cod;
    const index = minhasnotas.findIndex(n => n.cod === cod);

    if (index === -1) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
    }

    minhasnotas.splice(index, 1);
    escreverNotas(minhasnotas);
    res.status(200).json({ message: 'Disciplina removida com sucesso!' });
});

// Remove todas as disciplinas
router.delete('/', (req, res) => {
    minhasnotas.length = 0;
    escreverNotas(minhasnotas);
    res.status(200).json({ message: 'Todas as disciplinas foram removidas com sucesso!' });
});

module.exports = router;
