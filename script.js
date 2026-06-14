/**
 * Farmspherica - Interactive Landing Page Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    animateWaterValue();
    initDynamic3DEffect();
});

/**
 * 1. Scroll-Driven Reveal System
 * Elements smoothly animate upwards into position as the user scrolls.
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");

    const revealCheck = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach(rev => {
            const elementTop = rev.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                rev.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealCheck);
    // Initial call to reveal elements already inside the viewport on load
    revealCheck();
}

/**
 * 2. Animated Numerical Counter
 * Counts smoothly from 0% up to 90% inside the floating water savings badge.
 */
function animateWaterValue() {
    const el = document.getElementById('live-water-counter');
    if (!el) return;

    let current = 0;
    const target = 90;
    const duration = 1800; // Total duration in milliseconds
    const stepTime = Math.abs(Math.floor(duration / target));

    const timer = setInterval(() => {
        current++;
        el.textContent = current + "%";
        if (current == target) {
            clearInterval(timer);
        }
    }, stepTime);
}

/**
 * 3. Mouse-Tracking 3D Tilt Effect
 * Tracks the mouse pointer across the desktop screen to dynamically tilt
 * the geometric card towards the user's cursor. (Bypasses touch screens).
 */
function initDynamic3DEffect() {
    // Gracefully exit if running on a touchscreen device to prevent conflict
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const card = document.querySelector('.card-3d');
    if (!card) return;

    document.addEventListener('mousemove', (e) => {
        const halfW = window.innerWidth / 2;
        const halfH = window.innerHeight / 2;

        // Scale down tilting angle thresholds (higher multiplier = deeper tilt)
        const rotateX = ((halfH - e.clientY) / halfH) * 14;
        const rotateY = ((e.clientX - halfW) / halfW) * 14;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
}