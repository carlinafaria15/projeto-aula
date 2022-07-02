//caso coloque a chamada dentro do <head> use
//window.onload=function(){.. todo o codigo aqui ..}
console.log("Hello World")
console.log(document.querySelector("h1"))
//document (documento HTML)
//querySelector(consulta um elemento html)
document.querySelector("h1").innerHTML+=""

//acesso a um elemento de formulário
console.log(document.forms.formContato)
//atribuindo o acesso ao formContato para variavel formC
var formC=document.forms.formContato
//evento de clique no button confirmar
document.querySelector("#btContato").onclick=function(){
    //alert("ok")
    if(formC.nomeContato.value == "" ){
        alert("preencha o nome !")
    }else if(formC.emailContato.value == ""){
        alert("Preencha o e-mail !")
    }else if(formC.comentario.value == ""){
        alert("Preencha o comentário !")
    }else{
        formC.submit()
    }
    //alert(formC.nomeContato.value)
    //alert(formC.emailContato.value)
    //alert(formC.comentario.value)
}
