let tiempo = document.getElementById("Tiempo");

function obtenerHora(){
    let today = new Date();
    let hour = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

    tiempo.textContent = hour + ":" + minutes + ":" + seconds;
    console.log("Ejecutando")
}
setInterval(obtenerHora, 1000);