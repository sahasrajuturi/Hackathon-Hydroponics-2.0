/**
 * Farmspherica Engine - High Contrast Interactive Build
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    animateWaterValue();
    initDynamic3DTracker();
    initBackgroundParallax();
});

/**
 * 1. Intersection Observer Frame for Scroll Reveals
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");
    const revealCheck = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach(rev => {
            const elementTop = rev.getBoundingClientRect().top;
            if (elementTop < windowHeight - 90) {
                rev.classList.add("active");
            }
        });
    };
    window.addEventListener("scroll", revealCheck);
    revealCheck();
}

/**
 * 2. Precision Metric Counter Animation
 */
function animateWaterValue() {
    const el = document.getElementById('live-water-counter');
    if (!el) return;

    let current = 0;
    const target = 90;
    const duration = 1600;
    const stepTime = Math.abs(Math.floor(duration / target));

    const timer = setInterval(() => {
        current++;
        el.textContent = current + "%";
        if (current === target) {
            clearInterval(timer);
        }
    }, stepTime);
}

/**
 * 3. Dynamic Cursor-Tracking Card Tilt Function
 */
function initDynamic3DTracker() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    const card = document.querySelector('.card-3d');
    if (!card) return;

    document.addEventListener('mousemove', (e) => {
        const halfW = window.innerWidth / 2;
        const halfH = window.innerHeight / 2;

        const rotateX = ((halfH - e.clientY) / halfH) * 12;
        const rotateY = ((e.clientX - halfW) / halfW) * 12;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
}

/**
 * 4. Ambient 3D Parallax Background System
 * Calculates scroll velocity to offset background abstract color vectors independently.
 */
function initBackgroundParallax() {
    const orbs = document.querySelectorAll('.bg-orb');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        orbs.forEach(orb => {
            const speed = parseInt(orb.getAttribute('data-speed')) || 2;
            const yPos = -(scrolled * speed / 15);
            orb.style.transform = `translateY(${yPos}px)`;
        });
    });
}