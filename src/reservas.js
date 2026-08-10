const selectoresCamposFormulario = { nombre: "#txtNombreReserva", correo: "#txtCorreoReserva", celular: "#txtCelularReserva", fechaIngreso: "#txtFechaIngreso", fechaSalida: "#txtFechaSalida", habitacion: "#slcHabitacion", cantidadHuespedes: "#nroCantidadHuespedes", comentarios: "#txtComentariosReserva" };

function formatearFechaParaInput(pFecha) {
  let anio = pFecha.getFullYear();
  let mes = pFecha.getMonth() + 1;
  let dia = pFecha.getDate();

  if (mes < 10) {
    mes = "0" + mes;
  }
  if (dia < 10) {
    dia = "0" + dia;
  }

  return anio + "-" + mes + "-" + dia;
}

function obtenerFechaActualParaInput() {
  return formatearFechaParaInput(new Date());
}

function configurarLimitesFechas() {
  let campoFechaIngreso = document.querySelector("#txtFechaIngreso");
  let fechaActual = obtenerFechaActualParaInput();

  campoFechaIngreso.min = fechaActual;
  campoFechaIngreso.title = "No se pueden seleccionar fechas anteriores a hoy.";
}

function leerDatosFormulario() {
  let nombre = document.querySelector("#txtNombreReserva").value;
  let correo = document.querySelector("#txtCorreoReserva").value;
  let celular = document.querySelector("#txtCelularReserva").value;
  let fechaIngreso = document.querySelector("#txtFechaIngreso").value;
  let fechaSalida = document.querySelector("#txtFechaSalida").value;
  let habitacion = document.querySelector("#slcHabitacion").value;
  let cantidadHuespedes = document.querySelector("#nroCantidadHuespedes").value;
  let comentarios = document.querySelector("#txtComentariosReserva").value;
  let servicios = [];
  let casillasServicios = document.querySelectorAll('input[name="servicios"]');

  for (let i = 0; i < casillasServicios.length; i++) {
    if (casillasServicios[i].checked) {
      servicios.push(casillasServicios[i].value);
    }
  }

  let datos = { nombre: nombre, correo: correo, celular: celular, fechaIngreso: fechaIngreso, fechaSalida: fechaSalida, habitacion: habitacion, cantidadHuespedes: cantidadHuespedes, comentarios: comentarios, servicios: servicios };
  return datos;
}

function limpiarErrores() {
  let mensajesError = document.querySelectorAll("#formulario-reserva .error-campo");
  let camposInvalidos = document.querySelectorAll("#formulario-reserva .invalido");

  for (let i = 0; i < mensajesError.length; i++) {
    mensajesError[i].textContent = "";
  }
  for (let i = 0; i < camposInvalidos.length; i++) {
    camposInvalidos[i].classList.remove("invalido");
  }
}

function mostrarErrores(pErrores) {
  for (let propiedad in pErrores) {
    let selectorCampo = selectoresCamposFormulario[propiedad];
    let campo = document.querySelector(selectorCampo);
    let etiqueta = campo.closest("label");
    let mensajeError = etiqueta.querySelector(".error-campo");

    etiqueta.classList.add("invalido");
    mensajeError.textContent = "ⓘ " + pErrores[propiedad];
  }
}

function cargarDatosSesionEnReserva(pUsuario) {
  let nombre = "";
  let correo = "";
  let celular = "";
  let datosBloqueados = false;

  if (pUsuario !== null && pUsuario.rol === "cliente") {
    nombre = (pUsuario.nombre + " " + pUsuario.apellido).trim();
    correo = pUsuario.correo;
    celular = pUsuario.celular;
    datosBloqueados = true;
  }

  document.querySelector("#txtNombreReserva").value = nombre;
  document.querySelector("#txtCorreoReserva").value = correo;
  document.querySelector("#txtCelularReserva").value = celular;

  document.querySelector("#txtNombreReserva").readOnly = datosBloqueados;
  document.querySelector("#txtCorreoReserva").readOnly = datosBloqueados;
  document.querySelector("#txtCelularReserva").readOnly = datosBloqueados;
}

function iniciarFormularioReservas(pSistemaReservas,pGuardarReservas,pMostrarConfirmacionReserva) {

  let formulario = document.getElementById("formulario-reserva");
  if (formulario === null) {
    return;
  }
  let alertaFormulario = document.getElementById("alerta-formulario");
  let mensajeExito = document.getElementById("mensaje-exito");
  let botonMenu = document.querySelector(".boton-menu");
  let barraSuperior = document.querySelector(".barra-superior");
  let opcionesHabitacion = document.querySelectorAll('input[name="tarjetaHabitacion"]');


  document.querySelector("#formulario-reserva").addEventListener("submit", reservar);
  document.querySelector("#formulario-reserva").addEventListener("reset", limpiarFormulario);
  configurarLimitesFechas();

  function alternarMenu() {
    barraSuperior.classList.toggle("menu-abierto");
  }

  function seleccionarHabitacion(pEvento) {
    document.querySelector("#slcHabitacion").value = pEvento.currentTarget.value;
  }

  function reservar(pEvento) {
    pEvento.preventDefault();

    let datosReserva = leerDatosFormulario();
    let errores = pSistemaReservas.validarReserva(datosReserva);

    limpiarErrores();
    mostrarErrores(errores);

    let reservaValida = errores.nombre === undefined && errores.correo === undefined && errores.celular === undefined && errores.fechaIngreso === undefined && errores.fechaSalida === undefined && errores.habitacion === undefined && errores.cantidadHuespedes === undefined;
    alertaFormulario.hidden = reservaValida;
    mensajeExito.hidden = !reservaValida;

    if (reservaValida) {
      let nuevaReserva = pSistemaReservas.agregarReserva(datosReserva);
      pGuardarReservas();
      formulario.reset();
      mensajeExito.hidden = false;
      pMostrarConfirmacionReserva(nuevaReserva);
    }
  }

  function limpiarFormulario() {
    function finalizarLimpieza() {
      alertaFormulario.hidden = true;
      mensajeExito.hidden = true;
      limpiarErrores();
      configurarLimitesFechas();
    }

    setTimeout(finalizarLimpieza);
  }

  function limpiarAlCambiarVista() {
    if (location.hash !== "#reserva") {
      formulario.reset();
    }
  }

  botonMenu.addEventListener("click", alternarMenu);

  for (let i = 0; i < opcionesHabitacion.length; i++) {
    opcionesHabitacion[i].addEventListener("change", seleccionarHabitacion);
  }

  window.addEventListener("hashchange", limpiarAlCambiarVista);
}
