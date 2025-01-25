import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const {
        blockId,
        sliderItems,
        slidePerColumn,
        slidePerColumnGap,
        transitionSpeed,
        autoplay,
        autoplaySpeed,
        loop,
        allowTouchMove,
        pauseOnHover,
        stopOnLastSlide,
        reverseDirection,
        effect,
        enableMouseWheel,
        displayArrows,
        displayDots,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `guten-slider-container ${blockId}`,
    });


    // Configure Swiper settings for frontend rendering
    const swiperSettings = JSON.stringify({
        slidesPerView: slidePerColumn,
        slidePerColumnGap: slidePerColumnGap,
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
        navigation: {
            nextEl: `.${blockId} .guten-slider.swiper-button-next`,
            prevEl: `.${blockId} .guten-slider.swiper-button-prev`,
        },
        pagination: {
            el: `.${blockId} .guten-slider.swiper-pagination`,
            type: 'bullets',
            clickable: true,
        },
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
