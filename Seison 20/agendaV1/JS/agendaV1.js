document.addEventListener("DOMContentLoaded",function(){
    const nombreInput= document.getElementById("nombre");
    const telefonoInput= document.getElementById("telefono");
    const guardarButton = document.getElementById("guardarBtn");
    const recuperarButton = document.getElementById("recuperarBtn");
    const listUL = document.getElementById("lista")
    
    function guardarDatos(){
        localStorage.nombre = nombreInput.value;
        localStorage.telefono = telefonoInput.value;
    }

    function recuperarDatos(){
        if (localStorage.nombre != undefined && localStorage.telefono != undefined) {
            //si la condicion es verdadera
            listUL.innerHTML += "<li>" + localStorage.nombre +" - " + localStorage.telefono + "</li>";
        } else {
            //si es falsa
            listUL.innerHTML = "<li>No hay datos guardados</li>";
        }
    }
    guardarButton.addEventListener("click", guardarDatos);
    recuperarButton.addEventListener("click", recuperarDatos);
})