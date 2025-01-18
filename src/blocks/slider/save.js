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

    return (
        <div 
            {...blockProps}
            data-block-id={ blockId }
            data-transition-speed={transitionSpeed}
            data-autoplay={autoplay}
            data-autoplay-speed={autoplaySpeed}
            data-slides-per-view={slidePerView}
            data-space-between={spaceBetween}
            data-loop={loop}
            data-allow-touch-move={allowTouchMove}
            data-pause-on-hover={pauseOnHover}
            data-stop-on-last-slide={stopOnLastSlide}
            data-reverse-direction={reverseDirection}
            data-effect={effect}
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
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </div>
        </div>
    );
}
