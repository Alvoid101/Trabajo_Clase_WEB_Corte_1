/* Desarrollar un código en javascript que permita jugar al ahorcado. 
El usuario debe adivinar una palabra de 5 letras.
El usuario tiene 6 oportunidades para adivinar la palabra.
Si el usuario adivina la palabra, se muestra un mensaje de felicitaciones.
Si el usuario se queda sin oportunidades, se muestra un mensaje de derrota.
El usuario puede jugar de nuevo.
*/

let listaPalabras = ["perro", "gato", "elefante", "jirafa", "mono","gallina","tigre","oso","leon","serpiente"];
let palabraSecreta;
let palabraCompleta;
let sizePalabraSecreta;
let intentosRestantes = 6;
let letrasUsadas = [];

let sizeListaPalabras = listaPalabras.length;
let randomIndex = getRandomInt(sizeListaPalabras);

let letrasCorrectas = [];

document.getElementById("jugar").disabled = false;
document.getElementById("validar").disabled = true;
document.getElementById("reiniciar").disabled = true;
document.getElementById("letra").disabled = true;

//Función para obtener un numero aleatorio
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//Función para obtener la palabra segun los aciertos del usuario
function obtenerPalabra() {
    let palabra = "";
    for(l of palabraCompleta){
        if(letrasCorrectas.includes(l)){
            palabra += l;
        }
        else{
            palabra += " _";
        }
    }
    return palabra;
}

//Función para iniciar el juego
function jugar() {
    intentosRestantes = 6;
    letrasUsadas = [];
    letrasCorrectas = [];
    palabraSecreta = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
    palabraCompleta = palabraSecreta;
    sizePalabraSecreta = palabraSecreta.length;
    document.getElementById("intentosRestantes").textContent = intentosRestantes;
    document.getElementById("letrasUsadas").textContent = letrasUsadas;
    document.getElementById("palabra").textContent = obtenerPalabra();
    document.getElementById("jugar").disabled = true;
    document.getElementById("validar").disabled = false;
    document.getElementById("reiniciar").disabled = false;
    document.getElementById("letra").disabled = false;
    console.log(palabraSecreta);

}   

//Función para reiniciar el juego
function reiniciar() {
    document.getElementById("jugar").disabled = false;
    document.getElementById("reiniciar").disabled = true;
    jugar();
}

//Función para validar la letra ingresada por el usuario
function validarLetra() {
    let letra = document.getElementById("letra").value;

    console.log(palabraSecreta);
    if(letrasUsadas.includes(letra)){
        alert("Ya usaste esa letra");
    }
    else if(palabraSecreta.includes(letra)){
        
        letrasCorrectas.push(letra);
        document.getElementById("palabra").textContent = obtenerPalabra();
        while(palabraSecreta.includes(letra)){
            palabraSecreta = palabraSecreta.replace(letra, "");
            sizePalabraSecreta -= 1;
        }
        console.log(palabraSecreta);

        
    }else{
        
        intentosRestantes -=1;
        document.getElementById("intentosRestantes").textContent = intentosRestantes;
        
    }

    if(!letrasUsadas.includes(letra)){
        letrasUsadas.push(letra);
    }
    
    if(sizePalabraSecreta == 0){
        alert("Ganaste");
        document.getElementById("validar").disabled = true;
        
    }
    
    if(intentosRestantes == 0){
        alert("Perdiste");
        document.getElementById("validar").disabled = true;

    }


    document.getElementById("letrasUsadas").textContent = letrasUsadas; 

    
}

//Agregar el evento click al los botones
document.getElementById("jugar").addEventListener("click", jugar);
document.getElementById("validar").addEventListener("click", validarLetra);
document.getElementById("reiniciar").addEventListener("click", reiniciar);
