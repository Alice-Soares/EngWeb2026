# TP5

**Data:** 04/03/2026
**UC:** Engenharia Web

## Autor 
- **Id:** A106804
- **Nome:** Alice Isabel Faria Soares

![](../imagens/foto.jpeg)


## Resumo do trabalho 

Foi desenvolvida uma aplicação web, usando o express, para gestão de informações sobre filmes, atores e géneros, que consistiu em:

- **criação de um json-server** que servisse o dataset de cinema;
- **desenvolvimento de um servidor aplicacional Express** capaz de satisfazer as seguintes rotas:

  1. `GET /` ou `GET /filmes` – tabela com listagem de filmes, apresentando id, título, ano, número de géneros e número de atores, com possibilidade de clicar numa linha para ir ao detalhe;
  2. `GET /filmes/:id` – página detalhada do filme com toda a informação (título, ano, géneros, cast);
  3. `GET /atores` – tabela com listagem de atores, apresentando id, nome e número de filmes em que participaram;
  4. `GET /atores/:id` – página detalhada do ator com nome e lista de filmes em que participou;
  5. `GET /generos` (extra) – tabela com listagem de géneros, apresentando id, nome e número de filmes do género;
  6. `GET /generos/:id` (extra) – página detalhada do género com nome e lista de filmes do género.

## Lista de resultados 

- [tratar_dataset.py](cinema/tratar_dataset.py) – script Python para tratamento do dataset original ( [cinema.json](https://epl.di.uminho.pt/~jcr/AULAS/EngWeb2026/aulas/semana5/cinema.json) ), para melhor servir os dados necessários.

- [cinema_tratado.json](cinema_tratado.json) – ficheiro resultante com o dataset tratado de filmes, atores e géneros, usado para iniciar o **json-server**:
  ```bash
  json-server --watch cinema_tratado.json
  ```

- [cinema/](cinema/) – pasta principal da aplicação Express com a seguinte estrutura: 
  
  - [cinema/package.json](cinema/package.json) – ficheiro de configuração npm com as dependências do projeto (express, axios, pug, etc.).

  - [cinema/app.js](cinema/app.js) – servidor aplicacional principal configurado com Express e Pug.

  - [cinema/routes/index.js](cinema/routes/index.js) – ficheiro com todas as rotas GET para visualização de filmes, atores e géneros, incluindo integração com o json-server via axios.

  - [cinema/public/](cinema/public/) – Pasta com o ficheiro CSS (w3.css) e imagens estáticas.

  - [cinema/views/](cinema/views/) – templates Pug para geração das páginas HTML:
    - [layout.pug](cinema/views/layout.pug) – template base com a estrutura comum a todas as páginas;
    - [index.pug](cinema/views/index.pug) – template para a página principal com tabela de filmes;
    - [filme.pug](cinema/views/filme.pug) – template para a página detalhada de um filme;
    - [atores.pug](cinema/views/atores.pug) – template para a página com listagem de atores;
    - [ator.pug](cinema/views/ator.pug) – template para a página detalhada de um ator;
    - [generos.pug](cinema/views/generos.pug) – template para a página com listagem de géneros;
    - [genero.pug](cinema/views/genero.pug) – template para a página detalhada de um género.

