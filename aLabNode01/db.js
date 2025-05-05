const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://arivjpacheco:admin@progweb.rtyws0o.mongodb.net/';
const client = new MongoClient(uri);

async function connectToDB() {
    try {
        await client.connect();
        console.log('Conexão com MongoDB estabelecida!');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
        process.exit(1); // Finaliza o processo em caso de erro de conexão
    }
}

module.exports = { connectToDB };
