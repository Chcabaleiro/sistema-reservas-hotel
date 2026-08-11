
let SistemaReservas = require("../core/reservas").SistemaReservas;

test("calcula tres noches de estadia", function() {
  let sistema = new SistemaReservas();

  let reserva = {
    fechaIngreso: "2026-08-10",
    fechaSalida: "2026-08-13"
  };

  let resultado = sistema.calcularNoches(reserva);

  expect(resultado).toBe(3);
});

test("control fecha ingreso", function() {
 let sistema = new SistemaReservas();

  let reserva = {
    nombre: "Juan Perez",
    correo: "juan@correo.com",
    celular: "099123456",
    fechaIngreso: "",
    fechaSalida: "2026-08-13",
    habitacion: "Premium",
    cantidadHuespedes: 2
  };

  let resultado = sistema.validarReserva(reserva);

  expect(resultado.fechaIngreso).toBe("Selecciona una fecha de ingreso.");
});

test("control correo electronico", function() {
  let sistema = new SistemaReservas();

  let reserva = {
    nombre: "Juan Perez",
    correo: "juancorreo.com",
    celular: "099123456",
    fechaIngreso: "2026-08-10",
    fechaSalida: "2026-08-13",
    habitacion: "Premium",
    cantidadHuespedes: 2
  };

  let resultado = sistema.validarReserva(reserva);

  expect(resultado.correo).toBeTruthy();
});

test("control cantidad de huespedes mayor a cero", function() {
  let sistema = new SistemaReservas();

  let reserva = {
    nombre: "Juan Perez",
    correo: "juan@correo.com",
    celular: "099123456",
    fechaIngreso: "2026-08-10",
    fechaSalida: "2026-08-13",
    habitacion: "Premium",
    cantidadHuespedes: 0
  };

  let resultado = sistema.validarReserva(reserva);

  expect(resultado.cantidadHuespedes).toBeTruthy();
});

test("control fecha de salida posterior al ingreso", function() {
  let sistema = new SistemaReservas();

  let reserva = {
    nombre: "Juan Perez",
    correo: "juan@correo.com",
    celular: "099123456",
    fechaIngreso: "2026-08-13",
    fechaSalida: "2026-08-10",
    habitacion: "Premium",
    cantidadHuespedes: 2
  };

  let resultado = sistema.validarReserva(reserva);

  expect(resultado.fechaSalida).toBeTruthy();
});

test("control nombre obligatorio", function() {
  let sistema = new SistemaReservas();

  let reserva = {
    nombre: "",
    correo: "juan@correo.com",
    celular: "099123456",
    fechaIngreso: "2026-08-10",
    fechaSalida: "2026-08-13",
    habitacion: "Premium",
    cantidadHuespedes: 2
  };

  let resultado = sistema.validarReserva(reserva);

  expect(resultado.nombre).toBeTruthy();
});

test("control formato del celular", function() {
  let sistema = new SistemaReservas();

  let reserva = {
    nombre: "Juan Perez",
    correo: "juan@correo.com",
    celular: "1234",
    fechaIngreso: "2026-08-10",
    fechaSalida: "2026-08-13",
    habitacion: "Premium",
    cantidadHuespedes: 2
  };

  let resultado = sistema.validarReserva(reserva);

  expect(resultado.celular).toBeTruthy();
});

test("control fecha de salida obligatoria", function() {
  let sistema = new SistemaReservas();

  let reserva = {
    nombre: "Juan Perez",
    correo: "juan@correo.com",
    celular: "099123456",
    fechaIngreso: "2026-08-10",
    fechaSalida: "",
    habitacion: "Premium",
    cantidadHuespedes: 2
  };

  let resultado = sistema.validarReserva(reserva);

  expect(resultado.fechaSalida).toBeTruthy();
});

test("control tipo de habitacion obligatorio", function() {
  let sistema = new SistemaReservas();

  let reserva = {
    nombre: "Juan Perez",
    correo: "juan@correo.com",
    celular: "099123456",
    fechaIngreso: "2026-08-10",
    fechaSalida: "2026-08-13",
    habitacion: "",
    cantidadHuespedes: 2
  };

  let resultado = sistema.validarReserva(reserva);

  expect(resultado.habitacion).toBeTruthy();
});

test("control capacidad maxima de la habitacion", function() {
  let sistema = new SistemaReservas();

  let reserva = {
    nombre: "Juan Perez",
    correo: "juan@correo.com",
    celular: "099123456",
    fechaIngreso: "2026-08-10",
    fechaSalida: "2026-08-13",
    habitacion: "Premium",
    cantidadHuespedes: 4
  };

  let resultado = sistema.validarReserva(reserva);

  expect(resultado.cantidadHuespedes).toBeTruthy();
});

test("control choque de reservas", function() {
  let sistema = new SistemaReservas();

  sistema.reservas.push({
    habitacion: "Premium",
    fechaIngreso: "2026-08-10",
    fechaSalida: "2026-08-13"
  });

  let reserva = {
    nombre: "Juan Perez",
    correo: "juan@correo.com",
    celular: "099123456",
    fechaIngreso: "2026-08-11",
    fechaSalida: "2026-08-14",
    habitacion: "Premium",
    cantidadHuespedes: 2
  };

  let resultado = sistema.validarReserva(reserva);

  expect(resultado.habitacion).toBeTruthy();
});

test("acepta una reserva con datos validos", function() {
  let sistema = new SistemaReservas();

  let reserva = {
    nombre: "Juan Perez",
    correo: "juan@correo.com",
    celular: "099123456",
    fechaIngreso: "2099-08-10",
    fechaSalida: "2099-08-13",
    habitacion: "Premium",
    cantidadHuespedes: 2
  };

  let resultado = sistema.validarReserva(reserva);

  expect(resultado).toEqual({});
});
