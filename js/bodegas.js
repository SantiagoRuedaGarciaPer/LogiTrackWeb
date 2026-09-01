const API_URL = "http://localhost:8080/LogiTrack/api";

const contenido = document.getElementById("contenido");

const token = localStorage.getItem("token");


// =========================
// VERIFICAR TOKEN
// =========================

if (!token) {
    window.location.href = "index.html";
}


// =========================
// CERRAR SESIÓN
// =========================

document.getElementById("btnCerrarSesion").addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "index.html";
});


// =========================
// HEADERS
// =========================

function obtenerHeaders() {

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}


// =========================
// CREAR BODEGA
// =========================

document.getElementById("btnCrear").addEventListener("click", () => {

    contenido.innerHTML = `

        <h3>Crear bodega</h3>

        <form id="formCrear">

            <div class="form-group">

                <label>Nombre</label>

                <input
                    type="text"
                    id="nombre"
                    minlength="3"
                    maxlength="50"
                    required
                >

            </div>


            <div class="form-group">

                <label>Ubicación</label>

                <input
                    type="text"
                    id="ubicacion"
                    minlength="3"
                    maxlength="50"
                    required
                >

            </div>


            <div class="form-group">

                <label>Capacidad</label>

                <input
                    type="number"
                    id="capacidad"
                    min="0.01"
                    step="0.01"
                    required
                >

            </div>


            <button
                type="submit"
                class="form-button"
            >
                Crear bodega
            </button>

        </form>

        <div id="resultado"></div>
    `;


    document
        .getElementById("formCrear")
        .addEventListener("submit", crearBodega);
});


async function crearBodega(event) {

    event.preventDefault();


    const bodega = {

        nombre: document.getElementById("nombre").value,

        ubicacion: document.getElementById("ubicacion").value,

        capacidad: Number(
            document.getElementById("capacidad").value
        )
    };


    try {

        const response = await fetch(
            `${API_URL}/bodegas`,
            {
                method: "POST",

                headers: obtenerHeaders(),

                body: JSON.stringify(bodega)
            }
        );


        const data = await response.json();


        if (!response.ok) {

            console.error(data);

            document.getElementById("resultado").innerHTML =
                `<p class="error">No se pudo crear la bodega.</p>`;

            return;
        }


        document.getElementById("resultado").innerHTML = `

            <div class="resultado">

                <p class="exito">
                    Bodega creada correctamente.
                </p>

                <p>
                    <strong>ID:</strong> ${data.id}
                </p>

                <p>
                    <strong>Nombre:</strong> ${data.nombre}
                </p>

            </div>
        `;


    } catch (error) {

        console.error(error);

        document.getElementById("resultado").innerHTML =
            `<p class="error">No se pudo conectar con el servidor.</p>`;
    }
}


// =========================
// BUSCAR POR ID
// =========================

document.getElementById("btnBuscarId").addEventListener("click", () => {

    contenido.innerHTML = `

        <h3>Buscar bodega por ID</h3>

        <form id="formBuscar">

            <div class="form-group">

                <label>ID de la bodega</label>

                <input
                    type="number"
                    id="idBodega"
                    min="1"
                    required
                >

            </div>


            <button
                type="submit"
                class="form-button"
            >
                Buscar
            </button>

        </form>

        <div id="resultado"></div>
    `;


    document
        .getElementById("formBuscar")
        .addEventListener("submit", buscarBodega);
});


async function buscarBodega(event) {

    event.preventDefault();


    const id = document.getElementById("idBodega").value;


    try {

        const response = await fetch(
            `${API_URL}/bodegas/${id}`,
            {
                method: "GET",

                headers: obtenerHeaders()
            }
        );


        const data = await response.json();


        if (!response.ok) {

            document.getElementById("resultado").innerHTML =
                `<p class="error">Bodega no encontrada.</p>`;

            return;
        }


        mostrarBodega(data);


    } catch (error) {

        console.error(error);

        document.getElementById("resultado").innerHTML =
            `<p class="error">Error al buscar la bodega.</p>`;
    }
}


// =========================
// MOSTRAR BODEGA
// =========================

function mostrarBodega(data) {

    document.getElementById("resultado").innerHTML = `

        <div class="resultado">

            <h3>Bodega encontrada</h3>

            <p>
                <strong>ID:</strong>
                ${data.id}
            </p>

            <p>
                <strong>Nombre:</strong>
                ${data.nombre}
            </p>

            <p>
                <strong>Ubicación:</strong>
                ${data.ubicacion}
            </p>

            <p>
                <strong>Capacidad:</strong>
                ${data.capacidad}
            </p>

        </div>
    `;
}


// =========================
// ACTUALIZAR BODEGA
// =========================

document.getElementById("btnActualizar").addEventListener("click", () => {

    contenido.innerHTML = `

        <h3>Actualizar bodega</h3>

        <form id="formActualizar">

            <div class="form-group">

                <label>ID de la bodega</label>

                <input
                    type="number"
                    id="actualizarId"
                    min="1"
                    required
                >

            </div>


            <div class="form-group">

                <label>Nombre</label>

                <input
                    type="text"
                    id="actualizarNombre"
                    minlength="3"
                    maxlength="50"
                    required
                >

            </div>


            <div class="form-group">

                <label>Ubicación</label>

                <input
                    type="text"
                    id="actualizarUbicacion"
                    minlength="3"
                    maxlength="50"
                    required
                >

            </div>


            <div class="form-group">

                <label>Capacidad</label>

                <input
                    type="number"
                    id="actualizarCapacidad"
                    min="0.01"
                    step="0.01"
                    required
                >

            </div>


            <button
                type="submit"
                class="form-button"
            >
                Actualizar
            </button>

        </form>

        <div id="resultado"></div>
    `;


    document
        .getElementById("formActualizar")
        .addEventListener("submit", actualizarBodega);
});


async function actualizarBodega(event) {

    event.preventDefault();


    const id = document.getElementById("actualizarId").value;


    const bodega = {

        nombre:
            document.getElementById("actualizarNombre").value,

        ubicacion:
            document.getElementById("actualizarUbicacion").value,

        capacidad:
            Number(
                document.getElementById("actualizarCapacidad").value
            )
    };


    try {

        const response = await fetch(
            `${API_URL}/bodegas/${id}`,
            {
                method: "PUT",

                headers: obtenerHeaders(),

                body: JSON.stringify(bodega)
            }
        );


        const data = await response.json();


        if (!response.ok) {

            console.error(data);

            document.getElementById("resultado").innerHTML =
                `<p class="error">No se pudo actualizar la bodega.</p>`;

            return;
        }


        document.getElementById("resultado").innerHTML = `

            <div class="resultado">

                <p class="exito">
                    Bodega actualizada correctamente.
                </p>

            </div>
        `;


    } catch (error) {

        console.error(error);

        document.getElementById("resultado").innerHTML =
            `<p class="error">No se pudo conectar con el servidor.</p>`;
    }
}


// =========================
// ELIMINAR BODEGA
// =========================

document.getElementById("btnEliminar").addEventListener("click", () => {

    contenido.innerHTML = `

        <h3>Eliminar bodega</h3>

        <form id="formEliminar">

            <div class="form-group">

                <label>ID de la bodega</label>

                <input
                    type="number"
                    id="eliminarId"
                    min="1"
                    required
                >

            </div>


            <button
                type="submit"
                class="form-button"
            >
                Eliminar
            </button>

        </form>

        <div id="resultado"></div>
    `;


    document
        .getElementById("formEliminar")
        .addEventListener("submit", eliminarBodega);
});


async function eliminarBodega(event) {

    event.preventDefault();


    const id = document.getElementById("eliminarId").value;


    const confirmar = confirm(
        "¿Está seguro de que desea eliminar esta bodega?"
    );


    if (!confirmar) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/bodegas/${id}`,
            {
                method: "DELETE",

                headers: obtenerHeaders()
            }
        );


        if (!response.ok) {

            let data = {};

            try {
                data = await response.json();
            } catch (error) {
                console.error(error);
            }

            console.error(data);

            document.getElementById("resultado").innerHTML =
                `<p class="error">No se pudo eliminar la bodega.</p>`;

            return;
        }


        document.getElementById("resultado").innerHTML = `

            <div class="resultado">

                <p class="exito">
                    Bodega eliminada correctamente.
                </p>

            </div>
        `;


    } catch (error) {

        console.error(error);

        document.getElementById("resultado").innerHTML =
            `<p class="error">No se pudo conectar con el servidor.</p>`;
    }
}
