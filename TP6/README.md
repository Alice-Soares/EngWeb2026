# TP6

**Data:** 11/03/2026
**UC:** Engenharia Web

## Autor 
- **Id:** A106804
- **Nome:** Alice Isabel Faria Soares

![](../imagens/foto.jpeg)


## Resumo do trabalho 

Foi desenvolvida uma orquestração de serviços para implementar uma aplicação web sobre cinema, que consistiu em:

- Análise e tratamento do dataset [cinema.json](https://epl.di.uminho.pt/~jcr/AULAS/EngWeb2026/aulas/semana5/cinema.json);

- Carregamento do dataset no MongoDB 

- Criação de uma API de dados minimalista com Express e Mongoose que oferece:
  - Rotas GET para listar e pesquisar filmes, atores e géneros
  - Suporte para Full-Text Search (FTS) via parâmetro `?q=`
  - Projeção de campos via parâmetro `?_select=`
  - Ordenação via parâmetros `?_sort=` e `?_order=`
  - Rotas para visualizar detalhes individuais por ID
  
- Desenvolvimento de um servidor aplicacional Express capaz de satisfazer as seguintes rotas:

  1. `GET /filmes` – tabela com listagem de filmes, apresentando id, título, ano, número de atores no elenco e número de géneros, com possibilidade de clicar numa linha para ir ao detalhe;
  2. `GET /filmes/:id` – página detalhada do filme com toda a informação (título, ano, géneros, cast);
  3. `GET /atores` – tabela com listagem de atores, apresentando id, nome e número de filmes em que participaram;
  4. `GET /atores/:id` – página detalhada do ator com nome e lista de filmes em que participou;
  5. `GET /generos` – tabela com listagem de géneros, apresentando id, designação e número de filmes associados ao género;
  6. `GET /generos/:id` – página detalhada do género com designação e lista de filmes do género.

- Utilização de Containers Docker, criando 3 Dockerfiles separados: um para MongoDB (com inicialização automática), um para a API e outro para a interface web. Assim, cada serviço isolado no seu próprio container com dependências e configurações específicas

- Orquestração com Docker Compose.

## Lista de resultados 

- api_dados/ - pasta com conteúdo referente á API de dados que utiliza o MongoDB

  - [api_dados/tratar_dataset.py](cinemaApp/api_dados/tratar_dataset.py) – script Python para tratamento do dataset original, que lê `cinema.json` e gera 3 ficheiros JSON separados: `filmes.json`, `atores.json`, `generos.json`
  
    - [api_dados/filmes.json](cinemaApp/api_dados/filmes.json) – dataset de filmes com campos: title, year, cast, genres, id

    - [api_dados/atores.json](cinemaApp/api_dados/atores.json) – dataset de atores com campos: id, nome, filmes

    - [api_dados/generos.json](cinemaApp/api_dados/generos.json) – dataset de géneros com campos: id, nome, filmes


  - [api_dados/myServer_sel_proj.js](cinemaApp/api_dados/myServer_sel_proj.js) – servidor da API minimalista com rotas GET para `/filmes`, `/filmes/:id`, `/atores`, `/atores/:id`, `/generos`, `/generos/:id` e suporte para FTS, projeção de campos e ordenação customizável, Utiliza uma função auxiliar `processarQuery()` para reutilização de lógica de pesquisa, ordenação e projeção
  
  - [api_dados/package.json](cinemaApp/api_dados/package.json) – dependências: express, mongoose

  - [api_dados/mongo-init/import.sh](cinemaApp/api_dados/mongo-init/import.sh) – script bash que importa os datasets JSON nas respetivas coleções e cria índices de texto nos campos de pesquisa

  - [api_dados/Dockerfile.mongo](cinemaApp/api_dados/Dockerfile.mongo) – Dockerfile para o serviço MongoDB com:
    - Imagem base: mongo:latest
    - Cópia do script de inicialização e datasets
    - Execução automática do import.sh ao iniciar o container

  - [api_dados/Dockerfile](cinemaApp/api_dados/Dockerfile) – Dockerfile para a API de dados com:
    - Imagem base: node:22
    - Instalação de dependências npm
    - Exposição da porta 7789
    - Comando para iniciar o servidor


- [interface/](cinemaApp/interface/) – aplicação Express para a interface web:
  
  - [interface/app.js](cinemaApp/interface/app.js) – servidor de interface com as rotas GET para as 6 páginas de visualização e integração com a API via axios

  - [interface/package.json](cinemaApp/interface/package.json) – dependências: express, axios, pug

  - [interface/views/](cinemaApp/interface/views/) – templates Pug para renderização das páginas:
    - [layout.pug](cinemaApp/interface/views/layout.pug) – template base com estrutura comum
    - [index.pug](cinemaApp/interface/views/index.pug) – tabela de filmes
    - [filme.pug](cinemaApp/interface/views/filme.pug) – detalhe de filme
    - [atores.pug](cinemaApp/interface/views/atores.pug) – tabela de atores
    - [ator.pug](cinemaApp/interface/views/ator.pug) – detalhe de ator
    - [generos.pug](cinemaApp/interface/views/generos.pug) – tabela de géneros
    - [genero.pug](cinemaApp/interface/views/genero.pug) – detalhe de género

  - [interface/Dockerfile.interface](cinemaApp/interface/Dockerfile.interface) – Dockerfile para o serviço de interface

  - [interface/public/](cinemaApp/interface/public/) – ficheiros estáticos (CSS, imagens)

- [docker-compose.yml](cinemaApp/docker-compose.yml) – ficheiro de orquestração que define:
  - **mongodb** (serviço baseado em Dockerfile.mongo):
    - Container name: mongodb_cinema
    - Sem ports expostas (comunicação interna via network)
    - Volume para persistência de dados
  
  - **api** (serviço baseado em Dockerfile):
    - Container name: api_dados
    - Variável de ambiente MONGO_URL apontando para o serviço mongodb
    - Depends_on: mongodb (garante que o DB inicia primeiro)
    - Comunica com mongodb através da rede docker-cinema-network
  
  - **interface** (serviço baseado em Dockerfile.interface):
    - Container name: interface_web
    - Port 7790:7790 (exposta para acesso externo)
    - Variáveis de ambiente com URLs dos serviços internos
    - Depends_on: api
    - Comunica com a API através da rede docker-cinema-network

### Executar a Aplicação

É necessário executar o script de tratamento do dataset antes de executar a aplicação.

```bash
cd cinemaApp

# Iniciar todos os serviços
docker-compose up -d --build

# Ver status dos containers
docker-compose ps

# Ver logs
docker-compose logs -f

# Parar todos os serviços
docker-compose down
```

Aceder à aplicação em: **http://localhost:7790/filmes**

