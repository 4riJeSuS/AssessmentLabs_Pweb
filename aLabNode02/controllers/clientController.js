const express = require('express');
const router = express.Router();

const client = {
    clienteId: "12345",
    nome: "João Silva",
    endereco: {
        rua: "Rua Exemplo",
        "numero": "42",
        cidade: "Lisboa",
        codigoPostal: "1234-567"
    },
    consumo: [
        {
            mes: "Janeiro",
            ano: 2023,
            kWhConsumido: 250,
            custoTotal: 35.50,
            dataLeitura: "2023-01-31"
        }
    ],
    informacoesAdicionais: {
        tipoTarifa: "Residencial",
        fornecedorEnergia: "Empresa XYZ",
        contratoAtivo: true
    }
};

router.get('/', (req, res) => {
    try {
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.get('/:id', (req, res) => {
    try {
        if (req.params.id !== client.clienteId) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;