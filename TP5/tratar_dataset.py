import json, os, shutil

def open_json_file(filename):
    """Abre e lê um ficheiro JSON."""
    with open(filename, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data


def new_file_json(filename, content):
    """Cria um novo ficheiro e escreve o conteúdo nele."""
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(content, file, indent=2, ensure_ascii=False)

# -------------------- Script principal --------------------

filmes = []  # Lista para armazenar os filmes tratados
dataset = open_json_file("cinema.json")
atores = {} # Dicionário para armazenar os atores e os filmes em que atuaram
generos = {} # Dicionário para armazenar os gêneros e os filmes associados a cada gênero

idFilme = 0  # Variável para gerar IDs únicos
idAtor = 0   # Variável para gerar IDs únicos para atores
idGenero = 0 # Variável para gerar IDs únicos para gêneros

for info in dataset["filmes"]:
    info["id"] = idFilme  # Adiciona o campo "id" 
    idFilme += 1  # Incrementa o ID para o próximo filme

    filmes.append(info)

    # Processar atores
    for ator in info["cast"]:
        if ator not in atores:
            atores[ator] = []
        atores[ator].append(info["title"])  # Adiciona o filme à lista de filmes do ator

    # Processar gêneros
    for genero in info["genres"]:
        if genero not in generos:
            generos[genero] = []
        generos[genero].append(info["title"])  # Adiciona o filme à lista de filmes do gênero

for ator, filmes_ator in atores.items():
    atores[ator] = {
        "id": idAtor,  # Atribui um ID único ao ator
        "nome": ator,  # Nome do ator
        "filmes": filmes_ator  # Lista de filmes em que o ator atuou
    }
    idAtor += 1  # Incrementa o ID para o próximo ator

atores = list(atores.values())  # Converte o dicionário de atores para uma lista de dicionários

# Processar gêneros
for genero, filmes_genero in generos.items():
    generos[genero] = {
        "id": idGenero,  # Atribui um ID único ao gênero
        "nome": genero,  # Nome do gênero
        "filmes": filmes_genero  # Lista de filmes associados ao gênero
    }
    idGenero += 1  # Incrementa o ID para o próximo gênero

generos = list(generos.values())  # Converte o dicionário de gêneros para uma lista de dicionários

dataset = {}
dataset["filmes"] = filmes
dataset["atores"] = atores
dataset["generos"] = generos


new_file_json("cinema_tratado.json", dataset)




