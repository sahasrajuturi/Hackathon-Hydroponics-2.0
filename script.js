/**
 * Farmspherica - Interactive Landing Page Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initWaterCounter();
    initDynamic3DTilt();
});

/**
 * 1. Scroll-Driven Reveal System
 * Fades and slides elements into view dynamically as the user scrolls.
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Pixels from bottom when animation triggers

        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    // Run once on load to catch elements already in viewport
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
}

/**
 * 2. Animated Numerical Counter
 * Smoothly counts up to the target metric when the page finishes loading.
 */
function initWaterCounter() {
    const counterElement = document.getElementById('water-counter');
    if (!counterElement) return;

    const targetValue = 90;
    const duration = 2000; // Total animation speed in milliseconds
    const startTime = performance.now();

    const animateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Easing function for a smooth slow-down finish
        const easeOutQuad = progress * (2 - progress);
        const currentValue = Math.floor(easeOutQuad * targetValue);

        counterElement.textContent = `${currentValue}%`;

        if (progress < 1) {
            requestAnimationFrame(animateCount);
        }
    };

    // Stagger slightly for a premium, intentional feel
    setTimeout(() => {
        requestAnimationFrame(animateCount);
    }, 400);
}

/**
 * 3. Dynamic 3D Card Tilt Interaction
 * Tracks mouse movement across desktop screens to physically tip images 
 * toward the user's cursor for genuine depth. Completely bypasses mobile devices.
 */
function initDynamic3DTilt() {
    // Disable heavy matrix calculations on mobile or touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const cards = document.querySelectorAll('.float-element');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate inside the element
            const y = e.clientY - rect.top;  // y coordinate inside the element

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotational intensity (lower values = subtle tilt)
            const rotateX = ((centerY - y) / centerY) * 8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            // Smoothly snap back to default architectural resting angle
            card.style.transform = 'perspective(1000px) rotateX(4deg) rotateY(-4deg)';
        });
    });
}