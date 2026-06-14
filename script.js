/**
 * Farmspherica Engine - High-Performance, Glitch-Free Script Build
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    animateWaterValue();
});

/**
 * 1. Intersection Observer Frame for Smooth Scroll Reveals
 * Uses modern IntersectionObserver API instead of standard window listeners 
 * to entirely eliminate layout scroll stuttering.
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Fire animation once
            }
        });
    }, observerOptions);

    reveals.forEach(rev => observer.observe(rev));
}

/**
 * 2. Optimized Metric Counter Animation
 * Counts cleanly from 0% up to 90% inside the side diagnostic dashboard.
 */
function animateWaterValue() {
    const el = document.getElementById('live-water-counter');
    if (!el) return;

    let current = 0;
    const target = 90;
    const duration = 1500;
    const stepTime = Math.floor(duration / target);

    const timer = setInterval(() => {
        current++;
        el.textContent = current + "%";
        if (current === target) {
            clearInterval(timer);
        }
    }, stepTime);
}