import json

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

reparacoes = []
dataset = open_json_file("dataset_reparacoes.json")

id = 1

for info in dataset["reparacoes"]:
    info["id"] = id
    id += 1
    reparacoes.append(info)

new_file_json("dataset_reparacoes_tratado.json", reparacoes)
