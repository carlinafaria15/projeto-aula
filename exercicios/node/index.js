const http =require('http')

//cria o objeto server
http.createServer(function(req,res){
     res.write('Hello World Node Js')
     res.end()//finaliza a resposta
}).listen(8080)//habilita a porta 8080(http//localhost:8080)

// caminhos locais : file//home/nome-do-usuario/pastaX