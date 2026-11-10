/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl } from '@wordpress/components';
import ResponsiveRangeControl from '@Components/responsive-range-control';

/**
 * Inspector panel for Swiper columns, gap, interaction, loop, autoplay, and transition speed.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Carousel settings panel element.
 */
const CarouselSettingsPanel = ( {
	attributes,
	setAttributes,
	deviceType,
	isOpen,
	onToggle,
} ) => {
	const {
		carouselPerColumn,
		carouselPerColumnGap,
		speed,
		autoplay,
		autoplayDelay,
		infiniteLoop,
		allowTouchMove,
		pauseOnHover,
		stopOnLastSlide,
		reverseDirection,
		mousewheelControl,
		keyboardNavigation,
	} = attributes;

	return (
		<PanelBody
			title={ __( 'Carousel Settings', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<ResponsiveRangeControl
				min={ 1 }
				max={ 12 }
				label={ __( 'Number of Columns', 'gslider-blocks' ) }
				rangeValue={ carouselPerColumn }
				onChangeValue={ ( value ) =>
					setAttributes( { carouselPerColumn: value } )
				}
				deviceType={ deviceType }
				step={ 1 }
				resetFallbackValue={ '2' }
				isRangeUnit={ false }
			/>
			<ResponsiveRangeControl
				min={ 0 }
				max={ 200 }
				label={ __( 'Column Gap (px)', 'gslider-blocks' ) }
				rangeValue={ carouselPerColumnGap }
				onChangeValue={ ( value ) =>
					setAttributes( { carouselPerColumnGap: value } )
				}
				deviceType={ deviceType }
				step={ 1 }
				resetFallbackValue={ '' }
				isRangeUnit={ false }
			/>
			<ToggleControl
				label={ __( 'Infinite Loop', 'gslider-blocks' ) }
				checked={ infiniteLoop }
				onChange={ ( value ) =>
					setAttributes( { infiniteLoop: value } )
				}
			/>
			<ToggleControl
				label={ __( 'Touch Swipe Control', 'gslider-blocks' ) }
				checked={ allowTouchMove }
				onChange={ ( value ) =>
					setAttributes( { allowTouchMove: value } )
				}
			/>
			<ToggleControl
				label={ __( 'Pause on Hover', 'gslider-blocks' ) }
				checked={ pauseOnHover }
				onChange={ ( value ) =>
					setAttributes( { pauseOnHover: value } )
				}
			/>
			<ToggleControl
				label={ __( 'Stop Autoplay at Last Slide', 'gslider-blocks' ) }
				checked={ stopOnLastSlide }
				onChange={ ( value ) => {
					setAttributes( { stopOnLastSlide: value } );
					if ( value ) {
						setAttributes( { infiniteLoop: false } );
						setAttributes( { autoplay: true } );
					}
				} }
			/>
			<ToggleControl
				label={ __( 'Reverse Autoplay Direction', 'gslider-blocks' ) }
				checked={ reverseDirection }
				onChange={ ( value ) => {
					setAttributes( { reverseDirection: value } );
					if ( value ) {
						setAttributes( { autoplay: true } );
					}
				} }
			/>
			<ToggleControl
				label={ __( 'Mousewheel Navigation', 'gslider-blocks' ) }
				checked={ mousewheelControl }
				onChange={ ( value ) =>
					setAttributes( { mousewheelControl: value } )
				}
			/>
			<ToggleControl
				label={ __( 'Keyboard Navigation', 'gslider-blocks' ) }
				checked={ keyboardNavigation }
				onChange={ ( value ) =>
					setAttributes( { keyboardNavigation: value } )
				}
			/>
			<ToggleControl
				label={ __( 'Autoplay', 'gslider-blocks' ) }
				checked={ autoplay }
				onChange={ ( value ) => setAttributes( { autoplay: value } ) }
			/>
			{ autoplay && (
				<ResponsiveRangeControl
					min={ 500 }
					max={ 20000 }
					label={ __( 'Autoplay Delay (ms)', 'gslider-blocks' ) }
					rangeValue={ autoplayDelay }
					onChangeValue={ ( value ) =>
						setAttributes( { autoplayDelay: value } )
					}
					deviceType={ deviceType }
					step={ 100 }
					resetFallbackValue={ '1000' }
					isRangeUnit={ false }
				/>
			) }
			<ResponsiveRangeControl
				min={ 100 }
				max={ 5000 }
				label={ __( 'Transition Speed (ms)', 'gslider-blocks' ) }
				rangeValue={ speed }
				onChangeValue={ ( value ) => setAttributes( { speed: value } ) }
				deviceType={ deviceType }
				step={ 50 }
				resetFallbackValue={ '800' }
				isRangeUnit={ false }
			/>
		</PanelBody>
	);
};

export default CarouselSettingsPanel;
