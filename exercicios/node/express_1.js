const express =require('express')
const app=express()
const port=3000

app.use(express.static('node'))
app.use("/imagens",express.static("imagens"))

app.get("/",(req,res)=>{
  // res.writeHead(200,{'content-Type':'text/html;charset=utf-8'})
  // res.end('<h1>Página Home</h1>') UTILIZAR APENAS QUANDO CRIAR DIRETAMENTO DAQUI !!
   res.sendFile(`${__dirname}/template_1.html`)
})
app.get("/contato",(req,res)=>{
    res.sendFile(`${__dirname}/template_1_contato.html`)
 })
 app.get("/sobre",(req,res)=>{
    res.sendFile(`${__dirname}/template_1_sobre.html`)
 })
app.listen(port,() => console.log(`servidor rodando na porta ${port} - ${__dirname}`))