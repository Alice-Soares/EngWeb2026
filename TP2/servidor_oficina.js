const { createServer } = require('http');
const axios = require('axios');


createServer (function (req, res) {

    // GET /reparacoes
    if (req.url == "/reparacoes") {
        axios.get('http://localhost:3000/reparacoes')
            .then(response => {
                html = `<table border="1">
                            <tr>
                                <th>Data</th>
                                <th>Nome</th>
                                <th>NIF</th>
                                <th>Matricula</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Nr Intervenções</th>
                            </tr>
                        `;
                dados = response.data;
                dados.forEach(reparacao => {
                    html += `<tr>
                        <td>${reparacao.data}</td>
                        <td>${reparacao.nome}</td>
                        <td>${reparacao.nif}</td>
                        <td>${reparacao.viatura.matricula}</td>
                        <td>${reparacao.viatura.marca}</td>
                        <td>${reparacao.viatura.modelo}</td>
                        <td>${reparacao.nr_intervencoes}</td>
                    </tr>`;
             });
             html += "</table>";
             res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
             res.end(html);
            })
            .catch(error => {
             res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'});
             res.end("<pre>" + JSON.stringify(error) + "</pre>");
        });
    }
    // GET /intervencoes
    else if (req.url == "/intervencoes") {
        axios.get('http://localhost:3000/intervencoes')
            .then(response => {
                html = `<table border="1">
                            <tr>
                                <th>Codigo</th>
                                <th>Nome</th>
                                <th>Descricao</th>
                                <th>Número de Intervenções</th>
                            </tr>
                        `;
                dados = response.data;
                dados.forEach(intervencao => {
                    html += `<tr>
                        <td>${intervencao.codigo}</td>
                        <td>${intervencao.nome}</td>
                        <td>${intervencao.descricao}</td>
                        <td>${intervencao.nr_intervencoes}</td>
                    </tr>`;
                });
                html += "</table>";
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(html);
            })
            .catch(error => {
                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'});
                res.end("<pre>" + JSON.stringify(error) + "</pre>");
            });
    }
    // GET /viaturas
    else if (req.url == "/viaturas") {
        axios.get('http://localhost:3000/viaturas')
            .then(response => {
                const viaturas = response.data;
                html = `<table border="1">
                            <tr>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Nr Intervenções</th>
                            </tr>
                        `;
                viaturas.forEach(v => {
                    v.modelos.forEach(m => {
                        html += `<tr>
                            <td>${v.marca}</td>
                            <td>${m.modelo}</td>
                            <td>${m.nr_intervencoes}</td>
                        </tr>`;
                    });
                });
                html += "</table>";
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(html);
            })
            .catch(error => {
                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'});
                res.end("<pre>" + JSON.stringify(error) + "</pre>");
            });
    }
    else {
        res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'});
        res.end("<p> Pedido não suportado </p>");
    }

}).listen(7777);

console.log('Servidor à escuta na porta 7777')