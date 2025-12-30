// gallery-mobile-rotation.js
(function () {
  const track = document.querySelector('.team-gallery-track'); // CORRECT: matches your HTML
  const cards = [...document.querySelectorAll('.team-member-card')]; // CORRECT: matches your HTML

  if (!track || cards.length === 0) return;

  let index = 0;
  let intervalId = null;

  const mq = window.matchMedia('(max-width: 768px)');

  function applyRotation() {
    const total = cards.length;

    cards.forEach((card, i) => {
      card.classList.remove('mobile-left', 'mobile-center', 'mobile-right', 'active'); // Note: removes desktop 'active' too on mobile

      const pos = (i - index + total) % total;

      if (pos === 0) {
        card.classList.add('mobile-center', 'active');
      } else if (pos === 1) {
        card.classList.add('mobile-right');
      } else {
        card.classList.add('mobile-left');
      }
    });
  }

  function startRotation() {
    track.classList.add('gallery-mobile-rotating');
    applyRotation();

    intervalId = setInterval(() => {
      index = (index + 1) % cards.length;
      applyRotation();
    }, 4500); // slow rotation every 4.5s
  }

  function stopRotation() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    track.classList.remove('gallery-mobile-rotating');

    cards.forEach(card => {
      card.classList.remove('mobile-left', 'mobile-center', 'mobile-right');
      card.style.transform = ''; // reset
      card.style.opacity = '1';
    });
  }

  if (mq.matches) {
    startRotation();
  }

  mq.addEventListener('change', (e) => {
    if (e.matches) {
      startRotation();
    } else {
      stopRotation();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      stopRotation();
    }
  });
})();