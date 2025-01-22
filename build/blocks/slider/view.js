/******/ (() => { // webpackBootstrap
/*!***********************************!*\
  !*** ./src/blocks/slider/view.js ***!
  \***********************************/
document.addEventListener('DOMContentLoaded', () => {
  // Select all slider containers
  const sliders = document.querySelectorAll('.guten-slider-container');
  sliders.forEach(sliderContainer => {
    // Get the Swiper settings from the data attribute
    const swiperSettings = sliderContainer.dataset.swiperSettings;

    // Parse the settings if they exist
    if (swiperSettings) {
      const settings = JSON.parse(swiperSettings);

      // Initialize Swiper for the current slider
      new Swiper(sliderContainer.querySelector('.swiper'), settings);
    }
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map