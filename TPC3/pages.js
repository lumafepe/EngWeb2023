exports.genMainPage = function(timestamp){
    var pagHTML =`
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Paginas</title>
        <link rel="stylesheet" href="w3.css">
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-yellow">
                <h1>Paginas</h1>
            </header>
            <div class="w3-container">
                <p><a href="/pessoas/">Pessoas</a></p>
                <p><a href="/pessoasSorted/">Pessoas Ordenadas por Nome</a></p>
                <p><a href="/distribuicaoSexo/">Distribuição por sexo </a></p>
                <p><a href="/distribuicaoDesporto/">Distribuição por desporto</a></p>
                <p><a href="/topProfissao/">Top 10 profições</a></p>
            </div>
            <footer class="w3-container w3-yellow">
                <address>Generated in EngWeb2023 ${timestamp}</address>
            </footer>
        </div>
    </body>
</DOCTYPE>`
    return pagHTML
}

exports.genPersonsList = function(pessoas,timestamp,title){
    var pagHTML =`
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <link rel="stylesheet" href="w3.css">
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-yellow">
                <h1>${title}</h1>
            </header>
            <div class="w3-container">
                <table class="w3-table-all w3-centered ">
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Sexo</th>
                        <th>Cidade</th>
                    </tr>`
    for(let p=0;p<pessoas.length;p++){
        pagHTML +=`
                    <tr>
                        <td><a href="/pessoas/${pessoas[p].id}/">${pessoas[p].id}</td>
                        <td>${pessoas[p].nome}</td>
                        <td>${pessoas[p].idade}</td>
                        <td>${pessoas[p].sexo}</td>
                        <td>${pessoas[p].morada.cidade}</td>
                    </tr>
                    `
    }
    pagHTML+=`
                </table>
            </div>
            <footer class="w3-container w3-yellow">
                <address>Generated in EngWeb2023 ${timestamp}</address>
            </footer>
        </div>
    </body>
</DOCTYPE>`
    return pagHTML
}
exports.genPage = function(pessoa,timestamp){
    var pagHTML =`
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>About People...</title>
        <link rel="stylesheet" href="w3.css">
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-yellow">
                <h1>Pessoa</h1>
            </header>
            <div class="w3-container">
                <table class="w3-table-all w3-centered ">
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Sexo</th>
                        <th>Cidade</th>
                    </tr>`
        pagHTML +=`
                    <tr>
                        <td>${pessoa.id}</td>
                        <td>${pessoa.nome}</td>
                        <td>${pessoa.idade}</td>
                        <td>${pessoa.sexo}</td>
                        <td>${pessoa.morada.cidade}</td>
                    </tr>
                    `
    pagHTML+=`
                </table>
            </div>
            <footer class="w3-container w3-yellow">
                <address>Generated in EngWeb2023 ${timestamp}</address>
            </footer>
        </div>
    </body>
</DOCTYPE>`
    return pagHTML
}
//The distribuition is a list with dicts var dict = {"key":,"link":,"value"}
exports.statsPage = function(titulo,backUrl,distribuition,timestamp){
    let pagHTML =`
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>${titulo}</title>
        <link rel="stylesheet" href="w3.css">
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-yellow">
                <h1>${titulo}</h1>
            </header>
            <a href="${backUrl}">Voltar</a>
            <div class="w3-container">
            `
    for (let i=0;i<distribuition.length;i++){
        pagHTML +=`
                    <p>
                        <a href="${distribuition[i]["link"]}">${distribuition[i]["key"]}</a>: ${distribuition[i]["value"]}
                    </p>
                    `
            }
    pagHTML+=`
            </div>
            <footer class="w3-container w3-yellow">
                <address>Generated in EngWeb2023 ${timestamp}</address>
            </footer>
        </div>
    </body>
</DOCTYPE>`
    return pagHTML
}


exports.genPage = function(pessoa,timestamp){
    var pagHTML =`
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>About People...</title>
        <link rel="stylesheet" href="w3.css">
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-yellow">
                <h1>Pessoa</h1>
            </header>
            <div class="w3-container">
                <table class="w3-table-all w3-centered ">
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Sexo</th>
                        <th>Cidade</th>
                    </tr>`
        pagHTML +=`
                    <tr>
                        <td>${pessoa.id}</td>
                        <td>${pessoa.nome}</td>
                        <td>${pessoa.idade}</td>
                        <td>${pessoa.sexo}</td>
                        <td>${pessoa.morada.cidade}</td>
                    </tr>
                    `
    pagHTML+=`
                </table>
            </div>
            <footer class="w3-container w3-yellow">
                <address>Generated in EngWeb2023 ${timestamp}</address>
            </footer>
        </div>
    </body>
</DOCTYPE>`
    return pagHTML
}
//The distribuition is a list with dicts var dict = {"key":,"link":,"value"}
exports.personPage = function(person,timestamp){
    let pagHTML =`
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Pessoa</title>
        <link rel="stylesheet" href="w3.css">
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-yellow">
                <h1>Pessoa</h1>
            </header>
            <div class="w3-container">
            <table class="w3-table w3-bordered w3-centered">
                <tr>
                  <th>Nome:</th>
                  <td>${person.nome}</td>
                </tr>
                <tr>
                  <th>Idade:</th>
                  <td>${person.idade}</td>
                </tr>
                <tr>
                  <th>Sexo:</th>
                  <td>${person.sexo}</td>
                </tr>
                <tr>
                  <th>Morada:</th>
                  <td>${person.morada.cidade},${person.morada.distrito}</td>
                </tr>
                <tr>
                  <th>BI:</th>
                  <td>${person.BI}</td>
                </tr>
                <tr>
                  <th>Profissão:</th>
                  <td>${person.profissao}</td>
                </tr>
                <tr>
                  <th>Partido Politico:</th>
                  <td>${person.partido_politico.party_abbr}-${person.partido_politico.party_name}</td>
                </tr>
                <tr>
                  <th>Religiao:</th>
                  <td>${person.religiao}</td>
                </tr>
                <tr>
                  <th>desportos:</th>
                  <td>
                  `
    for (let i=0;i<person.desportos.length;i++)
        pagHTML +=`<p>${person.desportos[i]}</p>`
    pagHTML +=`
                  </td>
                </tr>
                <tr>
                  <th>Animais:</th>
                  <td>
                  `
    for (let i=0;i<person.animais.length;i++)
        pagHTML +=`<p>${person.animais[i]}</p>`
    pagHTML +=`
                  </td>
                </tr>
                <tr>
                  <th>Figuras Publicas:</th>
                  <td>
                  `
    for (let i=0;i<person.figura_publica_pt.length;i++)
        pagHTML +=`<p>${person.figura_publica_pt[i]}</p>`
    pagHTML +=`
                  </td>
                <tr>
                  <th>Marca de Carro:</th>
                  <td>${person.marca_carro}</td>
                </tr>
                <tr>
                  <th>Destinos Favoritos:</th>
                  <td>
                  `
    for (let i=0;i<person.destinos_favoritos.length;i++)
        pagHTML +=`<p>${person.destinos_favoritos[i]}</p>`
    pagHTML +=`
                  </td>
                <tr>
                <tr>
                  <th>Id:</th>
                  <td>${person.id}</td>
                </tr>
            </table>
            <h3>Atributos</h3>
            <table class="w3-table w3-bordered w3-centered">
                <tr>
                    <th>fumador :</th>
                    <td>${person.atributos.fumador?"✅":"❌"}</td>
                </tr>
                <tr>
                    <th>gosta_cinema :</th>
                    <td>${person.atributos.gosta_cinema?"✅":"❌"}</td>
                </tr>
                <tr>
                    <th>gosta_viajar :</th>
                    <td>${person.atributos.gosta_viajar?"✅":"❌"}</td>
                </tr>
                <tr>
                    <th>acorda_cedo :</th>
                    <td>${person.atributos.acorda_cedo?"✅":"❌"}</td>
                </tr>
                <tr>
                    <th>gosta_ler :</th>
                    <td>${person.atributos.gosta_ler?"✅":"❌"}</td>
                </tr>
                <tr>
                    <th>gosta_musica :</th>
                    <td>${person.atributos.gosta_musica?"✅":"❌"}</td>
                </tr>
                <tr>
                    <th>gosta_comer :</th>
                    <td>${person.atributos.gosta_comer?"✅":"❌"}</td>
                </tr>
                <tr>
                    <th>gosta_animais_estimacao :</th>
                    <td>${person.atributos.gosta_animais_estimacao?"✅":"❌"}</td>
                </tr>
                <tr>
                    <th>gosta_dancar :</th>
                    <td>${person.atributos.gosta_dancar?"✅":"❌"}</td>
                </tr>
                <tr>
                    <th>comida_favorita :</th>
                    <td>${person.atributos.comida_favorita}</td>
                </tr>
            </table>
            </div>
            <footer class="w3-container w3-yellow">
                <address>Generated in EngWeb2023 ${timestamp}</address>
            </footer>
        </div>
    </body>
</DOCTYPE>`
    return pagHTML
}


/*
            "atributos": {
                "fumador": true,
                "gosta_cinema": false,
                "gosta_viajar": false,
                "acorda_cedo": false,
                "gosta_ler": false,
                "gosta_musica": true,
                "gosta_comer": false,
                "gosta_animais_estimacao": true,
                "gosta_dancar": false,
            },
            "id": "p0"
        },
*/