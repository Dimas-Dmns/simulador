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

function calcularCapacidadPago(montoDisponible) {
    return montoDisponible * 0.5;   // 50% del disponible
}

function calcular() {
    // Leer ingresos y egresos
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos = parseFloat(document.getElementById("txtEgresos").value);

    // Calcular disponible
    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = "USD " + disponible.toFixed(2);

    // Calcular capacidad de pago
    let capacidad = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = "USD " + capacidad.toFixed(2);
}

function calcularInteresSimple(monto, tasa, plazoAnios) {
    return plazoAnios * monto * (tasa / 100);
}

    // Leer monto, plazo y tasa
    let monto = parseFloat(document.getElementById("txtMonto").value);
    let plazo = parseFloat(document.getElementById("txtPlazo").value);
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value);

    // Calcular interés
    let interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").textContent = "USD " + interes.toFixed(2);

function calcularTotalPagar(monto, interes) {
    return monto + interes + 100;   // +100 de impuestos y SOLCA
}

    // Calcular total a pagar
    let total = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").textContent = "USD " + total.toFixed(2);

function calcularCuotaMensual(total, plazoAnios) {
    let meses = plazoAnios * 12;
    return total / meses;
}

    // Calcular cuota mensual
    let cuota = calcularCuotaMensual(total, plazo);
    document.getElementById("spnCuotaMensual").textContent = "USD " + cuota.toFixed(2);

function aprobarCredito(capacidadPago, cuotaMensual) {
    return capacidadPago > cuotaMensual;
}

    // Aprobar o rechazar el crédito
    let aprobado = aprobarCredito(capacidad, cuota);

    if (aprobado) {
        document.getElementById("spnEstadoCredito").textContent = "CREDITO APROBADO";
        document.getElementById("spnEstadoCredito").style.color = "green";
    } else {
        document.getElementById("spnEstadoCredito").textContent = "CREDITO RECHAZADO";
        document.getElementById("spnEstadoCredito").style.color = "red";
    }

    





