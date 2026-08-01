class SistemaReservas {
  constructor(pReservas = []) {
    this.reservas = [];
    this.cargarReservas(pReservas);
  }

  cargarReservas(pReservas) {
    for (let i = 0; i < pReservas.length; i++) {

      let datos = pReservas[i];
      let reserva = new Reserva(datos.id, datos.nombre, datos.correo, datos.celular, datos.fechaIngreso, datos.fechaSalida, datos.habitacion, datos.cantidadHuespedes, datos.servicios || [], datos.comentarios);
      this.reservas.push(reserva);
    }
  }

  validarReserva(pDatos) {
    
    let errores = {};
    let cantidadErrores = 0;
    let cantidadHuespedes = Number(pDatos.cantidadHuespedes);
    let capacidadHabitacion = this.obtenerCapacidadHabitacion(pDatos.habitacion);
    let correo = pDatos.correo.trim();
    let celularSinEspacios = pDatos.celular.replaceAll(" ", "");

    if (pDatos.nombre.trim() === "") {
      errores.nombre = "El nombre completo es obligatorio.";
      cantidadErrores++;
    }
    if (correo === "" || !correo.includes("@") || !correo.includes(".")) {
      errores.correo = "Ingresa un correo electrónico válido.";
      cantidadErrores++;
    }
    if (celularSinEspacios.length !== 9 || !celularSinEspacios.startsWith("09") || isNaN(celularSinEspacios)) {
      errores.celular = "Usa el formato 09* *** ***.";
      cantidadErrores++;
    }
    if (pDatos.fechaIngreso === "") {
      errores.fechaIngreso = "Selecciona una fecha de ingreso.";
      cantidadErrores++;
    }
    if (pDatos.fechaSalida === "") {
      errores.fechaSalida = "Selecciona una fecha de salida.";
      cantidadErrores++;
    }
    if (pDatos.fechaIngreso !== "" && pDatos.fechaSalida !== "" && pDatos.fechaSalida <= pDatos.fechaIngreso) {
      errores.fechaSalida = "La salida debe ser posterior al ingreso.";
      cantidadErrores++;
    }
    if (pDatos.habitacion === "") {
      errores.habitacion = "Selecciona un tipo de habitación.";
      cantidadErrores++;
    }
    if (cantidadHuespedes < 1) {
      errores.cantidadHuespedes = "La cantidad de huéspedes debe ser mayor a 0.";
      cantidadErrores++;
    } else if (capacidadHabitacion > 0 && cantidadHuespedes > capacidadHabitacion) {
      errores.cantidadHuespedes = "La habitación seleccionada admite un máximo de " + capacidadHabitacion + " huéspedes.";
      cantidadErrores++;
    }

    if (cantidadErrores === 0 && this.hayChoqueDeReservas(pDatos)) {
      errores.habitacion = "Ya existe una reserva para esa habitación en esas fechas.";
    }

    return errores;
  }

  obtenerCapacidadHabitacion(pHabitacion) {
    let capacidades = { Básica: 3, Premium: 3, Luxury: 3, Ejecutiva: 3 };
    let capacidad = 0;

    if (capacidades[pHabitacion] !== undefined) {
      capacidad = capacidades[pHabitacion];
    }

    return capacidad;
  }

  hayChoqueDeReservas(pDatos) {
    let hayChoque = false;
    let i = 0;

    while (i < this.reservas.length && !hayChoque) {
      let reservaActual = this.reservas[i];

      if (reservaActual.habitacion === pDatos.habitacion && pDatos.fechaIngreso < reservaActual.fechaSalida && pDatos.fechaSalida > reservaActual.fechaIngreso) {
        hayChoque = true;
      }
      i++;
    }

    return hayChoque;
  }

  agregarReserva(pDatos) {
    let nuevaReserva = new Reserva(Date.now(), pDatos.nombre.trim(), pDatos.correo.trim().toLowerCase(), pDatos.celular.trim(), pDatos.fechaIngreso, pDatos.fechaSalida, pDatos.habitacion, Number(pDatos.cantidadHuespedes), pDatos.servicios, pDatos.comentarios.trim());

    this.reservas.push(nuevaReserva);
    return nuevaReserva;
  }

  buscarReservas(pTexto) {
    let reservasEncontradas = [];
    let textoBuscado = pTexto.trim().toLowerCase();

    for (let i = 0; i < this.reservas.length; i++) {
      let reservaActual = this.reservas[i];
      if (reservaActual.nombre.toLowerCase().includes(textoBuscado) || reservaActual.correo.toLowerCase().includes(textoBuscado)) {
        reservasEncontradas.push(reservaActual);
      }
    }

    return reservasEncontradas;
  }

  buscarReservaPorId(pId) {
    let reservaEncontrada = null;
    let i = 0;

    while (i < this.reservas.length && reservaEncontrada === null) {
      let reservaActual = this.reservas[i];
      if (String(reservaActual.id) === String(pId)) {
        reservaEncontrada = reservaActual;
      }
      i++;
    }

    return reservaEncontrada;
  }

  eliminarReserva(pId) {
    let eliminada = false;
    let i = 0;

    while (i < this.reservas.length && !eliminada) {
      if (String(this.reservas[i].id) === String(pId)) {
        this.reservas.splice(i, 1);
        eliminada = true;
      }
      i++;
    }

    return eliminada;
  }

  calcularNoches(pReserva) {
    let ingreso = new Date(pReserva.fechaIngreso);
    let salida = new Date(pReserva.fechaSalida);
    let milisegundosPorDia = 1000 * 60 * 60 * 24;

    return (salida - ingreso) / milisegundosPorDia;
  }
}

if (typeof module !== "undefined") {
  module.exports = {
    SistemaReservas
  };
}

