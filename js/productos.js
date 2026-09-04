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
// Listar producto
// =========================
document.getElementById("btnListar").addEventListener("click", listarProductos);

async function listarProductos() {
    contenido.innerHTML = `

        <h3>Productos encontrados</h3>

        <div id="resultado"></div>
    `;
    try {

        const response = await fetch(
            `${API_URL}/producto`,
            {
                method: "GET",
                headers: obtenerHeaders()
            }
        );


        const data = await response.json();


        if (!response.ok) {

            document.getElementById("resultado").innerHTML =
                `<p class="error">No se pudieron obtener los productos.</p>`;

            return;
        }


        mostrarProductos(data);


    } catch (error) {

        console.error(error);

        document.getElementById("resultado").innerHTML =
        `<p class="error">Error al buscar el producto.</p>`;
    }
}


// =========================
// CREAR PRODUCTO
// =========================

document.getElementById("btnCrear").addEventListener("click", () => {

    contenido.innerHTML = `

        <h3>Crear producto</h3>

        <form id="formCrear">

            <div class="form-group">
                <label>Nombre</label>
                <input type="text" id="nombre" required>
            </div>

            <div class="form-group">
                <label>Descripción</label>
                <textarea id="descripcion" required></textarea>
            </div>

            <div class="form-group">
                <label>Stock</label>
                <input type="number" id="stock" min="1" required>
            </div>

            <div class="form-group">
                <label>Precio de compra</label>
                <input type="number" id="precioCompra" min="0" step="0.01" required>
            </div>

            <div class="form-group">
                <label>Precio de venta</label>
                <input type="number" id="precioVenta" min="0" step="0.01" required>
            </div>

            <div class="form-group">
                <label>ID de la bodega</label>
                <input type="number" id="bodega" min="1" required>
            </div>

            <button class="form-button" type="submit">
                Crear producto
            </button>

        </form>

        <div id="resultado"></div>
    `;


    document.getElementById("formCrear").addEventListener("submit", crearProducto);
});


// =========================
// FUNCIÓN CREAR
// =========================

async function crearProducto(event) {

    event.preventDefault();

    const producto = {

        nombre: document.getElementById("nombre").value,

        descripcion: document.getElementById("descripcion").value,

        stock: Number(document.getElementById("stock").value),

        precioCompra: Number(
            document.getElementById("precioCompra").value
        ),

        precioVenta: Number(
            document.getElementById("precioVenta").value
        ),

        bodega: Number(
            document.getElementById("bodega").value
        )
    };


    try {

        const response = await fetch(
            `${API_URL}/producto`,
            {
                method: "POST",
                headers: obtenerHeaders(),
                body: JSON.stringify(producto)
            }
        );


        const data = await response.json();


        if (!response.ok) {

            document.getElementById("resultado").innerHTML =
                `<p class="error">Error al crear el producto.</p>`;

            console.error(data);

            return;
        }


        document.getElementById("resultado").innerHTML = `

            <div class="resultado">

                <p class="exito">
                    Producto creado correctamente.
                </p>

                <p>
                    ID: ${data.id}
                </p>

                <p>
                    Nombre: ${data.nombre}
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

        <h3>Buscar producto por ID</h3>

        <form id="formBuscarId">

            <div class="form-group">

                <label>ID del producto</label>

                <input
                    type="number"
                    id="idProducto"
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

    const id = document.getElementById("idProducto").value;


    try {

        const response = await fetch(
            `${API_URL}/producto/${id}`,
            {
                method: "GET",
                headers: obtenerHeaders()
            }
        );


        const data = await response.json();


        if (!response.ok) {

            document.getElementById("resultado").innerHTML =
                `<p class="error">Producto no encontrado.</p>`;

            return;
        }


        mostrarProducto(data);


    } catch (error) {

        console.error(error);

        document.getElementById("resultado").innerHTML =
            `<p class="error">Error al buscar el producto.</p>`;
    }
}


// =========================
// BUSCAR POR NOMBRE
// =========================

document.getElementById("btnBuscarNombre").addEventListener("click", () => {

    contenido.innerHTML = `

        <h3>Buscar producto por nombre</h3>

        <form id="formBuscarNombre">

            <div class="form-group">

                <label>Nombre</label>

                <input
                    type="text"
                    id="nombreProducto"
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

    const nombre = document.getElementById("nombreProducto").value;

    try {

        const response = await fetch(
            `${API_URL}/producto/Nombre/${encodeURIComponent(nombre)}`,
            {
                method: "GET",
                headers: obtenerHeaders()
            }
        );

        const data = await response.json();

        console.log("Respuesta del producto:", data);

        if (!response.ok) {

            document.getElementById("resultado").innerHTML =
                `<p class="error">Error al buscar los productos.</p>`;

            return;
        }

        if (data.length === 0) {

            document.getElementById("resultado").innerHTML =
                `<p class="error">No se encontraron productos.</p>`;

            return;
        }

        mostrarProductos(data);

    } catch (error) {

        console.error(error);

        document.getElementById("resultado").innerHTML =
            `<p class="error">Error al buscar los productos.</p>`;
    }
}



// =========================
// MOSTRAR PRODUCTO
// =========================

function mostrarProducto(data) {

    document.getElementById("resultado").innerHTML = `

        <div class="resultado">

            <h3>Producto</h3>

            <p><strong>ID:</strong> ${data.id}</p>

            <p><strong>Nombre:</strong> ${data.nombre}</p>

            <p><strong>Descripción:</strong> ${data.descripcion}</p>

            <p><strong>Stock:</strong> ${data.stock}</p>

            <p><strong>Precio compra:</strong> ${data.precioCompra}</p>

            <p><strong>Precio venta:</strong> ${data.precioVenta}</p>

            <p>
                <strong>Bodega:</strong>
                ${data.bodega.nombre}
            </p>

        </div>
    `;
}

function mostrarProductos(productos) {

    const resultado = document.getElementById("resultado");

    resultado.innerHTML = `
        <h3>Productos encontrados</h3>
    `;

    productos.forEach(producto => {

        resultado.innerHTML += `

            <div class="resultado">

                <p>
                    <strong>ID:</strong>
                    ${producto.id}
                </p>

                <p>
                    <strong>Nombre:</strong>
                    ${producto.nombre}
                </p>

                <p>
                    <strong>Descripción:</strong>
                    ${producto.descripcion}
                </p>

                <p>
                    <strong>Stock:</strong>
                    ${producto.stock}
                </p>

                <p>
                    <strong>Precio compra:</strong>
                    ${producto.precioCompra}
                </p>

                <p>
                    <strong>Precio venta:</strong>
                    ${producto.precioVenta}
                </p>

                <p>
                    <strong>Bodega:</strong>
                    ${producto.bodega.nombre}
                </p>

            </div>
        `;
    });
}



// =========================
// ACTUALIZAR PRODUCTO
// =========================

document.getElementById("btnActualizar").addEventListener("click", () => {

    contenido.innerHTML = `

        <h3>Actualizar producto</h3>

        <form id="formActualizar">

            <div class="form-group">
                <label>ID del producto</label>
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
                    required
                >
            </div>

            <div class="form-group">
                <label>Descripción</label>
                <textarea
                    id="actualizarDescripcion"
                    required
                ></textarea>
            </div>

            <div class="form-group">
                <label>Stock</label>
                <input
                    type="number"
                    id="actualizarStock"
                    min="1"
                    required
                >
            </div>

            <div class="form-group">
                <label>Precio de compra</label>
                <input
                    type="number"
                    id="actualizarPrecioCompra"
                    min="0"
                    step="0.01"
                    required
                >
            </div>

            <div class="form-group">
                <label>Precio de venta</label>
                <input
                    type="number"
                    id="actualizarPrecioVenta"
                    min="0"
                    step="0.01"
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

            <button class="form-button" type="submit">
                Actualizar
            </button>

        </form>

        <div id="resultado"></div>
    `;


    document
        .getElementById("formActualizar")
        .addEventListener("submit", actualizarProducto);
});


async function actualizarProducto(event) {

    event.preventDefault();

    const id = document.getElementById("actualizarId").value;

    const producto = {

        nombre: document.getElementById("actualizarNombre").value,

        descripcion: document.getElementById("actualizarDescripcion").value,

        stock: Number(
            document.getElementById("actualizarStock").value
        ),

        precioCompra: Number(
            document.getElementById("actualizarPrecioCompra").value
        ),

        precioVenta: Number(
            document.getElementById("actualizarPrecioVenta").value
        ),

        bodega: Number(
            document.getElementById("actualizarBodega").value
        )
    };


    try {

        const response = await fetch(
            `${API_URL}/producto/${id}`,
            {
                method: "PUT",
                headers: obtenerHeaders(),
                body: JSON.stringify(producto)
            }
        );


        const data = await response.json();


        if (!response.ok) {

            document.getElementById("resultado").innerHTML =
                `<p class="error">No se pudo actualizar el producto.</p>`;

            console.error(data);

            return;
        }


        document.getElementById("resultado").innerHTML = `

            <div class="resultado">

                <p class="exito">
                    Producto actualizado correctamente.
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
// ELIMINAR PRODUCTO
// =========================

document.getElementById("btnEliminar").addEventListener("click", () => {

    contenido.innerHTML = `

        <h3>Eliminar producto</h3>

        <form id="formEliminar">

            <div class="form-group">

                <label>ID del producto</label>

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
        .addEventListener("submit", eliminarProducto);
});


async function eliminarProducto(event) {

    event.preventDefault();

    const id = document.getElementById("eliminarId").value;


    const confirmar = confirm(
        "¿Está seguro de que desea eliminar este producto?"
    );


    if (!confirmar) {
        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/producto/${id}`,
            {
                method: "DELETE",
                headers: obtenerHeaders()
            }
        );


        if (!response.ok) {

            const data = await response.json();

            console.error(data);

            document.getElementById("resultado").innerHTML =
                `<p class="error">No se pudo eliminar el producto.</p>`;

            return;
        }


        document.getElementById("resultado").innerHTML = `

            <div class="resultado">

                <p class="exito">
                    Producto eliminado correctamente.
                </p>

            </div>
        `;


    } catch (error) {

        console.error(error);

        document.getElementById("resultado").innerHTML =
            `<p class="error">No se pudo conectar con el servidor.</p>`;
    }
}

