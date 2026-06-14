document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const searchInput = document.getElementById('searchInput');
    const categories = document.querySelectorAll('.faq-category');
    const noResults = document.getElementById('noResults');
    const tiltCards = document.querySelectorAll('.tilt-card');

    // --- Smooth Accordion Mechanics ---
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const content = currentItem.querySelector('.accordion-content');
            const isActive = currentItem.classList.contains('active');

            // Isolate closures to target individual category sections
            const siblingItems = currentItem.parentElement.querySelectorAll('.accordion-item');
            siblingItems.forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
            });

            if (!isActive) {
                currentItem.classList.add('active');
                // Hardware accelerated programmatic rendering to eliminate layout stutters
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- High-Performance Live Text Filter Matrix ---
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        let totalVisibleQuestions = 0;

        categories.forEach(category => {
            let visibleInGroup = 0;
            const items = category.querySelectorAll('.accordion-item');

            items.forEach(item => {
                const textContent = item.textContent.toLowerCase();

                if (textContent.includes(searchTerm)) {
                    item.classList.remove('hidden');
                    visibleInGroup++;
                    totalVisibleQuestions++;
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Cleanly clear full categories if empty of matching query results
            if (visibleInGroup === 0 && searchTerm !== "") {
                category.classList.add('hidden');
            } else {
                category.classList.remove('hidden');
            }
        });

        if (totalVisibleQuestions === 0 && searchTerm !== "") {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }
    });

    // --- Interactive Real-Time 3D Card Tilt Engine ---
    // Only applies on non-touch desktop layouts to save battery and processor cycles on mobile devices
    if (window.innerWidth > 950) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const cardRect = card.getBoundingClientRect();

                // Track relative coordinate offsets inside element boundaries
                const cardX = e.clientX - cardRect.left;
                const cardY = e.clientY - cardRect.top;

                // Map dimensional positions to coordinate degree ranges (-7.5 to +7.5)
                const rotateY = ((cardX / cardRect.width) - 0.5) * 15;
                const rotateX = (((cardY / cardRect.height) - 0.5) * -15);

                // Smooth real-time update using inline matrix transformations
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
                card.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.08)`;
            });

            card.addEventListener('mouseleave', () => {
                // Reset card surfaces cleanly when cursor steps off
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
                card.style.boxShadow = `0 8px 32px rgba(0,0,0,0.03)`;
            });
        });
    }
});