var express = require('express');
var router = express.Router();
var Emd = require('../controllers/emds')

/* GET home page. */
router.get('/emd', function (req, res) {
  Emd.list(req.query)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({ erro: erro, mensagem: "Não consegui obter os exames." }))
});
router.get('/atletas', (req, res) => {
  Emd.listatletas(req.query)
  .then(dados => res.status(200).json(dados))
  .catch(erro => res.status(521).json({ erro: erro, mensagem: "Não consegui obter as modalidades." }))
})

router.get('/emd/:id', (req, res) => {
  Emd.getEmd(req.params.id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({ erro: erro, mensagem: "Não consegui obter o exame." }))
})


router.get('/modalidades', (req, res) => {
  Emd.getModalidades()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({ erro: erro, mensagem: "Não consegui obter as modalidades." }))
})



module.exports = router;
