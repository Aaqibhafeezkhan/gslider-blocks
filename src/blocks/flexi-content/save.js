import { RichText, useBlockProps, InnerBlocks  } from '@wordpress/block-editor';
import renderSVG from "@Components/icon-picker/components/icon-picker/controls/renderIcon";

export default function Save({ attributes }) {
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
        className: `gslider-base-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition}`,
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
                <div className="swiper-wrapper gslider-wrapper">
                    <InnerBlocks.Content />
                </div>
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
}