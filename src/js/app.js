// alert('Hola desde Byduk');

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    //encontra donde esta ubicado
    navegacionFija();
    crearGaleria();
    //para que recorra de una sección a otra
    scrolNav();
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', function () {
        // console.log(sobreFestival.getBoundingClientRect() );

        //para saber si se pasamos donde queremos ubicar la barra
        if(sobreFestival.getBoundingClientRect().top<0 ) {
            // console.log('Ya pasamos el elemento');
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }else{
            // console.log('Aún no...');
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrolNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    //se hace una iteración con forEach
    enlaces.forEach( enlace => {
       enlace.addEventListener('click', function (e) {
        e.preventDefault();

        const seccionScroll = e.target.attributes.href.value;
        const seccion = document.querySelector(seccionScroll);
        seccion.scrollIntoView({behavior: "smooth"}); //por default 
        // console.log(e.target.attributes.href.value);
        
       }); 
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    // galeria.textContent = 'Vamos a crear la galeria';

    for(let i = 1; i <= 12; i++) {
        // console.log(i); 
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" 
            alt="Imagen Galeria">
        `;
        imagen.onclick = function () {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
        // console.log(imagen);
    }
}

//funcion para la imagen grande
function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" 
        alt="Imagen Galeria">
    `;

    // Crea el Overlay on la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    //cuando el usuario le da en cualquier parte cierre la imagen grande
    overlay.onclick = function () {
        const body = document.querySelector('body');        
        body.classList.remove('fijar-body');
        overlay.remove();   
    }

    // Boton para cerrar el Modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function () {
        const body = document.querySelector('body');        
        body.classList.remove('fijar-body');
        overlay.remove();        
    }
    // Lo agregamos al overlay
    overlay.appendChild(cerrarModal);

    // Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}