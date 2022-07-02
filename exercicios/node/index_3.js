const http =require('http')
const url = require('url')
//cria o objeto server
http.createServer(function(req,res){
     //escreve um cabeçalho e trata os caracteres especiais
     res.writeHead(200,{'content-Type':'text/html;charset=utf-8'})
     let infoUrl= req.url
     //let q=url.parse(infoUrl,true).query
     //let urlProp=url.parse(infoUrl,true)
     let urlProp=url.parse(infoUrl,true)
     let q = urlProp.query
     let rota=urlProp.pathname
     let queryString=urlProp.search
     let txtResult=`Título: ${q.titulo}- Ator: ${q.ator}`
     res.write(`<h1>Página: <b>${rota}</b></h1><h3>${queryString}</h3><p>Hello World Node Js - São Paulo,31 de Maio de 2022</p>`)
     res.end(txtResult)
}).listen(8080)
//exemplo : http//localhost:8080/?titulo=Missão Impossivel&ator=Tom Cruise

