const fs= require('fs')

fs.appendFile('info.txt','tomem bastante aguá!',function(err){
    if(err) throw err
    console.log('Arquivo Atualizado')
})