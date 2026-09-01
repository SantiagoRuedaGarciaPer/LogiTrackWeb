const API_URL = "http://localhost:8080/LogiTrack/api";

const loginForm = document.getElementById("loginForm");
const mensaje = document.getElementById("mensaje");

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const contrasenia = document.getElementById("contrasenia").value;

    localStorage.setItem("Usuario", usuario)
    localStorage.setItem("Contrasenia", contrasenia)

    try {

        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                usuario: usuario,
                contrasenia: contrasenia
            })
        });

        const data = await response.json();

        console.log("Status:", response.status);
        console.log("Respuesta:", data);

        if (!response.ok) {
            mensaje.textContent = "Usuario o contraseña incorrectos.";
            return;
        }

        // Guardar token
        localStorage.setItem("token", data.token);

        // Login exitoso
        window.location.href = "/html/home.html";

    } catch (error) {

        console.error("Error:", error);

        mensaje.textContent = "Error al conectar con el servidor.";
    }
});