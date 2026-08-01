const CLAVE_RESERVAS = "hotel-reservas";
const CLAVE_SESION = "hotel-sesion";
const CLAVE_USUARIOS = "hotel-usuarios";

let sistemaReservas = new SistemaReservas(leerReservas());
let sistemaUsuarios = new SistemaUsuarios(leerUsuarios());
let usuarioActivo = leerSesion();

let BARRA_PRINCIPAL = document.querySelector("#barra-principal");
let VISTA_INICIO = document.querySelector("#vista-inicio");
let VISTA_INICIO_SESION = document.querySelector("#vista-inicio-sesion");
let VISTA_REGISTRO = document.querySelector("#vista-registro");
let VISTA_RESERVA = document.querySelector("#vista-reserva");
let VISTA_PANEL = document.querySelector("#vista-panel");
let VISTA_OPINIONES = document.querySelector("#vista-opiniones");
let VISTA_GALERIA = document.querySelector("#vista-galeria");
let VISTA_SERVICIOS = document.querySelector("#vista-servicios");
let VISTA_CONTACTO = document.querySelector("#vista-contacto");
let VISTA_CONFIRMACION = document.querySelector("#vista-confirmacion");
let VISTA_DETALLE_RESERVA = document.querySelector("#vista-detalle-reserva");
let VISTA_HABITACIONES = document.querySelector("#vista-habitaciones");

let ENLACE_PANEL = document.querySelector("#enlace-panel");
let ENLACE_INICIO = document.querySelector("#enlace-inicio");
let ENLACE_RESERVAR = document.querySelector("#enlace-reservar");
let BOTON_RESERVAR_OPINIONES = document.querySelector("#boton-reservar-opiniones");
let BOTONES_RESERVAR_HABITACION = document.querySelectorAll(".boton-reservar-habitacion");
let CUENTA_USUARIO = document.querySelector("#cuenta-usuario");
let ACCIONES_INVITADO = document.querySelector("#acciones-invitado");
let NOMBRE_USUARIO = document.querySelector("#nombre-usuario");

let CONTENIDO_PIE = document.querySelector("#contenido-pie");
let ENLACES_PIE = document.querySelector("#enlaces-rapidos-pie");
let BUSCADOR_RESERVAS = document.querySelector("#buscador-reservas");
let MENSAJE_REGISTRO_EXITOSO = document.querySelector("#mensaje-registro-exitoso");

function leerReservas() {
  let reservas = [];
  try {
    let textoGuardado = localStorage.getItem(CLAVE_RESERVAS);
    if (textoGuardado !== null) {
      reservas = JSON.parse(textoGuardado);
    }
  } catch (errorLectura) {
    reservas = [];
  }
  return reservas;
}

function guardarReservas() {
  let textoReservas = JSON.stringify(sistemaReservas.reservas);
  localStorage.setItem(CLAVE_RESERVAS, textoReservas);
}

function leerUsuarios() {
  let usuarios = [];
  try {
    let textoGuardado = localStorage.getItem(CLAVE_USUARIOS);
    if (textoGuardado !== null) {
      usuarios = JSON.parse(textoGuardado);
    }
  } catch (errorLectura) {
    usuarios = [];
  }
  return usuarios;
}

function guardarUsuarios() {
  let clientes = [];
  for (let i = 0; i < sistemaUsuarios.usuarios.length; i++) {
    if (sistemaUsuarios.usuarios[i].rol === "cliente") {
      clientes.push(sistemaUsuarios.usuarios[i]);
    }
  }
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(clientes));
}

function leerSesion() {
  let usuario = null;
  try {
    let sesionGuardada = localStorage.getItem(CLAVE_SESION);
    if (sesionGuardada !== null) {
      let datosSesion = JSON.parse(sesionGuardada);
      let usuarioExistente = sistemaUsuarios.buscarUsuarioPorCorreo(datosSesion.correo);

      if (usuarioExistente !== null && usuarioExistente.rol === datosSesion.rol) {
        usuario = usuarioExistente;
      } else {
        localStorage.removeItem(CLAVE_SESION);
      }
    }
  } catch (errorLectura) {
    usuario = null;
  }
  return usuario;
}

function guardarSesion(pUsuario) {
  let datosSesion = { nombre: pUsuario.nombre, correo: pUsuario.correo, rol: pUsuario.rol };
  localStorage.setItem(CLAVE_SESION, JSON.stringify(datosSesion));
}

function iniciarSesion(pUsuario) {
  usuarioActivo = pUsuario;
  guardarSesion(pUsuario);
  if (sistemaUsuarios.puedeVerListado(pUsuario)) {
    location.hash = "#panel";
  } else {
    location.hash = "#inicio";
  }
  mostrarVista();
}

function cerrarSesion() {
  usuarioActivo = null;
  localStorage.removeItem(CLAVE_SESION);
  MENSAJE_REGISTRO_EXITOSO.hidden = true;
  cargarDatosSesionEnReserva(null);
  location.hash = "#inicio";
  mostrarVista();
}

function completarRegistro() {
  location.hash = "#login";
  MENSAJE_REGISTRO_EXITOSO.hidden = false;
  mostrarVista();
}

function ocultarPantallas() {
  VISTA_INICIO.hidden = true;
  VISTA_INICIO_SESION.hidden = true;
  VISTA_REGISTRO.hidden = true;
  VISTA_RESERVA.hidden = true;
  VISTA_PANEL.hidden = true;
  VISTA_OPINIONES.hidden = true;
  VISTA_GALERIA.hidden = true;
  VISTA_SERVICIOS.hidden = true;
  VISTA_CONTACTO.hidden = true;
  VISTA_CONFIRMACION.hidden = true;
  VISTA_DETALLE_RESERVA.hidden = true;
  VISTA_HABITACIONES.hidden = true;
}

function ocultarMenu() {
  ENLACE_PANEL.hidden = true;
  ENLACE_INICIO.hidden = true;
  ENLACE_RESERVAR.hidden = true;
  BOTON_RESERVAR_OPINIONES.hidden = true;
  CUENTA_USUARIO.hidden = true;
  ACCIONES_INVITADO.hidden = true;

  for (let i = 0; i < BOTONES_RESERVAR_HABITACION.length; i++) {
    BOTONES_RESERVAR_HABITACION[i].hidden = true;
  }
}

function mostrarMenuInvitado() {
  ocultarMenu();
  ENLACE_INICIO.hidden = false;
  ENLACE_RESERVAR.hidden = false;
  BOTON_RESERVAR_OPINIONES.hidden = false;
  ACCIONES_INVITADO.hidden = false;

  for (let i = 0; i < BOTONES_RESERVAR_HABITACION.length; i++) {
    BOTONES_RESERVAR_HABITACION[i].hidden = false;
  }
}

function mostrarMenuCliente() {
  ocultarMenu();
  ENLACE_INICIO.hidden = false;
  ENLACE_RESERVAR.hidden = false;
  BOTON_RESERVAR_OPINIONES.hidden = false;
  CUENTA_USUARIO.hidden = false;
  NOMBRE_USUARIO.textContent = (usuarioActivo.nombre + " " + usuarioActivo.apellido).trim();

  for (let i = 0; i < BOTONES_RESERVAR_HABITACION.length; i++) {
    BOTONES_RESERVAR_HABITACION[i].hidden = false;
  }
}

function mostrarMenuAdministradora() {
  ocultarMenu();
  ENLACE_PANEL.hidden = false;
  CUENTA_USUARIO.hidden = false;
  NOMBRE_USUARIO.textContent = (usuarioActivo.nombre + " " + usuarioActivo.apellido).trim();
}

function mostrarPieAcceso() {
  ENLACES_PIE.hidden = true;
  ENLACES_PIE.innerHTML = "";
  CONTENIDO_PIE.classList.add("tres-columnas");
}

function mostrarPieCliente() {
  ENLACES_PIE.hidden = false;
  CONTENIDO_PIE.classList.remove("tres-columnas");
  ENLACES_PIE.innerHTML = "<h2>Enlaces rápidos</h2>" + '<a href="#inicio">Inicio</a>' + '<a href="#reserva">Reservar</a>' + '<a href="#habitaciones">Habitaciones</a>' + '<a href="#servicios">Servicios</a>' + '<a href="#opiniones">Opiniones</a>' + '<a href="#galeria">Galería</a>' + '<a href="#contacto">Contacto</a>';
}

function mostrarPieAdministradora() {
  ENLACES_PIE.hidden = false;
  CONTENIDO_PIE.classList.remove("tres-columnas");
  ENLACES_PIE.innerHTML = "<h2>Enlaces rápidos</h2>" + '<a href="#panel">Panel de reservas</a>' + '<a href="#habitaciones">Habitaciones</a>' + '<a href="#servicios">Servicios</a>' + '<a href="#opiniones">Opiniones</a>' + '<a href="#galeria">Galería</a>' + '<a href="#contacto">Contacto</a>';
}

function mostrarVista() {
  let ruta = location.hash || "#inicio";
  let haySesion = usuarioActivo !== null;
  let esAdministradora = haySesion && sistemaUsuarios.puedeVerListado(usuarioActivo);

  if (haySesion && (ruta === "#login" || ruta === "#registro")) {
    location.hash = esAdministradora ? "#panel" : "#inicio";
    return;
  }

  if (!esAdministradora && (ruta === "#panel" || ruta === "#detalle-reserva")) {
    location.hash = "#reserva";
    return;
  }

  if (esAdministradora && ruta !== "#panel" && ruta !== "#detalle-reserva" && ruta !== "#opiniones" && ruta !== "#galeria" && ruta !== "#servicios" && ruta !== "#contacto" && ruta !== "#habitaciones") {
    location.hash = "#panel";
    return;
  }

  ocultarPantallas();

  if (!haySesion && ruta === "#login") {
    ocultarMenu();
    BARRA_PRINCIPAL.hidden = true;
    mostrarPieAcceso();
    VISTA_INICIO_SESION.hidden = false;
    return;
  }

  if (!haySesion && ruta === "#registro") {
    ocultarMenu();
    BARRA_PRINCIPAL.hidden = true;
    mostrarPieAcceso();
    MENSAJE_REGISTRO_EXITOSO.hidden = true;
    VISTA_REGISTRO.hidden = false;
    return;
  }

  BARRA_PRINCIPAL.hidden = false;

  if (esAdministradora) {
    mostrarMenuAdministradora();
    mostrarPieAdministradora();
  } else if (haySesion) {
    mostrarMenuCliente();
    mostrarPieCliente();
  } else {
    mostrarMenuInvitado();
    mostrarPieCliente();
  }

  if (ruta === "#inicio") {
    VISTA_INICIO.hidden = false;
  } else if (ruta === "#panel") {
    VISTA_PANEL.hidden = false;
    BUSCADOR_RESERVAS.dispatchEvent(new Event("input"));
  } else if (ruta === "#opiniones") {
    VISTA_OPINIONES.hidden = false;
  } else if (ruta === "#galeria") {
    VISTA_GALERIA.hidden = false;
  } else if (ruta === "#servicios") {
    VISTA_SERVICIOS.hidden = false;
  } else if (ruta === "#contacto") {
    VISTA_CONTACTO.hidden = false;
  } else if (ruta === "#confirmacion") {
    VISTA_CONFIRMACION.hidden = false;
  } else if (ruta === "#detalle-reserva") {
    VISTA_DETALLE_RESERVA.hidden = false;
  } else if (ruta === "#habitaciones") {
    VISTA_HABITACIONES.hidden = false;
  } else {
    VISTA_RESERVA.hidden = false;
    cargarDatosSesionEnReserva(usuarioActivo);
  }
}

function iniciarNavegacion() {
  document.querySelector("#boton-cerrar-sesion").addEventListener("click", cerrarSesion);
  window.addEventListener("hashchange", mostrarVista);
  mostrarVista();
}

iniciarFormularioInicioSesion(sistemaUsuarios, iniciarSesion);
iniciarRegistro(sistemaUsuarios, guardarUsuarios, completarRegistro);
iniciarFormularioReservas(sistemaReservas, guardarReservas, mostrarConfirmacionReserva);
iniciarListadoReservas(sistemaReservas, guardarReservas);
iniciarOpiniones();
iniciarHabitaciones();
iniciarNavegacion();
