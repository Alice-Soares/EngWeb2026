import { pagina, link, card, lista, botaoVoltar, getAlunos, getCursos, getInstrumentos} from "./myUtil.js"

import axios from 'axios'
import http from 'http'


var myServer = http.createServer(async function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    switch(req.method){
        case "GET":

        // --- Página Principal
        if (req.url == "/"){
            var corpo = card("Dados da Escola de Música", `
                        <ul class="w3-ul w3-hoverable">
                            <li>${link("/alunos", "Lista de Alunos")}</li>
                            <li>${link("/cursos", "Lista de Cursos")}</li>
                            <li>${link("/instrumentos", "Lista de Instrumentos")}</li>
                        </ul>
                        `)
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(pagina("Escola de Música", corpo))

         
         }    // --- Página dos Alunos

         else if(req.url == "/alunos"){
                try{
                    var alunos = await getAlunos()
                    alunos.sort((a, b) => a.id - b.id) // Ordenar por ID
                    var linhas = alunos.map(a => `
                        <tr>
                            <td>${a.id}</td>
                            <td>${a.nome}</td>
                            <td>${a.dataNasc}</td>
                            <td>${a.curso}</td>
                            <td>${a.anoCurso}</td>
                            <td>${a.instrumento}</td>
                        </tr>

                        `).join("")

                    var corpo = card("Lista de Alunos", `
                        <table class="w3-table w3-striped w3-bordered w3-hoverable">
                            <tr class="w3-light-grey">
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Data de Nascimento</th>
                                <th>Curso</th>
                                <th>Ano do Curso</th>
                                <th>Instrumento</th>
                            </tr>
                            ${linhas}
                        </table>
                        ${botaoVoltar()}
                        `)
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.end(pagina("Alunos da Escola de Música", corpo))
                }
                catch(erro){
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.end(`<p>Erro ao carregar alunos: ${erro}</p>`)
                }
            }
            // --- Página dos Cursos
            else if(req.url == "/cursos"){
                try{
                    var cursos = await getCursos()
                    cursos.sort((a, b) => a.id - b.id) // Ordenar por ID
                    var linhas = cursos.map(c => `
                        <tr>
                            <td>${c.id}</td>
                            <td>${c.designacao}</td>
                            <td>${c.duracao}</td>
                            <td>${c.instrumento["#text"]}</td>
                        </tr>

                        `).join("")

                    var corpo = card("Lista de Cursos", `
                        <table class="w3-table w3-striped w3-bordered w3-hoverable">
                            <tr class="w3-light-grey">
                                <th>Id</th>
                                <th>Designação</th>
                                <th>Duração</th>
                                <th>Instrumento</th>
                            </tr>
                            ${linhas}
                        </table>
                        ${botaoVoltar()}
                        `)
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.end(pagina("Cursos da Escola de Música", corpo))
                }
                catch(erro){
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.end(`<p>Erro ao carregar cursos: ${erro}</p>`)
                }
            }
            // --- Página dos Instrumentos
             else if(req.url == "/instrumentos"){
                try{
                    var instrumentos = await getInstrumentos()
                    instrumentos.sort((a, b) => a.id - b.id) // Ordenar por ID
                    var linhas = instrumentos.map(c => `
                        <tr>
                            <td>${c.id}</td>
                            <td>${c["#text"]}</td>
                        </tr>

                        `).join("")

                    var corpo = card("Lista de Instrumentos", `
                        <table class="w3-table w3-striped w3-bordered w3-hoverable">
                            <tr class="w3-light-grey">
                                <th>Id</th>
                                <th>Instrumento</th>
                            </tr>
                            ${linhas}
                        </table>
                        ${botaoVoltar()}
                        `)
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.end(pagina("Instrumentos da Escola de Música", corpo))
                }
                catch(erro){
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.end(`<p>Erro ao carregar instrumentos: ${erro}</p>`)
                }
            }
            else{
                res.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8' })
                res.end(`<p>Rota não suportada: ${req.url}.</p>`)
            }
            break

        default: 
            res.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(`<p>Método não suportado: ${req.method}.</p>`)
    }
})

myServer.listen(25001)
console.log("Servidor à escuta na porta 25001...")