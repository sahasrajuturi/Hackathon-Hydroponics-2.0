document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const searchInput = document.getElementById('searchInput');
    const accordionItems = document.querySelectorAll('.accordion-item');
    const categories = document.querySelectorAll('.faq-category');
    const noResults = document.getElementById('noResults');

    // --- Accordion Toggle Functionality ---
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const content = currentItem.querySelector('.accordion-content');

            // Check if item is already active
            const isActive = currentItem.classList.contains('active');

            // Close all items in the same category for clean UX
            const siblingItems = currentItem.parentElement.querySelectorAll('.accordion-item');
            siblingItems.forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
            });

            // If it wasn't active, open it
            if (!isActive) {
                currentItem.classList.add('active');
                // Calculate real height of inner text for smooth transition without lag
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- Live Filtering Search Functionality ---
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
                    // Collapse item if it's hidden while open
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Hide or show category headers dynamically based on content presence
            if (visibleInGroup === 0 && searchTerm !== "") {
                category.classList.add('hidden');
            } else {
                category.classList.remove('hidden');
            }
        });

        // Display 'no results found' if query matches absolutely nothing
        if (totalVisibleQuestions === 0 && searchTerm !== "") {
            noResults.classList.remove('hidden');
        } else {
            noResults.classList.add('hidden');
        }
    });
});