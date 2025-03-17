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