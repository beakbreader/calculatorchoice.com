
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  let scrollAmount = 0;
  const scrollStep = 2;
  const maxScrollLeft = () => carousel.scrollWidth - carousel.clientWidth;

  function autoScroll() {
    scrollAmount += scrollStep;
    if (scrollAmount >= maxScrollLeft()) {
      scrollAmount = 0;
    }
    carousel.scrollLeft = scrollAmount;
    requestAnimationFrame(autoScroll);
  }

  autoScroll();
});
