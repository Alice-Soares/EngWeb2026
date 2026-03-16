var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) { //next é a função que faz o encaminhamento horizontal para o pipeline 
    var d = new Date().toISOString().substring(0, 16)
    axios.get("http://localhost:3000/filmes?_sort=nome")
      .then(resp => {
      var filmes = resp.data 
      res.render('index', {list : filmes, date : d });
    })
});

/* GET home page. */
router.get('/filmes', function(req, res, next) { //next é a função que faz o encaminhamento horizontal para o pipeline 
    var d = new Date().toISOString().substring(0, 16)
    axios.get("http://localhost:3000/filmes?_sort=nome")
      .then(resp => {
      var filmes = resp.data 
      res.render('index', {list : filmes, date : d });
    })
});

router.get('/filmes/:id', function(req, res, next) { 
    var d = new Date().toISOString().substring(0, 16)
    axios.get("http://localhost:3000/filmes/" + req.params.id)
      .then(resp => {
      var filme = resp.data 
      res.render('filme', {filme : filme, date : d });
    })
});

module.exports = router;