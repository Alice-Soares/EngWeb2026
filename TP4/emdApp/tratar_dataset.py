import json

def open_json_file(filename):
    """Open and read a JSON file."""
    with open(filename, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data



# -------------------- Script principal --------------------
lista = []
dataset = open_json_file("emd.json")

for info in dataset:
    id = info.pop("_id", None)  # Remove o campo "id" se existir
    info["id"] = id  # Adiciona o campo "id" com o valor do campo "_id"

    # Expandir nome aninhado em campos planos
    nome = info.pop("nome", None)  # Remove o campo "nome" se existir
    if nome:
        info["primeiro_nome"] = nome["primeiro"]  # Adiciona o campo "primeiro_nome" com o valor do campo "nome.primeiro"
        info["ultimo_nome"] = nome["último"]  # Adiciona o campo "ultimo_nome" com o valor do campo "nome.último"
    
    lista.append(info)  

resultado = {}
resultado["exames"] = lista

with open("dataset_emd_tratado.json", 'w', encoding='utf-8') as file:
    json.dump(resultado, file, indent=2, ensure_ascii=False)