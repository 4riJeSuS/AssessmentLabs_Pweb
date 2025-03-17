const botao  = document.getElementById("botao");

botao.addEventListener("click", function(){
    const h1 = document.querySelector("h1");
    h1.textContent = "Olá, mundo!";
    h1.style.backgroundColor = "red";
});


const campoTexto = document.getElementById("campoTexto");

campoTexto.addEventListener("keydown", function(enter) {
    if (enter.key === "Enter") {  
        console.log("Valor do campo:", campoTexto.value);
        campoTexto.value = "";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const lista = document.getElementById("lista");

    lista.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
            event.target.remove(); 
        }
    });
});
