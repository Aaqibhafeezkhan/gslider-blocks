import { useBlockProps, InnerBlocks, useInnerBlocksProps } from '@wordpress/block-editor'; 
import renderSVG from "@Components/icon-picker/components/icon-picker/controls/renderIcon";
import attributes from './attributes';

const v1_0_7 = {
	attributes,
	supports: {
		html: false,
		className: false,
	},
	save({ attributes }) {
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

        const blockProps = useBlockProps.save({
            className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`,
        });

        const innerBlocksProps = useInnerBlocksProps.save({
            className: 'swiper-wrapper gslider-swiper-wrapper',
        });

        // Configure Swiper settings for frontend rendering
        const swiperSettings = JSON.stringify({
            effect: sliderType === 'carousel' ? carouselEffect : slideEffect,

            // Responsive breakpoints for Desktop, Tablet, and Mobile
            breakpoints: {
                0: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Mobile || 1,
                        spaceBetween: carouselPerColumnGap?.Mobile || 0,
                    }),
                    speed: speed?.Mobile || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Mobile || 1000,
                    } : false,
                },
                768: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Tablet || 2,
                        spaceBetween: carouselPerColumnGap?.Tablet || 20,
                    }),
                    speed: speed?.Tablet || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Tablet || 1000,
                    } : false,
                },
                1025: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Desktop || 2,
                        spaceBetween: carouselPerColumnGap?.Desktop || 20,
                    }),
                    speed: speed?.Desktop || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Desktop || 1000,
                    } : false,
                },
            },
            
            // Common settings
            loop: infiniteLoop,
            autoplay: autoplay ? {
                pauseOnMouseEnter: pauseOnHover,
                disableOnInteraction: false,
                stopOnLastSlide: stopOnLastSlide,
                reverseDirection: reverseDirection,
            } : false,
            allowTouchMove: allowTouchMove,
            mousewheel: mousewheelControl,
            
            navigation: showNavigation ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            } : false,
            
            pagination: showPagination ? {
                el: '.swiper-pagination',
                type: paginationType,
                dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
                clickable: true,
            } : false,
            
            // Creative effect settings if needed
            ...(slideEffect === 'creative' && {
                creativeEffect: {
                    prev: { shadow: true, translate: [0, 0, -400] },
                    next: { translate: ['100%', 0, 0] },
                },
            }),
            
            // Creative effect settings if needed
            ...(slideEffect === 'creative' && {
                creativeEffect: {
                    prev: { shadow: true, translate: [0, 0, -400] },
                    next: { translate: ['100%', 0, 0] },
                },
            }),
            
        });

        return (
            <div {...blockProps} data-swiper-settings={swiperSettings}>
                <div className="swiper">
                    <div {...innerBlocksProps} />

                    {showNavigation && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (
                        <>
                            <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                                <div className="swiper-button-prev" aria-label="Previous slide"></div>
                                <div className="swiper-button-next" aria-label="Next slide"></div>
                            </div>
                        </>
                    )}

                    {navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && (
                        <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev">{renderSVG(navigationArrowsIconLeft)}</div>
                            <div className="swiper-button-next">{renderSVG(navigationArrowsIconRight)}</div>
                        </div>
                    )}

                    {navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                        <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev">
                                <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                            </div>
                            <div className="swiper-button-next">
                                <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                            </div>
                        </div>
                    )}

                    {showPagination && (
                        <>
                            <div className="gslider-pagination-wrapper">
                                <div className="swiper-pagination"></div>
                            </div>
                        </>
                    )}
                </div>
                {showNavigation && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (
                    <>
                        <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" aria-label="Previous slide"></div>
                            <div className="swiper-button-next" aria-label="Next slide"></div>
                        </div>
                    </>
                )}

                {navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && ( 
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev">{renderSVG(navigationArrowsIconLeft)}</div>
                        <div className="swiper-button-next">{renderSVG(navigationArrowsIconRight)}</div>
                    </div>
                )}

                {navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev">
                            <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                        </div>
                        <div className="swiper-button-next">
                            <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                        </div>
                    </div>
                )}
            </div>
        );
	},
};

const v1_0_8 = {
	attributes,
	supports: {
		html: false,
		className: false,
	},
	save({ attributes }) {
		const {
            blockId,
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
    
            layoutHeightSwitcher,
		} = attributes;

        const blockProps = useBlockProps.save({
            className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`,
        });
    
        const innerBlocksProps = useInnerBlocksProps.save({
            className: 'swiper-wrapper gslider-swiper-wrapper',
        });
    
        const navigationEnabled = {
            Mobile:  !!showNavigation?.Mobile,
            Tablet:  !!showNavigation?.Tablet,
            Desktop: !!showNavigation?.Desktop,
        };
        const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;
    
        const paginationEnabled = {
            Mobile:  !!showPagination?.Mobile,
            Tablet:  !!showPagination?.Tablet,
            Desktop: !!showPagination?.Desktop,
        };
        const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;
    
        // Configure Swiper settings for frontend rendering
        const swiperSettings = JSON.stringify({
            effect: sliderType === 'carousel' ? carouselEffect : slideEffect,
    
            // Responsive breakpoints for Desktop, Tablet, and Mobile
            breakpoints: {
                0: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Mobile || 1,
                        spaceBetween: carouselPerColumnGap?.Mobile || 0,
                    }),
                    speed: speed?.Mobile || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Mobile || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Mobile },
                    pagination: { enabled: paginationEnabled.Mobile },
                },
                768: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Tablet || 2,
                        spaceBetween: carouselPerColumnGap?.Tablet || 20,
                    }),
                    speed: speed?.Tablet || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Tablet || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Tablet }, 
                    pagination: { enabled: paginationEnabled.Tablet },
                },
                1025: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Desktop || 2,
                        spaceBetween: carouselPerColumnGap?.Desktop || 20,
                    }),
                    speed: speed?.Desktop || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Desktop || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Desktop },
                    pagination: { enabled: paginationEnabled.Desktop },
                },
            },
    
            ...(layoutHeightSwitcher === 'auto' && {
                autoHeight: true,
            }),
    
            // Common settings
            loop: infiniteLoop,
            autoplay: autoplay ? {
                pauseOnMouseEnter: pauseOnHover,
                disableOnInteraction: false,
                stopOnLastSlide: stopOnLastSlide,
                reverseDirection: reverseDirection,
            } : false,
            allowTouchMove: allowTouchMove,
            mousewheel: mousewheelControl,
            
            navigation: {
                enabled: anyNavigationEnabled,
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            pagination: {
                enabled: anyPaginationEnabled,
                el: '.swiper-pagination',
                type: paginationType,
                dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
                clickable: true,
            },
            
            // Creative effect settings if needed
            ...(slideEffect === 'creative' && {
                creativeEffect: {
                    prev: { shadow: true, translate: [0, 0, -400] },
                    next: { translate: ['100%', 0, 0] },
                },
            }),
            
        });

        return (
            <div {...blockProps} data-swiper-settings={swiperSettings}>
                <div className={`swiper ${globalClass}`} {...(globalID && {id: globalID})}>
                    <div {...innerBlocksProps} />

                    {anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (
                        <>
                            <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                                <div className="swiper-button-prev" aria-label="Previous slide"></div>
                                <div className="swiper-button-next" aria-label="Next slide"></div>
                            </div>
                        </>
                    )}

                    { anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && (
                        <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev">{renderSVG(navigationArrowsIconLeft)}</div>
                            <div className="swiper-button-next">{renderSVG(navigationArrowsIconRight)}</div>
                        </div>
                    )}

                    {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                        <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev">
                                <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                            </div>
                            <div className="swiper-button-next">
                                <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                            </div>
                        </div>
                    )}

                    {anyPaginationEnabled && (
                        <>
                            <div className="gslider-pagination-wrapper">
                                <div className="swiper-pagination"></div>
                            </div>
                        </>
                    )}
                </div>
                { anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (
                    <>
                        <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" aria-label="Previous slide"></div>
                            <div className="swiper-button-next" aria-label="Next slide"></div>
                        </div>
                    </>
                )}

                {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && ( 
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev">{renderSVG(navigationArrowsIconLeft)}</div>
                        <div className="swiper-button-next">{renderSVG(navigationArrowsIconRight)}</div>
                    </div>
                )}

                {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev">
                            <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                        </div>
                        <div className="swiper-button-next">
                            <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                        </div>
                    </div>
                )}
            </div>
        );
	},
};

const v1_0_9 = {
	attributes,
	supports: {
		html: false,
		className: false,
	},
	save({ attributes }) {
		const {
            blockId,
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
    
            layoutHeightSwitcher,
		} = attributes;

        const blockProps = useBlockProps.save({
            className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`,
        });
    
        const innerBlocksProps = useInnerBlocksProps.save({
            className: 'swiper-wrapper gslider-swiper-wrapper',
        });
    
        const navigationEnabled = {
            Mobile:  !!showNavigation?.Mobile,
            Tablet:  !!showNavigation?.Tablet,
            Desktop: !!showNavigation?.Desktop,
        };
        const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;
    
        const paginationEnabled = {
            Mobile:  !!showPagination?.Mobile,
            Tablet:  !!showPagination?.Tablet,
            Desktop: !!showPagination?.Desktop,
        };
        const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;
    
        // Configure Swiper settings for frontend rendering
        const swiperSettings = JSON.stringify({
            effect: sliderType === 'carousel' ? carouselEffect : slideEffect,
    
            // Responsive breakpoints for Desktop, Tablet, and Mobile
            breakpoints: {
                0: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Mobile || 1,
                        spaceBetween: carouselPerColumnGap?.Mobile || 0,
                    }),
                    speed: speed?.Mobile || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Mobile || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Mobile },
                    pagination: { enabled: paginationEnabled.Mobile },
                },
                768: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Tablet || 2,
                        spaceBetween: carouselPerColumnGap?.Tablet || 20,
                    }),
                    speed: speed?.Tablet || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Tablet || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Tablet }, 
                    pagination: { enabled: paginationEnabled.Tablet },
                },
                1025: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Desktop || 2,
                        spaceBetween: carouselPerColumnGap?.Desktop || 20,
                    }),
                    speed: speed?.Desktop || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Desktop || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Desktop },
                    pagination: { enabled: paginationEnabled.Desktop },
                },
            },
    
            ...(layoutHeightSwitcher === 'auto' && {
                autoHeight: true,
            }),
    
            // Common settings
            loop: infiniteLoop,
            autoplay: autoplay ? {
                pauseOnMouseEnter: pauseOnHover,
                disableOnInteraction: false,
                stopOnLastSlide: stopOnLastSlide,
                reverseDirection: reverseDirection,
            } : false,
            allowTouchMove: allowTouchMove,
            mousewheel: mousewheelControl,
            
            navigation: {
                enabled: anyNavigationEnabled,
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            pagination: {
                enabled: anyPaginationEnabled,
                el: '.swiper-pagination',
                type: paginationType,
                dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
                clickable: true,
            },
            
            // Creative effect settings if needed
            ...(slideEffect === 'creative' && {
                creativeEffect: {
                    prev: { shadow: true, translate: [0, 0, -400] },
                    next: { translate: ['100%', 0, 0] },
                },
            }),
            
        });

        return (
            <div {...blockProps} data-swiper-settings={swiperSettings}>
                <div className={`swiper ${globalClass}`} {...(globalID && {id: globalID})}>
                    <div {...innerBlocksProps} />

                    {anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (
                        <>
                            <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                                <div className="swiper-button-prev" aria-label="Previous slide"></div>
                                <div className="swiper-button-next" aria-label="Next slide"></div>
                            </div>
                        </>
                    )}

                    { anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && (
                        <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev">{renderSVG(navigationArrowsIconLeft)}</div>
                            <div className="swiper-button-next">{renderSVG(navigationArrowsIconRight)}</div>
                        </div>
                    )}

                    {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                        <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev">
                                <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                            </div>
                            <div className="swiper-button-next">
                                <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                            </div>
                        </div>
                    )}

                    {anyPaginationEnabled && (
                        <>
                            <div className="gslider-pagination-wrapper">
                                <div className="swiper-pagination"></div>
                            </div>
                        </>
                    )}
                </div>
                { anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (
                    <>
                        <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" aria-label="Previous slide"></div>
                            <div className="swiper-button-next" aria-label="Next slide"></div>
                        </div>
                    </>
                )}

                {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && ( 
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev">{renderSVG(navigationArrowsIconLeft)}</div>
                        <div className="swiper-button-next">{renderSVG(navigationArrowsIconRight)}</div>
                    </div>
                )}

                {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev">
                            <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                        </div>
                        <div className="swiper-button-next">
                            <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                        </div>
                    </div>
                )}
            </div>
        );
	},
};

const v1_0_10 = {
	attributes,
	supports: {
		html: false,
		className: false,
	},
	save({ attributes }) {
		const {
            blockId,
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
    
            layoutHeightSwitcher,
		} = attributes;

        const blockProps = useBlockProps.save({
            className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`,
        });
    
        const innerBlocksProps = useInnerBlocksProps.save({
            className: 'swiper-wrapper gslider-swiper-wrapper',
        });
    
        const navigationEnabled = {
            Mobile:  !!showNavigation?.Mobile,
            Tablet:  !!showNavigation?.Tablet,
            Desktop: !!showNavigation?.Desktop,
        };
        const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;
    
        const paginationEnabled = {
            Mobile:  !!showPagination?.Mobile,
            Tablet:  !!showPagination?.Tablet,
            Desktop: !!showPagination?.Desktop,
        };
        const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;
    
        // Configure Swiper settings for frontend rendering
        const swiperSettings = JSON.stringify({
            effect: sliderType === 'carousel' ? carouselEffect : slideEffect,
    
            // Responsive breakpoints for Desktop, Tablet, and Mobile
            breakpoints: {
                0: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Mobile || 1,
                        spaceBetween: carouselPerColumnGap?.Mobile || 0,
                    }),
                    speed: speed?.Mobile || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Mobile || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Mobile },
                    pagination: { enabled: paginationEnabled.Mobile },
                },
                768: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Tablet || 2,
                        spaceBetween: carouselPerColumnGap?.Tablet || 20,
                    }),
                    speed: speed?.Tablet || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Tablet || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Tablet }, 
                    pagination: { enabled: paginationEnabled.Tablet },
                },
                1025: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Desktop || 2,
                        spaceBetween: carouselPerColumnGap?.Desktop || 20,
                    }),
                    speed: speed?.Desktop || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Desktop || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Desktop },
                    pagination: { enabled: paginationEnabled.Desktop },
                },
            },
    
            ...(layoutHeightSwitcher === 'adapt' && {
                autoHeight: true,
            }),
    
            // Common settings
            loop: infiniteLoop,
            autoplay: autoplay ? {
                pauseOnMouseEnter: pauseOnHover,
                disableOnInteraction: false,
                stopOnLastSlide: stopOnLastSlide,
                reverseDirection: reverseDirection,
            } : false,
            allowTouchMove: allowTouchMove,
            mousewheel: mousewheelControl,
            
            navigation: {
                enabled: anyNavigationEnabled,
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            pagination: {
                enabled: anyPaginationEnabled,
                el: '.swiper-pagination',
                type: paginationType,
                dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
                clickable: true,
            },
            
            // Creative effect settings if needed
            ...(slideEffect === 'creative' && {
                creativeEffect: {
                    prev: { shadow: true, translate: [0, 0, -400] },
                    next: { translate: ['100%', 0, 0] },
                },
            }),
            
        });

        return (
            <div {...blockProps} data-swiper-settings={swiperSettings}>
                <div className={`swiper ${globalClass}`} {...(globalID && {id: globalID})}>
                    <div {...innerBlocksProps} />

                    {anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (
                        <>
                            <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                                <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
                                <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
                            </div>
                        </>
                    )}

                    { anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && (
                        <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">{renderSVG(navigationArrowsIconLeft)}</div>
                            <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">{renderSVG(navigationArrowsIconRight)}</div>
                        </div>
                    )}

                    {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                        <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">
                                <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                            </div>
                            <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">
                                <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                            </div>
                        </div>
                    )}

                    {anyPaginationEnabled && (
                        <>
                            <div className="gslider-pagination-wrapper">
                                <div className="swiper-pagination"></div>
                            </div>
                        </>
                    )}
                </div>
                { anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (
                    <>
                        <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
                            <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
                        </div>
                    </>
                )}

                {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && ( 
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">{renderSVG(navigationArrowsIconLeft)}</div>
                        <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">{renderSVG(navigationArrowsIconRight)}</div>
                    </div>
                )}

                {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">
                            <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                        </div>
                        <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">
                            <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                        </div>
                    </div>
                )}
            </div>
        );
	},
};

const v1_1_1 = {
	attributes,
	supports: {
		html: false,
		className: false,
	},
	save({ attributes }) {
		const {
            blockId,
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
    
            layoutHeightSwitcher,
		} = attributes;

        const blockProps = useBlockProps.save({
            className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`,
        });
    
        const innerBlocksProps = useInnerBlocksProps.save({
            className: 'swiper-wrapper gslider-swiper-wrapper',
        });
    
        const navigationEnabled = {
            Mobile:  !!showNavigation?.Mobile,
            Tablet:  !!showNavigation?.Tablet,
            Desktop: !!showNavigation?.Desktop,
        };
        const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;
    
        const paginationEnabled = {
            Mobile:  !!showPagination?.Mobile,
            Tablet:  !!showPagination?.Tablet,
            Desktop: !!showPagination?.Desktop,
        };
        const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;
    
        // Configure Swiper settings for frontend rendering
        const swiperSettings = JSON.stringify({
            effect: sliderType === 'carousel' ? carouselEffect : slideEffect,
    
            // Responsive breakpoints for Desktop, Tablet, and Mobile
            breakpoints: {
                0: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Mobile || 1,
                        spaceBetween: carouselPerColumnGap?.Mobile || 0,
                    }),
                    speed: speed?.Mobile || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Mobile || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Mobile },
                    pagination: { enabled: paginationEnabled.Mobile },
                },
                768: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Tablet || 2,
                        spaceBetween: carouselPerColumnGap?.Tablet || 20,
                    }),
                    speed: speed?.Tablet || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Tablet || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Tablet }, 
                    pagination: { enabled: paginationEnabled.Tablet },
                },
                1025: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Desktop || 2,
                        spaceBetween: carouselPerColumnGap?.Desktop || 20,
                    }),
                    speed: speed?.Desktop || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Desktop || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Desktop },
                    pagination: { enabled: paginationEnabled.Desktop },
                },
            },
    
            ...(layoutHeightSwitcher === 'adapt' && {
                autoHeight: true,
            }),
    
            // Common settings
            loop: infiniteLoop,
            autoplay: autoplay ? {
                pauseOnMouseEnter: pauseOnHover,
                disableOnInteraction: false,
                stopOnLastSlide: stopOnLastSlide,
                reverseDirection: reverseDirection,
            } : false,
            allowTouchMove: allowTouchMove,
            mousewheel: mousewheelControl,
            
            navigation: {
                enabled: anyNavigationEnabled,
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            pagination: {
                enabled: anyPaginationEnabled,
                el: '.swiper-pagination',
                type: paginationType,
                dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
                clickable: true,
            },
            
            // Creative effect settings if needed
            ...(slideEffect === 'creative' && {
                creativeEffect: {
                    prev: { shadow: true, translate: [0, 0, -400] },
                    next: { translate: ['100%', 0, 0] },
                },
            }),
            
        });

        return (
            <div {...blockProps} data-swiper-settings={swiperSettings}>
                <div className={`swiper ${globalClass}`} {...(globalID && {id: globalID})}>
                    <div {...innerBlocksProps} />

                    {anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (
                        <>
                            <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                                <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
                                <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
                            </div>
                        </>
                    )}

                    { anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && (
                        <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">{renderSVG(navigationArrowsIconLeft)}</div>
                            <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">{renderSVG(navigationArrowsIconRight)}</div>
                        </div>
                    )}

                    {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                        <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">
                                <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                            </div>
                            <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">
                                <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                            </div>
                        </div>
                    )}

                    {anyPaginationEnabled && (
                        <>
                            <div className="gslider-pagination-wrapper">
                                <div className="swiper-pagination"></div>
                            </div>
                        </>
                    )}
                </div>
                { anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (
                    <>
                        <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
                            <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
                        </div>
                    </>
                )}

                {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && ( 
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">{renderSVG(navigationArrowsIconLeft)}</div>
                        <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">{renderSVG(navigationArrowsIconRight)}</div>
                    </div>
                )}

                {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">
                            <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                        </div>
                        <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">
                            <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                        </div>
                    </div>
                )}
            </div>
        );
	},
};

const v1_1_2 = {
	attributes,
	supports: {
		html: false,
		className: false,
	},
	save({ attributes }) {
		const {
            blockId,
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
            keyboardNavigation,
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
    
            layoutHeightSwitcher,
		} = attributes;

        const blockProps = useBlockProps.save({
            className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`,
        });
    
        const innerBlocksProps = useInnerBlocksProps.save({
            className: 'swiper-wrapper gslider-swiper-wrapper',
        });
    
        const navigationEnabled = {
            Mobile:  !!showNavigation?.Mobile,
            Tablet:  !!showNavigation?.Tablet,
            Desktop: !!showNavigation?.Desktop,
        };
        const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;
    
        const paginationEnabled = {
            Mobile:  !!showPagination?.Mobile,
            Tablet:  !!showPagination?.Tablet,
            Desktop: !!showPagination?.Desktop,
        };
        const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;
    
        // Configure Swiper settings for frontend rendering
        const swiperSettings = JSON.stringify({
            effect: sliderType === 'carousel' ? carouselEffect : slideEffect,
    
            // Responsive breakpoints for Desktop, Tablet, and Mobile
            breakpoints: {
                0: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Mobile || 1,
                        spaceBetween: carouselPerColumnGap?.Mobile || 0,
                    }),
                    speed: speed?.Mobile || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Mobile || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Mobile },
                    pagination: { enabled: paginationEnabled.Mobile },
                },
                768: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Tablet || 2,
                        spaceBetween: carouselPerColumnGap?.Tablet || 20,
                    }),
                    speed: speed?.Tablet || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Tablet || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Tablet }, 
                    pagination: { enabled: paginationEnabled.Tablet },
                },
                1025: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Desktop || 2,
                        spaceBetween: carouselPerColumnGap?.Desktop || 20,
                    }),
                    speed: speed?.Desktop || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Desktop || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Desktop },
                    pagination: { enabled: paginationEnabled.Desktop },
                },
            },
    
            ...(layoutHeightSwitcher === 'adapt' && {
                autoHeight: true,
            }),
    
            // Common settings
            loop: infiniteLoop,
            autoplay: autoplay ? {
                pauseOnMouseEnter: pauseOnHover,
                disableOnInteraction: false,
                stopOnLastSlide: stopOnLastSlide,
                reverseDirection: reverseDirection,
            } : false,
            allowTouchMove: allowTouchMove,
            mousewheel: mousewheelControl,

            keyboard: keyboardNavigation ? { 
                enabled: true,
                onlyInViewport: true,
                pageUpDown: false,
            } : false,
            
            navigation: {
                enabled: anyNavigationEnabled,
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            pagination: {
                enabled: anyPaginationEnabled,
                el: '.swiper-pagination',
                type: paginationType,
                dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
                clickable: true,
            },
            
            // Creative effect settings if needed
            ...(slideEffect === 'creative' && {
                creativeEffect: {
                    prev: { shadow: true, translate: [0, 0, -400] },
                    next: { translate: ['100%', 0, 0] },
                },
            }),
            
        });

        return (
            <div {...blockProps} data-swiper-settings={swiperSettings}>
                <div className={`swiper ${globalClass}`} {...(globalID && {id: globalID})}>
                    <div {...innerBlocksProps} />

                    {anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (
                        <>
                            <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                                <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
                                <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
                            </div>
                        </>
                    )}

                    { anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && (
                        <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">{renderSVG(navigationArrowsIconLeft)}</div>
                            <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">{renderSVG(navigationArrowsIconRight)}</div>
                        </div>
                    )}

                    {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                        <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">
                                <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                            </div>
                            <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">
                                <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                            </div>
                        </div>
                    )}

                    {anyPaginationEnabled && (
                        <>
                            <div className="gslider-pagination-wrapper">
                                <div className="swiper-pagination"></div>
                            </div>
                        </>
                    )}
                </div>
                { anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (
                    <>
                        <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
                            <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
                        </div>
                    </>
                )}

                {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && ( 
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">{renderSVG(navigationArrowsIconLeft)}</div>
                        <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">{renderSVG(navigationArrowsIconRight)}</div>
                    </div>
                )}

                {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">
                            <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                        </div>
                        <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">
                            <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                        </div>
                    </div>
                )}
            </div>
        );
	},
};

const v1_1_5 = {
	attributes,
	supports: {
		html: false,
		className: false,
	},
	save({ attributes }) {
		const {
            blockId,
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
            keyboardNavigation,
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

            layoutHeightSwitcher,
		} = attributes;

        const blockProps = useBlockProps.save({
            className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`,
        });

        const innerBlocksProps = useInnerBlocksProps.save({
            className: 'swiper-wrapper gslider-swiper-wrapper',
        });

        const navigationEnabled = {
            Mobile:  !!showNavigation?.Mobile,
            Tablet:  !!showNavigation?.Tablet,
            Desktop: !!showNavigation?.Desktop,
        };
        const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;

        const paginationEnabled = {
            Mobile:  !!showPagination?.Mobile,
            Tablet:  !!showPagination?.Tablet,
            Desktop: !!showPagination?.Desktop,
        };
        const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;

        // Configure Swiper settings for frontend rendering
        const swiperSettings = JSON.stringify({
            effect: sliderType === 'carousel' ? carouselEffect : slideEffect,

            // Responsive breakpoints for Desktop, Tablet, and Mobile
            breakpoints: {
                0: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Mobile || 1,
                        spaceBetween: carouselPerColumnGap?.Mobile || 0,
                    }),
                    speed: speed?.Mobile || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Mobile || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Mobile },
                    pagination: { enabled: paginationEnabled.Mobile },
                },
                768: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Tablet || 2,
                        spaceBetween: carouselPerColumnGap?.Tablet || 20,
                    }),
                    speed: speed?.Tablet || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Tablet || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Tablet }, 
                    pagination: { enabled: paginationEnabled.Tablet },
                },
                1025: {
                    ...(sliderType === 'carousel' && {
                        slidesPerView: carouselPerColumn?.Desktop || 2,
                        spaceBetween: carouselPerColumnGap?.Desktop || 20,
                    }),
                    speed: speed?.Desktop || 800,
                    autoplay: autoplay ? {
                        delay: autoplayDelay?.Desktop || 1000,
                    } : false,
                    navigation: { enabled: navigationEnabled.Desktop },
                    pagination: { enabled: paginationEnabled.Desktop },
                },
            },

            ...(layoutHeightSwitcher === 'adapt' && {
                autoHeight: true,
            }),

            // Common settings
            loop: infiniteLoop,
            autoplay: autoplay ? {
                pauseOnMouseEnter: pauseOnHover,
                disableOnInteraction: false,
                stopOnLastSlide: stopOnLastSlide,
                reverseDirection: reverseDirection,
            } : false,
            allowTouchMove: allowTouchMove,
            mousewheel: mousewheelControl,

            keyboard: keyboardNavigation ? { 
                enabled: true,
                onlyInViewport: true,
                pageUpDown: false,
            } : false,
            
            navigation: {
                enabled: anyNavigationEnabled,
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            pagination: {
                enabled: anyPaginationEnabled,
                el: '.swiper-pagination',
                type: paginationType,
                dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
                clickable: true,
            },
            
            // Creative effect settings if needed
            ...(slideEffect === 'creative' && {
                creativeEffect: {
                    prev: { shadow: true, translate: [0, 0, -400] },
                    next: { translate: ['100%', 0, 0] },
                },
            }),
            
        });

        return (
            <div {...blockProps} data-swiper-settings={swiperSettings}>
                <div className={`swiper ${globalClass}`} {...(globalID && {id: globalID})}>
                    <div {...innerBlocksProps} />

                    {anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (
                        <>
                            <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                                <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
                                <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
                            </div>
                        </>
                    )}

                    { anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && (
                        <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">{renderSVG(navigationArrowsIconLeft)}</div>
                            <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">{renderSVG(navigationArrowsIconRight)}</div>
                        </div>
                    )}

                    {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                        <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">
                                <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                            </div>
                            <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">
                                <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                            </div>
                        </div>
                    )}

                    {anyPaginationEnabled && (
                        <>
                            <div className="gslider-pagination-wrapper">
                                <div className="swiper-pagination"></div>
                            </div>
                        </>
                    )}
                </div>
                { anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (
                    <>
                        <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
                            <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
                        </div>
                    </>
                )}

                {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && ( 
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">{renderSVG(navigationArrowsIconLeft)}</div>
                        <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">{renderSVG(navigationArrowsIconRight)}</div>
                    </div>
                )}

                {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">
                            <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                        </div>
                        <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">
                            <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                        </div>
                    </div>
                )}
            </div>
        );
	},
};

const v1_1_6 = {
	attributes,
	supports: {
		html: false,
		className: false,
	},
	save({ attributes }) {
    const {
        blockId,
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
        keyboardNavigation,
        paginationType,
        dynamicBullets,

        showNavigation,
        showPagination,
        paginationPositionType,

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

        layoutHeightSwitcher,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination ? 'has-pagination' : ''}`,
    });

    const innerBlocksProps = useInnerBlocksProps.save({
        className: 'swiper-wrapper gslider-swiper-wrapper',
    });

    const navigationEnabled = {
        Mobile:  !!showNavigation?.Mobile,
        Tablet:  !!showNavigation?.Tablet,
        Desktop: !!showNavigation?.Desktop,
    };
    const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;

    const paginationEnabled = {
        Mobile:  !!showPagination?.Mobile,
        Tablet:  !!showPagination?.Tablet,
        Desktop: !!showPagination?.Desktop,
    };
    const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;

    // Configure Swiper settings for frontend rendering
    const swiperSettings = JSON.stringify({
        effect: sliderType === 'carousel' ? carouselEffect : slideEffect,

        // Responsive breakpoints for Desktop, Tablet, and Mobile
        breakpoints: {
            0: {
                ...(sliderType === 'carousel' && {
                    slidesPerView: carouselPerColumn?.Mobile || 1,
                    spaceBetween: carouselPerColumnGap?.Mobile || 0,
                }),
                speed: speed?.Mobile || 800,
                autoplay: autoplay ? {
                    delay: autoplayDelay?.Mobile || 1000,
                } : false,
                navigation: { enabled: navigationEnabled.Mobile },
                pagination: { enabled: paginationEnabled.Mobile },
            },
            768: {
                ...(sliderType === 'carousel' && {
                    slidesPerView: carouselPerColumn?.Tablet || 2,
                    spaceBetween: carouselPerColumnGap?.Tablet || 20,
                }),
                speed: speed?.Tablet || 800,
                autoplay: autoplay ? {
                    delay: autoplayDelay?.Tablet || 1000,
                } : false,
                navigation: { enabled: navigationEnabled.Tablet }, 
                pagination: { enabled: paginationEnabled.Tablet },
            },
            1025: {
                ...(sliderType === 'carousel' && {
                    slidesPerView: carouselPerColumn?.Desktop || 2,
                    spaceBetween: carouselPerColumnGap?.Desktop || 20,
                }),
                speed: speed?.Desktop || 800,
                autoplay: autoplay ? {
                    delay: autoplayDelay?.Desktop || 1000,
                } : false,
                navigation: { enabled: navigationEnabled.Desktop },
                pagination: { enabled: paginationEnabled.Desktop },
            },
        },

        ...(layoutHeightSwitcher === 'adapt' && {
            autoHeight: true,
        }),

        // Common settings
        loop: infiniteLoop,
        autoplay: autoplay ? {
            pauseOnMouseEnter: pauseOnHover,
            disableOnInteraction: false,
            stopOnLastSlide: stopOnLastSlide,
            reverseDirection: reverseDirection,
        } : false,
        allowTouchMove: allowTouchMove,
        mousewheel: mousewheelControl,

        keyboard: keyboardNavigation ? { 
            enabled: true,
            onlyInViewport: true,
            pageUpDown: false,
        } : false,
        
        navigation: {
            enabled: anyNavigationEnabled,
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        pagination: {
            enabled: anyPaginationEnabled,
            el: `.${blockId} .swiper-pagination-flexi-content`,
            type: paginationType,
            dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
            clickable: true,
        },
        
        // Creative effect settings if needed
        ...(slideEffect === 'creative' && {
            creativeEffect: {
                prev: { shadow: true, translate: [0, 0, -400] },
                next: { translate: ['100%', 0, 0] },
            },
        }),
        
    });

    return (
        <div {...blockProps} data-swiper-settings={swiperSettings}>
            <div className={`swiper ${globalClass}`} {...(globalID && {id: globalID})}>
                <div {...innerBlocksProps} />

                {anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (
                    <>
                        <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
                            <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
                        </div>
                    </>
                )}

                { anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && (
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">{renderSVG(navigationArrowsIconLeft)}</div>
                        <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">{renderSVG(navigationArrowsIconRight)}</div>
                    </div>
                )}

                {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">
                            <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                        </div>
                        <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">
                            <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                        </div>
                    </div>
                )}

                {anyPaginationEnabled && paginationPositionType === 'inside' && (
                    <>
                        <div
                            className="swiper-pagination swiper-pagination-flexi-content"
                            aria-label="Carousel pagination"
                        ></div>
                    </>
                )}
            </div>
            { anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (
                <>
                    <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
                        <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
                    </div>
                </>
            )}

            {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && ( 
                <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                    <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">{renderSVG(navigationArrowsIconLeft)}</div>
                    <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">{renderSVG(navigationArrowsIconRight)}</div>
                </div>
            )}

            {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                    <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">
                        <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                    </div>
                    <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">
                        <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                    </div>
                </div>
            )}
            {anyPaginationEnabled && paginationPositionType === 'outside' && (
                <>
                    <div
                        className={`swiper-pagination swiper-pagination-flexi-content swiper-pagination-${blockId}`}
                        aria-label="Carousel pagination"
                    ></div>
                </>
            )}
        </div>
    );
},
};

const v1_1_7 = {
	attributes,
	supports: {
		html: false,
		className: false,
	},
	save({ attributes }) {
    const {
        blockId,
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
        keyboardNavigation,
        paginationType,
        dynamicBullets,

        showNavigation,
        showPagination,
        paginationPositionType,

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

        layoutHeightSwitcher,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `gslider-flexi-content-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination ? 'has-pagination' : ''}`,
    });

    const innerBlocksProps = useInnerBlocksProps.save({
        className: 'swiper-wrapper gslider-swiper-wrapper',
    });

    const navigationEnabled = {
        Mobile:  !!showNavigation?.Mobile,
        Tablet:  !!showNavigation?.Tablet,
        Desktop: !!showNavigation?.Desktop,
    };
    const anyNavigationEnabled = navigationEnabled.Mobile || navigationEnabled.Tablet || navigationEnabled.Desktop;

    const paginationEnabled = {
        Mobile:  !!showPagination?.Mobile,
        Tablet:  !!showPagination?.Tablet,
        Desktop: !!showPagination?.Desktop,
    };
    const anyPaginationEnabled = paginationEnabled.Mobile || paginationEnabled.Tablet || paginationEnabled.Desktop;

    // Configure Swiper settings for frontend rendering
    const swiperSettings = JSON.stringify({
        effect: sliderType === 'carousel' ? carouselEffect : slideEffect,

        // Responsive breakpoints for Desktop, Tablet, and Mobile
        breakpoints: {
            0: {
                ...(sliderType === 'carousel' && {
                    slidesPerView: carouselPerColumn?.Mobile || 1,
                    spaceBetween: carouselPerColumnGap?.Mobile || 0,
                }),
                speed: speed?.Mobile || 800,
                autoplay: autoplay ? {
                    delay: autoplayDelay?.Mobile || 1000,
                } : false,
                navigation: { enabled: navigationEnabled.Mobile },
                pagination: { enabled: paginationEnabled.Mobile },
            },
            768: {
                ...(sliderType === 'carousel' && {
                    slidesPerView: carouselPerColumn?.Tablet || 2,
                    spaceBetween: carouselPerColumnGap?.Tablet ?? 20,
                }),
                speed: speed?.Tablet || 800,
                autoplay: autoplay ? {
                    delay: autoplayDelay?.Tablet || 1000,
                } : false,
                navigation: { enabled: navigationEnabled.Tablet }, 
                pagination: { enabled: paginationEnabled.Tablet },
            },
            1025: {
                ...(sliderType === 'carousel' && {
                    slidesPerView: carouselPerColumn?.Desktop || 2,
                    spaceBetween: carouselPerColumnGap?.Desktop ?? 20,
                }),
                speed: speed?.Desktop || 800,
                autoplay: autoplay ? {
                    delay: autoplayDelay?.Desktop || 1000,
                } : false,
                navigation: { enabled: navigationEnabled.Desktop },
                pagination: { enabled: paginationEnabled.Desktop },
            },
        },

        ...(layoutHeightSwitcher === 'adapt' && {
            autoHeight: true,
        }),

        // Common settings
        loop: infiniteLoop,
        autoplay: autoplay ? {
            pauseOnMouseEnter: pauseOnHover,
            disableOnInteraction: false,
            stopOnLastSlide: stopOnLastSlide,
            reverseDirection: reverseDirection,
        } : false,
        allowTouchMove: allowTouchMove,
        mousewheel: mousewheelControl,

        keyboard: keyboardNavigation ? { 
            enabled: true,
            onlyInViewport: true,
            pageUpDown: false,
        } : false,
        
        navigation: {
            enabled: anyNavigationEnabled,
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        pagination: {
            enabled: anyPaginationEnabled,
            el: `.${blockId} .swiper-pagination-flexi-content`,
            type: paginationType,
            dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
            clickable: true,
        },
        
        // Creative effect settings if needed
        ...(slideEffect === 'creative' && {
            creativeEffect: {
                prev: { shadow: true, translate: [0, 0, -400] },
                next: { translate: ['100%', 0, 0] },
            },
        }),
        
    });

    return (
        <div {...blockProps} data-swiper-settings={swiperSettings}>
            <div className={`swiper ${globalClass}`} {...(globalID && {id: globalID})}>
                <div {...innerBlocksProps} />

                {anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (
                    <>
                        <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
                            <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
                        </div>
                    </>
                )}

                { anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && (
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">{renderSVG(navigationArrowsIconLeft)}</div>
                        <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">{renderSVG(navigationArrowsIconRight)}</div>
                    </div>
                )}

                {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                    <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">
                            <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                        </div>
                        <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">
                            <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                        </div>
                    </div>
                )}

                {anyPaginationEnabled && paginationPositionType === 'inside' && (
                    <>
                        <div
                            className="swiper-pagination swiper-pagination-flexi-content"
                            aria-label="Carousel pagination"
                        ></div>
                    </>
                )}
            </div>
            { anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (
                <>
                    <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                        <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
                        <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
                    </div>
                </>
            )}

            {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && ( 
                <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                    <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">{renderSVG(navigationArrowsIconLeft)}</div>
                    <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">{renderSVG(navigationArrowsIconRight)}</div>
                </div>
            )}

            {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (navigationArrowsIconLeftAlign === 'image' || navigationArrowsIconRightAlign === 'image') && (navigationArrowsIconLeftImageUrl || navigationArrowsIconRightImageUrl) && (
                <div className={`gslider-navigation-custom-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                    <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide">
                        <img src={navigationArrowsIconLeftImageUrl} alt={navigationArrowsIconLeftImageAlt} />
                    </div>
                    <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide">
                        <img src={navigationArrowsIconRightImageUrl} alt={navigationArrowsIconRightImageAlt} />
                    </div>
                </div>
            )}
            {anyPaginationEnabled && paginationPositionType === 'outside' && (
                <>
                    <div
                        className={`swiper-pagination swiper-pagination-flexi-content swiper-pagination-${blockId}`}
                        aria-label="Carousel pagination"
                    ></div>
                </>
            )}
        </div>
    );
},
};

export default [ v1_1_7,  v1_1_6, v1_0_7, v1_0_8, v1_0_9, v1_0_10, v1_1_1, v1_1_2, v1_1_5];