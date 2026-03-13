# TP4

**Data:** 25/02/2026
**UC:** Engenharia Web

## Autor 
- **Id:** A106804
- **Nome:** Alice Isabel Faria Soares

![](../imagens/foto.jpeg)


## Resumo do trabalho 

Foi desenvolvido uma aplicação web para registos de EMD (Exames Médicos Desportivos) que consistia em:

- **criação de um json-server** que servisse o dataset [emd.json](https://epl.di.uminho.pt/~jcr/AULAS/EngWeb2026/aulas/semana4/emd.json);
- **desenvolvimento de um servidor aplicacional** capaz de satisfazer as seguintes rotas:

  1. `/emd` ou `/` – tabela com todos os EMD, apresentando nome do atleta, data, modalidade e resultado, com botões para ordenar por data (decrescente) e por nome (crescente), e possibilidade de clicar numa linha para ir ao detalhe;
  2. `/emd/:id` – card com toda a informação do registo selecionado, com botão "Voltar" no rodapé.
  3. `GET /emd/registo` – formulário para recolha dos dados de um novo EMD;
  4. `GET /emd/editar/:id` – formulário para edição de um registo existente;
  5. `GET /emd/apagar/:id` – apaga o registo selecionado e redireciona para a página principal;
  6. `POST /emd` – insere o novo registo na base de dados e redireciona para a página principal;
  7. `POST /emd/:id` – altera o registo existente na base de dados e redireciona para a página principal;
  8. `GET /emd/stats` – página com as distribuições dos registos por sexo, modalidade, clube, resultado e federado.

## Lista de resultados 

- [tratar_dataset.py](emdApp/tratar_dataset.py) - script para limpeza e tratamento do dataset original.

- [emdApp/dataset_emd_tratado.json](emdApp/dataset_emd_tratado.json) – ficheiro com o dataset tratado dos EMD, após uso do script; usado para iniciar o **json-server**:
  ```bash
  json-server --watch dataset_emd_tratado.json
  ```

- [emdApp/exames_server.js](emdApp/exames_server.js) – servidor aplicacional principal que implementa todas as rotas (GET e POST) para visualização, criação, edição, eliminação e estatísticas dos EMD.

- [emdApp/templates.js](emdApp/templates.js) – utilitários com templates para gerar a interface da aplicação.

- [emdApp/static.js](emdApp/static.js) – servidor de ficheiros estáticos (CSS, JavaScript, imagens).

- [emdApp/public/](emdApp/public/) – Pasta com o ficheiro CSS com estilos para a interface da aplicação e com imagens (como o favicon).

- [emdApp/views/](emdApp/views/) – templates Pug para geração das páginas HTML:
  - [layout.pug](emdApp/views/layout.pug) – template base com a estrutura comum a todas as páginas;
  - [index.pug](emdApp/views/index.pug) – template para a página principal com a tabela de EMD;
  - [exame.pug](emdApp/views/exame.pug) – template para a página detalhada de um EMD;
  - [form.pug](emdApp/views/form.pug) – template para o formulário de criação e edição de EMD;
  - [stats.pug](emdApp/views/stats.pug) – template para a página de estatísticas.



