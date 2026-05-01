// Vent til hele HTML er loaded før JS kører
document.addEventListener('DOMContentLoaded', function() {

    // Finder elementer fra DOM
    var header = document.getElementById('myHeader'); // navbar
    var page = document.getElementById('page');       // wrapper til menu state
    var openMenuButton = document.getElementById('openmenu'); // menu knap

    // Lytter efter scroll
    window.addEventListener('scroll', function() {

        // Lukker menu hvis man scroller
        page.classList.remove('menuopen');

        // Hvis man scroller mere end 100px → gør navbar sticky
        if (window.scrollY >= 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky'); // ellers fjern sticky
        }
    });

    // Når man klikker på menu knap
    openMenuButton.addEventListener('click', function() {
        header.classList.remove('sticky'); // fjerner sticky
        page.classList.add('menuopen');    // åbner menu
    });

    // Finder alle interne links (#about, #projects osv)
    var links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {

            event.preventDefault(); // stopper default hop

            // Finder target section
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);

            // Smooth scroll til sektionen
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});


// === CAROUSEL ===

// Finder carousel container og alle cards
const carousel = document.getElementById("carousel");
const cards = document.querySelectorAll(".card");

// Variabler til drag funktion
let isDown = false;
let startX;
let scrollLeft;

// Når man klikker (starter drag)
carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft; // start position
    scrollLeft = carousel.scrollLeft;       // nuværende scroll
});

// Stop drag hvis mus forlader eller slippes
carousel.addEventListener("mouseleave", () => isDown = false);
carousel.addEventListener("mouseup", () => isDown = false);

// Når man bevæger musen (dragger)
carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return; // kun hvis man holder mus nede
    e.preventDefault();

    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // hastighed

    carousel.scrollLeft = scrollLeft - walk; // flyt carousel
});


// === 3D EFFECT ===

function updateCards() {

    const center = window.innerWidth / 2; // midten af skærmen

    cards.forEach(card => {

        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;

        // afstand fra midten
        const distance = (cardCenter - center) / center;

        // beregner rotation, størrelse og opacity
        const rotate = distance * 30;
        const scale = 1 - Math.abs(distance) * 0.4;
        const opacity = 1 - Math.abs(distance) * 0.7;

        // giver 3D effekt
        card.style.transform = `
          scale(${scale})
          rotateY(${rotate}deg)
        `;

        card.style.opacity = opacity;

        // hvis kort er i midten → aktiv
        if (Math.abs(distance) < 0.2) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });
}

// Opdaterer cards når man scroller
carousel.addEventListener("scroll", () => {
    requestAnimationFrame(updateCards);
});

// Kører første gang siden loader
window.addEventListener("load", updateCards);