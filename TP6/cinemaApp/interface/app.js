const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Configurações do Express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

// URL da API (Se estiveres a correr fora do Docker, usa localhost)
const API_URL = process.env.API_URL || "http://localhost:7789/filmes";
const API_URL_ATORES = process.env.API_URL_ATORES || "http://localhost:7789/atores";
const API_URL_GENEROS = process.env.API_URL_GENEROS || "http://localhost:7789/generos";

app.get('/filmes', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    // Faz o pedido à API de dados
    axios.get(API_URL + '?' + new URLSearchParams(req.query).toString())
        .then(response => {
            res.render('index', { 
                list: response.data, 
                date: d 
            });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados da API" 
            });
        });
});

app.get('/filmes/:id', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    // Faz o pedido à API de dados
    axios.get(`${API_URL}/${req.params.id}`)
        .then(response => {
            res.render('filme', { 
                filme: response.data, 
                date: d 
            });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados do filme" 
            });
        });
});


app.get('/atores', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    // Faz o pedido à API de dados
    axios.get(API_URL_ATORES)
        .then(response => {
            res.render('atores', { 
                list: response.data, 
                date: d 
            });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados dos atores" 
            });
        });
});

app.get('/atores/:id', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    // Faz o pedido à API de dados
    axios.get(`${API_URL_ATORES}/${req.params.id}`)
        .then(response => {
            res.render('ator', { 
                ator: response.data, 
                date: d 
            });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados do ator" 
            });
        });
});

app.get('/generos', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    // Faz o pedido à API de dados
    axios.get(API_URL_GENEROS)
        .then(response => {
            res.render('generos', { 
                list: response.data, 
                date: d 
            });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados dos gêneros" 
            });
        });
});

app.get('/generos/:id', (req, res) => {
    const d = new Date().toISOString().substring(0, 16);
    
    // Faz o pedido à API de dados
    axios.get(`${API_URL_GENEROS}/${req.params.id}`)
        .then(response => {
            res.render('genero', { 
                genero: response.data, 
                date: d 
            });
        })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados do gênero" 
            });
        });
});

// Inicia o servidor de interface

const PORT = 7790;
app.listen(PORT, () => {
    console.log(`Servidor de Interface em http://localhost:${PORT}/filmes`);
});