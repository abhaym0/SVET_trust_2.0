document.addEventListener('DOMContentLoaded', (event) => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const viewButtons = document.querySelectorAll('.view-btn');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            animateToFullscreen(this);
        });
    });

    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent gallery item click
            animateToFullscreen(this.parentElement); // Pass the gallery item to the function
        });
    });


    document.getElementById('fullscreen-overlay').addEventListener('click', closeFullscreen);
});

function animateToFullscreen(element) {
    const imgSrc = element.querySelector("img").src;
    const fullscreenOverlay = document.getElementById("fullscreen-overlay");
    const fullscreenImage = document.getElementById("fullscreen-image");

    fullscreenImage.src = imgSrc;
    fullscreenOverlay.style.display = "flex";
    fullscreenOverlay.style.opacity = "0";

    // Apply initial 3D properties to the fullscreen image
    gsap.set(fullscreenImage, {
        xPercent: -50,
        yPercent: -50,
        transformPerspective: 1000,
        z: -500,
        scale: 0.5
    });

    // Ensure the fullscreen image is loaded before animating
    fullscreenImage.onload = () => {
        gsap.to(fullscreenOverlay, {duration: 0.5, opacity: 1, ease: "power2.inOut"});

        // Animate image to simulate moving towards the viewer
        gsap.to(fullscreenImage, {
            duration: .9,
            z: 0,
            scale: 1,
            ease: "power3.out"
        });
    };
}

function closeFullscreen() {
    const fullscreenOverlay = document.getElementById("fullscreen-overlay");

    // Animate the overlay to fade out and reset properties
    gsap.to(fullscreenOverlay, {duration: 0.5, opacity: 0, ease: "power2.inOut", onComplete: () => {
        fullscreenOverlay.style.display = "none";
        fullscreenOverlay.style.opacity = "1"; // Reset opacity for next time
        // Reset GSAP properties to initial
        gsap.set(fullscreenImage, {clearProps: "position, width, height, xPercent, yPercent, z, scale"});
    }});
}