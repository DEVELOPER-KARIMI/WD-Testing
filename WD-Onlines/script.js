document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".navbar a");
    
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let targetPage = this.getAttribute("href");
            
            document.body.style.animation = "blinkEffect 1.5s";
            setTimeout(() => {
                window.location.href = targetPage;
            }, 500);
        });
    });
});

// CSS animation effect
const style = document.createElement("style");
style.innerHTML = `
@keyframes blinkEffect {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
}

body {
    animation: none;
}`;
document.head.appendChild(style);


/*--------------------------------------------------------------
# Slider and Typing Effect Synchronization
--------------------------------------------------------------*/
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const words = ["Eiffel Tower, Paris", "Shosar Lake, Skardu", "Big Ben, London", "Closseum, Rome ", "Baltit Fort, Hunza" , "Arc de Tromphe, France", "Tower Bridge, UK", "El Castillo, Mexico", "Craig Goch Dam, UK", "Blue Mosque, Turkey", "Stonehenge, England", "Statue of Liberty, New York", "Malecon, Cuba"];
const typedElement = document.querySelector(".typed");
const typingSpeed = 150;
const erasingSpeed = 100;
const delayBetweenWords = 2000;
let charIndex = 0;
let isDeleting = false;

function updateSlideAndText() {
    // Update slider
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentIndex) {
            slide.classList.add('active');
        }
    });

    // Reset typing effect
    charIndex = 0;
    isDeleting = false;
    typedElement.textContent = "";
    typeEffect();
}

function typeEffect() {
    const word = words[currentIndex];
    if (!isDeleting && charIndex < word.length) {
        typedElement.textContent += word.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        typedElement.textContent = word.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeEffect, erasingSpeed);
    } else {
        if (!isDeleting) {
            isDeleting = true;
            setTimeout(typeEffect, delayBetweenWords);
        } else {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % totalSlides;
            setTimeout(updateSlideAndText, 500);
        }
    }
}

// Start the synchronized effect
document.addEventListener("DOMContentLoaded", () => {
    updateSlideAndText();
});

/*--------------------------------------------------------------
# Scroll To Top Button
--------------------------------------------------------------*/

function toggleScrollTopButton() {
    let scrollTopBtn = document.getElementById('scrollTopBtn');
    if (window.scrollY > 50) { // Show quickly after slight scrolling
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.addEventListener('scroll', toggleScrollTopButton);





/*--------------------------------------------------------------
#      Testinomial Sliders
--------------------------------------------------------------*/
let currentIndexi = 0;
const slidesi = document.querySelector(".testimonial-slides");
const totalSlidesi = document.querySelectorAll(".testimonial-slide").length;
const dotsContainer = document.querySelector(".testimonial-dots");
let autoSlideInterval;

// Create dots dynamically
for (let i = 0; i < totalSlidesi; i++) {
    const dot = document.createElement("span");
    dot.classList.add("testimonial-dot");
    dot.setAttribute("data-index", i);
    dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll(".testimonial-dot");
dots[0].classList.add("dot-active");

function updateSlide() {
    slidesi.style.transform = `translateX(-${currentIndexi * 100}%)`;
    dots.forEach(dot => dot.classList.remove("dot-active"));
    dots[currentIndexi].classList.add("dot-active");
}

function nextSlide() {
    currentIndexi = (currentIndexi + 1) % totalSlidesi;
    updateSlide();
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

dots.forEach(dot => {
    dot.addEventListener("click", function () {
        currentIndexi = parseInt(this.getAttribute("data-index"));
        updateSlide();
        resetAutoSlide();
    });
});

startAutoSlide();


/*--------------------------------------------------------------
#     FAQ's Scripts
--------------------------------------------------------------*/
document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");

        let answer = item.querySelector(".faq-answer");
        if (item.classList.contains("active")) {
            answer.style.display = "block";
        } else {
            answer.style.display = "none";
        }
    });
});