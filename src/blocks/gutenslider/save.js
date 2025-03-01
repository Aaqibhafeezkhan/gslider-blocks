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
        showNavigation,
        showPagination,
        paginationType,
        dynamicBullets,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `guten-slider-container ${blockId}`,
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
                <div className="swiper-wrapper guten-slider-wrapper">
                    {sliderItems.map((item) => (
                        <div key={item.id} className={`swiper-slide ${sliderType === 'slider' ? 'slide-mode' : ''}`}>
                            <div className={`${blockId} guten-slider-content-wrapper ${item.id}`}>
                                <div className="guten-slider-content-inner-wrapper">
                                    <div className="guten-slider-list-item">
                                        <div className="guten-slider-list-content">
                                            {item.subTitle && (
                                                <div className="guten-slider-subtitle-wrapper">
                                                    <RichText.Content
                                                        tagName="span"
                                                        className="guten-slider-subtitle"
                                                        value={item.subTitle}
                                                    />
                                                </div>
                                            )}
                                            {item.title && (
                                                <div className="guten-slider-title-wrapper">
                                                    <RichText.Content
                                                        tagName="h3"
                                                        className="guten-slider-title"
                                                        value={item.title}
                                                    />
                                                </div>
                                            )}
                                            {item.description && (
                                                <div className="guten-slider-description-wrapper">
                                                    <RichText.Content
                                                        tagName="p"
                                                        className="guten-slider-description"
                                                        value={item.description}
                                                    />
                                                </div>
                                            )}
                                            {item.buttonText && (
                                                <div className="guten-slider-button-container">
                                                    {item.buttonLink ? (
                                                        <a 
                                                            className="guten-slider-button"
                                                            href={item.buttonLink}
                                                            target={item.buttonTargetLink ? '_blank' : undefined}
                                                            rel={[
                                                                item.nofollow && 'nofollow',
                                                                item.sponsored && 'sponsored',
                                                                item.buttonTargetLink && 'noopener noreferrer'
                                                            ].filter(Boolean).join(' ')}
                                                        >
                                                            <RichText.Content
                                                                value={item.buttonText}
                                                                className="guten-slider-button-text"
                                                            />
                                                        </a>
                                                    ) : (
                                                        <span className="guten-slider-button-text">
                                                            <RichText.Content value={item.buttonText} />
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {showPagination && <div className="guten-slider swiper-pagination"></div>}
                {showNavigation && 
                    <>
                        <div className="guten-slider swiper-button-next" aria-label="Next slide"></div>
                        <div className="guten-slider swiper-button-prev" aria-label="Previous slide"></div>
                    </>
                }
            </div>
        </div>
    );
}