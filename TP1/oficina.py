import json, os, shutil


def open_json_file(filename):
    """Abre e lê um ficheiro JSON."""
    with open(filename, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data

def mk_dir(relative_path):
    """Cria um diretório se não existir.
    Se existir, remove-o e cria um novo.
    """
    if not os.path.exists(relative_path):
        os.mkdir(relative_path)
    else: 
        shutil.rmtree(relative_path)
        os.mkdir(relative_path)

def new_file(filename, content):
    """Cria um novo ficheiro e escreve o conteúdo nele."""
    with open(filename, 'w', encoding='utf-8') as file:
        file.write(content)


dados = open_json_file("dataset_reparacoes.json")
mk_dir("output")
mk_dir("output/intervencoes")
mk_dir("output/reparacoes")





#-------------------- Script principal --------------------#

# Código - Nome e Descrição
intervencoes = {}
codigos_intervencao = []

linhas_reparacoes = ""

reparacoes = dados["reparacoes"]
reparacoes_ordenadas = sorted(reparacoes, key=lambda x: x["data"])


for reparacao in dados["reparacoes"]:

    for intervencao in reparacao["intervencoes"]:
        if intervencao["codigo"] not in intervencoes:
            codigos_intervencao.append(intervencao["codigo"])
            intervencoes[intervencao["codigo"]] = {
                "nome": intervencao["nome"],
                "descricao": intervencao["descricao"]
            }


#--------------------- Listagem e Páginas individuais das reparações  --------------------#


for reparacao in reparacoes_ordenadas:
        intervencoes_realizadas= ""
        linhas_reparacoes += f'''<tr> <td> <a href ="./{reparacao['nif']}_{reparacao['data']}.html">{reparacao["data"]} </a></td> <td>{reparacao["nif"]}</td> <td>{reparacao["nome"]}</td> <td>{reparacao["viatura"]["marca"]}</td> <td>{reparacao["viatura"]["modelo"]}</td> <td>{reparacao["nr_intervencoes"]}</td> </tr>\n '''
        for intervencao in reparacao["intervencoes"]:
            intervencoes_realizadas += f'''<p> <b> {intervencao["codigo"]} - {intervencao["nome"]} : </b>{intervencao["descricao"]} </p>\n'''
        html_reparacao = f'''
            <html>
                <head>
                    <title> Reparação de {reparacao["nome"]} </title>
                    <meta charset="utf-8"/>
                </head>
                <body>
                    <h1>Reparação de {reparacao["nome"]}</h1>
                    <h3> Dados do cliente </h3>
                    <table border="1">
                        <tr> <td>Data</td> <td>{reparacao["data"]}</td> </tr>
                        <tr> <td>NIF</td> <td>{reparacao["nif"]}</td> </tr>
                        <tr> <td>Nome</td> <td>{reparacao["nome"]}</td> </tr>
                    </table>
                    <h3> Dados da viatura </h3>
                    <table border="1">
                        <tr> <td>Marca</td> <td>{reparacao["viatura"]["marca"]}</td> </tr> 
                        <tr> <td>Modelo</td> <td>{reparacao["viatura"]["modelo"]}</td> </tr> 
                        <tr> <td>Matrícula</td> <td>{reparacao["viatura"]["matricula"]}</td> </tr>
                    </table>
                    <h2> Intervenções realizadas </h2>
                    <p> Número de intervenções: {reparacao["nr_intervencoes"]} </p>
                    {intervencoes_realizadas}

            '''
        new_file(f"./output/reparacoes/{reparacao['nif']}_{reparacao['data']}.html", html_reparacao)



html_lista_reparacoes = f'''

<html> 
    <head>
        <title> Lista de Reparações </title>
        <meta charset="utf-8"/>
    </head> 
    <body> 
        <h3>Lista de Reparações</h3>
        <table border = "1"> 
            <tr> <td>Data</td> <td>NIF</td> <td>Nome</td> <td>Marca</td> <td>Modelo</td> <td>Número de Intervenções</td> </tr>
            {linhas_reparacoes}
        </table>
    </body> 
</html>

'''

new_file("./output/reparacoes/lista_reparacoes.html", html_lista_reparacoes)

#--------------------- Listagem dos tipos de intervenção --------------------#

lista_intervencoes = ""

intervencoes_ordenadas = sorted(codigos_intervencao)


for codigo in intervencoes_ordenadas:
    item = intervencoes[codigo]
    lista_intervencoes += f'''
    <li><a href="{codigo}.html">{codigo}</a> - {item['nome']} : {item['descricao']}</li>\n
    
    '''

html_lista_inter = f'''
<html>
    <head>
        <title> Tipos de Intervenção </title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h3>Tipos de Intervenção</h3>
        <ul>
            {lista_intervencoes}
        </ul>
        <hr/>
            <adress>
                <a href="../index.html">Voltar ao índice</a>
            </adress>
    </body>
</html>


'''
new_file("./output/intervencoes/lista_intervencoes.html", html_lista_inter)



#-------------------- Paginas individuais Intervenção --------------------#

lista_reparacoes_de_intervencao = ""


for intervencao in intervencoes:

    html_intervencao = f'''
    <html>
        <head>
            <title> {intervencao} </title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h2>{intervencao}</h2>
            <table border="1">
                <tr> <td>Código</td> <td>{intervencao}</td> </tr>
                <tr> <td>Nome</td> <td>{intervencoes[intervencao]["nome"]}</td> </tr>
                <tr> <td>Descrição</td> <td>{intervencoes[intervencao]["descricao"]}</td> </tr>
            </table>
            <hr/>
            <h3>Reparações que incluem esta intervenção</h3>
            <ul>
                {lista_reparacoes_de_intervencao}
            </ul>
        <hr/>
            <adress>
                <a href="lista_intervencoes.html">Voltar à lista de intervenções</a>
                <a href="../index.html">Voltar ao índice</a>
            </adress>
        </body>
    </html> 

    '''
    new_file(f"./output/intervencoes/{intervencao}.html", html_intervencao)


# -------------------- Página Principal --------------------#


html = f'''
<html>
    <head>
        <title> Reparações oficina automóvel </title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h3>Lista de Dados consultáveis sobre as reparações</h3>
        <ul>
            <li><a href="intervencoes/lista_intervencoes.html">Tipos de Intervenção</a></li> 
            <li><a href="reparacoes/lista_reparacoes.html">Lista de Reparações</a></li>
            <li><a href="carros/lista_marcas_modelos.html">Marcas e modelos intervencionados</a></li>
        </ul>
    </body>
</html>

'''

new_file("./output/index.html", html)