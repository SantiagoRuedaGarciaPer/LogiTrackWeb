const API_URL = "http://localhost:8080/LogiTrack/api";

const btnPerfil = document.getElementById("btnPerfil");
const btnCerrarPerfil = document.getElementById("btnCerrarPerfil");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");

const perfilModal = document.getElementById("perfilModal");


btnPerfil.addEventListener("click", () => {
    perfilModal.style.display = "flex";
    cargarInformacionUsuario();
});

btnCerrarPerfil.addEventListener("click", () => {
    perfilModal.style.display = "none";
    
});


btnCerrarSesion.addEventListener("click", () => {

    localStorage.removeItem("token");

    window.location.href = "../index.html";
});


async function cargarInformacionUsuario() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "index.html";
        return;
    }
    const usuario = localStorage.getItem("Usuario");
    if (!usuario) {
        return;
    } try {
        const response = await fetch(`${API_URL}/usuarios/usuario/${usuario}`, { method: "GET", headers: { "Authorization": `Bearer ${token}` } });
        if (!response.ok) {
            throw new Error("No se pudo obtener la información del usuario");
        }
        const data = await response.json();
        console.log("Usuario:", data);
        document.getElementById("usuarioNombre").textContent = data.empleado.nombre;
        document.getElementById("usuarioCorreo").textContent = data.empleado.email;
        document.getElementById("usuarioCargo").textContent = data.empleado.cargo;
    }
    catch (error) {
        console.error("Error:", error);
        document.getElementById("usuarioNombre").textContent = "No disponible";
        document.getElementById("usuarioCorreo").textContent = "No disponible";
        document.getElementById("usuarioCargo").textContent = "No disponible";

    }
}