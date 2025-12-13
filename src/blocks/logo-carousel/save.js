import { useBlockProps } from '@wordpress/block-editor';
import renderSVG from "@Components/icon-picker/components/icon-picker/controls/renderIcon";

export default function Save({ attributes }) {
    const {
        blockId,
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
        keyboardNavigation,
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

    } = attributes;

    const blockProps = useBlockProps.save({
        className: `gslider-logo-carousel-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination?'has-pagination':''}`, 
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
        effect: carouselEffect,

        // Responsive breakpoints for Desktop, Tablet, and Mobile
        breakpoints: {
            0: {
                slidesPerView: carouselPerColumn?.Mobile || 1,
                spaceBetween: carouselPerColumnGap?.Mobile || 0,
                speed: speed?.Mobile || 800,
                autoplay: autoplay ? {
                    delay: autoplayDelay?.Mobile || 1000,
                } : false,
                navigation: { enabled: navigationEnabled.Mobile },
                pagination: { enabled: paginationEnabled.Mobile },
            },
            768: {
                slidesPerView: carouselPerColumn?.Tablet || 2,
                spaceBetween: carouselPerColumnGap?.Tablet || 20,
                speed: speed?.Tablet || 800,
                autoplay: autoplay ? {
                    delay: autoplayDelay?.Tablet || 1000,
                } : false,
                navigation: { enabled: navigationEnabled.Tablet },
                pagination: { enabled: paginationEnabled.Tablet },
            },
            1025: {
                slidesPerView: carouselPerColumn?.Desktop || 2,
                spaceBetween: carouselPerColumnGap?.Desktop || 20,
                speed: speed?.Desktop || 800,
                autoplay: autoplay ? {
                    delay: autoplayDelay?.Desktop || 1000,
                } : false,
                navigation: { enabled: navigationEnabled.Desktop },
                pagination: { enabled: paginationEnabled.Desktop },
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
            el: '.swiper-pagination-logo-carousel',
            type: paginationType,
            dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
            clickable: true,
        },
        
    });

    return (
        <div {...blockProps} data-swiper-settings={swiperSettings}>
            <div className="swiper">
                <div className="swiper-wrapper">
                    {logos.map((item) => (
                        <div key={item.id} className={`swiper-slide`}>
                            <div className={`gslider-content-wrapper ${globalClass}`} {...(globalID && {id: globalID})}>
                                <img src={item.url} alt={item.alt || ''} />
                            </div>
                        </div>
                    ))}
                </div>
                {anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (
                    <>
                        <div className={`gslider-navigation-default-icon-wrapper ${navigationArrowPositionType} ${navigationArrowPosition}`}>
                            <div className="swiper-button-prev" role="button" tabIndex={0} aria-label="Previous slide"></div>
                            <div className="swiper-button-next" role="button" tabIndex={0} aria-label="Next slide"></div>
                        </div>
                    </>
                )}

                {anyNavigationEnabled && navigationArrowsIconSwitcher && navigationArrowPositionType === 'inside' && (navigationArrowsIconLeftAlign === 'icon' || navigationArrowsIconRightAlign === 'icon') && (
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

                { anyPaginationEnabled && paginationPositionType === 'inside' && (
                    <>
                        <div
                            className="swiper-pagination swiper-pagination-logo-carousel"
                            aria-label="Carousel pagination"
                        ></div>
                    </>
                )}
            </div>

            {anyNavigationEnabled && !navigationArrowsIconSwitcher && navigationArrowPositionType === 'outside' && (
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
                        className="swiper-pagination swiper-pagination-logo-carousel"
                        aria-label="Carousel pagination"
                    ></div>
                </>
            )}
        </div>
    );
}
