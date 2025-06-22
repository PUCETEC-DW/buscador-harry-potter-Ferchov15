const input = document.getElementById("taskInput");
const button = document.getElementById("buscardor");
const list = document.getElementById("taskList");
const casaSelect = document.getElementById("casaSelect");


const DEFAULT_IMAGE = "https://via.placeholder.com/150?text=Sin+Imagen";

// Función para mostrar los personajes
function mostrarResultados(personajes) {
    list.innerHTML = "";

    if (personajes.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Personaje no encontrado";
        list.appendChild(li);
        return;
    }

    personajes.forEach(personaje => {
        const li = document.createElement("li");

        const nombre = document.createElement("h4");
        nombre.textContent = personaje.name;

        const casa = document.createElement("p");
        casa.textContent = `Casa: ${personaje.house || "Desconocida"}`;

        const imagen = document.createElement("img");
        imagen.src = personaje.image || DEFAULT_IMAGE;
        imagen.alt = personaje.name;
        imagen.width = 150;

        const separador = document.createElement("p");
        separador.textContent = '---------------------------------------'
        
        li.appendChild(nombre);
        li.appendChild(casa);
        li.appendChild(imagen);
        li.appendChild(separador);

        list.appendChild(li);
    });
}

// Función para buscar personajes
function buscarPersonajes() {
    const textoBusqueda = input.value.trim().toLowerCase();

    fetch("https://hp-api.onrender.com/api/characters")
        .then(response => response.json())
        .then(response => {
        const textoBusqueda = input.value.trim().toLowerCase();
        const casaSeleccionada = casaSelect.value;

        // Filtro por nombre y casa
        const personajesFiltrados = response.filter(p =>
            p.name.toLowerCase().includes(textoBusqueda) &&
            (casaSeleccionada === "" || p.house === casaSeleccionada)
        );

    personajesFiltrados.sort((a, b) => a.name.localeCompare(b.name));

    mostrarResultados(personajesFiltrados);
})

}

// Evento click y local store 
let itemsGuardados = JSON.parse(localStorage.getItem("listaItems")) || [];
itemsGuardados.forEach(item => crearElemento(item));

button.addEventListener("click", e =>{
    let myItem = input.value.trim();
    if (myItem !== "") {
        buscarPersonajes();
        if (!itemsGuardados.includes(myItem)) {
        crearElemento(myItem);
        itemsGuardados.push(myItem);
        localStorage.setItem("listaItems", JSON.stringify(itemsGuardados));
        } else {
        alert("Este elemento ya fue buscado.");
        }
        input.value = "";
    } else {
        alert("No se puede buscar un personaje vacío");
    }
    input.focus();
});

// (Opcional) Enter para buscar
input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        let myItem = input.value.trim();
        if (myItem !== "") {
            buscarPersonajes();
            if (!itemsGuardados.includes(myItem)) {
            crearElemento(myItem);
            itemsGuardados.push(myItem);
            localStorage.setItem("listaItems", JSON.stringify(itemsGuardados));
            } else {
            alert("Este elemento ya fue buscado.");
            }
            input.value = "";
        } else {
            alert("No se puede buscar un personaje vacío");
        }
        input.focus();
            
    }
    
});

// funcion de musica
const musica = document.getElementById("musicaFondo");
const botonMusica = document.getElementById("musicaBtn");
let reproduciendo = false;

botonMusica.addEventListener("click", () => {
    if (!reproduciendo) {
        musica.play();
        botonMusica.textContent = "🔇";
    } else {
        musica.pause();
        botonMusica.textContent = "🎵";
    }
    reproduciendo = !reproduciendo;
});

