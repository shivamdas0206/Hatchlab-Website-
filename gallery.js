// Enhanced Gallery System for Hatchlab Innovations

class HatchlabGallery {
    constructor() {
        this.currentIndex = 0;
        this.galleryItems = [
            {
                image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
                title: 'AI Innovation Lab',
                category: 'Technology',
                description: 'Cutting-edge AI research and development facility'
            },
            {
                image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
                title: 'Startup Incubator',
                category: 'Business',
                description: 'Modern workspace for emerging entrepreneurs'
            },
            {
                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
                title: 'Digital Transformation',
                category: 'Consulting',
                description: 'Enterprise digital transformation solutions'
            },
            {
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
                title: 'Innovation Workshop',
                category: 'Events',
                description: 'Collaborative innovation and ideation sessions'
            },
            {
                image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop',
                title: 'Tech Conference',
                category: 'Events',
                description: 'Annual technology and innovation conference'
            },
            {
                image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop',
                title: 'Product Development',
                category: 'Technology',
                description: 'End-to-end product development lifecycle'
            }
        ];
        this.init();
    }

    init() {
        this.renderGallery();
        this.setupEventListeners();
        this.startAutoplay();
        this.initializeHexBackground();
    }

    renderGallery() {
        const carousel = document.getElementById('galleryCarousel');
        if (!carousel) return;

        carousel.innerHTML = '';
        
        this.galleryItems.forEach((item, index) => {
            const galleryCard = document.createElement('div');
            galleryCard.className = `gallery-card ${index === this.currentIndex ? 'is-active' : ''}`;
            galleryCard.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-content">
                    <div class="gallery-info">
                        <h3>${item.title}</h3>
                        <span class="gallery-category">${item.category}</span>
                    </div>
                    <div class="gallery-description">${item.description}</div>
                </div>
            `;
            carousel.appendChild(galleryCard);
        });

        this.updateGalleryPositions();
    }

    updateGalleryPositions() {
        const cards = document.querySelectorAll('.gallery-card');
        const totalCards = cards.length;
        const radius = 400;
        const centerX = 0;
        const centerY = 0;

        cards.forEach((card, index) => {
            const relativeIndex = (index - this.currentIndex + totalCards) % totalCards;
            const angle = (relativeIndex * 360) / totalCards;
            const radian = (angle * Math.PI) / 180;
            
            let x = Math.sin(radian) * radius;
            let z = Math.cos(radian) * radius;
            let rotateY = -angle;
            
            // Scale and opacity based on position
            let scale = 1;
            let opacity = 0.7;
            
            if (relativeIndex === 0) {
                // Center card (active)
                scale = 1.2;
                opacity = 1;
                z += 100; // Bring forward
                card.classList.add('is-active');
            } else {
                card.classList.remove('is-active');
                if (relativeIndex === 1 || relativeIndex === totalCards - 1) {
                    // Adjacent cards
                    scale = 0.9;
                    opacity = 0.8;
                } else {
                    // Far cards
                    scale = 0.7;
                    opacity = 0.5;
                }
            }

            card.style.transform = `
                translate(-50%, -50%) 
                translate3d(${x}px, ${centerY}px, ${z}px) 
                rotateY(${rotateY}deg) 
                scale(${scale})
            `;
            card.style.opacity = opacity;
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.galleryItems.length;
        this.updateGalleryPositions();
        this.resetAutoplay();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
        this.updateGalleryPositions();
        this.resetAutoplay();
    }

    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Touch/swipe support
        let startX = 0;
        let startY = 0;
        const carousel = document.getElementById('galleryCarousel');
        
        if (carousel) {
            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });

            carousel.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const diffX = startX - endX;
                const diffY = startY - endY;

                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                }
            });
        }
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, 5000); // Change slide every 5 seconds
    }

    resetAutoplay() {
        clearInterval(this.autoplayInterval);
        this.startAutoplay();
    }

    initializeHexBackground() {
        // Initialize hexagon background animation
        const hexContainer = document.getElementById('gallery-hex');
        if (!hexContainer) return;

        // Create hexagon grid
        const hexCount = 50;
        for (let i = 0; i < hexCount; i++) {
            const hex = document.createElement('div');
            hex.className = 'hexagon';
            hex.style.left = Math.random() * 100 + '%';
            hex.style.top = Math.random() * 100 + '%';
            hex.style.animationDelay = Math.random() * 2 + 's';
            hexContainer.appendChild(hex);
        }

        // Random highlight animation
        setInterval(() => {
            const hexagons = hexContainer.querySelectorAll('.hexagon');
            const randomHex = hexagons[Math.floor(Math.random() * hexagons.length)];
            randomHex.classList.add('highlight');
            
            setTimeout(() => {
                randomHex.classList.remove('highlight');
            }, 1500);
        }, 800);
    }
}

// Global functions for button controls
function galleryNext() {
    if (window.hatchlabGallery) {
        window.hatchlabGallery.next();
    }
}

function galleryPrev() {
    if (window.hatchlabGallery) {
        window.hatchlabGallery.prev();
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.hatchlabGallery = new HatchlabGallery();
});

// Intersection Observer for performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('gallery-visible');
        }
    });
}, observerOptions);

// Observe gallery section when it exists
document.addEventListener('DOMContentLoaded', () => {
    const gallerySection = document.querySelector('.gallery-section');
    if (gallerySection) {
        galleryObserver.observe(gallerySection);
    }
});