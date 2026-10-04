//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML

function calcular() {
    // Leer ingresos y egresos
    let ingresos = parseFloat(document.getElementById("txtIngresos").value) || 0;
    let egresos = parseFloat(document.getElementById("txtEgresos").value) || 0;

    // Disponible
    let disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = "USD " + disponible.toFixed(2);

    // Capacidad de pago
    let capacidad = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = "USD " + capacidad.toFixed(2);

    // Leer datos del crédito
    let monto = parseFloat(document.getElementById("txtMonto").value) || 0;
    let plazo = parseFloat(document.getElementById("txtPlazo").value) || 0;
    let tasa = parseFloat(document.getElementById("txtTasaInteres").value) || 0;

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
    let statusBox = document.getElementById("statusBox");
    let spnEstado = document.getElementById("spnEstadoCredito");

    if (aprobado) {
        spnEstado.textContent = "✓ CRÉDITO APROBADO";
        statusBox.className = "status-box aprobado";
    } else {
        spnEstado.textContent = "✗ CRÉDITO RECHAZADO";
        statusBox.className = "status-box rechazado";
    }

    // Generar tabla de amortización
    generarTablaAmortizacion(monto, interes, plazo, cuota);
}

function generarTablaAmortizacion(monto, interesTotal, plazoAnios, cuotaMensual) {
    let tbody = document.getElementById("tbodyAmortizacion");
    tbody.innerHTML = "";

    if (plazoAnios <= 0 || monto <= 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-table">Ingresa datos válidos</td></tr>';
        return;
    }

    let meses = plazoAnios * 12;
    let capitalMensual = monto / meses;
    let interesMensual = interesTotal / meses;
    let saldo = monto;

    // Mostrar máximo 24 cuotas para no saturar (si es más, se resume)
    let mostrar = Math.min(meses, 24);

    for (let i = 1; i <= mostrar; i++) {
        saldo -= capitalMensual;
        if (saldo < 0) saldo = 0;

        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${i}</td>
            <td>USD ${cuotaMensual.toFixed(2)}</td>
            <td>USD ${capitalMensual.toFixed(2)}</td>
            <td>USD ${interesMensual.toFixed(2)}</td>
            <td>USD ${saldo.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    }

    if (meses > 24) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td colspan="5" class="empty-table">... y ${meses - 24} cuotas más</td>`;
        tbody.appendChild(tr);
    }
}

function reiniciar() {
    // Limpiar inputs
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    // Limpiar resultados
    document.getElementById("spnDisponible").textContent = "—";
    document.getElementById("spnCapacidadPago").textContent = "—";
    document.getElementById("spnInteresPagar").textContent = "—";
    document.getElementById("spnTotalPrestamo").textContent = "—";
    document.getElementById("spnCuotaMensual").textContent = "—";
    document.getElementById("spnEstadoCredito").textContent = "ANALIZANDO...";
    
    document.getElementById("statusBox").className = "status-box";

    // Limpiar tabla
    document.getElementById("tbodyAmortizacion").innerHTML = 
        '<tr><td colspan="5" class="empty-table">Presiona "Calcular Crédito" para ver la tabla</td></tr>';
}

// Conectar botones
document.getElementById("btnCalcularCredito").addEventListener("click", calcular);
document.getElementById("btnReiniciar").addEventListener("click", reiniciar);