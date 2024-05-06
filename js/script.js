let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

fetch("/data/cursos.json")
    .then(res => res.json())
    .then(data => mostrarCursos(data));

const contenedorCursos = document.querySelector("#cursos");
const carritoVacio = document.querySelector("#carrito-vacio");
const cursosEnCarrito = document.querySelector("#carrito-cursos");
const carritoTotal = document.querySelector("#carrito-total");

//Funcion que agrega los productos del archivo cursos.json a la pantalla del navegador
const mostrarCursos = (cursos) => {

cursos.forEach((curso) => {
    const div = document.createElement("div");
    div.classList.add("curso", "shadow");
    div.innerHTML = `
    <img class="curso-img" src="${curso.img}" alt="Curso de liderazgo presencial">
    <h3>${curso.titulo}</h3>
    <p>Precio: $${curso.precio}</p>
    <p>Modalidad: ${curso.modalidad}</p>
    `;
    const boton = document.createElement("button");
    boton.classList.add("curso-btn");
    boton.innerText = "Agregar al carrito"
    boton.addEventListener("click", () => {
        agregarAlCarrito(curso);
    });
    div.append(boton);

    contenedorCursos.append(div);
});
}

// Función para agregar los productos en el carrito y enviarlos a la página carrito.html
function crearCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("display-none");
        cursosEnCarrito.classList.add("display-none");
    } else {
        carritoVacio.classList.add("display-none");
        cursosEnCarrito.classList.remove("display-none");

        cursosEnCarrito.innerHTML = "";
        carrito.forEach((curso) => {
            const div = document.createElement("div");
            div.classList.add("curso-carrito");
            div.innerHTML = `
            <img class="img-carrito" src="${curso.img}" alt="Curso de liderazgo presencial">
            <h3 class="carrito-texto">${curso.titulo}</h3>
            <p class="carrito-texto">Modalidad: ${curso.modalidad}</p>
            <p class="carrito-texto">Precio: $${curso.precio}</p>
            <p class="carrito-texto">Cant: ${curso.cantidad}</p>
            <p class="carrito-texto">Subt: $${curso.precio * curso.cantidad}</p>
            `;

            const botonSacar = document.createElement("buttom");
            botonSacar.classList.add("btn-carrito");
            botonSacar.innerText = "–";
            botonSacar.addEventListener("click", () => {
                restarCurso(curso)
            });

            const botonAgregar = document.createElement("buttom");
            botonAgregar.classList.add("btn-carrito");
            botonAgregar.innerText = "+";
            botonAgregar.addEventListener("click", () => {
                sumarCurso(curso)
            });
            
            const botonEliminar = document.createElement("buttom");
            botonEliminar.classList.add("btn-carrito");
            botonEliminar.innerText = "X";
            botonEliminar.addEventListener("click", () => {
                borrarCurso(curso)
            });
            div.append(botonSacar);
            div.append(botonAgregar);
            div.append(botonEliminar);

            cursosEnCarrito.append(div);
        })
    }
    actualizarTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


//Funcion para agregar los cursos al carrito
function agregarAlCarrito(curso) {
    const cursoEnCarrito = carrito.find(el => el.titulo === curso.titulo && el.modalidad === curso.modalidad);
    if (cursoEnCarrito) {
        cursoEnCarrito.cantidad++;
    } else {
        carrito.push({...curso, cantidad: 1});
    }
    crearCarrito();

    Toastify({
        text: curso.titulo + " " + curso.modalidad + " se agregó al carrito",
        gravity: "bottom",
        duration: 1000,
        style: {
          background: "#EA5153",
        }

      }).showToast();
}

function borrarCurso(curso) {
    const indiceDelCurso = carrito.findIndex(el => el.titulo === curso.titulo && el.modalidad === curso.modalidad);
    carrito.splice(indiceDelCurso, 1);
    crearCarrito();
}

function restarCurso(curso) {
    curso.cantidad === 1 ? borrarCurso(curso) : curso.cantidad--;
    crearCarrito();
}

function sumarCurso(curso) {
    curso.cantidad++;
    crearCarrito();
}

function actualizarTotal() {
    const total = carrito.reduce((acc, cur) => acc + (cur.precio * cur.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
}

crearCarrito()