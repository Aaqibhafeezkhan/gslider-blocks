import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const {
        blockId,
        sliderItems,
        sliderType,
        carouselPerColumn,
        carouselPerColumnGap,
        transitionSpeed,
        autoplay,
        autoplaySpeed,
        loop,
        allowTouchMove,
        pauseOnHover,
        stopOnLastSlide,
        reverseDirection,
        carouselEffect,
        sliderEffect,
        enableMouseWheel,
        displayArrows,
        displayDots,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `guten-slider-container ${blockId}`,
    });

    // Determine the effect based on slider type
    const effect = sliderType === 'carousel' ? carouselEffect : sliderEffect;

    // Configure Swiper settings for frontend rendering
    const swiperSettings = JSON.stringify({
        // Update slidesPerView logic to match Edit component
        slidesPerView: sliderType === 'carousel' ? parseInt(carouselPerColumn) : 1,
        spaceBetween: sliderType === 'carousel' ? parseInt(carouselPerColumnGap) : 0,
        
        autoplay: autoplay ? {
            delay: autoplaySpeed,
            disableOnInteraction: false,
            stopOnLastSlide,
            reverseDirection,
            pauseOnMouseEnter: pauseOnHover,
        } : false,
        speed: transitionSpeed,
        loop: loop,
        effect: effect,
        creativeEffect: effect === 'creative' ? {
            prev: {
                shadow: true,
                translate: [0, 0, -400],
            },
            next: {
                translate: ['100%', 0, 0],
            },
        } : undefined,
        allowTouchMove: allowTouchMove,
        mousewheel: enableMouseWheel,
        navigation: displayArrows ? {
            nextEl: `.${blockId} .guten-slider.swiper-button-next`,
            prevEl: `.${blockId} .guten-slider.swiper-button-prev`,
        } : false,
        pagination: displayDots ? {
            el: `.${blockId} .guten-slider.swiper-pagination`,
            type: 'bullets',
            clickable: true,
        } : false,
    });

    return (
        <div 
            {...blockProps}
            data-swiper-settings={swiperSettings}
        >
            <div className="swiper">
                <div className="swiper-wrapper guten-slider-wrapper">
                    {sliderItems.map((item) => (
                        <div key={item.id} className='swiper-slide'>
                            <div className={`${blockId} guten-slider-content-wrapper ${item.id}`}>
                                <div className="guten-slider-content-inner-wrapper">
                                    <div className="guten-slider-list-item">
                                        <div className="guten-slider-list-content">
                                            <RichText.Content
                                                tagName="h3"
                                                className="guten-slider-title"
                                                value={item.title}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                { displayDots && <div className="guten-slider swiper-pagination"></div> }
                { displayArrows && 
                    <>
                        <div className="guten-slider swiper-button-next" aria-label="Next slide"></div>
                        <div className="guten-slider swiper-button-prev" aria-label="Previous slide"></div>
                    </>
                }
            </div>
        </div>
    );
}
