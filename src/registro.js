function iniciarRegistro(pSistemaUsuarios,pGuardarUsuarios,pCuandoCompletaRegistro) {
  
  let formulario = document.getElementById("formulario-registro");
  let mensajeError = document.getElementById("error-registro");

  document.querySelector("#formulario-registro").addEventListener("submit", registrarUsuario);

  function registrarUsuario(pEvento) {
    pEvento.preventDefault();

    let nombre = document.querySelector("#txtNombreRegistro").value;
    let apellido = document.querySelector("#txtApellidoRegistro").value;
    let correo = document.querySelector("#txtCorreoRegistro").value;
    let celular = document.querySelector("#txtCelularRegistro").value;
    let fechaNacimiento = document.querySelector("#txtFechaNacimientoRegistro").value;
    let contrasenia = document.querySelector("#txtContraseniaRegistro").value;
    let confirmacion = document.querySelector("#txtConfirmacionRegistro").value;
    let aceptaTerminos = document.querySelector("#chkTerminosRegistro").checked;
    let datos = { nombre: nombre, apellido: apellido, correo: correo, celular: celular, fechaNacimiento: fechaNacimiento, contrasenia: contrasenia, confirmacion: confirmacion, aceptaTerminos: aceptaTerminos };

    let resultado = pSistemaUsuarios.registrarCliente(datos);

    if (resultado.usuario === null) {
      mensajeError.textContent = resultado.mensaje;
      mensajeError.hidden = false;
    } else {
      mensajeError.hidden = true;
      pGuardarUsuarios();
      formulario.reset();
      pCuandoCompletaRegistro();
    }
  }
}
