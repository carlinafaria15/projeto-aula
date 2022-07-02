//atribuindo o acesso ao formLogin para variavel formL
var formL=document.forms.formLogin
//evento de clique no button confirmar
document.querySelector("#btLogin").onclick=function(){
    //alert("ok")
    if(formL.email.value == "" ){
        alert("Preencha o email !")
    }else if(formL.senha.value == ""){
        alert("Preencha a senha !")
    }else {
        formL.submit()
        localStorage.emailUser=formL.email.value
    }
}