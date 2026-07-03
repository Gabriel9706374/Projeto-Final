const espanha = document.getElementById("espanha");
const uruguai = document.getElementById("uruguai");
const arabia = document.getElementById("arabia_saudita");
const franca = document.getElementById("franca");
const senegal = document.getElementById("senegal");
const iraque = document.getElementById("iraque");
const inglaterra = document.getElementById("inglaterra");
const servia = document.getElementById("servia");
const emirados = document.getElementById("emirados_arabes_unidos");

function classificacao(selecao, classificou){

    selecao.onmouseover = function(){

        if(classificou){
            this.style.color = "green"; // Azul da França
            this.style.fontWeight = "bold";
        }else{
            this.style.color = "red";
            this.style.textDecoration = "line-through";

        }
    }
    selecao.onmouseout = function(){

        this.style.color = "";
        this.style.fontWeight = "";
        this.style.textDecoration = "";
    }
}
classificacao(espanha, true);
classificacao(uruguai, true);
classificacao(arabia, false);
classificacao(franca, true);
classificacao(senegal, true);
classificacao(iraque, false);
classificacao(inglaterra, true);
classificacao(servia, true);
classificacao(emirados_arabes_unidos, false);