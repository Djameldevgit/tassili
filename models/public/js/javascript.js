// Obtener los elementos del DOM
const sidebar = document.getElementById("container-sidebar");
const toggleButton = document.getElementById("toggleButton");
const sidebarButton = document.getElementById("sidebarButton"); // Seleccionar el botón dentro del sidebar

// Agregar un evento de clic al botón para abrir/cerrar el sidebar
toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("open"); // Toggle para abrir o cerrar el sidebar
});

// Agregar un evento de clic al botón dentro del sidebar (por ejemplo, para cerrar el sidebar)
sidebarButton.addEventListener("click", () => {
    sidebar.classList.remove("open"); // Cerrar el sidebar al hacer clic
});

