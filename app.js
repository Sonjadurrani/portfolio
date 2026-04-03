document.addEventListener('DOMContentLoaded', function() {
    var header = document.getElementById('myHeader');
    var page = document.getElementById('page');
    var openMenuButton = document.getElementById('openmenu');

    window.addEventListener('scroll', function() {
        page.classList.remove('menuopen');
        if (window.scrollY >= 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Event listener to remove the sticky class when the button is clicked
    openMenuButton.addEventListener('click', function() {
        header.classList.remove('sticky');
        page.classList.add('menuopen');
    });

    var links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // Prevent the default action
            event.preventDefault();

            // Get the target element
            var targetId = this.getAttribute('href');
            var targetElement = document.querySelector(targetId);

            // Smooth scroll to target
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});


const carousel = document.getElementById("carousel");
const cards = document.querySelectorAll(".card");

let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener("mouseleave", () => isDown = false);
carousel.addEventListener("mouseup", () => isDown = false);

carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;

    carousel.scrollLeft = scrollLeft - walk;
});


function updateCards() {
    const center = window.innerWidth / 2;

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;

        const distance = (cardCenter - center) / center;

        const rotate = distance * 30;
        const scale = 1 - Math.abs(distance) * 0.4;
        const opacity = 1 - Math.abs(distance) * 0.7;

        card.style.transform = `
      scale(${scale})
      rotateY(${rotate}deg)
    `;

        card.style.opacity = opacity;

        if (Math.abs(distance) < 0.2) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });
}

carousel.addEventListener("scroll", () => {
    requestAnimationFrame(updateCards);
});

window.addEventListener("load", updateCards);