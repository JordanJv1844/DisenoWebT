document.addEventListener("DOMContentLoaded", () => {

    const txtNombre = document.getElementById("nombre");
    const txtTelefono = document.getElementById("telefono");
    const txtEmail = document.getElementById("email");
    const txtDireccion = document.getElementById("direccion");

    const btnGuardar = document.getElementById("guardarBtn");
    const btnBuscar = document.getElementById("buscarBtn");
    const btnEliminar = document.getElementById("eliminarBtn");
    const btnEliminarTodo = document.getElementById("elimTodoBtn");
    const btnOrdenar = document.getElementById("ordenarBtn");

    const cuerpoTabla = document.getElementById("listaContactos");
    const lblContador = document.getElementById("contadorContactos");

    let ordenAscendente = true;

    function registrarContacto() {

        const nombre = txtNombre.value.trim();
        const telefono = txtTelefono.value.trim();
        const email = txtEmail.value.trim();
        const direccion = txtDireccion.value.trim();

        if (!nombre || !telefono || !email || !direccion) {
            alert("Complete todos los campos.");
            return;
        }

        const contacto = {
            telefono,
            email,
            direccion
        };

        localStorage.setItem(nombre, JSON.stringify(contacto));

        limpiarFormulario();
        renderizarTabla();
    }

    function localizarContacto() {

        const nombreBuscado = txtNombre.value.trim();

        if (!nombreBuscado) {
            alert("Ingrese un nombre para buscar.");
            return;
        }

        const datosGuardados = localStorage.getItem(nombreBuscado);

        if (datosGuardados) {

            const contacto = JSON.parse(datosGuardados);

            txtTelefono.value = contacto.telefono;
            txtEmail.value = contacto.email;
            txtDireccion.value = contacto.direccion;

        } else {

            alert("Contacto no encontrado.");
            limpiarFormulario();

        }
    }

    function borrarContacto() {

        const nombreEliminar = txtNombre.value.trim();

        if (!nombreEliminar) {
            alert("Ingrese un nombre para eliminar.");
            return;
        }

        if (localStorage.getItem(nombreEliminar)) {

            localStorage.removeItem(nombreEliminar);

            limpiarFormulario();
            renderizarTabla();

        } else {

            alert("El contacto no existe.");
            limpiarFormulario();

        }
    }

    function borrarTodo() {

        if (localStorage.length === 0) {
            alert("No existen contactos registrados.");
            return;
        }

        if (confirm("¿Desea eliminar todos los contactos?")) {

            localStorage.clear();

            limpiarFormulario();
            renderizarTabla();
        }
    }

    function renderizarTabla() {

        cuerpoTabla.innerHTML = "";

        let agenda = [];

        for (let i = 0; i < localStorage.length; i++) {

            const nombre = localStorage.key(i);
            const informacion = JSON.parse(localStorage.getItem(nombre));

            agenda.push({
                nombre: nombre,
                telefono: informacion.telefono,
                email: informacion.email,
                direccion: informacion.direccion
            });
        }

        agenda.sort((a, b) =>
            ordenAscendente
                ? a.nombre.localeCompare(b.nombre)
                : b.nombre.localeCompare(a.nombre)
        );

        agenda.forEach(contacto => {

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${contacto.nombre}</td>
                <td>${contacto.telefono}</td>
                <td>${contacto.email}</td>
                <td>${contacto.direccion}</td>
            `;

            cuerpoTabla.appendChild(fila);
        });

        lblContador.textContent =
            "Total de contactos: " + agenda.length;
    }

    function cambiarOrden() {

        ordenAscendente = !ordenAscendente;

        renderizarTabla();
    }

    function limpiarFormulario() {

        txtNombre.value = "";
        txtTelefono.value = "";
        txtEmail.value = "";
        txtDireccion.value = "";
    }

    btnGuardar.addEventListener("click", registrarContacto);
    btnBuscar.addEventListener("click", localizarContacto);
    btnEliminar.addEventListener("click", borrarContacto);
    btnEliminarTodo.addEventListener("click", borrarTodo);
    btnOrdenar.addEventListener("click", cambiarOrden);

    renderizarTabla();
});