



a=0
for(key in localStorage){
    //console.log(key.indexOf('chamada'))//-1 (não tem)
    //key.indexOf('chamada')==0?console.log(key):null
    //console.log(key)
    //console.log(a)
    //a++
}

//console.log(localStorage.length)//quantidade de itens dentro do local storage
for(i=0;i<localStorage.length;i++){
    var chave=localStorage.key(i)
    if (chave.includes('chamada')){
       console.log(chave)
    var valor=localStorage.getItem(chave).split(',')
    console.log(valor)
    
for (y=0;y<valor.length;y++){
    console.log(valor[y])
    document.querySelector('#div'+ i +'#p'+ y).innerHTML=valor[y]
}

}
}
//nome da chave
    //chave.indexOf('chamada')==0?console.log(chave):null
    //valor da chave
    //chave.indexOf('chamada')==0?console.log(localStorage.getItem(chave).split(',')):null