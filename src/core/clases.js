class Cliente {
  constructor(
    pNombre,
    pApellido,
    pCorreo,
    pCelular,
    pFechaNacimiento,
    pContrasenia
  ) {
    this.nombre = pNombre;
    this.apellido = pApellido;
    this.correo = pCorreo;
    this.celular = pCelular;
    this.fechaNacimiento = pFechaNacimiento;
    this.contrasenia = pContrasenia;
    this.rol = "cliente";
  }
}

class Administrador {
  constructor(
    pNombre,
    pApellido,
    pCorreo,
    pContrasenia
  ) {
    this.nombre = pNombre;
    this.apellido = pApellido;
    this.correo = pCorreo;
    this.contrasenia = pContrasenia;
    this.rol = "administradora";
  }
}

class Reserva {
  constructor(
    pId,
    pNombre,
    pCorreo,
    pCelular,
    pFechaIngreso,
    pFechaSalida,
    pHabitacion,
    pCantidadHuespedes,
    pServicios,
    pComentarios
  ) {
    this.id = pId;
    this.nombre = pNombre;
    this.correo = pCorreo;
    this.celular = pCelular;
    this.fechaIngreso = pFechaIngreso;
    this.fechaSalida = pFechaSalida;
    this.habitacion = pHabitacion;
    this.cantidadHuespedes = pCantidadHuespedes;
    this.servicios = pServicios;
    this.comentarios = pComentarios;
    this.estado = "Confirmada";
  }
}
