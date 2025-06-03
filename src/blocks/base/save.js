import { RichText, useBlockProps } from '@wordpress/block-editor';

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
        paginationType,
        dynamicBullets,

        showSubTitle,
        showTitle,
        showDescription,
        showButton,
        showNavigation,
        showPagination,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `gslider-container ${blockId}`,
    });

    // Configure Swiper settings for frontend rendering
    const swiperSettings = JSON.stringify({
        effect: sliderType === 'carousel' ? carouselEffect : slideEffect,
        
        // Carousel-specific settings
        slidesPerView: sliderType === 'carousel' ? (carouselPerColumn || 2) : 1,
        spaceBetween: sliderType === 'carousel' ? (carouselPerColumnGap || 20) : 0,
        
        // Common settings
        loop: infiniteLoop,
        autoplay: autoplay ? {
            delay: autoplayDelay,
            pauseOnMouseEnter: pauseOnHover,
            disableOnInteraction: false,
            stopOnLastSlide: stopOnLastSlide,
            reverseDirection: reverseDirection,
        } : false,
        speed: speed,
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
                            <div className={`gslider-content-wrapper ${item.id}`}>
                                <div className="gslider-content-inner-wrapper">
                                    <div className="gslider-list-item">
                                        <div className="gslider-list-content">
                                            {showSubTitle && item.subTitle && (
                                                <div className="gslider-subtitle-wrapper">
                                                    <RichText.Content
                                                        tagName="span"
                                                        className="gslider-subtitle"
                                                        value={item.subTitle}
                                                    />
                                                </div>
                                            )}
                                            {showTitle && item.title && (
                                                <div className="gslider-title-wrapper">
                                                    <RichText.Content
                                                        tagName="h3"
                                                        className="gslider-title"
                                                        value={item.title}
                                                    />
                                                </div>
                                            )}
                                            {showDescription && item.description && (
                                                <div className="gslider-description-wrapper">
                                                    <RichText.Content
                                                        tagName="p"
                                                        className="gslider-description"
                                                        value={item.description}
                                                    />
                                                </div>
                                            )}
                                            {showButton && (
                                                <div className="gslider-btn-container">
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
                                                                    className="gslider-btn primary-btn text"
                                                                    tagName="span"
                                                                />
                                                            </a>
                                                        ) : (
                                                            <RichText.Content
                                                                value={item.primaryButtonText}
                                                                className="gslider-btn primary-btn text"
                                                                tagName="span"
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
                                                                        className="gslider-btn secondary-btn text"
                                                                        tagName="span"
                                                                    />
                                                                </a>
                                                            ) : (
                                                                <RichText.Content
                                                                    value={item.secondaryButtonText}
                                                                    className="gslider-btn secondary-btn text"
                                                                    tagName="span"
                                                                />
                                                            )
                                                        )}
                                                    </>
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