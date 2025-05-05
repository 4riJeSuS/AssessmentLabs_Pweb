const mongoose = require('mongoose');
const { Schema } = mongoose;

const notaSchema = new Schema({
    codigoDisciplina: {
        type: Number,
        required: [true, 'O código da disciplina é obrigatório'],
        unique: true
    },
    nomeProfessor: {
        type: String,
        required: [true, 'O nome do professor é obrigatório']
    },
    nomeDisciplina: {
        type: String,
        required: [true, 'O nome da disciplina é obrigatório']
    },
    nota: {
        type: Number,
        required: [true, 'A nota é obrigatória'],
        min: [0, 'A nota não pode ser menor que 0'],
        max: [20, 'A nota não pode ser maior que 20']
    }
}, { timestamps: true });

// Add this line to export the model
module.exports = mongoose.model('Nota', notaSchema);