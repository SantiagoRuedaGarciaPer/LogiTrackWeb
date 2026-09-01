# LogiTrack Web

Frontend web del sistema de gestión de inventario **LogiTrack**.

Este proyecto proporciona una interfaz web sencilla para interactuar con la API REST desarrollada en Spring Boot, permitiendo gestionar empleados, bodegas y productos desde el navegador.

---

## 🚀 Características

El sistema permite:

* 🔐 Inicio de sesión.
* 🔑 Autenticación mediante JWT.
* 🏠 Página principal.
* 👤 Visualización de información del usuario.
* 👨‍💼 Gestión de empleados.
* 🏢 Gestión de bodegas.
* 📦 Gestión de productos.
* 🔎 Búsqueda de información.
* ➕ Creación de registros.
* ✏️ Actualización de registros.
* 🗑️ Eliminación de registros.
* 🚪 Cierre de sesión.

---

## 🛠️ Tecnologías utilizadas

| Tecnología       | Uso                          |
| ---------------- | ---------------------------- |
| **HTML5**        | Estructura de las páginas    |
| **CSS3**         | Diseño y estilos             |
| **JavaScript**   | Lógica e interacción         |
| **Fetch API**    | Comunicación con el backend  |
| **LocalStorage** | Almacenamiento del token JWT |
| **REST API**     | Comunicación con Spring Boot |
| **JWT**          | Autenticación                |

El proyecto está desarrollado utilizando **HTML, CSS y JavaScript puro**, sin frameworks frontend.

---

## 📁 Estructura del proyecto

```text
LogiTrackWeb/
│
├── css/
│   ├── login.css
│   ├── home.css
│   ├── empleados.css
│   ├── bodegas.css
│   └── productos.css
│
├── html/
│   ├── home.html
│   ├── empleados.html
│   ├── bodegas.html
│   └── productos.html
│
├── js/
│   ├── login.js
│   ├── home.js
│   ├── empleados.js
│   ├── bodegas.js
│   └── productos.js
│
└── index.html
```

---

# 🔐 Inicio de sesión

La aplicación comienza en `index.html`, donde el usuario puede ingresar sus credenciales.

El frontend realiza una petición `POST` al backend:

```http
POST /LogiTrack/api/auth/login
```

Enviando un cuerpo similar a:

```json
{
    "usuario": "Kame",
    "contrasenia": "contraseña"
}
```

Si las credenciales son correctas, el backend devuelve un token JWT:

```json
{
    "token": "TOKEN_JWT"
}
```

El token se almacena en `localStorage` para poder utilizarlo en las siguientes peticiones.

---

# 🔑 Autenticación

Las peticiones protegidas utilizan el token JWT mediante el encabezado:

```http
Authorization: Bearer TOKEN_JWT
```

Por ejemplo:

```javascript
const token = localStorage.getItem("token");

const response = await fetch(
    "http://localhost:8080/LogiTrack/api/empleados",
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
);
```

Cuando el usuario cierra sesión, el token almacenado es eliminado:

```javascript
localStorage.removeItem("token");
```

---

# 🏠 Home

Después de iniciar sesión, el usuario es dirigido a la página principal.

Desde el Home se puede acceder a las diferentes secciones del sistema:

```text
                    LogiTrack
                       │
          ┌────────────┼────────────┐
          │            │            │
      Empleados     Bodegas     Productos
```

Además, la barra superior permite:

* Consultar la información del usuario.
* Cerrar sesión.
* Regresar al inicio.

---

# 👤 Información del usuario

El sistema permite consultar la información del usuario autenticado.

La información obtenida desde el backend contiene los datos del usuario y del empleado relacionado.

Por ejemplo:

```json
{
    "id": 2,
    "empleado": {
        "id": 2,
        "nombre": "Santiago Rueda Garcia",
        "email": "santirueda0917@gmail.com",
        "tipoDocumento": "Cedula",
        "documento": "1099744305",
        "cargo": "Encargado",
        "bodegaResponse": {
            "id": 1,
            "nombre": "Bodega prueba",
            "ubicacion": "Calle 45 #23 -32",
            "capacidad": 100.0
        }
    },
    "usuario": "Kame"
}
```

La interfaz utiliza principalmente:

* Nombre
* Correo
* Cargo
* Usuario

---

# 👨‍💼 Empleados

La sección de empleados permite realizar las siguientes operaciones:

### Consultas

```http
GET /LogiTrack/api/empleados
```

Lista todos los empleados.

```http
GET /LogiTrack/api/empleados/{id}
```

Busca un empleado por ID.

```http
GET /LogiTrack/api/empleados/nombre/{nombre}
```

Busca empleados por nombre.

```http
GET /LogiTrack/api/empleados/cargo/{cargo}
```

Busca empleados por cargo.

```http
GET /LogiTrack/api/empleados/documento/{documento}
```

Busca empleados por documento.

### Crear

```http
POST /LogiTrack/api/empleados
```

### Actualizar

```http
PUT /LogiTrack/api/empleados/{id}
```

### Eliminar

```http
DELETE /LogiTrack/api/empleados/{id}
```

---

# 🏢 Bodegas

La sección de bodegas permite:

### Buscar

```http
GET /LogiTrack/api/bodegas/{id}
```

### Crear

```http
POST /LogiTrack/api/bodegas
```

### Actualizar

```http
PUT /LogiTrack/api/bodegas/{id}
```

### Eliminar

```http
DELETE /LogiTrack/api/bodegas/{id}
```

Los datos utilizados para crear o actualizar una bodega son:

```json
{
    "nombre": "Bodega principal",
    "ubicacion": "Calle 45 #23 -32",
    "capacidad": 100.0
}
```

---

# 📦 Productos

La sección de productos permite:

### Buscar por ID

```http
GET /LogiTrack/api/productos/{id}
```

### Buscar por nombre

```http
GET /LogiTrack/api/productos/nombre/{nombre}
```

### Crear

```http
POST /LogiTrack/api/productos
```

### Actualizar

```http
PUT /LogiTrack/api/productos/{id}
```

### Eliminar

```http
DELETE /LogiTrack/api/productos/{id}
```

Los datos utilizados para crear un producto son:

```json
{
    "nombre": "Televisor",
    "descripcion": "Es un gran televisor para el inventario",
    "stock": 40,
    "precioCompra": 2500.0,
    "precioVenta": 30000.0,
    "bodega": 1
}
```

---

# 🔄 Comunicación con el Backend

El frontend consume la API REST proporcionada por el proyecto **LogiTrack Backend**.

Durante el desarrollo, la API se encuentra disponible en:

```text
http://localhost:8080/LogiTrack/api
```

Por ejemplo:

```text
http://localhost:8080/LogiTrack/api/productos
```

La comunicación se realiza mediante la API `fetch()` de JavaScript.

---

# ⚙️ Requisitos

Para ejecutar el proyecto necesitas:

* Un navegador web moderno.
* Visual Studio Code.
* Extensión **Live Server**.
* Backend de LogiTrack funcionando.
* MySQL funcionando y configurado para el backend.

---

# ▶️ Instalación

Clona el repositorio:

```bash
git clone https://github.com/SantiagoRuedaGarciaPer/LogiTrackWeb.git
```

Entra a la carpeta:

```bash
cd LogiTrackWeb
```

Abre el proyecto en Visual Studio Code:

```bash
code .
```

Después abre:

```text
index.html
```

con **Live Server**.

La aplicación estará disponible normalmente en:

```text
http://127.0.0.1:5500
```

---

# 🔗 Backend

Este proyecto necesita el backend de LogiTrack para funcionar correctamente.

Repositorio:

**LogiTrack**

```text
https://github.com/SantiagoRuedaGarciaPer/LogiTrack
```

El backend debe estar ejecutándose antes de utilizar el frontend.

---

# 🌐 CORS

Debido a que el frontend y el backend se ejecutan en diferentes puertos durante el desarrollo, el backend debe permitir las peticiones provenientes del servidor donde se ejecuta el frontend.

Por ejemplo:

```text
Frontend
http://127.0.0.1:5500

        ↓

Backend
http://localhost:8080
```

El backend de LogiTrack cuenta con una configuración de CORS para permitir esta comunicación.

---

# 🔒 Manejo de sesión

El JWT se almacena temporalmente en el navegador utilizando:

```javascript
localStorage
```

Al iniciar sesión:

```text
Usuario
   ↓
Login
   ↓
Backend
   ↓
JWT
   ↓
localStorage
```

Las páginas protegidas comprueban la existencia del token antes de permitir el acceso.

Al cerrar sesión:

```text
Cerrar sesión
      ↓
Eliminar JWT
      ↓
Volver al Login
```

---

# 📸 Interfaz

El proyecto cuenta con diferentes vistas para cada sección:

* Login
* Home
* Empleados
* Bodegas
* Productos

Cada sección posee sus propios archivos HTML, CSS y JavaScript.

---

# 🔗 Repositorios

### Frontend

[LogiTrackWeb](https://github.com/SantiagoRuedaGarciaPer/LogiTrackWeb)

### Backend

[LogiTrack](https://github.com/SantiagoRuedaGarciaPer/LogiTrack)

---

# 👨‍💻 Autor

**Santiago Rueda Garcia**

Proyecto desarrollado como sistema web de gestión de inventario utilizando **HTML, CSS, JavaScript y Spring Boot**.

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos.
