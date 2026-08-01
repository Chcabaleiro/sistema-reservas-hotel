function formatearFecha(pFecha) {
  let fechaFormateada = "—";
  if (pFecha !== "") {
    fechaFormateada = pFecha.split("-").reverse().join("/");
  }
  return fechaFormateada;
}

function colocarTexto(pIdentificador, pTexto) {
  document.getElementById(pIdentificador).textContent = pTexto;
}

function armarFilasReservas(pReservas) {
  let filas = "";

  for (let i = 0; i < pReservas.length; i++) {
    let reservaActual = pReservas[i];
    let iconoEstado = '<img src="img/icono-cancelacion-exitosa.svg" alt="">';

    filas += `<tr>
      <td><span class="estado ${reservaActual.estado.toLowerCase()}">${iconoEstado} ${reservaActual.estado}</span></td>
      <td><strong>${reservaActual.nombre}</strong><small>${reservaActual.correo}</small></td>
      <td>${formatearFecha(reservaActual.fechaIngreso)}</td>
      <td>${formatearFecha(reservaActual.fechaSalida)}</td>
      <td><button class="boton-detalle" data-id="${reservaActual.id}" type="button"><img src="img/icono-ver-detalle.svg" alt="">Ver detalle</button></td>
    </tr>`;
  }

  return filas;
}

function iniciarListadoReservas(pSistemaReservas,pGuardarReservas) {

  const CANTIDAD_POR_PAGINA = 6;
  let cuerpoTabla = document.getElementById("cuerpo-reservas");
  let buscador = document.getElementById("buscador-reservas");
  let contador = document.getElementById("contador-reservas");
  let paginacion = document.getElementById("paginacion-reservas");
  let estadoActual = document.getElementById("detalle-estado-actual");
  let dialogoCancelar = document.getElementById("dialogo-confirmar-cancelacion");
  let dialogoExito = document.getElementById("dialogo-cancelacion-exitosa");
  let idReservaSeleccionada = null;
  let paginaActual = 1;

  document.querySelector("#buscador-reservas").addEventListener("input", buscarReservas);
  document.querySelector("#paginacion-reservas").addEventListener("click", cambiarPagina);
  document.querySelector("#cuerpo-reservas").addEventListener("click", verDetalleReserva);
  document.querySelector("#boton-cancelar-reserva").addEventListener("click", solicitarCancelacion);
  document.querySelector("#boton-volver-cancelacion").addEventListener("click", volverDeCancelacion);
  document.querySelector("#boton-confirmar-cancelacion").addEventListener("click", confirmarCancelacion);
  document.querySelector("#boton-aceptar-cancelacion").addEventListener("click", aceptarCancelacion);

  
  function mostrarReservas() {

    let reservasEncontradas =pSistemaReservas.buscarReservas(buscador.value);
    let cantidadPaginas = Math.ceil(reservasEncontradas.length / CANTIDAD_POR_PAGINA);

    if (cantidadPaginas > 0 && paginaActual > cantidadPaginas) {
      paginaActual = cantidadPaginas;
    }

    let posicionInicial = (paginaActual - 1) * CANTIDAD_POR_PAGINA;
    let posicionFinal = posicionInicial + CANTIDAD_POR_PAGINA;
    let reservasDePagina = reservasEncontradas.slice(posicionInicial,posicionFinal);

    cuerpoTabla.innerHTML = armarFilasReservas(reservasDePagina);

    if (reservasEncontradas.length === 0) {

      let tituloVacio = "No hay reservas registradas.";
      let descripcionVacia = "Cuando existan solicitudes de reserva, aparecerán aquí.";

      if (pSistemaReservas.reservas.length > 0) {

        tituloVacio = "No se encontraron reservas.";
        descripcionVacia ="Probá realizando una búsqueda diferente.";
      }

      cuerpoTabla.innerHTML = `<tr class="fila-reservas-vacia">
        <td colspan="5">
          <div class="contenido-reservas-vacio">
            <img src="img/icono-sin-reservas.svg" alt="">
            <strong>${tituloVacio}</strong>
            <small>${descripcionVacia}</small>
          </div>
        </td>
      </tr>`;

      contador.textContent ="Mostrando 0 de " + pSistemaReservas.reservas.length + " reservas registradas.";

    } else {

      contador.textContent ="Mostrando " + (posicionInicial + 1) + "–" + Math.min(posicionFinal, reservasEncontradas.length) + " de " + reservasEncontradas.length + " reservas.";
    }

    armarPaginacion(cantidadPaginas);
  }

  function armarPaginacion(pCantidadPaginas) {
    if (pCantidadPaginas === 0) {
      paginacion.innerHTML = "";
      return;
    }

    let botones = `<button data-pagina="${paginaActual - 1}" type="button" ${paginaActual === 1 ? "disabled" : ""}>‹</button>`;

    for (let i = 1; i <= pCantidadPaginas; i++) {
      botones += `<button data-pagina="${i}" class="${i === paginaActual ? "actual" : ""}" type="button">${i}</button>`;
    }

    botones += `<button data-pagina="${paginaActual + 1}" type="button" ${paginaActual === pCantidadPaginas ? "disabled" : ""}>›</button>`;
    paginacion.innerHTML = botones;
  }

  function mostrarDetalle(pReserva) {
    idReservaSeleccionada = pReserva.id;
    colocarTexto("detalle-nombre", pReserva.nombre);
    colocarTexto("detalle-correo", pReserva.correo);
    colocarTexto("detalle-celular", pReserva.celular);
    colocarTexto("detalle-habitacion", pReserva.habitacion);
    colocarTexto("detalle-huespedes", pReserva.cantidadHuespedes + (pReserva.cantidadHuespedes === 1 ? " huésped" : " huéspedes"));
    colocarTexto("detalle-ingreso", formatearFecha(pReserva.fechaIngreso));
    colocarTexto("detalle-salida", formatearFecha(pReserva.fechaSalida));
    colocarTexto("detalle-noches",pSistemaReservas.calcularNoches(pReserva));
    colocarTexto("detalle-servicios", pReserva.servicios.length > 0 ? pReserva.servicios.join(", ") : "Ninguno");
    colocarTexto("detalle-comentarios", pReserva.comentarios || "Sin comentarios");
    colocarTexto("detalle-numero-reserva","RES-" + String(pReserva.id).slice(-8));

    estadoActual.innerHTML = '<img src="img/icono-cancelacion-exitosa.svg" alt=""> Confirmada';
    estadoActual.className = "estado " + pReserva.estado.toLowerCase();
    location.hash = "#detalle-reserva";
  }

  function solicitarCancelacion() {
    dialogoCancelar.showModal();
  }

  function buscarReservas() {
    paginaActual = 1;
    mostrarReservas();
  }

  function cambiarPagina(pEvento) {
    let botonPagina = pEvento.target.closest("button");
    if (botonPagina !== null && !botonPagina.disabled) {
      paginaActual = Number(botonPagina.dataset.pagina);
      mostrarReservas();
    }
  }

  function verDetalleReserva(pEvento) {
    let botonDetalle = pEvento.target.closest(".boton-detalle");
    if (botonDetalle !== null) {
      let reserva = pSistemaReservas.buscarReservaPorId(botonDetalle.dataset.id);
      if (reserva !== null) {
        mostrarDetalle(reserva);
      }
    }
  }

  function volverDeCancelacion() {
    dialogoCancelar.close();
  }

  function confirmarCancelacion() {
    if (pSistemaReservas.eliminarReserva(idReservaSeleccionada)) {
      pGuardarReservas();
      mostrarReservas();
      dialogoCancelar.close();
      dialogoExito.showModal();
    }
  }

  function aceptarCancelacion() {
    dialogoExito.close();
    location.hash = "#panel";
  }

  mostrarReservas();
}
