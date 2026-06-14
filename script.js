/**
 * Farmspherica Engine - High Performance Asynchronous Layout Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    animateWaterValue();
});

/**
 * 1. IntersectionObserver API for Ultra-Smooth Scroll Triggering
 * Bypasses traditional scroll-event layout thrashing entirely.
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal");

    const observerOptions = {
        root: null,
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Execution ends immediately to conserve processor overhead
            }
        });
    }, observerOptions);

    reveals.forEach(rev => observer.observe(rev));
}

/**
 * 2. Optimized Metric Value Diagnostics Counter
 */
function animateWaterValue() {
    const el = document.getElementById('live-water-counter');
    if (!el) return;

    let current = 0;
    const target = 90;
    const duration = 1400;
    const stepTime = Math.floor(duration / target);

    const timer = setInterval(() => {
        current++;
        el.textContent = current + "%";
        if (current === target) {
            clearInterval(timer);
        }
    }, stepTime);
}