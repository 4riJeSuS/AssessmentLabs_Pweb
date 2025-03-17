const botao  = document.getElementById("botao");

botao.addEventListener("click", function(){
    const h1 = document.querySelector("h1");
    h1.textContent = "Botão Clicado!";
});