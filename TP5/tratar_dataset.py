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

id = 0  # Variável para gerar IDs únicos

for info in dataset["filmes"]:
    info["id"] = id  # Adiciona o campo "id" 
    id += 1  # Incrementa o ID para o próximo filme

    filmes.append(info)

dataset = {}
dataset["filmes"] = filmes

new_file_json("cinema_tratado.json", dataset)




