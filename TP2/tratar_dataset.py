import json, os, shutil


def open_json_file(filename):
    """Abre e lê um ficheiro JSON."""
    with open(filename, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data

def mk_dir(relatintervencaoe_path):
    """Cria um diretório se não existir.
    Se existir, remove-o e cria um novo.
    """
    if not os.path.exists(relatintervencaoe_path):
        os.mkdir(relatintervencaoe_path)
    else: 
        shutil.rmtree(relatintervencaoe_path)
        os.mkdir(relatintervencaoe_path)

def new_file(filename, content):
    """Cria um novo ficheiro e escreve o conteúdo nele."""
    with open(filename, 'w', encoding='utf-8') as file:
        file.write(content)

input_path = "dataset_reparacoes.json"
output_path = "dataset_reparacoes_tratado.json"


dados = open_json_file(input_path)

reparacoes = dados.get("reparacoes", [])
# ordenar reparações por data descendente para que a mais recente apareça primeiro
reparacoes.sort(key=lambda r: r.get("data", ""), reverse=True)
codigos_intervencoes = {}

for reparacao in reparacoes:
    for intervencao in reparacao.get("intervencoes", []):
        codigo = intervencao.get("codigo")
        if not codigo:
            continue
        if codigo not in codigos_intervencoes:
            codigos_intervencoes[codigo] = {
                "codigo": codigo,
                "nome": intervencao.get("nome"),
                "descricao": intervencao.get("descricao"),
                "nr_intervencoes": 0,
            }
        codigos_intervencoes[codigo]["nr_intervencoes"] += 1

intervencoes = list(codigos_intervencoes.values())
intervencoes.sort(key=lambda x: x.get("codigo", ""))

# construir a lista de viaturas organizada por marca -> modelos
marcas = {}
for reparacao in reparacoes:
    viatura = reparacao.get("viatura", {})
    marca = viatura.get("marca")
    modelo = viatura.get("modelo")
    if not marca or not modelo:
        continue
    if marca not in marcas:
        marcas[marca] = {}
    if modelo not in marcas[marca]:
        marcas[marca][modelo] = 0
    marcas[marca][modelo] += 1

viaturas = []
# ordenar marcas alfabeticamente
for marca in sorted(marcas.keys()):
    modelos = marcas[marca]
    # criar lista de modelos ordenada
    lista_modelos = []
    for modelo in sorted(modelos.keys()):
        nr = modelos[modelo]
        lista_modelos.append({"modelo": modelo, "nr_intervencoes": nr})
    viaturas.append({"marca": marca, "modelos": lista_modelos})

tratado = {"reparacoes": reparacoes, "intervencoes": intervencoes, "viaturas": viaturas}


with open(output_path, "w", encoding="utf-8") as f:
    json.dump(tratado, f, indent=2, ensure_ascii=False)
print(f"Dataset tratado escrito em {output_path}")

