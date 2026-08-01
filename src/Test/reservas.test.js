
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

