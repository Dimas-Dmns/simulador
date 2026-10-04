//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML

function calcular() {
    // Leer ingresos y egresos
    let ingresos = parseFloat(document.getElementById("txtIngresos").value);
    let egresos = parseFloat(document.getElementById("txtEgresos").value);

    // Disponible
    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = "USD " + disponible.toFixed(2);

    // Capacidad de pago
    let capacidad = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = "USD " + capacidad.toFixed(2);

    // Leer datos del crédito
    let monto = parseFloat(document.getElementById("txtMonto").value);
    let plazo = parseFloat(document.getElementById("txtPlazo").value);
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value);

    // Interés
    let interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").textContent = "USD " + interes.toFixed(2);

    // Total a pagar
    let total = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").textContent = "USD " + total.toFixed(2);

    // Cuota mensual
    let cuota = calcularCuotaMensual(total, plazo);
    document.getElementById("spnCuotaMensual").textContent = "USD " + cuota.toFixed(2);

    // Aprobar o rechazar
    let aprobado = aprobarCredito(capacidad, cuota);

    if (aprobado) {
        document.getElementById("spnEstadoCredito").textContent = "CREDITO APROBADO";
        document.getElementById("spnEstadoCredito").style.color = "green";
    } else {
        document.getElementById("spnEstadoCredito").textContent = "CREDITO RECHAZADO";
        document.getElementById("spnEstadoCredito").style.color = "red";
    }
}

// Conectar el botón
document.getElementById("btnCalcularCredito").addEventListener("click", calcular);