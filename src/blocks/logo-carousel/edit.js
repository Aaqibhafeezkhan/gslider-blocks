import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	BlockControls,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton
} from '@wordpress/components';
import { useState, useEffect, useRef, useMemo } from "@wordpress/element";
import renderSVG from "@Components/icon-picker/components/icon-picker/controls/renderIcon";
import SwitchToBlockSettings from '@Utils/switchToBlockSettings';
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

const mapMedia = (m) => ({
	id: m.id,
	url: m?.sizes?.full?.url || m.url,
	alt: m.alt || m.title || '',
	caption: m.caption || '',
	link: '',
});

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
        deviceType,
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
		mousewheelControl,
		paginationType,
		dynamicBullets,

		logos,
		paginationPositionType,
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

        navigationArrowsIconRightAlign,
        navigationArrowsIconRight,
        navigationArrowsIconRightImageUrl,
        navigationArrowsIconRightImageAlt,

        layoutHeightSwitcher,

	} = attributes;

	// Block props for container
	const blockProps = useBlockProps({
        className: `gslider-logo-carousel-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination ? 'has-pagination' : ''}`, 
	});

	const onSelectFromPlaceholder = (selection) => {
		const list = Array.isArray(selection) ? selection : [selection];
		const next = list
		  .filter((m) => m && (m.type === 'image' || (m.mime && m.mime.startsWith('image/'))))
		  .map(mapMedia);
		setAttributes({ logos: next });
	};
	
	const onSelectGallery = (images) => {
		const list = Array.isArray(images) ? images : [images];
		const next = list
			.filter((m) => m && (m.type === 'image' || (m.mime && m.mime.startsWith('image/'))))
			.map(mapMedia);
		setAttributes({ logos: next });
	};

	// Local state management for slider items and active slide index
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

        // Set effect based on carouselEffect
        effect: carouselEffect,

        // Responsive breakpoints for Desktop, Tablet, and Mobile
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

        ...(layoutHeightSwitcher === 'adapt' && {
            autoHeight: true,
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
        navigation: showNavigation?.[deviceType]
            ? {
                prevEl: prevRef.current,
                nextEl: nextRef.current,
            }
            : false,

		// pagination inside/outside logic
        pagination: showPagination?.[deviceType]
            ? paginationPositionType === 'outside'
                ? {
                    el: `.swiper-pagination-logo-carousel`,
                    type: paginationType,
                    dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
                    clickable: true,
                  }
                : {
                    // inside – default Swiper behaviour
                    type: paginationType,
                    dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
                    clickable: true,
                  }
            : false,
    
        // Handle slide change event to update selected slide index
        onSlideChange: (swiper) => setSelectedSlideIndex(swiper.activeIndex),

    }), [
        deviceType,
        carouselEffect,
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
		paginationPositionType,
        navigationArrowPositionType,
        navigationArrowPosition,
        navigationArrowsIconSwitcher,
        navigationArrowsIconLeft,
        navigationArrowsIconRight,
        layoutHeightSwitcher,
    ]);

    /**
     * When any of these settings change, update the key to reinitialize Swiper
     */
	useEffect(() => {
		setSwiperKey(prevKey => prevKey + 1);
	}, [
        deviceType,
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
		carouselEffect,
		carouselPerColumn,
		carouselPerColumnGap,
		paginationType,
		dynamicBullets,
		paginationPositionType,
        navigationArrowPositionType,
        navigationArrowPosition,
        navigationArrowsIconSwitcher,
        navigationArrowsIconLeft,
        navigationArrowsIconRight,
        layoutHeightSwitcher,
	]);


    /* Custom Icon */
    useEffect(() => {
        if (!swiperInstance || !showNavigation?.[deviceType]) return;
    
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

    /**
     * Renders toolbar controls for slide management
     * Provides buttons for adding and duplicating logos
     */
    const renderSliderToolbarControls = () => {
        return (
			<BlockControls>
				<ToolbarGroup>
					<MediaUploadCheck>
						<MediaUpload
						allowedTypes={['image']}
						gallery
						multiple
						addToGallery
						value={logos.map((l) => l.id)}
						onSelect={onSelectGallery}
						render={({ open }) => (
							<ToolbarButton icon="edit" label={__('Edit Logos', 'logo-carousel')} onClick={open} />
						)}
						/>
					</MediaUploadCheck>
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

				{!logos.length && (
					<MediaPlaceholder
						icon={<span className="dashicons dashicons-format-gallery" />}
						labels={{
							title: __('Upload Clients Logos', 'logo-carousel'),
							instructions: __('Upload multiple logos directly or from your media library', 'logo-carousel'),
						}}
						onSelect={onSelectFromPlaceholder}
						accept="image/*"
						allowedTypes={['image']}
						multiple
						className='gslider-logo-carousel-placeholder'
					/>
				)}

				{logos?.length > 0 && (
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
						{logos.map((item) => (
							<SwiperSlide key={item.id}>
								<div className={`gslider-content-wrapper ${globalClass}`} {...(globalID && {id: globalID})} ref={panelRef}>
									<img src={item.url} alt={item.alt || ''}/> 
								</div>
							</SwiperSlide>
						))}

						{showNavigation?.[deviceType] && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (
							<>
								<div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
									<div ref={prevRef} className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
									<div ref={nextRef} className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
								</div>
							</>
						)}

						{showNavigation?.[deviceType] && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && (
							<div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
								<div className="swiper-button-prev" ref={ prevRef } role="button" tabIndex={0} aria-label="Previous slide">{renderSVG(navigationArrowsIconLeft)}</div>
								<div className="swiper-button-next" ref={ nextRef } role="button" tabIndex={0} aria-label="Next slide">{renderSVG(navigationArrowsIconRight)}</div>
							</div>
						)}

						{showNavigation?.[deviceType] && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
							<div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
								<div className="swiper-button-prev" ref={ prevRef } role="button" tabIndex={0} aria-label="Previous slide">
									<img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
								</div>
								<div className="swiper-button-next" ref={ nextRef } role="button" tabIndex={0} aria-label="Next slide">
									<img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
								</div>
							</div>
						)}

					</Swiper>
				)}
				
                {showNavigation?.[deviceType] && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (
                    <>
                        <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div ref={prevRef} className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
                            <div ref={nextRef} className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
                        </div>
                    </>
                )}

                {showNavigation?.[deviceType] && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && ( 
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" ref={ prevRef } role="button" tabIndex={0} aria-label="Previous slide">{renderSVG(navigationArrowsIconLeft)}</div>
                        <div className="swiper-button-next" ref={ nextRef } role="button" tabIndex={0} aria-label="Next slide">{renderSVG(navigationArrowsIconRight)}</div>
                    </div>
                )}

                {showNavigation?.[deviceType] && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" ref={ prevRef } role="button" tabIndex={0} aria-label="Previous slide">
                            <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                        </div>
                        <div className="swiper-button-next" ref={ nextRef } role="button" tabIndex={0} aria-label="Next slide">
                            <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                        </div>
                    </div>
                )}

				{logos?.length > 0 &&
					showPagination?.[deviceType] &&
					paginationPositionType === 'outside' && (
						<div className="swiper-pagination swiper-pagination-logo-carousel"></div>
				)}

			</div>
		</>
	);
}
