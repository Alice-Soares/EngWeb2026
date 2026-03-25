var mongoose = require('mongoose');

var repairSchema = new mongoose.Schema({
  nome: String,
  nif: Number,
  data: String,
  viatura: {
    marca: String,
    modelo: String,
    matricula: String
  },
  nr_intervencoes: Number,
  intervencoes: [{
    codigo: String,
    nome: String,
    descricao: String
  }]
});

const Repair = mongoose.model('Repair', repairSchema, 'repairs');

module.exports = Repair;
