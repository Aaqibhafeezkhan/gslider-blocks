import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	BlockControls,
    InnerBlocks,
    useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	Toolbar,
	ToolbarGroup,
	ToolbarButton
} from '@wordpress/components';
import { useState, useEffect, useRef, useMemo } from "@wordpress/element";
import renderSVG from "@Components/icon-picker/components/icon-picker/controls/renderIcon";
import SwitchToBlockSettings from '@Utils/switchToBlockSettings';
import { arrayMove } from '@dnd-kit/sortable';
import Inspector from './inspector';

// Import Swiper React components and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import {
	Navigation,
	Pagination,
    Autoplay,
	Manipulation,
	Mousewheel,
	EffectFade,
	EffectCube,
	EffectCoverflow,
	EffectFlip,
	EffectCreative,
	EffectCards
} from 'swiper/modules';
import 'swiper/css/bundle';

const ALLOWED_BLOCKS = ['gslider-blocks/flexi-content-item'];

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
        deviceType,
		sliderType,
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
		carouselEffect,
		slideEffect,
		mousewheelControl,
		paginationType,
		dynamicBullets,

        showNavigation,
		showPagination,

        globalID,
        globalClass,
        navigationArrowPositionType,
        navigationArrowPosition,

        navigationArrowsIconSwitcher,
        navigationArrowsIconLeftAlign,
        navigationArrowsIconLeft,
        navigationArrowsIconLeftImageUrl,
        navigationArrowsIconLeftImageAlt,
        navigationArrowsIconLeftImageID,

        navigationArrowsIconRightAlign,
        navigationArrowsIconRight,
        navigationArrowsIconRightImageUrl,
        navigationArrowsIconRightImageAlt,
        navigationArrowsIconRightImageID,
        
	} = attributes;

	// Block props for container
	const blockProps = useBlockProps({
		className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`,
	});

	// Local state management for slider items and active slide index
	const [sliderItemList, setSliderItemList] = useState([]);
	const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
    const [swiperInstance, setSwiperInstance] = useState(null);

	// A key to force re-mounting of <Swiper> when critical settings change
	const [swiperKey, setSwiperKey] = useState(0);

	// Ref for panel settings focus management
	const panelRef = useRef(null);
	SwitchToBlockSettings(panelRef);

    // Refs for navigation buttons
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    /**
     * Initializes and updates Swiper instance when slider configuration changes
     * Handles different slider types, effects, and interactive options
     */
    const swiperSettings = useMemo(() => ({
        // Set effect based on sliderType
        effect: sliderType === 'carousel' ? carouselEffect : slideEffect,
    
        // Responsive breakpoints for Desktop, Tablet, and Mobile
        ...(sliderType === 'carousel' && {
            breakpoints: {
                 // Mobile (e.g., screens < 768px)
                0: {
                    slidesPerView: carouselPerColumn?.[deviceType] || 1,
                    spaceBetween: carouselPerColumnGap?.[deviceType] || 0,
                },
                // Tablet (e.g., screens 768px - 1024px)
                768: {
                    slidesPerView: carouselPerColumn?.[deviceType] || 2,
                    spaceBetween: carouselPerColumnGap?.[deviceType] || 20,
                },
                // Desktop (e.g., screens > 1024px)
                1025: {
                    slidesPerView: carouselPerColumn?.[deviceType] || 2,
                    spaceBetween: carouselPerColumnGap?.[deviceType] || 20,
                },
            },
        }),
    
        // Common settings
        loop: infiniteLoop,
        autoplay: autoplay
            ? {
                  delay: autoplayDelay?.[deviceType] || 1000,
                  pauseOnMouseEnter: pauseOnHover,
                  disableOnInteraction: false,
                  stopOnLastSlide: stopOnLastSlide,
                  reverseDirection: reverseDirection,
              }
            : false,
    
        speed: speed?.[deviceType] || 800,
        allowTouchMove: allowTouchMove,
        mousewheel: mousewheelControl,
    
        // Navigation and pagination settings
        navigation: showNavigation
        ? {
            prevEl: prevRef.current,
            nextEl: nextRef.current,
        }
        : false,

        pagination: showPagination
            ? {
                type: paginationType,
                dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
                clickable: true,
              }
            : false,
    
        // Creative effect settings for slideEffect
        ...(slideEffect === 'creative' && {
            creativeEffect: {
                prev: { shadow: true, translate: [0, 0, -400] },
                next: { translate: ['100%', 0, 0] },
            },
        }),

        // Handle slide change event to update selected slide index
        onSlideChange: (swiper) => setSelectedSlideIndex(swiper.activeIndex),

    }), [
        deviceType,
        sliderType,
        carouselEffect,
        slideEffect,
        carouselPerColumn,
        carouselPerColumnGap,
        infiniteLoop,
        autoplay,
        autoplayDelay,
        pauseOnHover,
        stopOnLastSlide,
        reverseDirection,
        speed,
        allowTouchMove,
        mousewheelControl,
        showNavigation,
        showPagination,
        paginationType,
        dynamicBullets,
        setSelectedSlideIndex,
        navigationArrowPositionType,
        navigationArrowPosition,
        navigationArrowsIconSwitcher,
        navigationArrowsIconLeft,
        navigationArrowsIconRight,
    ]);

    /**
     * When any of these settings change, update the key to reinitialize Swiper
     */
	useEffect(() => {
		setSwiperKey(prevKey => prevKey + 1);
	}, [
        deviceType,
		sliderType,
		infiniteLoop,
		allowTouchMove,
		pauseOnHover,
		stopOnLastSlide,
		reverseDirection,
		mousewheelControl,
		showNavigation,
		showPagination,
		autoplay,
		autoplayDelay,
		speed,
		slideEffect,
		carouselEffect,
		carouselPerColumn,
		carouselPerColumnGap,
		paginationType,
		dynamicBullets,
        navigationArrowPositionType,
        navigationArrowPosition,
        navigationArrowsIconSwitcher,
        navigationArrowsIconLeft,
        navigationArrowsIconRight,
	]);


    /* Custom Icon */
    useEffect(() => {
        if (!swiperInstance || !showNavigation) return;
    
        const prevEl = prevRef.current;
        const nextEl = nextRef.current;
    
        if (prevEl && nextEl && swiperInstance.navigation) {
            swiperInstance.params.navigation.prevEl = prevEl;
            swiperInstance.params.navigation.nextEl = nextEl;
    
            setTimeout(() => {
                // Check again in case swiperInstance.navigation was reloaded in the meantime
                if (swiperInstance.navigation) {
                    swiperInstance.navigation.destroy();
                    swiperInstance.navigation.init();
                    swiperInstance.navigation.update();
                }
            }, 100);
        }
    }, [
        swiperInstance,
        showNavigation,
        navigationArrowsIconSwitcher,
        navigationArrowPositionType,
        navigationArrowPosition,
        navigationArrowsIconLeft,
        navigationArrowsIconRight,
        navigationArrowsIconLeftAlign,
        navigationArrowsIconRightAlign,
        navigationArrowsIconLeftImageUrl,
        navigationArrowsIconRightImageUrl
    ]);

    const getSliderTemplate = useMemo(() => [
        ['gslider-blocks/flexi-content-item'], 
        ['gslider-blocks/flexi-content-item'],
        ['gslider-blocks/flexi-content-item'],
    ], []);

    const innerBlocksProps = useInnerBlocksProps(
		{
			className: `swiper-wrapper gslider-swiper-wrapper`,
			slot: 'container-start',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: getSliderTemplate,
			renderAppender: false,
			orientation: 'horizontal',
		}
	);

    /**
     * Renders toolbar controls for slide management
     * Provides buttons for adding and duplicating slides
     */
    const renderSliderToolbarControls = () => {
        return (
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon="plus"
                        label={ __( 'Add New Slide', 'gslider-blocks' ) }
                        onClick={() => {
                            
                        }}
                    />
                    <ToolbarButton
                        icon="admin-page"
                        label={ __( 'Duplicate Current Slide', 'gslider-blocks' ) } 
                        onClick={() => {

                        }}
                    />
                </ToolbarGroup>
            </BlockControls>
        );
    };

	return (
		<>
			<Inspector 
				attributes={attributes}
				setAttributes={setAttributes}
				clientId={clientId}
			/>
			{renderSliderToolbarControls()}
			<div {...blockProps}>
				<Swiper
					key={swiperKey}
					{...swiperSettings}
					modules={[
						Navigation,
						Pagination,
						Autoplay,
						Manipulation,
						Mousewheel,
						EffectFade,
						EffectCube,
						EffectCoverflow,
						EffectFlip,
						EffectCreative,
						EffectCards
					]}

                    onSwiper={(swiper) => {
                        setSwiperInstance(swiper);
                    }}
				>
                    <div {...innerBlocksProps} />

                    {showNavigation && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (
                        <>
                            <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                                <div ref={prevRef} className="swiper-button-prev" aria-label="Previous slide"></div>
                                <div ref={nextRef} className="swiper-button-next" aria-label="Next slide"></div>
                            </div>
                        </>
                    )}

                    {navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && (
                        <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" ref={ prevRef }>{renderSVG(navigationArrowsIconLeft)}</div>
                            <div className="swiper-button-next" ref={ nextRef }>{renderSVG(navigationArrowsIconRight)}</div>
                        </div>
                    )}

                    {navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                        <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" ref={ prevRef }>
                                <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                            </div>
                            <div className="swiper-button-next" ref={ nextRef }>
                                <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                            </div>
                        </div>
                    )}

				</Swiper>

                {showNavigation && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (
                    <>
                        <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div ref={prevRef} className="swiper-button-prev" aria-label="Previous slide"></div>
                            <div ref={nextRef} className="swiper-button-next" aria-label="Next slide"></div>
                        </div>
                    </>
                )}

                {navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && ( 
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" ref={ prevRef }>{renderSVG(navigationArrowsIconLeft)}</div>
                        <div className="swiper-button-next" ref={ nextRef }>{renderSVG(navigationArrowsIconRight)}</div>
                    </div>
                )}

                {navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" ref={ prevRef }>
                            <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                        </div>
                        <div className="swiper-button-next" ref={ nextRef }>
                            <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                        </div>
                    </div>
                )}

			</div>
		</>
	);
}
