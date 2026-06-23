document.addEventListener("DOMContentLoaded", function () {
    const nombreInput = document.getElementById("nombre");
    const telefonoInput = document.getElementById("telefono");
    const guardarButton = document.getElementById("guardarBtn");
    const buscarButton = document.getElementById("buscarBtn");
    const eliminarButton = document.getElementById("eliminarBtn");
    const eliminarTodosButton = document.getElementById("eliminarTodosBtn");
    const listaContactos = document.getElementById("listaContactos")

    function guardarDatos() {
        const nombre = nombreInput.value.trim();
        const telefono = telefonoInput.value.trim();

        if (nombre == "" || telefono == "") {
            alert("Copleta los datos");
            return;
        }
        localStorage.setItem(nombre, telefono);
        nombreInput.value = "";
        telefonoInput.value = "";

        actualizarDatos();
    }

    function buscarDatos() {
        const nombreaBuscar = nombreInput.value.trim();
        if (nombreaBuscar === "") {
            alert("escribe un nombre en el campo para buscar");
            return;
        }
        const telefonoEncontrado = localStorage.getItem(nombreaBuscar);
        if (telefonoEncontrado) {
            telefonoInput.value= telefonoEncontrado;
        } else {
            alert("no se encontraron resultados");
            telefonoInput.value = "";
        }
    }

    function eliminarDatos() {
        const nombreaEliminar = nombreInput.value.trim();

        if (nombreaEliminar === "") {
            alert("escribe un nombre en el campo para eliminar");
            return;
        }

        if (localStorage.getItem(nombreaEliminar)) {

            localStorage.removeItem(nombreaEliminar);
            nombreInput.value = "";
            telefonoInput.value = "";
            actualizarDatos();

        } else {
            alert("No se encontró el nombre a eliminar");
        }

    }

    function eliminarTodos() {
        if (localStorage.length === 0) {
            alert("Agenda vacia");
            return;
        }
        if (confirm("¿Seguro de eliminar todos?")) {
            localStorage.clear();
            nombreInput.value = "";
            telefonoInput.value = "";
            actualizarDatos();
        }
    }

    function actualizarDatos() {
        listaContactos.innerHTML = "";
        for (let i = 0; i < localStorage.length; i++) {
            const nombre = localStorage.key(i);
            const telefono = localStorage.getItem(nombre);

            const fila = document.createElement("tr");
            fila.innerHTML = "<td>" + nombre + "</td><td>" + telefono + "</td>";
            listaContactos.appendChild(fila);

        }
    }
    guardarButton.addEventListener("click", guardarDatos);
    buscarButton.addEventListener("click", buscarDatos);
    eliminarButton.addEventListener("click", eliminarDatos);
    eliminarTodosButton.addEventListener("click", eliminarTodos);

    actualizarDatos();
})