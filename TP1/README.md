# TP1

**Data:** 04/02/2026
**UC:** Engenharia Web

## Autor 
- **Id:** A106804
- **Nome:** Alice Isabel Faria Soares

![](../imagens/foto.jpeg)


## Resumo do trabalho 

Neste trabalho foi analisado o dataset [dataset_reparacoes.json](https://epl.di.uminho.pt/~jcr/AULAS/EngWeb2026/datasets/dataset_reparacoes.json), com informação sobre as intervenções realizadas numa oficina automóvel, e definida a estrutura de um website para exploração desses dados.

O website gerado inclui:
- **Página principal** com a lista de dados consultáveis;
- **Listagem de reparações** com: data, NIF, nome do cliente, marca, modelo e número de intervenções;
- **Listagem de tipos de intervenção** (ordenada alfabeticamente por código), com código, nome e descrição;
- **Listagem de marcas e modelos intervencionados** (ordenada alfabeticamente), com marca, modelo e número de reparações;
- **Página individual de reparação** com toda a informação associada a cada registo;
- **Página individual de tipo de intervenção** com os dados da intervenção e a lista de reparações onde ocorreu;
- **Página individual de marca/modelo** com os modelos intervencionados e respetivo número de reparações.

Para automatizar o processo, foi desenvolvido o script [oficina.py](oficina.py), que lê o dataset, organiza os dados necessários e gera automaticamente os ficheiros HTML que constituem o website na pasta [output](output/).

## Lista de resultados 

- [oficina.py](oficina.py) - script que gera os ficheiros html a partir do dataset.
  
- [output](output/) - pasta para onde são criados todos os ficheiros html do website.
  -  [index.html](output/index.html) - Página principal, com a lista de dados consultáveis.
  -  [output/reparacoes](output/reparacoes/) - Pasta com os ficheiros referentes a informação sobre reparações.
   
     -  [lista_reparacoes.html](output/reparacoes/lista_reparacoes.html) - Página com a listagem das reparações.
     -  Conjunto de páginas individuais com o formato **nif_data.html**, para cada reparação.
  
  - [output/intervencoes](output/intervencoes/) - Pasta com os ficheiros referentes a informação sobre intervenções.
   
     -  [lista_reparacoes.html](output/intervencoes/lista_intervencoes.html) - Página com a listagem dos tipos de intervencões.
     -  Conjunto de páginas individuais com o formato **codigoIntervencao.html**, para cada intervenção.
  - [output/carros](output/carros/) - Pasta com os ficheiros referentes a informações sobre marcas e modelos de carros intervencionados.
     -  [lista_marcas_modelos.html](output/carros/lista_marcas_modelos.html) - Página com a listagem das marcas e modelos.
     -  Conjunto de páginas individuais com o formato **marca.html**, para cada marca.

