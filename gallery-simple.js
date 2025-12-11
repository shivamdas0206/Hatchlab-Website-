// Simple Gallery Enhancement for Hatchlab
class SimpleGallery {
    constructor() {
        this.currentIndex = 0;
        this.galleryItems = [
            {
                image: 'images/gallery/1.png',
                title: 'Innovation Lab',
                category: 'Technology',
                date: '8 Jan 2025'
            },
            {
                image: 'images/gallery/2.png',
                title: 'Startup Workspace',
                category: 'Business',
                date: '9 Jan 2025'
            },
            {
                image: 'images/gallery/3.png',
                title: 'Team Collaboration',
                category: 'Events',
                date: '10 Jan 2025'
            },
            {
                image: 'images/gallery/1.png',
                title: 'Product Development',
                category: 'Technology',
                date: '11 Jan 2025'
            },
            {
                image: 'images/gallery/2.png',
                title: 'Client Meeting',
                category: 'Business',
                date: '12 Jan 2025'
            },
            {
                image: 'images/gallery/3.png',
                title: 'Conference',
                category: 'Events',
                date: '13 Jan 2025'
            }
        ];
        this.init();
    }

    init() {
        this.renderGallery();
        this.updateStats();
        this.initHexBackground();
    }

    renderGallery() {
        const carousel = document.getElementById('galleryCarousel');
        if (!carousel) return;

        carousel.innerHTML = '';
        
        this.galleryItems.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = `gallery-card ${index === this.currentIndex ? 'is-active' : ''}`;
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-content">
                    <div class="gallery-info">
                        <h3>${item.title}</h3>
                        <span class="gallery-category">${item.category}</span>
                    </div>
                    <span class="gallery-date">${item.date}</span>
                </div>
            `;
            carousel.appendChild(card);
        });

        this.updatePositions();
    }

    updatePositions() {
        const cards = document.querySelectorAll('.gallery-card');
        const total = cards.length;
        
        cards.forEach((card, index) => {
            const offset = (index - this.currentIndex + total) % total;
            let x = offset * 300 - 150;
            let scale = 1;
            let opacity = 0.7;
            let zIndex = 1;
            
            if (offset === 0) {
                scale = 1.1;
                opacity = 1;
                zIndex = 10;
                card.classList.add('is-active');
            } else {
                card.classList.remove('is-active');
                if (offset === 1 || offset === total - 1) {
                    scale = 0.9;
                    opacity = 0.8;
                    zIndex = 5;
                } else {
                    scale = 0.7;
                    opacity = 0.5;
                }
            }
            
            card.style.transform = `translateX(${x}px) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.zIndex = zIndex;
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.galleryItems.length;
        this.updatePositions();
        this.updateStats();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
        this.updatePositions();
        this.updateStats();
    }

    updateStats() {
        const currentSlide = document.getElementById('currentSlide');
        const totalSlides = document.getElementById('totalSlides');
        const currentCategory = document.getElementById('currentCategory');
        
        if (currentSlide) currentSlide.textContent = this.currentIndex + 1;
        if (totalSlides) totalSlides.textContent = this.galleryItems.length;
        if (currentCategory) currentCategory.textContent = this.galleryItems[this.currentIndex].category;
    }

    initHexBackground() {
        const hexContainer = document.getElementById('gallery-hex');
        if (!hexContainer) return;

        for (let i = 0; i < 30; i++) {
            const hex = document.createElement('div');
            hex.className = 'hexagon';
            hex.style.left = Math.random() * 100 + '%';
            hex.style.top = Math.random() * 100 + '%';
            hex.style.animationDelay = Math.random() * 2 + 's';
            hexContainer.appendChild(hex);
        }
    }
}

function galleryNext() {
    if (window.simpleGallery) {
        window.simpleGallery.next();
    }
}

function galleryPrev() {
    if (window.simpleGallery) {
        window.simpleGallery.prev();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.simpleGallery = new SimpleGallery();
});