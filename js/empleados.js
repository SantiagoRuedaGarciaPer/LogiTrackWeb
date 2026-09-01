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
// LISTAR TODOS
// =========================

document.getElementById("btnListar").addEventListener("click", listarEmpleados);


async function listarEmpleados() {

    try {

        const response = await fetch(
            `${API_URL}/empleados`,
            {
                method: "GET",
                headers: obtenerHeaders()
            }
        );


        const data = await response.json();


        if (!response.ok) {

            document.getElementById("resultado").innerHTML =
                `<p class="error">No se pudieron obtener los empleados.</p>`;

            return;
        }


        mostrarEmpleados(data);


    } catch (error) {

        console.error(error);

        mostrarError();
    }
}


// =========================
// BUSCAR POR ID
// =========================

document.getElementById("btnBuscarId").addEventListener("click", () => {

    contenido.innerHTML = `

        <h3>Buscar empleado por ID</h3>

        <form id="formBuscarId">

            <div class="form-group">

                <label>ID del empleado</label>

                <input
                    type="number"
                    id="idEmpleado"
                    min="1"
                    required
                >

            </div>

            <button class="form-button" type="submit">
                Buscar
            </button>

        </form>

        <div id="resultado"></div>
    `;


    document
        .getElementById("formBuscarId")
        .addEventListener("submit", buscarPorId);
});


async function buscarPorId(event) {

    event.preventDefault();


    const id = document.getElementById("idEmpleado").value;


    try {

        const response = await fetch(
            `${API_URL}/empleados/${id}`,
            {
                method: "GET",
                headers: obtenerHeaders()
            }
        );


        const data = await response.json();


        if (!response.ok) {

            document.getElementById("resultado").innerHTML =
                `<p class="error">Empleado no encontrado.</p>`;

            return;
        }


        mostrarEmpleado(data);


    } catch (error) {

        console.error(error);

        mostrarError();
    }
}


// =========================
// BUSCAR POR NOMBRE
// =========================

document.getElementById("btnBuscarNombre").addEventListener("click", () => {

    contenido.innerHTML = `

        <h3>Buscar empleado por nombre</h3>

        <form id="formBuscarNombre">

            <div class="form-group">

                <label>Nombre</label>

                <input
                    type="text"
                    id="nombreEmpleado"
                    required
                >

            </div>

            <button class="form-button" type="submit">
                Buscar
            </button>

        </form>

        <div id="resultado"></div>
    `;


    document
        .getElementById("formBuscarNombre")
        .addEventListener("submit", buscarPorNombre);
});


async function buscarPorNombre(event) {

    event.preventDefault();


    const nombre =
        document.getElementById("nombreEmpleado").value;


    buscarLista(
        `/empleados/nombre/${encodeURIComponent(nombre)}`
    );
}


// =========================
// BUSCAR POR CARGO
// =========================

document.getElementById("btnBuscarCargo").addEventListener("click", () => {

    contenido.innerHTML = `

        <h3>Buscar empleado por cargo</h3>

        <form id="formBuscarCargo">

            <div class="form-group">

                <label>Cargo</label>

                <input
                    type="text"
                    id="cargoEmpleado"
                    required
                >

            </div>

            <button class="form-button" type="submit">
                Buscar
            </button>

        </form>

        <div id="resultado"></div>
    `;


    document
        .getElementById("formBuscarCargo")
        .addEventListener("submit", buscarPorCargo);
});


async function buscarPorCargo(event) {

    event.preventDefault();


    const cargo =
        document.getElementById("cargoEmpleado").value;


    buscarLista(
        `/empleados/cargo/${encodeURIComponent(cargo)}`
    );
}


// =========================
// BUSCAR POR DOCUMENTO
// =========================

document.getElementById("btnBuscarDocumento").addEventListener("click", () => {

    contenido.innerHTML = `

        <h3>Buscar empleado por documento</h3>

        <form id="formBuscarDocumento">

            <div class="form-group">

                <label>Documento</label>

                <input
                    type="text"
                    id="documentoEmpleado"
                    required
                >

            </div>

            <button class="form-button" type="submit">
                Buscar
            </button>

        </form>

        <div id="resultado"></div>
    `;


    document
        .getElementById("formBuscarDocumento")
        .addEventListener("submit", buscarPorDocumento);
});


async function buscarPorDocumento(event) {

    event.preventDefault();


    const documento =
        document.getElementById("documentoEmpleado").value;


    buscarLista(
        `/empleados/documento/${encodeURIComponent(documento)}`
    );
}


// =========================
// FUNCIÓN PARA BÚSQUEDAS
// =========================

async function buscarLista(endpoint) {

    try {

        const response = await fetch(
            `${API_URL}${endpoint}`,
            {
                method: "GET",
                headers: obtenerHeaders()
            }
        );


        const data = await response.json();


        if (!response.ok) {

            document.getElementById("resultado").innerHTML =
                `<p class="error">No se encontraron empleados.</p>`;

            return;
        }


        if (data.length === 0) {

            document.getElementById("resultado").innerHTML =
                `<p class="error">No se encontraron empleados.</p>`;

            return;
        }


        mostrarEmpleados(data);


    } catch (error) {

        console.error(error);

        mostrarError();
    }
}


// =========================
// CREAR EMPLEADO
// =========================

document.getElementById("btnCrear").addEventListener("click", () => {

    contenido.innerHTML = `

        <h3>Crear empleado</h3>

        <form id="formCrear">

            <div class="form-group">
                <label>Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    minlength="4"
                    maxlength="50"
                    required
                >
            </div>


            <div class="form-group">
                <label>Email</label>
                <input
                    type="email"
                    id="email"
                    maxlength="50"
                    required
                >
            </div>


            <div class="form-group">
                <label>Tipo de documento</label>

                <select id="tipoDocumento" required>

                    <option value="">
                        Seleccione
                    </option>

                    <option value="Cedula">
                        Cédula
                    </option>

                    <option value="Pasaporte">
                        Pasaporte
                    </option>

                </select>

            </div>


            <div class="form-group">
                <label>Documento</label>

                <input
                    type="text"
                    id="documento"
                    minlength="8"
                    maxlength="20"
                    required
                >

            </div>


            <div class="form-group">
                <label>Cargo</label>

                <input
                    type="text"
                    id="cargo"
                    minlength="4"
                    maxlength="50"
                    required
                >

            </div>


            <div class="form-group">
                <label>ID de la bodega</label>

                <input
                    type="number"
                    id="bodegaId"
                    min="1"
                    required
                >

            </div>


            <button
                class="form-button"
                type="submit"
            >
                Crear empleado
            </button>

        </form>

        <div id="resultado"></div>
    `;


    document
        .getElementById("formCrear")
        .addEventListener("submit", crearEmpleado);
});


async function crearEmpleado(event) {

    event.preventDefault();


    const empleado = {

        nombre:
            document.getElementById("nombre").value,

        email:
            document.getElementById("email").value,

        tipoDocumento:
            document.getElementById("tipoDocumento").value,

        documento:
            document.getElementById("documento").value,

        cargo:
            document.getElementById("cargo").value,

        bodegaId:
            Number(
                document.getElementById("bodegaId").value
            )
    };


    try {

        const response = await fetch(
            `${API_URL}/empleados`,
            {
                method: "POST",

                headers: obtenerHeaders(),

                body: JSON.stringify(empleado)
            }
        );


        const data = await response.json();


        if (!response.ok) {

            console.error(data);

            document.getElementById("resultado").innerHTML =
                `<p class="error">No se pudo crear el empleado.</p>`;

            return;
        }


        document.getElementById("resultado").innerHTML = `

            <div class="resultado">

                <p class="exito">
                    Empleado creado correctamente.
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

        mostrarError();
    }
}


// =========================
// ACTUALIZAR EMPLEADO
// =========================

document.getElementById("btnActualizar").addEventListener("click", () => {

    contenido.innerHTML = `

        <h3>Actualizar empleado</h3>

        <form id="formActualizar">

            <div class="form-group">
                <label>ID</label>

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
                    minlength="4"
                    maxlength="50"
                    required
                >
            </div>


            <div class="form-group">
                <label>Email</label>

                <input
                    type="email"
                    id="actualizarEmail"
                    maxlength="50"
                    required
                >
            </div>


            <div class="form-group">
                <label>Tipo de documento</label>

                <select id="actualizarTipoDocumento" required>

                    <option value="Cedula">
                        Cédula
                    </option>

                    <option value="Pasaporte">
                        Pasaporte
                    </option>

                </select>

            </div>


            <div class="form-group">
                <label>Documento</label>

                <input
                    type="text"
                    id="actualizarDocumento"
                    minlength="8"
                    maxlength="20"
                    required
                >
            </div>


            <div class="form-group">
                <label>Cargo</label>

                <input
                    type="text"
                    id="actualizarCargo"
                    minlength="4"
                    maxlength="50"
                    required
                >
            </div>


            <div class="form-group">
                <label>ID de la bodega</label>

                <input
                    type="number"
                    id="actualizarBodega"
                    min="1"
                    required
                >
            </div>


            <button
                class="form-button"
                type="submit"
            >
                Actualizar
            </button>

        </form>

        <div id="resultado"></div>
    `;


    document
        .getElementById("formActualizar")
        .addEventListener("submit", actualizarEmpleado);
});


async function actualizarEmpleado(event) {

    event.preventDefault();


    const id =
        document.getElementById("actualizarId").value;


    const empleado = {

        nombre:
            document.getElementById("actualizarNombre").value,

        email:
            document.getElementById("actualizarEmail").value,

        tipoDocumento:
            document.getElementById("actualizarTipoDocumento").value,

        documento:
            document.getElementById("actualizarDocumento").value,

        cargo:
            document.getElementById("actualizarCargo").value,

        bodegaId:
            Number(
                document.getElementById("actualizarBodega").value
            )
    };


    try {

        const response = await fetch(
            `${API_URL}/empleados/${id}`,
            {
                method: "PUT",

                headers: obtenerHeaders(),

                body: JSON.stringify(empleado)
            }
        );


        const data = await response.json();


        if (!response.ok) {

            console.error(data);

            document.getElementById("resultado").innerHTML =
                `<p class="error">No se pudo actualizar el empleado.</p>`;

            return;
        }


        document.getElementById("resultado").innerHTML = `

            <div class="resultado">

                <p class="exito">
                    Empleado actualizado correctamente.
                </p>

            </div>
        `;


    } catch (error) {

        console.error(error);

        mostrarError();
    }
}


// =========================
// ELIMINAR EMPLEADO
// =========================

document.getElementById("btnEliminar").addEventListener("click", () => {

    contenido.innerHTML = `

        <h3>Eliminar empleado</h3>

        <form id="formEliminar">

            <div class="form-group">

                <label>ID del empleado</label>

                <input
                    type="number"
                    id="eliminarId"
                    min="1"
                    required
                >

            </div>


            <button
                class="form-button"
                type="submit"
            >
                Eliminar
            </button>

        </form>

        <div id="resultado"></div>
    `;


    document
        .getElementById("formEliminar")
        .addEventListener("submit", eliminarEmpleado);
});


async function eliminarEmpleado(event) {

    event.preventDefault();


    const id =
        document.getElementById("eliminarId").value;


    const confirmar = confirm(
        "¿Está seguro de que desea eliminar este empleado?"
    );


    if (!confirmar) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/empleados/${id}`,
            {
                method: "DELETE",

                headers: obtenerHeaders()
            }
        );


        if (!response.ok) {

            document.getElementById("resultado").innerHTML =
                `<p class="error">No se pudo eliminar el empleado.</p>`;

            return;
        }


        document.getElementById("resultado").innerHTML = `

            <div class="resultado">

                <p class="exito">
                    Empleado eliminado correctamente.
                </p>

            </div>
        `;


    } catch (error) {

        console.error(error);

        mostrarError();
    }
}


// =========================
// MOSTRAR UN EMPLEADO
// =========================

function mostrarEmpleado(data) {

    document.getElementById("resultado").innerHTML = `

        <div class="resultado">

            <h3>Empleado</h3>

            <p>
                <strong>ID:</strong>
                ${data.id}
            </p>

            <p>
                <strong>Nombre:</strong>
                ${data.nombre}
            </p>

            <p>
                <strong>Email:</strong>
                ${data.email}
            </p>

            <p>
                <strong>Tipo de documento:</strong>
                ${data.tipoDocumento}
            </p>

            <p>
                <strong>Documento:</strong>
                ${data.documento}
            </p>

            <p>
                <strong>Cargo:</strong>
                ${data.cargo}
            </p>

            <p>
                <strong>Bodega:</strong>
                ${data.bodegaResponse.nombre}
            </p>

        </div>
    `;
}


// =========================
// MOSTRAR VARIOS EMPLEADOS
// =========================

function mostrarEmpleados(empleados) {

    contenido.innerHTML = `

        <h3>Empleados encontrados</h3>

        <div id="resultado"></div>
    `;


    const resultado = document.getElementById("resultado");


    if (!empleados || empleados.length === 0) {

        resultado.innerHTML =
            `<p class="error">No se encontraron empleados.</p>`;

        return;
    }


    empleados.forEach(empleado => {

        resultado.innerHTML += `

            <div class="empleado-card">

                <p>
                    <strong>ID:</strong>
                    ${empleado.id}
                </p>

                <p>
                    <strong>Nombre:</strong>
                    ${empleado.nombre}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${empleado.email}
                </p>

                <p>
                    <strong>Tipo de documento:</strong>
                    ${empleado.tipoDocumento}
                </p>

                <p>
                    <strong>Documento:</strong>
                    ${empleado.documento}
                </p>

                <p>
                    <strong>Cargo:</strong>
                    ${empleado.cargo}
                </p>

                <p>
                    <strong>Bodega:</strong>
                    ${empleado.bodegaResponse.nombre}
                </p>

            </div>
        `;
    });
}


// =========================
// MOSTRAR ERROR
// =========================

function mostrarError() {

    contenido.innerHTML = `
        <p class="error">
            No se pudo conectar con el servidor.
        </p>
    `;
}
