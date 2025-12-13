let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 3500);
}

function showSlide(n) {
    if (n === slideIndex) return;

    let targetIndex = (n + slides.length) % slides.length;
    const prevSlide = slides[slideIndex];
    const newSlide = slides[targetIndex];

    // Determine direction: forward if shortest path is +1, backward if -1 (for 3 slides, diff=2 means backward)
    let diff = (targetIndex - slideIndex + slides.length) % slides.length;
    let forward = diff <= slides.length / 2;

    // Make incoming slide visible immediately underneath
    newSlide.classList.add('active');
    newSlide.style.visibility = 'visible';
    newSlide.style.opacity = '1';
    newSlide.style.zIndex = '1';

    // Prepare outgoing slide on top
    prevSlide.style.zIndex = '2';

    // Apply direction-specific turn-out animation to outgoing slide only
    const directionClass = forward ? 'turn-out-forward' : 'turn-out-backward';
    prevSlide.classList.add(directionClass);

    // Cleanup after animation
    setTimeout(() => {
        prevSlide.classList.remove('active', 'turn-out-forward', 'turn-out-backward');
        prevSlide.style.visibility = 'hidden';
        prevSlide.style.zIndex = '';
        newSlide.style.zIndex = '1';
        slideIndex = targetIndex;
        dots.forEach(d => d.classList.remove('active'));
        dots[slideIndex].classList.add('active');
    }, 1800);
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function currentSlide(n) {
    showSlide(n);
}

// Pause on hover
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', () => {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
});

sliderContainer.addEventListener('mouseleave', () => {
    if (!autoPlayInterval) {
        startAutoPlay();
    }
});

// Initialize
slides.forEach((s, i) => {
    s.style.visibility = i === 0 ? 'visible' : 'hidden';
    if (i === 0) {
        s.classList.add('active');
        s.style.opacity = '1';
    }
});
dots[0].classList.add('active');

startAutoPlay();