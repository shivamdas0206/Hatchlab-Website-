(function () {
  const track = document.querySelector('.team-gallery-track');
  const cards = [...document.querySelectorAll('.team-member-card')];

  // Stop if gallery not found
  if (!track || cards.length === 0) return;

  // Enable rotation mode (CSS overrides only apply in this mode)
  track.classList.add('team-gallery-rotating');

  let index = 0; // current center card

  function applyRotation() {
    const total = cards.length;

    cards.forEach((card, i) => {

      // reset previous state
      card.classList.remove(
        'gallery-rotate-left',
        'gallery-rotate-center',
        'gallery-rotate-right',
        'active'
      );

      // calculate relative position in circular order
      const pos = (i - index + total) % total;

      /*
        pos = 0 → center (flip card)
        pos = 1 → right
        pos = 2+ → left
      */

      if (pos === 0) {
        // card in center (your flip effect runs here)
        card.classList.add('gallery-rotate-center', 'active');
      }

      else if (pos === 1) {
        // next card to the right
        card.classList.add('gallery-rotate-right');
      }

      else {
        // remaining cards move to left side
        card.classList.add('gallery-rotate-left');
      }
    });
  }

  // initial positioning
  applyRotation();

  // rotate clockwise on loop
  setInterval(() => {
    index = (index + 1) % cards.length;
    applyRotation();
  }, 4500); // adjust timing if needed

})();
