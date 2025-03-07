/*
Consumir el endPoint de la API del clima Open-Meteo: 
- https://open-meteo.com/
- https://open-meteo.com/en/docs
- Ejemplo de petición
https://api.open-meteo.com/v1/forecast?latitude=7.1254&longitude=-73.1198&current=temperature_2m&hourly=temperature_2m&timezone=auto&past_days=3&forecast_days=3


Características para desarrollar: 
 - Cuando el sitio cargue se debe mostrar un gráfico con datos de prueba y la tabla sin datos
 - Cuando el usuario de click al botón buscar se debe hacer la solicitud de los datos a la API
 - Al recibir la respuesta del servidor se deben mapear los datos en la tabla y en el gráfico.
 - En caso de no encontrar datos o presentar un error se debe reportar por consola"
*/

let base_url = "https://api.open-meteo.com/v1/forecast?";
let end_url = "&current=temperature_2m&hourly=temperature_2m&timezone=auto&past_days=3&forecast_days=3";

function mapearDatos(data){
    document.getElementById("v_lat").innerText = data.latitude;
    document.getElementById("v_long").innerText = data.longitude;
    document.getElementById("v_alt").innerText = data.elevation;
    document.getElementById("v_zone").innerText = data.timezone;
    document.getElementById("v_temp").innerText = data.current.temperature_2m;
    document.getElementById("v_hour").innerText = data.current.time;
    console.log(data.hourly.time);
    console.log(data.hourly.temperature_2m);
    let tiempo = data.hourly.time;
    let temperatura = data.hourly.temperature_2m;
    grafico.data.labels = tiempo;
    grafico.data.datasets[0].data = temperatura;
    grafico.data.datasets[0].label = "temperatura";
    grafico.update();

}


function cargarDatos(){
    let latitud = document.getElementById("latitud").value;
    let longitud = document.getElementById("longitud").value;

    let url = base_url + "latitude=" + latitud + "&longitude="+longitud+end_url;

    console.log("Latitud:", latitud);
    console.log("Longitud:", longitud);

    fetch(url).then((response)=>{
        if(!response.ok){
            throw new Error("Error en la solicitud");
        }
        return response.json();
    }).then((data)=>{
        mapearDatos(data);
        
    }).catch((error)=>{
        console.log("Error: ", error)
    })
}


//Añadiendo listener boton buscar
document.getElementById("buscar_datos").addEventListener('click', cargarDatos);



//Ejemplo de creación de Gráfico
const ctx = document.getElementById('grafico');

let grafico = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["a", "b", "c"],
        datasets: [{
            label: 'Grafico de ejemplo',
            data: ["1", "2", "3"],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
console.log(data)

