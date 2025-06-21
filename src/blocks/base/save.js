import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const {
        blockId,
        deviceType,
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
        paginationType,
        dynamicBullets,

        showSubTitle,
        showTitle,
        showDescription,
        showButton,
        showNavigation,
        showPagination,
        subTitleHtmlTag,
        titleHtmlTag,
        descriptionHtmlTag,
        globalID,
        globalClass,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `gslider-base-wrapper ${blockId}`,
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
                    {sliderItems.map((item) => (
                        <div key={item.id} className={`swiper-slide ${sliderType === 'slider' ? 'slide-mode' : ''}`}>
                            <div className={`gslider-content-wrapper ${item.id} ${globalClass}`} {...(globalID && {id: globalID})}>
                                <div className="gslider-content-inner-wrapper">
                                    <div className="gslider-list-item">
                                        <div className="gslider-list-content">
                                            {showSubTitle && item.subTitle && (
                                                <div className="gslider-subtitle-wrapper">
                                                    <RichText.Content
                                                        tagName={subTitleHtmlTag}
                                                        className="gslider-subtitle"
                                                        value={item.subTitle}
                                                    />
                                                </div>
                                            )}
                                            {showTitle && item.title && (
                                                <div className="gslider-title-wrapper">
                                                    <RichText.Content
                                                        tagName={titleHtmlTag}
                                                        className="gslider-title"
                                                        value={item.title}
                                                    />
                                                </div>
                                            )}
                                            {showDescription && item.description && (
                                                <div className="gslider-description-wrapper">
                                                    <RichText.Content
                                                        tagName={descriptionHtmlTag}
                                                        className="gslider-description"
                                                        value={item.description}
                                                    />
                                                </div>
                                            )}
                                            {showButton && (
                                                <div className="gslider-btn-wrapper">
                                                    <div className="gslider-btn-inner-wrapper">
                                                        <>
                                                            {item.primaryButtonLink ? (
                                                                <a
                                                                    className="gslider-btn primary-btn"
                                                                    href={item.primaryButtonLink}
                                                                    target={item.primaryButtonTargetLink ? '_blank' : undefined}
                                                                    rel={[
                                                                        item.primaryButtonNofollow && 'nofollow',
                                                                        item.primaryButtonSponsored && 'sponsored',
                                                                        item.primaryButtonTargetLink && 'noopener noreferrer'
                                                                    ].filter(Boolean).join(' ')}
                                                                >
                                                                    <RichText.Content
                                                                        value={item.primaryButtonText}
                                                                    />
                                                                </a>
                                                            ) : (
                                                                <RichText.Content
                                                                    value={item.primaryButtonText}
                                                                    className="gslider-btn primary-btn"
                                                                />
                                                            )}

                                                            {item.secondaryButtonSwitcher && (
                                                                item.secondaryButtonLink ? (
                                                                    <a
                                                                        className="gslider-btn secondary-btn"
                                                                        href={item.secondaryButtonLink}
                                                                        target={item.secondaryButtonTargetLink ? '_blank' : undefined}
                                                                        rel={[
                                                                            item.secondaryButtonNofollow && 'nofollow',
                                                                            item.secondaryButtonSponsored && 'sponsored',
                                                                            item.secondaryButtonTargetLink && 'noopener noreferrer'
                                                                        ].filter(Boolean).join(' ')}
                                                                    >
                                                                        <RichText.Content
                                                                            value={item.secondaryButtonText}
                                                                        />
                                                                    </a>
                                                                ) : (
                                                                    <RichText.Content
                                                                        value={item.secondaryButtonText}
                                                                        className="gslider-btn secondary-btn"
                                                                    />
                                                                )
                                                            )}
                                                        </>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {showNavigation && 
                    <>
                        <div className="guten-slider swiper-button-next" aria-label="Next slide"></div>
                        <div className="guten-slider swiper-button-prev" aria-label="Previous slide"></div>
                    </>
                }
                {showPagination && <div className="guten-slider swiper-pagination"></div>}
            </div>
        </div>
    );
}