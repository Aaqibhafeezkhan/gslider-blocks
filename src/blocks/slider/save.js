import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
    const { blockId, sliderItems } = attributes;

    const blockProps = useBlockProps.save({
        className: `guten-slider-main-wrapper ${blockId}`,
    });

    return (
        <div {...blockProps}>
            <div className='swiper'>
                <div className='swiper-wrapper'>
                    {sliderItems.map((item) => (
                        <div key={item.id} className={`swiper-slide guten-slider-content-wrapper item-${item.id}`}>
                            <div className='guten-slider-content-inner-wrapper'>
                                <div className={`guten-slider-list-item`}>
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
                    ))}
                </div>
                <div className='swiper-pagination'></div>
                <div className='swiper-button-next'></div>
                <div className='swiper-button-prev'></div>
            </div>
        </div>
    );
}
