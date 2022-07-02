console.log('Teste literals...')

let nome="Richard"
let mensagem="Olá, eu sou "+ nome
console.log(mensagem)

//exemplo 1
let mensagem2=`Olá ${nome}!`
console.log(mensagem2)

//exemplo 2
let a=10
let b=15
let calculo=`O valor total é ${2*(a+b)}`
console.log(calculo)

//exemplo 3
function info(){
    return'Hoje é segunda-feira'
}
let infoSemana=`Salve! ${info()}. bora codar!`
console.log(infoSemana)

//EXEMPLO 4
//Date - getDay()[0-6]0=Domingo 6=sabado
//getMoth()[0-11]=0janeiro 11=dezembro
//getDAte()- dia de hoje
//getHours() getMinutes() getSeconds- Hora Minuto e segundo
//getFullYear() = ANO
let tempo= new Date()
let diaDaSemana=['Dom','Seg','Ter','Qua','Qui','Sex','Sab']
let mesDoAno=['Janeiro','Fevereiro','Março','abril','Maio','Junho','Julho','Agosto','Setembro','outubro','Novembro','Dezembro']
function infoParam(dia){
    return `Hoje é ${dia}`
}
let infoSemanaParam=`Salve! ${infoParam('terça-feira')}`
console.log(infoSemanaParam)
console.log(diaDaSemana[tempo.getDay()])
//FORMATO DATA EMXEPLO1
let saudacao=`${diaDaSemana[tempo.getDay()]},${tempo.getDate()} de ${mesDoAno[tempo.getMonth()]} de ${tempo.getFullYear()}`
document.querySelector('#p1').innerHTML=saudacao

//FORMATO DATA EXEMPLO 2
function relogio(){
let tempo_1=new Date()
let hora=tempo_1.getHours()
let minutos=tempo_1.getMinutes()
let segundos=tempo_1.getSeconds()
//adiciona zero antes do digito se menor que 10
hora<10?hora=`0${hora}`:null
minutos<10?minutos=`0${minutos}`:null
segundos<10?segundos=`0${segundos}`:null
//console.log(hora,minutos,segundos)
document.querySelector('#p2').innerHTML=`${hora}:${minutos}:${segundos}`
}
relogio()
let tempo_intervalo=setInterval(function(){
    relogio()
},1000)

//exemplo5
let $pessoa={
    nome:"Tom Hanks"
}
let msgPessoa=`${$pessoa.nome.toUpperCase()}, ator de cinema`
console.log(msgPessoa)




////ARROW FUNCTIONS 

let treinamento =function(){
    return "Javascript Back End "
}

let treinamento_1 =() => {
    return "Node Js!"
}

console.log(treinamento())
let calculo_1=(a,b)=>a/b *100
console.log(calculo_1(10,5))

// SOBRE O THIS - function tradicional repasse automático
let viagem_0=function(){
    document.querySelector('#p3').innerHTML+=`vou para o México, este evento foi disparado por :${this}<br/>`
}
 
//SOBRE O THIS (quando arrow functions não reconhece o elemento do clique de imediato)
let viagem =(el)=>{
document.querySelector("#p3").innerHTML+=`Vou para o México, este evento foi disparado por: ${el}<br/>`
}
window.addEventListener("load",viagem(this))
document.querySelector('#bt_teste').addEventListener("click",viagem_0)
document.querySelector('#bt_teste').onclick =function(){viagem(this.id)}
