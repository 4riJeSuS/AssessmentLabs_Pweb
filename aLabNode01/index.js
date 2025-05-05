const express = require('express');
const app = express();
const port = 3000;
const { connectToDB } = require('./db');
const notasRouter = require('./Controllers/notas');

app.use(express.json());
app.use('/', notasRouter);

connectToDB().then(() => {
    app.listen(port, () => {
        console.log(`Servidor a correr em http://localhost:${port}`);
    });
});
