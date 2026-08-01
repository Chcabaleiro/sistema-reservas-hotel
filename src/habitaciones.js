function iniciarHabitaciones() {
  let botonesReserva = document.querySelectorAll(".boton-reservar-habitacion");
  let opcionesHabitacion = document.querySelectorAll('input[name="tarjetaHabitacion"]');

  function reservarHabitacion(pEvento) {
    let botonSeleccionado = pEvento.currentTarget;
    let habitacionElegida = botonSeleccionado.dataset.habitacion;
    document.querySelector("#slcHabitacion").value = habitacionElegida;

    for (let i = 0; i < opcionesHabitacion.length; i++) {
      
      opcionesHabitacion[i].checked = opcionesHabitacion[i].value === habitacionElegida;
    }

    location.hash = "#reserva";
  }

  for (let i = 0; i < botonesReserva.length; i++) {
    botonesReserva[i].addEventListener("click",reservarHabitacion);
  }
}
