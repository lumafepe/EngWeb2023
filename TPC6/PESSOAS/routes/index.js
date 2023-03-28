var express = require('express');
var router = express.Router();
var Pessoas = require('../controllers/pessoas')

/* GET home page. */
router.get('/pessoas', function (req, res) {
  Pessoas.list()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({ erro: erro, mensagem: "Não consegui obter a lista de pessoas." }))
});

router.get('/pessoas/:id', (req, res) => {
  Pessoas.getPessoa(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({ erro: erro, mensagem: "Não consegui obter a pessoa." }))
})

router.post('/pessoas/', (req, res) => {
  Pessoas.addPessoa(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(522).json({ erro: erro, mensagem: "Não consegui inserir a pessoa." }))
})

router.put('/pessoas/:id', (req, res) => {
  Pessoas.updatePessoa(req.body)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(523).json({ erro: erro, mensagem: "Não consegui alterar a pessoa." }))
})

router.delete('/pessoas/:id', (req, res) => {
  Pessoas.deletePessoa(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(524).json({ erro: erro, mensagem: "Não consegui apagar a pessoa." }))
})

module.exports = router;
