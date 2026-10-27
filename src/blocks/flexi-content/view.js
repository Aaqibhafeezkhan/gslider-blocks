/* global Swiper, requestAnimationFrame */
document.addEventListener( 'DOMContentLoaded', () => {
	const initializeSliders = () => {
		// Select all slider containers
		const sliders = document.querySelectorAll(
			'.gslider-flexi-content-wrapper'
		);

		sliders.forEach( ( sliderContainer ) => {
			try {
				const swiperElement =
					sliderContainer.querySelector( '.swiper' );
				if (
					! swiperElement ||
					swiperElement.classList.contains( 'swiper-initialized' )
				) {
					return;
				}

				// Get the Swiper settings from the data attribute
				const swiperSettings = sliderContainer.dataset.swiperSettings;

				if ( swiperSettings ) {
					const settings = JSON.parse( swiperSettings );

					// Fix for fade effect: disable initial transition to prevent right-to-left glitch on page load
					if ( settings.effect === 'fade' ) {
						const wrapper =
							swiperElement?.querySelector( '.swiper-wrapper' );
						const slides =
							swiperElement?.querySelectorAll( '.swiper-slide' );

						// Temporarily disable transition on wrapper AND all slides before Swiper initializes
						if ( wrapper ) {
							wrapper.style.transition = 'none';
						}
						if ( slides ) {
							slides.forEach( ( slide ) => {
								slide.style.transition = 'none';
							} );
						}

						// Add init callback to restore transitions after initial positioning
						settings.on = {
							...settings.on,
							init() {
								// Use requestAnimationFrame to ensure DOM has updated
								requestAnimationFrame( () => {
									requestAnimationFrame( () => {
										if ( wrapper ) {
											wrapper.style.transition = '';
										}
										if ( slides ) {
											slides.forEach( ( slide ) => {
												slide.style.transition = '';
											} );
										}
									} );
								} );
							},
						};
					}

					if (
						settings.navigation &&
						typeof settings.navigation === 'object'
					) {
						const nextEl = sliderContainer.querySelector(
							'.swiper-button-next'
						);
						const prevEl = sliderContainer.querySelector(
							'.swiper-button-prev'
						);
						if ( nextEl ) {
							settings.navigation.nextEl = nextEl;
						}
						if ( prevEl ) {
							settings.navigation.prevEl = prevEl;
						}
					}

					// Initialize Swiper with parsed settings
					new Swiper( swiperElement, settings );
				}
			} catch ( error ) {
				// eslint-disable-next-line no-console
				console.error( 'Error initializing slider:', error );
			}
		} );
	};

	// Initialize sliders on page load
	initializeSliders();

	// Re-initialize sliders when new blocks are added (useful for dynamic content)
	if ( window.wp && window.wp.hooks ) {
		window.wp.hooks.addAction( 'blocks.blockRendered', 'gslider', () => {
			initializeSliders();
		} );
	}
} );
