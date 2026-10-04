//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO

function calcularDisponible(ingresos, egresos) {
    let disponible = ingresos - egresos;
    if (disponible < 0) {
        return 0;
    }
    return disponible;
}


function calcular() {
    // 1. Leer los valores de los inputs
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos = parseFloat(document.getElementById("txtEgresos").value);

    // 2. Llamar a la función de negocio
    let disponible = calcularDisponible(ingresos, egresos);

    // 3. Mostrar el resultado en pantalla
    document.getElementById("spnDisponible").textContent = "USD " + disponible.toFixed(2);
}

// Conectar el botón
document.getElementById("btnCalcularCredito").addEventListener("click", calcular);