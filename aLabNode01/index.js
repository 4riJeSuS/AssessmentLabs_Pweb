const express = require('express');
const app = express();
const port = 3000;

const minhasnotas = [20, 18, 15, 17];

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Servidor Express em funcionamento!');
});

app.get('/nota', (req, res) => {
    res.status(200).json(minhasnotas);
});

app.get('/nota/:pos', (req, res) => {
    const pos = parseInt(req.params.pos);
    if (pos >= 0 && pos < minhasnotas.length) {
        res.json(minhasnotas[pos]);
    } else {
        res.status(400).json({ error: 'Posição errada ou não existente' });
    }
});

app.post('/', (req, res) => {
    const novaNT = req.body.nota;
    if (novaNT == undefined || novaNT < 0 || novaNT > 20 || isNaN(novaNT)) {
        return res.status(400).json({ error: 'Nota inválida' });
    }

    minhasnotas.push(novaNT);
    res.status(200).json({ message: 'Nota adicionada com sucesso!' });
});

app.post('/nota/:valor', (req, res) => {
    const notaN = parseInt(req.params.valor);

    if (notaN == undefined || notaN < 0 || notaN > 20 || isNaN(notaN)) {
        return res.status(400).json({ error: 'Nota inválida' });
    }
    minhasnotas.push(notaN);
    res.status(200).json({ message: 'Nota adicionada com sucesso!' });
});

app.patch('/nota/:posicao', (req, res) => {
    const posicao = parseInt(req.params.posicao);
    const novaNota = req.body.nota;

    if (isNaN(posicao) || posicao < 0 || posicao >= minhasnotas.length) {
        return res.status(400).json({ erro: 'Posição inválida ou fora do intervalo.' });
    }

    if (novaNota === undefined || isNaN(novaNota) || novaNota < 0 || novaNota > 20) {
        return res.status(400).json({ erro: 'Nota inválida. Envie um número no corpo da requisição.' });
    }

    minhasnotas[posicao] = Number(novaNota);
    res.status(200).json({ mensagem: `Nota atualizada com sucesso!` });
});

app.delete('/nota/:posicao', (req, res) => {
    const posicao = parseInt(req.params.posicao);

    if (isNaN(posicao) || posicao < 0 || posicao >= minhasnotas.length) {
        return res.status(400).json({ erro: 'Posição inválida ou fora do intervalo.' });
    }

    const notaRemovida = minhasnotas.splice(posicao, 1);
    res.status(200).json({ mensagem: `Nota removida com sucesso.`, });
});

app.delete('/', (req, res) => {
    minhasnotas.length = 0; // limpa o array
    res.status(200).json({ mensagem: 'Todas as notas foram apagadas com sucesso.' });
});

app.listen(port, () => {
    console.log(`Aplicação "IDKApp" iniciada por Ari Jesus e Tomás Silva a correr em http://localhost:${port}`);
});
