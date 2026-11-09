/* global Swiper */
/* eslint-disable import/no-unresolved, no-console */
import {
	initEntranceAnimations,
	applyStaggerDelays,
	initCardTilt,
} from '@Utils/animation-utils';

document.addEventListener( 'DOMContentLoaded', () => {
	const initializeSliders = () => {
		// Select all post carousel containers
		const sliders = document.querySelectorAll(
			'.gslider-post-carousel-wrapper'
		);

		sliders.forEach( ( sliderContainer ) => {
			try {
				// Get the Swiper settings from the data attribute
				const swiperSettings = sliderContainer.dataset.swiperSettings;

				if ( swiperSettings ) {
					const settings = JSON.parse( swiperSettings );

					// Initialize Swiper with parsed settings
					new Swiper(
						sliderContainer.querySelector( '.swiper' ),
						settings
					);
				}
			} catch ( error ) {
				console.error(
					'Error initializing post carousel slider:',
					error
				);
			}

			// Initialize animations (stagger BEFORE entrance so delays stack)
			applyStaggerDelays( sliderContainer );
			initEntranceAnimations( sliderContainer );
			initCardTilt( sliderContainer );
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
