import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const heroCaption = document.querySelector("#hero-slide-caption");
const heroIndicators = Array.from(document.querySelectorAll(".hero-indicator"));
const heroCaptions = ["Ferrari · 2024 season", "Red Bull Racing · 2026 car"];
const hero = document.querySelector(".hero");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let currentHeroSlide = 0;
let heroTimer;

function showHeroSlide(index) {
    currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === currentHeroSlide);
    });
    heroIndicators.forEach((indicator, slideIndex) => {
        indicator.classList.toggle("is-active", slideIndex === currentHeroSlide);
        if (slideIndex === currentHeroSlide) {
            indicator.setAttribute("aria-current", "true");
        } else {
            indicator.removeAttribute("aria-current");
        }
    });
    heroCaption.textContent = heroCaptions[currentHeroSlide];
}

function stopHeroRotation() {
    window.clearInterval(heroTimer);
}

function startHeroRotation() {
    stopHeroRotation();
    if (!reducedMotion.matches) {
        heroTimer = window.setInterval(() => showHeroSlide(currentHeroSlide + 1), 6000);
    }
}

heroIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        showHeroSlide(index);
        startHeroRotation();
    });
});
hero.addEventListener("mouseenter", stopHeroRotation);
hero.addEventListener("mouseleave", startHeroRotation);
hero.addEventListener("focusin", stopHeroRotation);
hero.addEventListener("focusout", startHeroRotation);
reducedMotion.addEventListener("change", startHeroRotation);
startHeroRotation();
