const botao = document.getElementById("tema");

botao.onclick = function(){

    document.body.classList.toggle("tema-escuro");

    if(document.body.classList.contains("tema-escuro")){
        botao.innerText = "Tema Claro";
    }else{
        botao.innerText = "Tema Escuro";
    }

}