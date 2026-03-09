const axios = require('axios')
const http = require('http')

http.createServer(async function (req, res) {
    var date = new Date().toISOString().substring(0, 16) // útil
    console.log(req.method + " " + req.url + " " + date)

    if (req.method === "GET") {

        if (req.url === "/alunos") {
            try {
                const response = await axios.get('http://localhost:3000/alunos')
                let dados = response.data
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(dados))

            } catch (error) {
                res.writeHead(502, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    erro: "Erro ao contactar o servidor de dados",
                    detalhe: error.message
                }))
            }
        } else if (req.url === "/cursos") {
            try {
                const response = await axios.get('http://localhost:3000/cursos')
                let dados = response.data
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(dados))

            } catch (error) {
                res.writeHead(502, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    erro: "Erro ao contactar o servidor de dados",
                    detalhe: error.message
                }))
            }
        } else if (req.url.startsWith("/instrumentos")) {
            try {
                const response = await axios.get('http://localhost:3000/instrumentos')
                let dados = response.data
                res.writeHead(200, { 'Content-Type': 'application/json' })
                let dadosjson = JSON.stringify(dados)
                res.end(dadosjson)
           
            } catch (error) {
                res.writeHead(502, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    erro: "Erro ao contactar o servidor de dados",
                    detalhe: error.message
                }))
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({
                erro: "Rota não suportada",
                metodo: req.method,
                caminho: req.url
            }))
        }

    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            erro: "Método não permitido",
            metodo: req.method
        }))
    }

}).listen(25000)

console.log("Servidor à escuta na porta 25000...")
