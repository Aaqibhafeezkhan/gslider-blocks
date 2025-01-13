/******/ (() => { // webpackBootstrap
/*!***********************************!*\
  !*** ./src/blocks/slider/view.js ***!
  \***********************************/
document.addEventListener('DOMContentLoaded', () => {
  // Select all slider containers
  const sliders = document.querySelectorAll('.guten-slider-container');
  sliders.forEach(sliderContainer => {
    try {
      // Get the unique blockId from the data attribute
      const blockId = sliderContainer.dataset.blockId;
      if (!blockId) {
        console.error('Block ID is missing for slider container:', sliderContainer);
        return;
      }

      // Define slider options dynamically based on blockId
      const sliderOptions = {
        navigation: {
          nextEl: `.guten-slider-container[data-block-id="${blockId}"] .swiper-button-next`,
          prevEl: `.guten-slider-container[data-block-id="${blockId}"] .swiper-button-prev`
        },
        pagination: {
          el: `.guten-slider-container[data-block-id="${blockId}"] .swiper-pagination`,
          clickable: true
        },
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
        loop: true
      };

      // Initialize Swiper for the current slider
      new Swiper(`.guten-slider-container[data-block-id="${blockId}"] .guten-slider-swiper-wrapper`, sliderOptions);
    } catch (error) {
      console.error('Error initializing Swiper for slider:', sliderContainer, error);
    }
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map