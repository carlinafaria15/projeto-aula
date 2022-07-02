const http =require('http')
const fs = require('fs')
//cria o objeto server
http.createServer(function(req,res){
    fs.readFile('template_1.html',function(err,data){
    
        if(err) throw err

     res.writeHead(200,{'content-Type':'text/html;charset=utf-8'})
     res.write(data)
     res.end()
    })
}).listen(8080)

