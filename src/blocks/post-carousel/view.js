/* global Swiper */
/* eslint-disable import/no-unresolved, no-console */
import {
	initEntranceAnimations,
	applyStaggerDelays,
	initCardTilt,
	applyReducedMotionSwiperSettings,
	registerReducedMotionSwiper,
} from '@Utils/animation-utils';

document.addEventListener( 'DOMContentLoaded', () => {
	/**
	 * Initialize every Post Carousel instance on the page idempotently.
	 */
	const initializeSliders = () => {
		// Select all post carousel containers
		const sliders = document.querySelectorAll(
			'.gslider-post-carousel-wrapper'
		);

		sliders.forEach( ( sliderContainer ) => {
			if ( sliderContainer.dataset.swiperInitialized === 'true' ) {
				return;
			}
			sliderContainer.dataset.swiperInitialized = 'true';

			try {
				// Get the Swiper settings from the data attribute
				const swiperSettings = sliderContainer.dataset.swiperSettings;

				if ( swiperSettings ) {
					const settings = JSON.parse( swiperSettings );

					// Disable autoplay and slide transition speed when reduced motion is requested,
					// and sync live preference changes for active instances.
					applyReducedMotionSwiperSettings( settings );
					registerReducedMotionSwiper( sliderContainer, Swiper );

					// Initialize Swiper with parsed settings
					new Swiper(
						sliderContainer.querySelector( '.swiper' ),
						settings
					);
				}
			} catch ( error ) {
				delete sliderContainer.dataset.swiperInitialized;
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
} );
