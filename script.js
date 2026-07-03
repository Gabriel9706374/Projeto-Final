window.alert("Bem-vindo ao Site");
const bandeira = document.getElementById("bandeira");
bandeira.onclick = function(){
alert("🇫🇷 Vive la France!");
}
const titulo = document.getElementById("titulo");
titulo.ondblclick = function(){
this.style.color="yellow";
}
const botao = document.getElementById("btn");
botao.onclick = function(){
document.getElementById("curiosidade").innerHTML ="A França conquistou duas Copas do Mundo: 1998 e 2018.";
}