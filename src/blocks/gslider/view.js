document.addEventListener('DOMContentLoaded', () => {
    const initializeSliders = () => {
        // Select all slider containers
        const sliders = document.querySelectorAll('.gslider-container');
        
        sliders.forEach((sliderContainer) => {
            try {
                // Get the Swiper settings from the data attribute
                const swiperSettings = sliderContainer.dataset.swiperSettings;
                
                if (swiperSettings) {
                    const settings = JSON.parse(swiperSettings);
                    
                    // Initialize Swiper with parsed settings
                    new Swiper(sliderContainer.querySelector('.swiper'), settings);
                }
            } catch (error) {
                console.error('Error initializing slider:', error);
            }
        });
    };

    // Initialize sliders on page load
    initializeSliders();

    // Re-initialize sliders when new blocks are added (useful for dynamic content)
    if (window.wp && window.wp.hooks) {
        window.wp.hooks.addAction('blocks.blockRendered', 'gutenslider', () => {
            initializeSliders();
        });
    }
});