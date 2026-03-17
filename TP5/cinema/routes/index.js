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

router.get('/atores', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    axios.get("http://localhost:3000/atores?_sort=nome")
      .then(resp => {
      var atores = resp.data 
      res.render('atores', {list : atores, date : d });
    })
});

router.get('/atores/:id', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    axios.get("http://localhost:3000/atores/" + req.params.id)
      .then(resp => {
      var ator = resp.data 
      res.render('ator', {ator : ator, date : d });
    })
});

router.get('/generos', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    axios.get("http://localhost:3000/generos?_sort=nome")
      .then(resp => {
      var generos = resp.data 
      res.render('generos', {list : generos, date : d });
    })
});

router.get('/generos/:id', function(req, res, next) {
    var d = new Date().toISOString().substring(0, 16)
    axios.get("http://localhost:3000/generos/" + req.params.id)
      .then(resp => {
      var genero = resp.data 
      res.render('genero', {genero : genero, date : d });
    })
});

module.exports = router;