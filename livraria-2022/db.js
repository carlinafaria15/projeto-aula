const session = require("express-session")
const mysqlSession = require("express-mysql-session")(session)

async function conecta(){
    const mysql=require("mysql2/promise")
    const conn=await mysql.createConnection({
        host:"localhost",
        user:"car15",
        password:"Car15$#@!",
        database:"filmes"
    })
    console.log("mySQL conectado!")
    global.connection = conn
    return connection
}
//conecta()
async function makeSession(app,opt){
    
    const dia = 1000 * 60 * 60 * 24;
    const min15 = 1000 * 60 * 60 / 4;
    const conectado = await conecta()

    const  sessionStore = new mysqlSession(opt,conectado)
    app.use(session({
        secret: "hrgfgrfrty84fwir767",
        saveUninitialized:false,
        store:sessionStore,
        cookie: { maxAge: dia},
        resave: false 
    }))

}

async function selectFilmes(){
    const conectado =await conecta()
    const [rows] = await conectado.query("select f.titulo,f.genero,d.nome FROM videos as f INNER JOIN diretor as d ON f.diretor = d.diretor_id ORDER BY f.titulo ASC;")
    //console.log(rows)
    return rows
}
async function selectLivros(){
    const conectado =await conecta()
    const [rows] = await conectado.query("select * from livros ORDER BY livros_id DESC; ")
   // console.log(rows)
    return rows
}
async function selectCarrinho(){
    const conectado =await conecta()
    const [rows] = await conectado.query("select * from carrinho ORDER BY carrinho_id")
   // console.log(rows)
    return rows
}async function selectSingle(id){
    const conectado =await conecta()
    const values=[id]
    const [rows] = await conectado.query("select * from livros where livros_id=?",values)
    //console.log(rows)
    return rows
}
async function selectPromo(){
    const conectado =await conecta()
    const [rows] = await conectado.query("select * from livros where promo=1")
    //console.log(rows)
    return rows
}
async function selectUsers(email,senha){
    const conectado =await conecta()
    const values=[email,senha]
    const [rows] = await conectado.query("select * from usuarios where email=? AND senha=?",values)
   // console.log(rows)
    return rows
}
async function updatePromo(promo,id){
    const conectado=await conecta()
    const values =[promo,id]
    return await conectado.query("update livros set promo=? where livros_id=?",values)
}
async function updateProduto(resumo,imagem,valor,titulo,id){
    const conectado=await conecta()
    const values =[resumo,imagem,valor,titulo,id]
    return await conectado.query("update livros set resumo=?,imagem=?,valor=?,titulo=? where livros_id=?,",values)
}
//updatePromo(0,3)
async function deleteCarrinho(id){
    const conectado=await conecta()
    const values =[id]
    return await conectado.query("delete from carrinho where carrinho_id=?",values)
}

async function insertLivro(livro){
    const conectado = await conecta() 
    const values = [livro.titulo,livro.resumo,livro.valor,livro.imagem]
    const [rows] = 
    await conectado.query("INSERT INTO livros(titulo,resumo,valor,imagem) VALUES (?,?,?,?)",values)  
    console.log("Insert ok!")
    return rows
}
async function insertContato(contato){
    const conectado = await conecta() 
    const values = [contato.nome,contato.sobrenome,contato.email,contato.mensagem]
    const [rows] = 
    await conectado.query("INSERT INTO contato(nome,sobrenome,email,mensagem) VALUES (?,?,?,?)",values)  
    console.log("Insert ok!")
    return rows
}
async function insertCarrinho(carrinho){
    const conectado = await conecta() 
    const values = [carrinho.produto,carrinho.qtd,carrinho.valor,carrinho.livros_id]
    const [rows] = 
    await conectado.query("INSERT INTO carrinho(produto,qtd,valor,livros_id) VALUES (?,?,?,?)",values)  
    console.log("Insert ok!")
    return rows
}
async function insertUsuarios(usuarios){
    const conectado = await conecta() 
    const values = [usuarios.nome,usuarios.email,usuarios.telefone,usuarios.senha,usuarios.conf_senha]
    const [rows] = 
    await conectado.query("INSERT INTO usuarios(nome,email,telefone,senha,conf_senha) VALUES (?,?,?,?,?)",values)  
    console.log("Insert ok!")
    return rows
}
//insertContato({nome:"Michael",
//sobrenome:"Jackson",email:"jackson@gmail.com",mensagem:"moon walking"})

//selectCarinho()
//selectFilmes()
//selectLivros()
//selectSingle(10)

module.exports={
    selectFilmes,
    selectLivros,
    selectCarrinho,
    selectUsers,
    selectSingle,
    selectPromo,
    updatePromo,
    updateProduto,
    insertContato,
    insertUsuarios,
    insertCarrinho,
    deleteCarrinho,
    makeSession
}