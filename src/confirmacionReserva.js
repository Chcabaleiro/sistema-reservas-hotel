function formatearFechaConfirmacion(pFecha) {
  let partesFecha = pFecha.split("-");
  return partesFecha.reverse().join("/");
}

function colocarTextoConfirmacion(pIdentificador, pTexto) {
  let elemento = document.getElementById(pIdentificador);
  elemento.textContent = pTexto;
}

function mostrarConfirmacionReserva(pReserva) {
  colocarTextoConfirmacion("confirmacion-nombre", pReserva.nombre);
  colocarTextoConfirmacion("confirmacion-correo", pReserva.correo);
  colocarTextoConfirmacion("confirmacion-celular", pReserva.celular);
  colocarTextoConfirmacion("confirmacion-ingreso",formatearFechaConfirmacion(pReserva.fechaIngreso));
  colocarTextoConfirmacion("confirmacion-salida",formatearFechaConfirmacion(pReserva.fechaSalida));
  colocarTextoConfirmacion("confirmacion-habitacion", pReserva.habitacion);
  colocarTextoConfirmacion("confirmacion-huespedes",String(pReserva.cantidadHuespedes));

  let textoServicios = "Ninguno";

  if (pReserva.servicios.length > 0) {
    textoServicios = pReserva.servicios.join(", ");
  }
  
  colocarTextoConfirmacion("confirmacion-servicios", textoServicios);

  let textoComentarios = "Sin comentarios";
  if (pReserva.comentarios !== "") {
    textoComentarios = pReserva.comentarios;
  }
  colocarTextoConfirmacion("confirmacion-comentarios", textoComentarios);

  location.hash = "#confirmacion";
}
