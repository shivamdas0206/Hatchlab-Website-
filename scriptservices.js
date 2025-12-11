let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    if (n === slideIndex) return;

    let targetIndex = n;
    if (targetIndex >= slides.length) targetIndex = 0;
    if (targetIndex < 0) targetIndex = slides.length - 1;

    const prevSlide = slides[slideIndex];
    const newSlide = slides[targetIndex];

    // Proper realistic upward page turn
    prevSlide.classList.add('slide-out');
    newSlide.classList.add('slide-in');

    newSlide.style.zIndex = 2;
    prevSlide.style.zIndex = 3;

    setTimeout(() => {
        slides.forEach(s => {
            s.classList.remove('slide-out', 'slide-in');
            s.style.zIndex = '';
            s.style.transform = '';
        });

        prevSlide.classList.remove('active');
        newSlide.classList.add('active');

        slideIndex = targetIndex;

        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex].classList.add('active');
    }, 1000); // Matches 1s animation
}

function nextSlide() {
    showSlide(slideIndex + 1);
}
// Auto-play every 6 seconds
setInterval(nextSlide, 3000);

// Manual navigation
function currentSlide(n) {
    showSlide(n);
}

// Start
showSlide(slideIndex);





 const modal = document.getElementById("connectModal");
    const btn = document.getElementById("connectBtn");
    const closeBtn = document.querySelector(".close-modal");

    btn.onclick = () => modal.style.display = "flex";
    closeBtn.onclick = () => modal.style.display = "none";
    
    window.onclick = (e) => { 
        if (e.target === modal) modal.style.display = "none"; 
    }

    document.getElementById("connectForm").onsubmit = (e) => {
        e.preventDefault();
        alert("Thank you! We will contact you soon.");
        modal.style.display = "none";
    };

    // Glowy Cursor Logic
    const cursor = document.querySelector('.glow-cursor');
    
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    
    const inputs = document.querySelectorAll('input, textarea, button, .close-modal');
    inputs.forEach(input => {
        input.addEventListener('mouseenter', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
        });
        input.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
        });
    });