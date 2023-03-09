
var http = require('http')
var axios = require('axios')
var pages = require('./pages')

var url = require('url')
var fs = require('fs')

http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    switch (req.url) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            res.end(pages.genMainPage(d))
            break
        case '/pessoas/':
            axios.get('http://localhost:3000/pessoas/')
                .then(function (resp) {
                    var pessoas = resp.data
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.end(pages.genPersonsList(pessoas, d,"Pessoas"))
                })
                .catch(erro => {
                    console.log("Erro: " + erro)
                    res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.end("<p> Internal Server Error: " + erro + " </p>")
                })
            break;
        case '/pessoasSorted/':
            axios.get('http://localhost:3000/pessoas/?_sort=nome')
                .then(function (resp) {
                    var pessoas = resp.data
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.end(pages.genPersonsList(pessoas, d,"Pessoas ordenadas"))
                })
                .catch(erro => {
                    console.log("Erro: " + erro)
                    res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.end("<p> Internal Server Error: " + erro + " </p>")
                })
            break;
        case "/distribuicaoSexo/":
            axios.get('http://localhost:3000/pessoas/')
                .then(function (resp) {
                    let pessoas = resp.data
                    let count = {}
                    for (let i = 0; i < pessoas.length; i++) {
                        count[pessoas[i].sexo] = (typeof count[pessoas[i].sexo] === 'undefined') ? 1 : count[pessoas[i].sexo] + 1;
                    }
                    let objects = []
                    for (const [key, value] of Object.entries(count)) {
                        objects.push({
                            "key": key,
                            "value": value,
                            "link": '/pessoas/?sexo=' + key
                        })
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.end(pages.statsPage("Distribution by gender", req.url, objects, d))
                })
                .catch(erro => {
                    console.log("Erro: " + erro)
                    res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.end("<p> Internal Server Error: " + erro + " </p>")
                })
            break;
        case "/distribuicaoDesporto/":
            axios.get('http://localhost:3000/pessoas/')
                .then(function (resp) {
                    let pessoas = resp.data
                    let count = {}
                    for (let i = 0; i < pessoas.length; i++) {
                        for (let j = 0; i < pessoas[i].desportos.length; j++) {
                            count[pessoas[i].desportos[j]] = (typeof count[pessoas[i].desportos[j]] === 'undefined') ? 1 : count[pessoas[i].desportos[j]] + 1;
                        }
                    }
                    let objects = []
                    for (const [key, value] of Object.entries(count)) {
                        objects.push({
                            "key": key,
                            "value": value,
                            "link": '/pessoas/?desportos_contains=' + key
                        })
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.end(pages.statsPage("Distribution by sports", req.url, objects, d))
                })
                .catch(erro => {
                    console.log("Erro: " + erro)
                    res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.end("<p> Internal Server Error: " + erro + " </p>")
                })
            break;
        case "/topProfissao/":
            axios.get('http://localhost:3000/pessoas/')
                .then(function (resp) {
                    let pessoas = resp.data
                    let count = {}
                    for (let i = 0; i < pessoas.length; i++) {
                        count[pessoas[i].profissao] = (typeof count[pessoas[i].profissao] === 'undefined') ? 1 : count[pessoas[i].profissao] + 1;
                    }
                    let objects = []
                    for (const [key, value] of Object.entries(count)) {
                        objects.push({
                            "key": key,
                            "value": value,
                            "link": '/pessoas/?profissao=' + key
                        })
                    }
                    objects.sort(function (a, b) { return b.value - a.value });
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.end(pages.statsPage("Distribution by profission", req.url, objects.slice(0, 10), d))
                })
                .catch(erro => {
                    console.log("Erro: " + erro)
                    res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.end("<p> Internal Server Error: " + erro + " </p>")
                })
            break;
        default:
            console.log(req.url)
            if (req.url.match(/\/w3.css$/)) {
                fs.readFile("w3.css", (erro, dados) => {
                    if (erro) {
                        res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
                        res.end("<p> Erro: " + erro + " </p>")
                    }
                    else {
                        res.writeHead(200, { 'Content-Type': 'text/css' });
                        res.end(dados)
                    }
                })
                break
            }
            if (req.url.match(/\/pessoas\/p\d+\//)) {
                axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
                    .then(function (resp) {
                        var pessoa = resp.data
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                        res.end(pages.personPage(pessoa, d))
                    })
                    .catch(erro => {
                        console.log("Erro: " + erro)
                        res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' })
                        res.end("<p> Internal Server Error: " + erro + " </p>")
                    })
                break;
            }
            if (req.url.match(/\/pessoas?/)) {
                axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
                    .then(function (resp) {
                        var pessoas = resp.data
                        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                        res.end(pages.genPersonsList(pessoas, d, "Pessoas"))
                    })
                    .catch(erro => {
                        console.log("Erro: " + erro)
                        res.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' })
                        res.end("<p> Internal Server Error: " + erro + " </p>")
                    })
                break
            }
            res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
            res.end("<p>Operação não suportada: " + req.url + "</p>")
            break;
    }
}).listen(7777)

console.log('Servidor à escuta na porta 7777')




/*
quando for localhost/ -> pagina web titulo e wtv...
    Lista de pessoas-hyperlink V
    lista de pessoas ordenadas -hyperlink V
    Distribuição por sexo - hyperlink numero por sexo com uma lista de cada sexo V
    cena para desporto
    Top 10 profições
    */