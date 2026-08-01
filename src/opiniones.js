const opinionesHuespedes = [
  {
    nombre: "María González",
    ubicacion: "Montevideo, Uruguay",
    iniciales: "MG",
    clasePerfil: "perfil-maria",
    comentario: "Una experiencia increíble. La vista es espectacular y la atención del personal es excelente. ¡Volveremos!",
    habitacion: "Premium",
  },
  {
    nombre: "Javier Morales",
    ubicacion: "Buenos Aires, Argentina",
    iniciales: "JM",
    clasePerfil: "perfil-javier",
    comentario: "El lugar perfecto para desconectar y descansar. Las instalaciones son de primera y el entorno es precioso.",
    habitacion: "Luxury",
  },
  {
    nombre: "Carolina Pérez",
    ubicacion: "Rosario, Argentina",
    iniciales: "CP",
    clasePerfil: "perfil-carolina",
    comentario: "Todo impecable, desde la limpieza hasta los servicios. El desayuno fue excelente. Muy recomendado.",
    habitacion: "Básica",
  },
  {
    nombre: "Lucía Martínez",
    ubicacion: "Canelones, Uruguay",
    iniciales: "LM",
    clasePerfil: "perfil-lucia",
    comentario: "Nos sentimos como en casa. La ubicación frente al mar y la calidez del equipo hicieron la diferencia.",
    habitacion: "Ejecutiva",
  },
  {
    nombre: "Pedro Silva",
    ubicacion: "Porto Alegre, Brasil",
    iniciales: "PS",
    clasePerfil: "perfil-pedro",
    comentario: "Un hotel tranquilo, cómodo y con una atención muy cuidada. La piscina y el desayuno son excelentes.",
    habitacion: "Premium",
  },
  {
    nombre: "Ana Torres",
    ubicacion: "Maldonado, Uruguay",
    iniciales: "AT",
    clasePerfil: "perfil-ana",
    comentario: "Ideal para una escapada. La habitación tenía una vista hermosa y todo el personal fue muy amable.",
    habitacion: "Luxury",
  },
];

function armarTarjetaOpinion(pOpinion) {
  return `
    <article class="tarjeta-opinion">
      <div class="encabezado-opinion">
        <div>
          <h2>${pOpinion.nombre}</h2>
          <span>${pOpinion.ubicacion}</span>
        </div>
        <span class="imagen-opinion ${pOpinion.clasePerfil}">
          ${pOpinion.iniciales}
        </span>
      </div>
      <div class="estrellas" aria-label="5 de 5 estrellas">★★★★★</div>
      <p>“${pOpinion.comentario}”</p>
      <small>Estadía en habitación ${pOpinion.habitacion}</small>
    </article>
  `;
}

function cargarOpiniones() {
  const CANTIDAD_POR_PAGINA = 3;
  let contenedor = document.getElementById("contenedor-opiniones");
  let contenedorPuntos = document.getElementById("puntos-opiniones");
  let contenidoOpiniones = "";
  let contenidoPuntos = "";
  let cantidadPaginas = Math.ceil(opinionesHuespedes.length / CANTIDAD_POR_PAGINA);

  for (let pagina = 0; pagina < cantidadPaginas; pagina++) {
    let atributoOculto = pagina === 0 ? "" : " hidden";
    contenidoOpiniones += `<div class="pagina-opiniones"${atributoOculto}>`;

    let posicionInicial = pagina * CANTIDAD_POR_PAGINA;
    let posicionFinal = posicionInicial + CANTIDAD_POR_PAGINA;

    for (let i = posicionInicial; i < posicionFinal && i < opinionesHuespedes.length; i++) {
      contenidoOpiniones += armarTarjetaOpinion(opinionesHuespedes[i]);
    }

    contenidoOpiniones += "</div>";

    let claseActiva = pagina === 0 ? " activo" : "";
    contenidoPuntos += `<button class="punto-opinion${claseActiva}" ` + `type="button" aria-label="Mostrar página ${pagina + 1}"></button>`;
  }

  contenedor.innerHTML = contenidoOpiniones;
  contenedorPuntos.innerHTML = contenidoPuntos;

  let opinionesInicio = document.getElementById("opiniones-inicio");
  let contenidoInicio = "";

  for (let i = 0; i < 3 && i < opinionesHuespedes.length; i++) {
    contenidoInicio += armarTarjetaOpinion(opinionesHuespedes[i]);
  }

  opinionesInicio.innerHTML = contenidoInicio;
}

function iniciarOpiniones() {
  cargarOpiniones();

  let diapositivas = document.querySelectorAll(".pagina-opiniones");
  let puntos = document.querySelectorAll(".punto-opinion");
  let botonAnterior = document.getElementById("boton-opiniones-anterior");
  let botonSiguiente = document.getElementById("boton-opiniones-siguiente");
  let posicionActual = 0;

  function mostrarDiapositiva(pPosicion) {
    posicionActual = pPosicion;

    for (let i = 0; i < diapositivas.length; i++) {
      diapositivas[i].hidden = i !== posicionActual;
      puntos[i].classList.toggle("activo", i === posicionActual);
    }
  }

  function mostrarOpinionesAnteriores() {
    let posicionAnterior = posicionActual - 1;
    if (posicionAnterior < 0) {
      posicionAnterior = diapositivas.length - 1;
    }
    mostrarDiapositiva(posicionAnterior);
  }

  function mostrarOpinionesSiguientes() {
    let posicionSiguiente = posicionActual + 1;
    if (posicionSiguiente >= diapositivas.length) {
      posicionSiguiente = 0;
    }
    mostrarDiapositiva(posicionSiguiente);
  }

  function seleccionarDiapositiva(pEvento) {
    let posicion = Number(pEvento.currentTarget.dataset.posicion);
    mostrarDiapositiva(posicion);
  }

  botonAnterior.addEventListener("click", mostrarOpinionesAnteriores);
  botonSiguiente.addEventListener("click", mostrarOpinionesSiguientes);

  for (let i = 0; i < puntos.length; i++) {
    puntos[i].dataset.posicion = i;
    puntos[i].addEventListener("click", seleccionarDiapositiva);
  }
}
