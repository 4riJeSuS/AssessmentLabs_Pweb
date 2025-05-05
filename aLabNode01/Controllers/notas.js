const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();

router.use(express.json());

const uri = 'mongodb+srv://arivjpacheco:admin@progweb.rtyws0o.mongodb.net/';
let db;

// Conectar ao MongoDB
MongoClient.connect(uri)
  .then(client => {
    db = client.db('notasDB');
    console.log('MongoDB ligado!');
  })
  .catch(err => console.error('Erro ao ligar ao MongoDB:', err));

// Função para aceder à base de dados
function getDB() {
  return db;
}

// GET - Obter todas as notas
router.get('/nota', async (req, res) => {
  const db = getDB();
  if (!db) return res.status(500).json({ erro: "Base de dados não ligada" });

  try {
    const notas = await db.collection('notas').find().toArray();
    res.status(200).json(notas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao obter notas' });
  }
});

// GET - Obter nota por código
router.get('/nota/:cod', async (req, res) => {
  const db = getDB();
  if (!db) return res.status(500).json({ erro: "Base de dados não ligada" });

  try {
    const nota = await db.collection('notas').findOne({ cod: req.params.cod });
    if (nota) res.status(200).json(nota);
    else res.status(404).json({ erro: "Nota não encontrada" });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao obter a nota' });
  }
});

// POST - Inserir nova nota
router.post('/nota', async (req, res) => {
  const db = getDB();
  if (!db) return res.status(500).json({ erro: "Base de dados não ligada" });

  try {
    const novaNota = req.body;
    await db.collection('notas').insertOne(novaNota);
    res.status(201).json({ mensagem: "Nota inserida com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao inserir nota' });
  }
});

// PUT - Atualizar nota por código
router.put('/nota/:cod', async (req, res) => {
  const db = getDB();
  if (!db) return res.status(500).json({ erro: "Base de dados não ligada" });

  try {
    const result = await db.collection('notas').updateOne(
      { cod: req.params.cod },
      { $set: req.body }
    );
    if (result.matchedCount > 0) {
      res.status(200).json({ mensagem: "Nota atualizada com sucesso!" });
    } else {
      res.status(404).json({ erro: 'Nota não encontrada para atualizar' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar nota' });
  }
});

// DELETE - Apagar nota por código
router.delete('/nota/:cod', async (req, res) => {
  const db = getDB();
  if (!db) return res.status(500).json({ erro: "Base de dados não ligada" });

  try {
    const result = await db.collection('notas').deleteOne({ cod: req.params.cod });
    if (result.deletedCount > 0) {
      res.status(200).json({ mensagem: "Nota apagada com sucesso!" });
    } else {
      res.status(404).json({ erro: 'Nota não encontrada para apagar' });
    }
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao apagar nota' });
  }
});

module.exports = router;
