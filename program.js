// Inicializamos el primer mapa (OpenStreetMap)
var map1 = L.map('map1').setView([51.505, -0.09], 13);  // Coordenadas iniciales y zoom

// Capa del primer mapa (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map1);

// Inicializamos el segundo mapa (otra capa base)
var map2 = L.map('map2').setView([51.505, -0.09], 13);  // Coordenadas iniciales y zoom

// Capa del segundo mapa (puedes elegir otra capa base)
L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenTopoMap contributors'
}).addTo(map2);

// Función para mover la barra y actualizar los mapas
var slider = document.getElementById("slider");
var isDragging = false;

// Hacer que la barra se mueva
slider.addEventListener("mousedown", function(e) {
    isDragging = true;
    document.body.style.userSelect = "none";  // Desactivar selección de texto mientras se arrastra
});

document.addEventListener("mousemove", function(e) {
    if (isDragging) {
        var containerWidth = document.getElementById("map-container").offsetWidth;
        var sliderPosition = e.clientX;  // Obtener la posición horizontal del mouse

        // Establecer la posición de la barra
        var newLeft = sliderPosition - 5;  // Ajuste para centrar la barra en el mouse

        // Asegurarse de que la barra no se desplace fuera del contenedor
        if (newLeft >= 0 && newLeft <= containerWidth) {
            slider.style.left = newLeft + "px";

            // Ajustar la opacidad de los mapas según la posición de la barra
            var percentage = newLeft / containerWidth;  // Porcentaje de la posición de la barra
            map1._container.style.clipPath = `inset(0 ${100 - percentage * 100}% 0 0)`;  // Cortar el mapa 1
            map2._container.style.clipPath = `inset(0 0 0 ${percentage * 100}%)`;  // Cortar el mapa 2
        }
    }
});

document.addEventListener("mouseup", function() {
    isDragging = false;
    document.body.style.userSelect = "auto";  // Restaurar la selección de texto
});

document.addEventListener("mouseleave", function() {
    isDragging = false;
    document.body.style.userSelect = "auto";  // Restaurar la selección de texto
});
