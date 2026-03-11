
var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')           // Necessario criar e colocar na mesma pasta
var static = require('./static.js')                 // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var examesServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /emd ------------------------------------------------------------------
                if(req.url == '/' || req.url == '/emd'){
                    axios.get("http://localhost:3000/exames?_sort=data")
                    .then(resp => {
                        var exames = resp.data 
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.examesListPage(exames, d))
                    })
                }
                // GET /emd/:id --------------------------------------------------------------
                else if(/\/emd\/[0-9a-zA-Z_]+$/.test(req.url)){
                    var idExame = req.url.split('/')[2]
                    axios.get('http://localhost:3000/exames/' + idExame)
                    .then(resp => {
                        var exame = resp.data
                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end(templates.examePage(exame, d))
                    })
                    .catch(erro => {
                        res.writeHead(505, {'Content-Type': 'text/html; charset=utf-8'})
                        res.write('<p>Não foi possível obter o registo...</p>')
                        res.write('<p>' + erro + '</p>')
                        res.end('<address><a href="/">Voltar</a></address>')
                    })
                }
                
                // GET ? -> Lancar um erro
                break
                
            default: 
                // Outros metodos nao sao suportados
        }
    }
})

examesServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



