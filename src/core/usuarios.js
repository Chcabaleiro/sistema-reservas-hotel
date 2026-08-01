class SistemaUsuarios {
  constructor(pUsuariosRegistrados = []) {
    this.usuarios = [];
    this.precargarUsuarios();
    this.cargarUsuarios(pUsuariosRegistrados);
  }

  precargarUsuarios() {
    let administradora = new Administrador("Carolina", "Méndez", "carolinamendez@lasgaviotas.com", "caro1234");

    this.usuarios.push(administradora);
  }

  cargarUsuarios(pUsuarios) {
    for (let i = 0; i < pUsuarios.length; i++) {
      let datos = pUsuarios[i];
      if (this.buscarUsuarioPorCorreo(datos.correo) === null) {
        let usuario = new Cliente(datos.nombre, datos.apellido, datos.correo, datos.celular, datos.fechaNacimiento, datos.contrasenia);
        this.usuarios.push(usuario);
      }
    }
  }

  buscarUsuarioPorCorreo(pCorreo) {
    let usuarioEncontrado = null;
    let i = 0;

    while (i < this.usuarios.length && usuarioEncontrado === null) {
      if (this.usuarios[i].correo === pCorreo.trim().toLowerCase()) {
        usuarioEncontrado = this.usuarios[i];
      }
      i++;
    }

    return usuarioEncontrado;
  }

  registrarCliente(pDatos) {
    let resultado = { usuario: null, mensaje: "" };
    let correo = pDatos.correo.trim();

    if (pDatos.nombre.trim() === "" || pDatos.apellido.trim() === "" || correo === "" || pDatos.contrasenia === "") {

      resultado.mensaje = "Completá los campos obligatorios.";
    } else if (!correo.includes("@") || !correo.includes(".")) {

      resultado.mensaje = "Ingresá un correo electrónico válido.";
    } else if (this.buscarUsuarioPorCorreo(pDatos.correo) !== null) {

      resultado.mensaje = "Ya existe una cuenta con ese correo.";
    } else if (pDatos.contrasenia.length < 4) {

      resultado.mensaje = "La contraseña debe tener al menos 4 caracteres.";
    } else if (pDatos.contrasenia !== pDatos.confirmacion) {

      resultado.mensaje = "Las contraseñas no coinciden.";
    } else if (!pDatos.aceptaTerminos) {

      resultado.mensaje = "Debés aceptar los términos y condiciones.";
    } else {

      let usuario = new Cliente(pDatos.nombre.trim(), pDatos.apellido.trim(), pDatos.correo.trim().toLowerCase(), pDatos.celular.trim(), pDatos.fechaNacimiento, pDatos.contrasenia);
      this.usuarios.push(usuario);
      resultado.usuario = usuario;
    }

    return resultado;
  }

  iniciarSesion(pCorreo, pContrasenia) {
    let usuarioEncontrado = null;
    let i = 0;

    while (i < this.usuarios.length && usuarioEncontrado === null) {
      let usuarioActual = this.usuarios[i];
      if (usuarioActual.correo === pCorreo.trim().toLowerCase() && usuarioActual.contrasenia === pContrasenia) {
        
        usuarioEncontrado = usuarioActual;
      }
      i++;
    }

    return usuarioEncontrado;
  }

  puedeVerListado(pUsuario) {
    return pUsuario !== null && pUsuario.rol === "administradora";
  }
}
