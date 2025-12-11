// Gallery Filter System for Hatchlab Innovations

class GalleryFilters {
    constructor() {
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.createFilterButtons();
        this.setupFilterEvents();
    }

    createFilterButtons() {
        const gallerySection = document.querySelector('.gallery-section');
        if (!gallerySection) return;

        const filterContainer = document.createElement('div');
        filterContainer.className = 'gallery-filters';
        
        const filters = [
            { key: 'all', label: 'All Projects' },
            { key: 'technology', label: 'Technology' },
            { key: 'business', label: 'Business' },
            { key: 'consulting', label: 'Consulting' },
            { key: 'events', label: 'Events' }
        ];

        filters.forEach(filter => {
            const button = document.createElement('button');
            button.className = `filter-btn ${filter.key === 'all' ? 'active' : ''}`;
            button.textContent = filter.label;
            button.dataset.filter = filter.key;
            filterContainer.appendChild(button);
        });

        // Insert after header row
        const headerRow = gallerySection.querySelector('.gallery-header-row');
        if (headerRow) {
            headerRow.insertAdjacentElement('afterend', filterContainer);
        }
    }

    setupFilterEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.handleFilterClick(e.target);
            }
        });
    }

    handleFilterClick(button) {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Get filter value
        const filter = button.dataset.filter;
        this.currentFilter = filter;

        // Filter gallery items
        this.filterGalleryItems(filter);
    }

    filterGalleryItems(filter) {
        const gallery = window.hatchlabGallery;
        if (!gallery) return;

        let filteredItems;
        if (filter === 'all') {
            filteredItems = gallery.galleryItems;
        } else {
            filteredItems = gallery.galleryItems.filter(item => 
                item.category.toLowerCase() === filter.toLowerCase()
            );
        }

        // Update gallery with filtered items
        gallery.updateGalleryItems(filteredItems);
    }
}

// Extend the main gallery class to support filtering
if (typeof HatchlabGallery !== 'undefined') {
    HatchlabGallery.prototype.updateGalleryItems = function(newItems) {
        this.galleryItems = newItems;
        this.currentIndex = 0;
        this.renderGallery();
    };
}

// Initialize filters when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for main gallery to initialize first
    setTimeout(() => {
        window.galleryFilters = new GalleryFilters();
    }, 100);
});