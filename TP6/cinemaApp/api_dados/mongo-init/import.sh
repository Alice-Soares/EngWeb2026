#!/bin/bash
# Importa os filmes
mongoimport --host localhost --db cinema --collection filmes --type json --file /docker-entrypoint-initdb.d/filmes.json --jsonArray

# Importa os atores
mongoimport --host localhost --db cinema --collection atores --type json --file /docker-entrypoint-initdb.d/atores.json --jsonArray

# Importa os géneros
mongoimport --host localhost --db cinema --collection generos --type json --file /docker-entrypoint-initdb.d/generos.json --jsonArray

# Cria os índices de texto para pesquisa
mongosh cinema --eval 'db.filmes.createIndex({title: "text", cast: "text", genres: "text"})'
mongosh cinema --eval 'db.atores.createIndex({nome: "text", filmes: "text"})'
mongosh cinema --eval 'db.generos.createIndex({nome: "text", filmes: "text"})'
