document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const searchInput = document.getElementById('searchInput');
    const categories = document.querySelectorAll('.faq-category');
    const noResults = document.getElementById('noResults');

    // --- Accordion Toggle Functionality ---
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const content = currentItem.querySelector('.accordion-content');
            const isActive = currentItem.classList.contains('active');

            // Close matching category items for cleaner UI
            const siblingItems = currentItem.parentElement.querySelectorAll('.accordion-item');
            siblingItems.forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
            });

            // Open if it wasn't already active
            if (!isActive) {
                currentItem.classList.add('active');
                // Dynamically computes precise pixel height for stutter-free animations
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- Live Searching / Filtering Mechanism ---
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

            // Dynamically hide category titles if all contents are filtered out
            if (visibleInGroup === 0 && searchTerm !== "") {
                category.classList.add('hidden');
            } else {
                category.classList.remove('hidden');
            }
        });

        // Toggle visibility of empty search statement 
        if (totalVisibleQuestions === 0 && searchTerm !== "") {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }
    });
});