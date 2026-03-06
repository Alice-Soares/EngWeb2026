# TP2

**Data:** 11/02/2026
**UC:** Engenharia Web

## Autor 
- **Id:** A106804
- **Nome:** Alice Isabel Faria Soares

![](../imagens/foto.jpeg)


## Resumo do trabalho 

O enunciado requeria três componentes principais:  

- um **json-server** a servir um dataset de reparações;  
- um **servidor aplicacional** para responder aos seguintes serviços:
  1.  `/reparacoes` - Tabela HTML com os dados das reparações; 
  2. `/intervencoes` - Tabela HTML com os diferentes tipos de intervenção, sem repetições e com o número de vezes que foram feitas;
  3. `/viaturas` - Tabela HTML com os dados dos tipos de viatura intervencionados e o número de vezes que cada modelo foi reparado.

## Lista de resultados 

- [tratar_dataset.py](tratar_dataset.py)  – script Python que lê o dataset original ([dataset_reparacoes.json](https://epl.di.uminho.pt/~jcr/AULAS/EngWeb2026/datasets/dataset_reparacoes.json)) e gera `dataset_reparacoes_tratado.json`, adaptado às necessidades do servidor.

-  [dataset_reparacoes_tratado.json](dataset_reparacoes_tratado.json) – ficheiro resultante do tratamento; usado para **executar o json-server** que disponibiliza a API em `http://localhost:3000` e fornece as rotas usadas pelo servidor aplicacional. 
  ```bash
  json-server --watch dataset_reparacoes_tratado.json
  ```

- [servidor_oficina.js](servidor_oficina.js) – servidor aplicacional HTTP que faz chamadas ao json-server e expõe três rotas respondendo com tabelas HTML:  
  - `/reparacoes` – todas as reparações, com data, nome, NIF, matrícula, marca, modelo e número de intervenções;  
  - `/intervencoes` – tipos de intervenção (código, nome, descrição, contagem);  
  - `/viaturas` – marcas e modelos intervencionados com número de reparações.  
