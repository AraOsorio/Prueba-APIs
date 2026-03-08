const boton = document.getElementById("buscar");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", convertir);

async function convertir(){

try{

const pesos = document.getElementById("pesos").value;
const moneda = document.getElementById("moneda").value;

const res = await fetch("https://mindicador.cl/api/" + moneda);
const data = await res.json();

const valorMoneda = data.serie[0].valor;

const conversion = pesos / valorMoneda;

resultado.innerHTML = "Resultado: $" + conversion.toFixed(2);

mostrarGrafico(data.serie.slice(0,10));

}catch(error){

resultado.innerHTML = "Error al consultar la API";

}

}

let chart;

function mostrarGrafico(datos){

const labels = datos.map(d => d.fecha.slice(0,10));
const valores = datos.map(d => d.valor);

const config = {
type:"line",
data:{
labels:labels,
datasets:[{
label:"Historial últimos 10 días",
data:valores,
borderColor:"red"
}]
}
};

const ctx = document.getElementById("grafico");

if(chart){
chart.destroy();
}

chart = new Chart(ctx, config);

}