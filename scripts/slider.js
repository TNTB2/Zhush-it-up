document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("sliderTrack");
  const cards = track.querySelectorAll('.slider-card');

  if (!track || cards.length === 0) return;

  // Get card width + margin dynamically
  const cardStyle = window.getComputedStyle(cards[0]);
  const cardWidth = cards[0].offsetWidth + parseFloat(cardStyle.marginRight);

  const totalCards = cards.length;
  let visibleCards = window.innerWidth <= 768 ? 1 : 5; // responsive visible cards count

  let currentIndex = 0;
  const slideInterval = 3000; // 3 seconds per slide

  function slideNext() {
    currentIndex++;

    // Loop back when reaching the end
    if (currentIndex > totalCards - visibleCards) {
      // Snap back instantly to start (without animation)
      track.scrollLeft = 0;
      currentIndex = 1; // move to second card after reset for smooth effect
      // Scroll smoothly to second card
      track.scrollTo({
        left: cardWidth * currentIndex,
        behavior: "smooth",
      });
    } else {
      // Normal smooth scroll to next card
      track.scrollTo({
        left: cardWidth * currentIndex,
        behavior: "smooth",
      });
    }
  }

  // Start auto sliding
  let intervalId = setInterval(slideNext, slideInterval);

  // Optional: Update visibleCards on resize
  window.addEventListener("resize", () => {
    visibleCards = window.innerWidth <= 768 ? 1 : 5;
  });
});
