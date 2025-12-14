document.addEventListener('DOMContentLoaded', () => {
    const initializeSliders = () => {
        // Select all slider containers
        const sliders = document.querySelectorAll('.gslider-logo-carousel-wrapper');

        sliders.forEach((sliderContainer) => {
            try {
                // Get the Swiper settings from the data attribute
                const swiperSettings = sliderContainer.dataset.swiperSettings;

                if (swiperSettings) {
                    const settings = JSON.parse(swiperSettings);

                    // Initialize Swiper with parsed settings
                    new Swiper(sliderContainer.querySelector('.swiper'), settings);
                }

                // Initialize hover effects for logo links
                initializeLogoLinkHoverEffects(sliderContainer);
            } catch (error) {
                console.error('Error initializing slider:', error);
            }
        });
    };

    /**
     * Initialize hover effects for logo links
     */
    const initializeLogoLinkHoverEffects = (container) => {
        const logoLinks = container.querySelectorAll('.gslider-logo-link');

        logoLinks.forEach((link) => {
            const hoverEffect = link.dataset.hoverEffect;
            const hoverOpacity = parseFloat(link.dataset.hoverOpacity) || 0.8;
            const hoverScale = parseFloat(link.dataset.hoverScale) || 1.05;

            if (hoverEffect && hoverEffect !== 'none') {
                link.addEventListener('mouseenter', function () {
                    if (hoverEffect === 'opacity' || hoverEffect === 'both') {
                        this.style.opacity = hoverOpacity;
                    }
                    if (hoverEffect === 'scale' || hoverEffect === 'both') {
                        this.style.transform = `scale(${hoverScale})`;
                    }
                });

                link.addEventListener('mouseleave', function () {
                    this.style.opacity = 1;
                    this.style.transform = 'scale(1)';
                });
            }
        });
    };

    // Initialize sliders on page load
    initializeSliders();

    // Re-initialize sliders when new blocks are added (useful for dynamic content)
    if (window.wp && window.wp.hooks) {
        window.wp.hooks.addAction('blocks.blockRendered', 'gslider', () => {
            initializeSliders();
        });
    }
});