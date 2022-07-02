const fs=require('fs')
fs.writeFile('leiame_1.txt','Aula 31/05 Nodejs',function(err){
    if(err) throw err
    console.log('Arquivo criado')
})
