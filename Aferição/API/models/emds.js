const mongoose = require('mongoose')



var emdSChema = new mongoose.Schema({
    _id: String,
    index: Number,
    dataEMD: String,
    nome: {
        primeiro: String,
        último: String
    },
    idade : Number,
    género: String,
    morada: String,
    modalidade: String,
    clube: String,
    email: String,
    federado: Boolean,
    resultado: Boolean
});

module.exports = mongoose.model('emd', emdSChema,"exames")