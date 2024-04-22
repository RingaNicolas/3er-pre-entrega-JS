let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carritoVacio = document.querySelector("#carrito-vacio");
const cursosEnCarrito = document.querySelector("#carrito-cursos");
const carritoTotal = document.querySelector("#carrito-total");
const finalizarCompra = document.querySelector("#finalizar-compra");

// Función reutilizada de script.js para mostrar los cursos en el carrito en carrito.html
function crearCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("display-none");
        cursosEnCarrito.classList.add("display-none");
        finalizarCompra.classList.add("display-none");
    } else {
        carritoVacio.classList.add("display-none");
        cursosEnCarrito.classList.remove("display-none");
        finalizarCompra.classList.remove("display-none")

        cursosEnCarrito.innerHTML = "";
        carrito.forEach((curso) => {
            const div = document.createElement("div");
            div.classList.add("curso-carrito");
            div.innerHTML = `
            <img class="img-carrito" src=".${curso.img}" alt="${curso.titulo, curso.modalidad}">
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

//Función para borrar en su totalidad el curso seleccionado independientemente de la cantidad
function borrarCurso(curso) {
    const indiceDelCurso = carrito.findIndex(el => el.titulo === curso.titulo && el.modalidad === curso.modalidad);
    carrito.splice(indiceDelCurso, 1);
    crearCarrito();
}

//Función para disminuir en 1 unidad la cantidad del curso seleccionado
function restarCurso(curso) {
    curso.cantidad === 1 ? borrarCurso(curso) : curso.cantidad--;
    crearCarrito();

}

//Función para aumentar en 1 unidad la cantidad del curso seleccionado
function sumarCurso(curso) {
    curso.cantidad++;
    crearCarrito();
}

//Función para mostrar la suma de los precios de los cursos elegidos
function actualizarTotal() {
    const total = carrito.reduce((acc, cur) => acc + (cur.precio * cur.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
}

crearCarrito();

//Boton que simula la finalización de la compra eliminando todos los elementos tanto del carrito como del localStorage
const botonFinalizarCompra = document.createElement("buttom");
botonFinalizarCompra.classList.add("btn-finalizar-compra");
botonFinalizarCompra.innerText = "Finalizar compra";
botonFinalizarCompra.addEventListener("click", () => {
    localStorage.clear();
    carrito = [];
    crearCarrito();
});

finalizarCompra.append(botonFinalizarCompra);
