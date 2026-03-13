# TP3

**Data:** 18/02/2026
**UC:** Engenharia Web

## Autor 
- **Id:** A106804
- **Nome:** Alice Isabel Faria Soares

![](../imagens/foto.jpeg)


## Resumo do trabalho 

O enunciado pedia dois componentes principais nesta entrega:

- **criação de um json-server** que servisse o dataset da escola de música;
- **desenvolvimento de um servidor aplicacional** capaz de satisfazer três rotas, cada uma devolvendo uma tabela HTML:
  1. `/alunos` – tabela com todos os alunos da escola, com os seus campos (id, nome, data de nascimento, curso, ano e instrumento);
  2. `/cursos` – tabela com todos os cursos, indicando id, designação, duração e instrumento associado;
  3. `/instrumentos` – tabela com todos os instrumentos usados na escola, com id e nome.

Os dois servidores correm em portas distintas: o json-server expõe os dados originais em `http://localhost:3000` e o servidor aplicacional usa esse serviço como back‑end, transformando o JSON em HTML para o utilizador.

## Lista de resultados 

- [db.json](https://epl.di.uminho.pt/~jcr/AULAS/EngWeb2026/datasets/db.json) – ficheiro com o dataset completo da escola de música (alunos, cursos e instrumentos); usado para iniciar o **json-server**:
  ```bash
  json-server --watch db.json 
  ```

- [servidor_musica_api.js](servidor_musica_api.js) – servidor intermédio (porta `25000`) que faz pedidos HTTP ao json-server e retorna os mesmos dados em formato JSON. As rotas implementadas são `/alunos`, `/cursos` e `/instrumentos`.

- [servidor_musica_app.js](servidor_musica_app.js) – servidor aplicacional (porta `25001`) que produz páginas HTML. Para cada rota solicitada (`/alunos`, `/cursos`, `/instrumentos`) carrega os dados via `axios` (através de `myUtil.js`), gera tabelas e envia a página ao cliente.

- [myUtil.js](myUtil.js) – utilitários partilhados pelas aplicações, incluindo templates HTML (`pagina`, `card`, etc.) e funções para obter dados dos serviços (`getAlunos`, `getCursos`, `getInstrumentos`).


