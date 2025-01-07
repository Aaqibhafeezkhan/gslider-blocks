import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const { blockId, sliderItems } = attributes;

    const blockProps = useBlockProps.save({
        className: `fb-slider-main-wrapper ${blockId}`,
    });

    return (
        <div {...blockProps}>
            <div className='swiper-container-outer'>
                <div className='swiper-wrapper'>
                    {sliderItems.map((item) => (
                        <div key={item.id} className={`swiper-slide fb-slider-content-wrapper item-${item.id}`}>
                            <div className='fb-slider-content-inner-wrapper'>
                                <div className={`fb-slider-list-item`}>
                                    <div className="fb-slider-list-content">
                                        <RichText.Content
                                            tagName="h3"
                                            className="fb-slider-title"
                                            value={item.title}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='swiper-pagination'></div>
                <div className='swiper-button-next'></div>
                <div className='swiper-button-prev'></div>
            </div>
        </div>
    );
}
