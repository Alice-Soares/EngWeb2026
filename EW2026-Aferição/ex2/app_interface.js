const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Configurações do Express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

// URL da API de dados
const API_URL = process.env.API_URL || "http://localhost:16025/repairs";

// Página principal - lista todas as reparações
app.get('/', (req, res) => {
    axios.get(API_URL)
        .then(response => {
            res.render('index', { repairs: response.data });
        })
        .catch(error => {
            res.status(500).render('error', { message: 'Erro ao carregar dados da API' });
        });
});

// Página de detalhes - mostra uma reparação por ID (apenas ObjectIds válidos - 24 chars hexadecimais)
app.get('/:id([0-9a-fA-F]{24})', (req, res) => {
    axios.get(API_URL + '/' + req.params.id)
        .then(response => {
            res.render('detail', { repair: response.data });
        })
        .catch(error => {
            res.status(404).render('error', { message: 'Reparação não encontrada' });
        });
});

// Página da marca - lista reparações de uma marca
app.get('/:marca', (req, res) => {
    axios.get(API_URL + '?marca=' + req.params.marca)
        .then(response => {
            // Extrair modelos únicos
            const modelos = [...new Set(response.data.map(r => r.viatura.modelo))].sort();
            res.render('marca', { marca: req.params.marca, modelos: modelos, repairs: response.data });
        })
        .catch(error => {
            res.status(500).render('error', { message: 'Erro ao carregar dados da API' });
        });
});

const PORT = process.env.PORT || 16026;

app.listen(PORT, () => {
    console.log(`Servidor de Interface em http://localhost:${PORT}/`);
});