// Abre el lightbox y muestra la imagen seleccionada
function openLightbox(img) {
    // Crea o selecciona el contenedor del lightbox
    let lightbox = document.getElementById("lightbox");
    if (!lightbox) {
        lightbox = document.createElement("div");
        lightbox.id = "lightbox";
        lightbox.style.position = "fixed";
        lightbox.style.top = "0";
        lightbox.style.left = "0";
        lightbox.style.width = "100%";
        lightbox.style.height = "100%";
        lightbox.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        lightbox.style.display = "flex";
        lightbox.style.justifyContent = "center";
        lightbox.style.alignItems = "center";
        lightbox.style.zIndex = "1000";
        lightbox.onclick = closeLightbox; // Cerrar al hacer clic fuera de la imagen
        document.body.appendChild(lightbox);
    }

    // Crea o selecciona la imagen dentro del lightbox
    let lightboxImg = document.getElementById("lightbox-img");
    if (!lightboxImg) {
        lightboxImg = document.createElement("img");
        lightboxImg.id = "lightbox-img";
        lightboxImg.style.maxWidth = "90%";
        lightboxImg.style.maxHeight = "90%";
        lightboxImg.style.borderRadius = "12px";
        lightbox.appendChild(lightboxImg);
    }

    // Asigna la fuente de la imagen seleccionada al lightbox
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
}

// Cierra el lightbox al hacer clic fuera de la imagen
function closeLightbox(event) {
    if (event.target.id === "lightbox") {
        const lightbox = document.getElementById("lightbox");
        if (lightbox) {
            lightbox.style.display = "none";
        }
    }
}
