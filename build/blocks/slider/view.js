/******/ (() => { // webpackBootstrap
/*!***********************************!*\
  !*** ./src/blocks/slider/view.js ***!
  \***********************************/
document.addEventListener('DOMContentLoaded', () => {
  const getEffectOptions = effect => {
    switch (effect) {
      case 'fade':
        return {
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          }
        };
      case 'coverflow':
        return {
          effect: 'coverflow',
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            scale: 1,
            slideShadows: true
          }
        };
      case 'flip':
        return {
          effect: 'flip',
          flipEffect: {
            slideShadows: true,
            limitRotation: true
          }
        };
      case 'creative':
        return {
          effect: 'creative',
          creativeEffect: {
            prev: {
              translate: [0, 0, -400]
            },
            next: {
              translate: ['100%', 0, 0]
            }
          }
        };
      default:
        return {
          effect: 'slide'
        };
    }
  };

  // Select all slider containers
  const sliders = document.querySelectorAll('.guten-slider-container');
  sliders.forEach(sliderContainer => {
    // Get the unique blockId from the data attribute
    const blockId = sliderContainer.getAttribute("data-block-id");

    // Retrieve options from data attributes and cast to correct types
    const transitionSpeed = parseInt(sliderContainer.getAttribute("data-transition-speed"), 10) || 500;
    const autoplay = sliderContainer.getAttribute("data-autoplay") === "true";
    const autoplaySpeed = parseInt(sliderContainer.getAttribute("data-autoplay-speed"), 10) || 2000;
    const slidesPerView = parseInt(sliderContainer.getAttribute("data-slides-per-view"), 10) || 1;
    const spaceBetween = parseInt(sliderContainer.getAttribute("data-space-between"), 10) || 0;
    const loop = sliderContainer.getAttribute("data-loop") === "true";
    const allowTouchMove = sliderContainer.getAttribute("data-allow-touch-move") !== "false";
    const effect = sliderContainer.getAttribute("data-effect") || "slide";
    const pauseOnHover = sliderContainer.getAttribute("data-pause-on-hover") === "true";
    const stopOnLastSlide = sliderContainer.getAttribute("data-stop-on-last-slide") === "true";
    const reverseDirection = sliderContainer.getAttribute("data-reverse-direction") === "true";

    // Get effect-specific options
    const effectOptions = getEffectOptions(effect);

    // Define slider options by combining base options with effect-specific options
    const sliderOptions = {
      slidesPerView: slidesPerView,
      spaceBetween: spaceBetween,
      autoplay: autoplay ? {
        delay: autoplaySpeed,
        disableOnInteraction: false,
        stopOnLastSlide: stopOnLastSlide,
        reverseDirection: reverseDirection
      } : false,
      speed: transitionSpeed,
      loop: loop,
      allowTouchMove: allowTouchMove,
      navigation: {
        nextEl: `.guten-slider-container[data-block-id="${blockId}"] .swiper-button-next`,
        prevEl: `.guten-slider-container[data-block-id="${blockId}"] .swiper-button-prev`
      },
      pagination: {
        el: `.guten-slider-container[data-block-id="${blockId}"] .swiper-pagination`,
        clickable: true
      },
      ...effectOptions // Spread the effect-specific options
    };

    // Initialize Swiper for the current slider
    const swiperInstance = new Swiper(`.guten-slider-container[data-block-id="${blockId}"] .guten-slider-swiper-wrapper`, sliderOptions);

    // Handle pause on hover
    if (pauseOnHover && autoplay) {
      const sliderElement = document.querySelector(`..guten-slider-container[data-block-id="${blockId}"] .guten-slider-swiper-wrapper`);
      sliderElement.addEventListener('mouseenter', () => swiperInstance.autoplay.stop());
      sliderElement.addEventListener('mouseleave', () => swiperInstance.autoplay.start());
    }
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map