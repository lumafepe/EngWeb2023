import json
import unicodedata
class Ligacao:
    def __init__(self,id,destino,distancia):
        self.id=id
        self.destino=destino
        self.distancia=distancia
class Cidade:
    def __init__(self,id,nome,populacao,descricao,distrito):
        self.id=id
        self.nome = nome
        self.populacao = populacao
        self.descricao = descricao
        self.distrito = distrito
        self.destinos = []
    def addDestino(self,ligacao:Ligacao):
        self.destinos.append(ligacao)

cidades={}
with open('mapa.json') as json_file:
    data = json.load(json_file)
    for cidade in data['cidades']:
        id=cidade['id']
        nome=cidade['nome']
        populacao=cidade['população']
        descricao=cidade['descrição']
        distrito=cidade['distrito']
        cidades[id]=Cidade(id,nome,populacao,descricao,distrito)
    for ligacao in data['ligações']:
        id=ligacao['id']
        origem=ligacao['origem']
        destino=ligacao['destino']
        distancia=ligacao['distância']
        cidades[origem].addDestino(Ligacao(id, cidades[destino], distancia))

#Generator for each city

for id,cidade in cidades.items():
    connections='\n                        '.join(f"<a href='http://localhost:7777/{conn.destino.id}' class='item'>{conn.destino.nome} {conn.distancia}Km</a>" for conn in cidade.destinos)
    pagina=f"""
    <!DOCTYPE html>
    <html lang="en">

        <head>
            <title>{cidade.nome}</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="../style.css" rel="stylesheet">
        </head>

        <body>
            <div class="centered">
                <div class="details">
                    <h3>{cidade.nome}</h3>
                    <p class='desc'>{cidade.descricao}</p>
                    <p class='ext'>População: {cidade.populacao}</p>
                    <p class='ext'>Distrito: {cidade.distrito}</p>
                        <div class='connections'>
                            {connections}
                        </div>
                </div>
            </div>
        </body>
    </html>
    """
    with open(f"generated/{id}.html","w") as file:
        file.write(pagina)

#Index generator
cidadesPorDistrito={}
for id,cidade in cidades.items():
    if cidade.distrito not in cidadesPorDistrito:
        cidadesPorDistrito[cidade.distrito]=[cidade]
    else:
        cidadesPorDistrito[cidade.distrito].append(cidade)
for l in cidadesPorDistrito.values():
    l.sort(key=lambda x: unicodedata.normalize('NFD',x.nome))
l=list(cidadesPorDistrito.items())
l.sort(key=lambda x: unicodedata.normalize('NFD',x[0]))


distritos=""
for distrito,lista_de_cidades in l:
    str_por_cidade= "\n".join(f"<a href='http://localhost:7777/{cidade.id}'>{cidade.nome}</a>" for cidade in lista_de_cidades)
    str_distrito=f"""
        <div class="dropdown">
            <button>{distrito}</button>
            <div class="dropdown-content">
                {str_por_cidade}
            </div>
        </div>
    """
    distritos+="\n"+str_distrito
    


pagina=f"""
    <!DOCTYPE html>
    <html lang="en">

        <head>
            <title>Index</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="style.css" rel="stylesheet">
        </head>

        <body>
            <div class="centered">
                <div class="detailsRow">
                    {distritos}
                </div>
            </div>
        </body>
    </html>
    """
with open(f"index.html","w") as file:
        file.write(pagina)
        
    