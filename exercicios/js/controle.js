console.log("Testando js")
var livros=[["Mick","mick.jpg" ],
["Quem somos nós","quem-somos-nos.jpg"],
["A cura Quântica","cura-quantica.jpg"],
["O Pequeno Príncipe","pequeno-principe.jpg"]]

console.log(livros)

var galeria=document.querySelector("#galeria")

for(var i=0;i<livros.length;i++){
    var img= new Image()
    img.src="imagens/" + livros[i][1]
    img.width=120
    galeria.innerHTML+= "<p>" + livros[i][0] + "<br />" 
    galeria.appendChild(img)
}