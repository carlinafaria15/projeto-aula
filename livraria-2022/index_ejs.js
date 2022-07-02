(async ()=>{
const express=require('express')
const app=express()
const db=require("./db.js")
const bodyParser=require("body-parser")
const session=require("express-session")
const mysqlSession = require("express-mysql-session")(session)
const url =require("url")

const port=3000
//config para as variaveis post
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set("view engine","ejs")
app.use(express.static('livraria-2022'))
app.use("/books",express.static("books"))
app.use("/imgs",express.static("imgs"))
app.use("/css",express.static("css"))
app.use("/js",express.static("js"))
app.use("/adm",express.static("adm"))

const options ={
  expiration: 10800000,
  createDatabaseTable: true,
  schema: {
      tableName: 'session_tbl',
      columnNames: {
          session_id: 'session_id',
          expires: 'expires',
          data: 'data'
      }
  }  
}


await db.makeSession(app,options,session)

function checkFirst(req, res, next) {
  if (!req.session.userInfo) {
    res.redirect('/promocoes');
  } else {
    next();
  }
}

function checkAuth(req, res, next) {
  if (!req.session.userInfo) {
    res.send('Você não está autorizado para acessar esta página');
  } else {
    next();
  }
}

var userInfo=''
app.locals.info = {
    user:userInfo
}
app.locals.titulo="Livraria 2022 - Área Administrativa"
app.locals.idProd=5


const consulta = await db.selectFilmes()
const consultaLivro = await db.selectLivros()
const consultaCarrinho = await db.selectCarrinho()

//console.log(consulta[0])
//console.log(consultaLivro[0])
app.get("/login",async(req,res)=>{
  res.render("login",{
    titulo:'Entrar - Livros Online'
  })
})

app.post("/login", async (req,res)=>{
  const {email,senha} = req.body
  const logado = await db.selectUsers(email,senha)
  if(logado != ""){
  req.session.userInfo = email
  userInfo = req.session.userInfo
  req.app.locals.info.user= userInfo
  res.redirect('/')
  } else {res.send("<h2>Login ou senha não conferem</h2>")}
})
app.use('/logout', function (req, res) {
  req.app.locals.info = {}
  req.session.destroy()
  res.clearCookie('connect.sid', { path: '/' });
  res.redirect("/login") 

})
app.get("/",checkFirst,(req,res)=>{
    res.render(`index`,{
      titulo:" Conheça os nossos Livros",
      promo:" Todos os livros com 10% de desconto !",
      livro:consulta,
    galeria:consultaLivro})
})


app.get("/promocoes",async(req,res)=>{
  const consultaPromo=await db.selectPromo()
  res.render(`promocoes`,{
    titulo:" Conheça os nossos Livros",
    promo:" Todos os livros com 10% de desconto !",
    livro:consulta,
  galeria:consultaPromo})
})
app.get("/single-produto",async(req,res)=>{
  let infoUrl=req.url
  let urlProp= url.parse(infoUrl,true)
  let q =urlProp.query
 const consultaSingle =await db.selectSingle(q.id)
 const consultaInit =await db.selectSingle(4)
  res.render(`single-produto`,{
    titulo:" Conheça os nossos Livros",
    promo:" Todos os livros com 10% de desconto !",
    livro:consulta,
  galeria:consultaSingle,
  inicio:consultaInit
})
})
app.get("/contato",async(req,res)=>{
  let infoUrl=req.url
  let urlProp= url.parse(infoUrl,true)
  let q =urlProp.query
 const consultaSingle =await db.selectSingle(q.id)
 const consultaInit =await db.selectSingle(4)
  res.render(`contato`,{
    titulo:" Conheça os nossos Livros",
    promo:" Todos os livros com 10% de desconto !",
    livro:consulta,
  galeria:consultaInit
})
})
app.get("/cadastro",async(req,res)=>{
  let infoUrl=req.url
  let urlProp= url.parse(infoUrl,true)
  let q =urlProp.query
 const consultaInit =await db.selectSingle(4)
  res.render(`cadastro`,{
    titulo:" Conheça os nossos Livros",
    promo:" Todos os livros com 10% de desconto !",
    livro:consulta,
  galeria:consultaInit
})
})

app.get("/carrinho",checkAuth,async(req,res)=>{
  const consultaCarrinho =
  await db.selectCarrinho()
  res.render(`carrinho`,{
      titulo:" Conheça os nossos Livros",
    promo:" Todos os livros com 10% de desconto !",
    livro:consulta,
    carrinho:consultaCarrinho})
})
app.post("/carrinho",async(req,res)=>{
  const info=req.body
  await db.insertCarrinho({
    produto:info.produto,
    qtd:info.qtd,
    valor:info.valor,
    livros_id:info.livros_id
  })
  res.send(req.body)

})
app.post("/delete-carrinho",async(req,res)=>{
  const info=req.body
  await db.deleteCarrinho(info.id)
  res.send(info)

})



app.post("/contato",async(req,res)=>{
  const info=req.body
   await db.insertContato({
     nome:info.cad_nome,
  sobrenome:info.cad_sobrenome,
  email:info.cad_email,
  mensagem:info.cad_mensagem})
  res.redirect("/promocoes")
})
app.post("/cadastro",async(req,res)=>{
  const info=req.body
   await db.insertUsuarios({
     nome:info.cad_nome,
  email:info.cad_email,
  telefone:info.cad_telefone,
  senha:info.cad_senha,
conf_senha:info.conf_senha})
  res.redirect("/")
})
// area admin ++++++++++++++++++++

app.get("/insere-livro",async(req,res)=>{
  await db.insertLivro({titulo:"Guerra dos mundos",resumo:"lorem lorem",valor:80.14,imagem:"guerra-dos-mundos.jpg"})
  res.send(`<h2>Livro adicionado !</h2><a href='/'>voltar</a>`)
})
app.get("/atualiza-promo",async(req,res)=>{
  let qs=url.parse(req.url,true).query
  await db.updatePromo(qs.promo,qs.id)
  res.send("<h2>LIsta de Promoções Atualizada<h2><a href='/promocoes'>voltar</a>")
})
app.get("/upd-promo",(req,res)=>{
  res.render(`adm/atualiza-promocoes`,{
    titulo:" Conheça os nossos Livros",
    promo:" Todos os livros com 10% de desconto !",
    livro:consulta,
  galeria:consultaLivro})
})
app.get("/adm",(req,res)=>{
  res.render('adm/index-adm',{
    galeria:consultaLivro,
    
  })
   })
   app.get("/upd-form-produto",async(req,res)=>{
    const produto=await db.selectSingle(req.app.locals.idProd)
     res.render('adm/atualiza-produto',{
      galeria:consultaLivro,
      id:req.app.locals.idProd,
      produtoDaVez:produto
    })
     })
     app.post("/upd-form-produto",(req,res)=>{
      req.app.locals.idProd=req.body.id
      res.send('Produto exibido com sucesso')
       })

       app.post("/atualiza_single",async(req,res)=>{
        const b=req.body
      await db.updateProduto(b.resumo,b.imagem,b.valor,b.titulo,b.id)
        res.send('Produto atualizado com sucesso')
         })
app.listen(port,()=>console.log("Servidor rodando com nodemon"))
})()