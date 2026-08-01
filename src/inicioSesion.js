function iniciarFormularioInicioSesion(pSistemaUsuarios, pCuandoIniciaSesion) {
  
  let formulario = document.getElementById("formulario-inicio-sesion");
  let mensajeError = document.getElementById("error-inicio-sesion");
  let mensajeRegistroExitoso = document.getElementById("mensaje-registro-exitoso");
  let campoContrasenia = document.querySelector("#txtContraseniaIngreso");

  document.querySelector("#boton-ver-contrasenia").addEventListener("click", mostrarOcultarContrasenia);
  document.querySelector("#formulario-inicio-sesion").addEventListener("submit", ingresar);

  function mostrarOcultarContrasenia() {
    if (campoContrasenia.type === "password") {
      campoContrasenia.type = "text";
    } else {
      campoContrasenia.type = "password";
    }
  }

  function ingresar(pEvento) {
    
    pEvento.preventDefault();
    mensajeRegistroExitoso.hidden = true;

    let correo = document.querySelector("#txtCorreoIngreso").value;
    let contrasenia = document.querySelector("#txtContraseniaIngreso").value;
    let usuario = pSistemaUsuarios.iniciarSesion(correo, contrasenia);

    if (usuario === null) {
      mensajeError.hidden = false;
    } else {
      mensajeError.hidden = true;
      formulario.reset();
      pCuandoIniciaSesion(usuario);
    }
  }
}
