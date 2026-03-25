#!/bin/bash
# Importa o JSON para a base de dados autoRepair, coleção repairs
mongoimport --host localhost --db autoRepair --collection repairs --file /docker-entrypoint-initdb.d/dataset_reparacoes_tratado.json --jsonArray

# Cria o índice de texto necessário para o parâmetro ?q= funcionar
mongosh autoRepair --eval 'db.repairs.createIndex({nome: "text", "viatura.marca": "text", "viatura.modelo": "text", "intervencoes.nome": "text", "intervencoes.descricao": "text"})'
