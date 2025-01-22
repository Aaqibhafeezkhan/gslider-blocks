import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const {
        blockId,
        sliderItems,
        slidePerView,
        spaceBetween,
        transitionSpeed,
        autoplay,
        autoplaySpeed,
        loop,
        allowTouchMove,
        pauseOnHover,
        stopOnLastSlide,
        reverseDirection,
        effect,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: `guten-slider-container ${blockId}`,
    });


    // Configure Swiper settings for frontend rendering
    const swiperSettings = JSON.stringify({
        slidesPerView: slidePerView,
        spaceBetween: spaceBetween,
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
                translate: ['-20%', 0, -1],
            },
            next: {
                translate: ['100%', 0, 0],
            },
        } : undefined,
        allowTouchMove: allowTouchMove,
        navigation: {
            nextEl: `.${blockId} .swiper-button-next`,
            prevEl: `.${blockId} .swiper-button-prev`,
        },
        pagination: {
            el: `.${blockId} .swiper-pagination`,
            type: 'bullets',
            clickable: true,
        },
    });

    return (
        <div 
            {...blockProps}
            data-swiper-settings={swiperSettings}
        >
            <div className="swiper guten-slider-swiper-wrapper">
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
                <div className="swiper-pagination"></div>
                <div className="swiper-button-next" aria-label="Next slide"></div>
                <div className="swiper-button-prev" aria-label="Previous slide"></div>
            </div>
        </div>
    );
}
