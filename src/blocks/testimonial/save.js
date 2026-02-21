import { RichText, useBlockProps } from '@wordpress/block-editor';
import renderSVG from "@Components/icon-picker/components/icon-picker/controls/renderIcon";

export default function Save({ attributes }) {
    const {
        blockId,
        sliderItems,
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

        showAuthorName,
        showAuthorDesignation,
        showTestimonialTitle,
        showTestimonialText,
        showAuthorImage,
        showRating,
        showRatingNumber,
        showQuoteIcon,
        quoteIconAlign,
        quoteIcon,
        quoteImageUrl,
        quoteImageAlt,
        showNavigation,
        showPagination,
        paginationPositionType,
        authorNameHtmlTag,
        authorDesignationHtmlTag,
        testimonialTitleHtmlTag,
        testimonialTextHtmlTag,
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
        contentOrder,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `gslider-testimonial-wrapper ${blockId} ${navigationArrowPositionType} ${navigationArrowPosition} ${showPagination ? 'has-pagination' : ''}`,
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
            el: `.${blockId} .swiper-pagination-testimonial-slider`,
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

    const authorImagePlaceholder = typeof window !== 'undefined' && window.GSliderBlocksData?.pluginUrl
        ? `${window.GSliderBlocksData.pluginUrl}assets/images/author-placeholder.svg`
        : '';

    return (
        <div {...blockProps} data-swiper-settings={swiperSettings}>
            <div className="swiper">
                <div className="swiper-wrapper">
                    {sliderItems.map((item) => (
                        <div key={item.id} className={`swiper-slide ${sliderType === 'slider' ? 'slide-mode' : ''}`}>
                            <div className={`gslider-content-wrapper ${item.id} ${globalClass}`} {...(globalID && {id: globalID})}>
                                <div className="gslider-content-inner-wrapper">
                                    {/* Quote Icon — rendered separately, positioned via CSS */}
                                    {showQuoteIcon && quoteIconAlign !== 'none' && (
                                        <div className="gslider-testimonial-quote-icon-wrapper">
                                            {quoteIconAlign === 'icon' && renderSVG(quoteIcon)}
                                            {quoteIconAlign === 'image' && quoteImageUrl && (
                                                <img src={quoteImageUrl} alt={quoteImageAlt} />
                                            )}
                                        </div>
                                    )}
                                    {/* Ordered content elements */}
                                    {(() => {
                                        const renderMap = {
                                            image: showAuthorImage && (item.authorImage?.url || authorImagePlaceholder) && (
                                                <div className="gslider-testimonial-author-image-wrapper" key="image">
                                                    <img 
                                                        src={item.authorImage?.url || authorImagePlaceholder}
                                                        alt={item.authorImage?.alt || 'Author'}
                                                        className="gslider-testimonial-author-image"
                                                    />
                                                </div>
                                            ),
                                            title: showTestimonialTitle && item.testimonialTitle && (
                                                <div className="gslider-testimonial-title-wrapper" key="title">
                                                    <RichText.Content
                                                        tagName={testimonialTitleHtmlTag}
                                                        className="gslider-testimonial-title"
                                                        value={item.testimonialTitle}
                                                    />
                                                </div>
                                            ),
                                            text: showTestimonialText && item.testimonialText && (
                                                <div className="gslider-testimonial-text-wrapper" key="text">
                                                    <RichText.Content
                                                        tagName={testimonialTextHtmlTag}
                                                        className="gslider-testimonial-text"
                                                        value={item.testimonialText}
                                                    />
                                                </div>
                                            ),
                                            rating: showRating && (
                                                <div className="gslider-testimonial-rating-wrapper" key="rating">
                                                    <div className="gslider-testimonial-rating-inner">
                                                        <div className="gslider-testimonial-rating-wrap">
                                                            {(() => {
                                                                const { ratingNumber, ratingIconAlign } = item;
                                                                const ratingImageUrl = item.ratingImage?.url;
                                                                const ratingImageAlt = item.ratingImage?.alt;
                                                                const rating = Math.max(0, Math.min(5, parseFloat(ratingNumber || 0)));
                                                                
                                                                if (ratingIconAlign === 'none' || rating === 0) return null;

                                                                // For image mode, show images based on full star count
                                                                if (ratingIconAlign === 'image' && ratingImageUrl) {
                                                                    const fullCount = Math.round(rating);
                                                                    let icons = [];
                                                                    for (let i = 0; i < fullCount; i++) {
                                                                        icons.push(
                                                                            <div key={i} className="gslider-testimonial-rating-icon">
                                                                                <img src={ratingImageUrl} alt={ratingImageAlt} />
                                                                            </div>
                                                                        );
                                                                    }
                                                                    return icons;
                                                                }

                                                                // For icon mode, render 5 SVG stars (full/partial/empty)
                                                                if (ratingIconAlign === 'icon') {
                                                                    const fullStars = Math.floor(rating);
                                                                    const fraction = rating - fullStars;
                                                                    const emptyStars = 5 - fullStars - (fraction > 0 ? 1 : 0);

                                                                    const fullStarPath = "M49.05,21.06a1.9,1.9,0,0,0,.46-2A1.93,1.93,0,0,0,48,17.8L33.3,15.63,26.74,1.88a1.93,1.93,0,0,0-3.48,0l-6.5,13.71L2,17.8A1.93,1.93,0,0,0,.49,19.1a1.9,1.9,0,0,0,.46,2L11.5,31.66v.86L9.1,47a1.9,1.9,0,0,0,.79,1.88,1.89,1.89,0,0,0,1.11.36,2,2,0,0,0,.92-.23l13-7.14L38.08,49a1.93,1.93,0,0,0,2.82-2l-2.39-14.2V31.69Z";
                                                                    const emptyStarPath = "M49.62,18.85a1.9,1.9,0,0,0-1.54-1.29L33.4,15.38,26.84,1.63a1.92,1.92,0,0,0-3.47,0L16.86,15.34,2.13,17.56a1.92,1.92,0,0,0-1.08,3.25L11.73,31.53,9.21,46.73A1.93,1.93,0,0,0,11.1,49a2,2,0,0,0,.92-.23L25.07,41.6l13.11,7.14a1.93,1.93,0,0,0,2.82-2L38.46,31.6l10.7-10.79A1.92,1.92,0,0,0,49.62,18.85ZM37,30.19a1.94,1.94,0,0,0-.53,1.67L39,46.9l-13-7a1.88,1.88,0,0,0-1.84,0l-13,7,2.5-15a1.94,1.94,0,0,0-.53-1.67L2.57,19.51l14.59-2.19a2,2,0,0,0,1.45-1.08L25.08,2.58,31.6,16.25a2,2,0,0,0,1.45,1.07l14.58,2.19Z";

                                                                    let stars = [];

                                                                    // Full stars
                                                                    for (let i = 0; i < fullStars; i++) {
                                                                        stars.push(
                                                                            <div key={`full-${i}`} className="gslider-testimonial-rating-icon">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.23 48.44" className="gslider-testimonial-rating-star-svg">
                                                                                    <path d={fullStarPath} transform="translate(-0.39 -0.78)"/>
                                                                                </svg>
                                                                            </div>
                                                                        );
                                                                    }

                                                                    // Partial star
                                                                    if (fraction > 0) {
                                                                        stars.push(
                                                                            <div key="partial" className="gslider-testimonial-rating-icon gslider-testimonial-star-partial-wrap">
                                                                                <div className="gslider-testimonial-star-partial-container">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.23 48.44" className="gslider-testimonial-rating-star-svg">
                                                                                        <path d={emptyStarPath} transform="translate(-0.49 -0.53)"/>
                                                                                    </svg>
                                                                                    <div className="gslider-testimonial-star-partial-fill" style={{ width: `${fraction * 100}%` }}>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.23 48.44" className="gslider-testimonial-rating-star-svg">
                                                                                            <path d={fullStarPath} transform="translate(-0.39 -0.78)"/>
                                                                                        </svg>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }

                                                                    // Empty stars
                                                                    for (let i = 0; i < emptyStars; i++) {
                                                                        stars.push(
                                                                            <div key={`empty-${i}`} className="gslider-testimonial-rating-icon empty">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.23 48.44" className="gslider-testimonial-rating-star-svg">
                                                                                    <path d={emptyStarPath} transform="translate(-0.49 -0.53)"/>
                                                                                </svg>
                                                                            </div>
                                                                        );
                                                                    }

                                                                    return stars;
                                                                }

                                                                return null;
                                                            })()}
                                                        </div>
                                                        {showRatingNumber && (
                                                            <div className="gslider-testimonial-rating-number">
                                                                ({Math.max(0, Math.min(5, parseFloat(item.ratingNumber || 0)))})
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ),
                                            name: showAuthorName && item.authorName && (
                                                <div className="gslider-testimonial-author-name-wrapper" key="name">
                                                    <RichText.Content
                                                        tagName={authorNameHtmlTag}
                                                        className="gslider-testimonial-author-name"
                                                        value={item.authorName}
                                                    />
                                                </div>
                                            ),
                                            designation: showAuthorDesignation && item.authorDesignation && (
                                                <div className="gslider-testimonial-author-designation-wrapper" key="designation">
                                                    <RichText.Content
                                                        tagName={authorDesignationHtmlTag}
                                                        className="gslider-testimonial-author-designation"
                                                        value={item.authorDesignation}
                                                    />
                                                </div>
                                            ),
                                        };
                                        return (contentOrder || ['image', 'title', 'text', 'rating', 'name', 'designation']).map(key => renderMap[key]);
                                    })()}
                                </div>
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

                {anyPaginationEnabled && paginationPositionType === 'inside' && (
                    <>
                        <div
                            className="swiper-pagination swiper-pagination-testimonial-slider"
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
                        className={`swiper-pagination swiper-pagination-testimonial-slider swiper-pagination-${blockId}`}
                        aria-label="Carousel pagination"
                    ></div>
                </>
            )}
        </div>
    );
}