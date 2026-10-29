const fotos = [
    { src: "img/foto1.jpg", descripcion: "Un recuerdo que vive en el corazón" },
    { src: "img/foto2.jpg", descripcion: "Momentos que nunca olvidaremos" },
    { src: "img/foto3.jpg", descripcion: "Su cariño nos acompaña" },
    { src: "img/foto4.jpg", descripcion: "Siempre presente en nuestra memoria" }
];

let indice = 0;
const imagen = document.getElementById("imagenOfrenda");
const descripcion = document.getElementById("descripcion");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");
const puntos = document.getElementById("puntos");
const audio = document.getElementById("musica");
const btnMusica = document.getElementById("btnMusica");
const iconoMusica = document.getElementById("iconoMusica");
const textoMusica = document.getElementById("textoMusica");

function crearIndicadores() {
    puntos.innerHTML = "";
    fotos.forEach((_, i) => {
        const punto = document.createElement("span");
        punto.classList.add("punto");
        if (i === indice) punto.classList.add("activo");
        punto.addEventListener("click", () => {
            indice = i;
            mostrarFoto(indice);
            reiniciarIntervalo();
        });
        puntos.appendChild(punto);
    });
}

function mostrarFoto(nuevoIndice) {
    indice = (nuevoIndice + fotos.length) % fotos.length;
    imagen.src = fotos[indice].src;
    descripcion.textContent = fotos[indice].descripcion;
    actualizarIndicadores();
}

function actualizarIndicadores() {
    const puntosElements = document.querySelectorAll(".punto");
    puntosElements.forEach((punto, i) => {
        punto.classList.toggle("activo", i === indice);
    });
}

// Eventos de navegación
anterior.addEventListener("click", () => {
    mostrarFoto(indice - 1);
    reiniciarIntervalo();
});

siguiente.addEventListener("click", () => {
    mostrarFoto(indice + 1);
    reiniciarIntervalo();
});

// Reproducir o pausar música
btnMusica.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        iconoMusica.textContent = "❚❚";
        textoMusica.textContent = "Pausar música";
        btnMusica.classList.add("activo");
    } else {
        audio.pause();
        audio.currentTime = 0;
        iconoMusica.textContent = "▶";
        textoMusica.textContent = "Reproducir música";
        btnMusica.classList.remove("activo");
    }
});

// Cambio automático de imágenes cada 6 segundos
let intervalo = setInterval(() => {
    mostrarFoto(indice + 1);
}, 6000);

function reiniciarIntervalo() {
    clearInterval(intervalo);
    intervalo = setInterval(() => {
        mostrarFoto(indice + 1);
    }, 6000);
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    crearIndicadores();
    mostrarFoto(0);
});
