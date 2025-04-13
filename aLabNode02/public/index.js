fetch('/cliente')
    .then(res => res.json())
    .then(data => {
        document.getElementById('clienteId').textContent = data.clienteId;
        document.getElementById('nome').textContent = data.nome;

        const endereco = `${data.endereco.rua}, Nº ${data.endereco.numero}, ${data.endereco.cidade}, ${data.endereco.codigoPostal}`;
        document.getElementById('endereco').textContent = endereco;

        const lista = document.getElementById('consumoList');
        data.consumo.forEach(c => {
            const li = document.createElement('li');
            li.textContent = `${c.mes} ${c.ano} - ${c.kWhConsumido} kWh - €${c.custoTotal} (Leitura: ${c.dataLeitura})`;
            lista.appendChild(li);
        });

        document.getElementById('tarifa').textContent = data.informacoesAdicionais.tipoTarifa;
        document.getElementById('fornecedor').textContent = data.informacoesAdicionais.fornecedorEnergia;
        document.getElementById('contrato').textContent = data.informacoesAdicionais.contratoAtivo ? 'Sim' : 'Não';
    })
    .catch(err => console.error('Erro ao carregar os dados:', err));
