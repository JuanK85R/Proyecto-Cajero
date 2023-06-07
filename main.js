let cuentas = [
    { nombre: "Cliente Uno", saldo: 180 },
    { nombre: "Cliente Dos", saldo: 90 },
    { nombre: "Cliente Tres", saldo: 210 }
  ];
  
  let seleccionDeCuenta = null;
  let seccioncuenta = document.getElementById("cuentas");
  let BotonDeIngreso = document.getElementsByClassName("ingresar");
  let SeccionDeOperaciones = document.getElementById("operaciones");
  let botonDeSaldo = document.getElementById("saldo");
  let botonIngresarMonto = document.getElementById("ingreso");
  let botonDeRetiro = document.getElementById("retiro");
  let botonDeSalida = document.getElementById("salir");
  let nombreCuenta = document.getElementById("nombre-cuenta");
  let seccionSaldo = document.getElementById("consulta-saldo");
  let saldoActual = document.getElementById("saldo-actual");
  let botonVolver = document.getElementById("volver");
  let seccionResultado = document.getElementById("resultado");
  let mensaje = document.getElementById("mensaje");
  let saldoFinal = document.getElementById("saldo-final");
  let botonVolverOperaciones = document.getElementById("volver-operaciones");
  
  for (let i = 0; i < BotonDeIngreso.length; i++) {
    let cuenta = BotonDeIngreso[i].getAttribute("data-cuenta");
    
    BotonDeIngreso[i].addEventListener("click", function() {
      let password = document.getElementById("password-" + cuenta).value;
      let cuentaSeleccionada = cuentas.find(function(element) {
        return element.nombre === "Cliente " + cuenta.charAt(0).toUpperCase() + cuenta.slice(1);
      });
      
      if (password === '5555') {
        seleccionDeCuenta = cuentaSeleccionada;
        seccioncuenta.classList.add("ocultar");
        SeccionDeOperaciones.classList.remove("ocultar");
        nombreCuenta.textContent = "Cuenta: " + seleccionDeCuenta.nombre;
        document.getElementById("password-" + cuenta).value = "";
      } else {
        alert("Contraseña incorrecta, digitela de nuevo");
        document.getElementById("password-" + cuenta).value = "";
      }
    });
  }
  
  botonDeSaldo.addEventListener("click", function() {
    seccionSaldo.classList.remove("ocultar");
    saldoActual.textContent = "Saldo actual: $" + seleccionDeCuenta.saldo;
  });
  
  botonVolver.addEventListener("click", function() {
    seccionSaldo.classList.add("ocultar");
  });
  
  botonIngresarMonto.addEventListener("click", function() {
    let monto = prompt("Ingrese el monto a depositar:");
    monto = parseInt(monto);
    
    if (!isNaN(monto) && monto > 0) {
      let nuevoSaldo = seleccionDeCuenta.saldo + monto;
      
      if (nuevoSaldo <= 990) {
        seleccionDeCuenta.saldo = nuevoSaldo;
        mostrarResultado("Monto ingresado: $" + monto, "Nuevo saldo: $" + seleccionDeCuenta.saldo);
      } else {
        mostrarResultado("El monto ingresado excede el límite máximo.");
      }
    } else {
      mostrarResultado("El monto ingresado no es válido.");
    }
  });
  
  botonDeRetiro.addEventListener("click", function() {
    let monto = prompt("Ingrese el monto a retirar:");
    monto = parseInt(monto);
    
    if (!isNaN(monto) && monto > 0) {
      let nuevoSaldo = seleccionDeCuenta.saldo - monto;
      
      if (nuevoSaldo >= 10) {
        seleccionDeCuenta.saldo = nuevoSaldo;
        mostrarResultado("Monto retirado: $" + monto, "Nuevo saldo: $" + seleccionDeCuenta.saldo);
      } else {
        mostrarResultado("El monto a retirar excede el saldo disponible.");
      }
    } else {
      mostrarResultado("El monto ingresado no es válido.");
    }
  });
  
  botonDeSalida.addEventListener("click", function() {
    seleccionDeCuenta = null;
    SeccionDeOperaciones.classList.add("ocultar");
    seccioncuenta.classList.remove("ocultar");
    for (let i = 0; i < BotonDeIngreso.length; i++) {
      document.getElementById("password-" + BotonDeIngreso[i].getAttribute("data-cuenta")).value = "";
    }
    seccionSaldo.classList.add("ocultar");
    seccionResultado.classList.add("ocultar");
    mensaje.textContent = "";
    saldoFinal.textContent = "";
  });
  
  botonVolverOperaciones.addEventListener("click", function() {
    seccionResultado.classList.add("ocultar");
  });
  
  function mostrarResultado(mensaje1, mensaje2) {
    seccionResultado.classList.remove("ocultar");
    mensaje.textContent = mensaje1;
    saldoFinal.textContent = mensaje2;
  }
  