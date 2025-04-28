const express = require('express');
const app = express();
const port = 3000;

const notasRouter = require('./Controllers/notas');

app.use('/', notasRouter);

app.listen(port, () => {
    console.log(`Aplicação "IDKApp" iniciada por Ari Jesus e Tomás Silva a correr em http://localhost:${port}`);
});
