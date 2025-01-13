import { __ } from '@wordpress/i18n';
import {RichText, useBlockProps, BlockControls, } from '@wordpress/block-editor';
import { 
    Toolbar,
    ToolbarGroup,
    ToolbarButton
} from '@wordpress/components';
import Inspector from './inspector';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Edit({ attributes, setAttributes, clientId }) {
    const { blockId, sliderItems } = attributes;

    const blockProps = useBlockProps({
        className: `guten-slider-container ${blockId}`,
    });


    const handleAddItem = () => {
        const newItem = {
            id: `${sliderItems.length + 1}`,
            title: `Slider Item ${sliderItems.length + 1}`,

            sliderItemBgColorSwitcher: 'normal',

            normalItemBackgroundType: 'classic',
            normalItemClassicColor: '#399CFF',
            normalItemGradientColor: null,
            normalItemCustomGradientSwitcher: false,
            normalItemCustomGradientInputValue: '',

            hoverItemBackgroundType: 'classic',
            hoverItemClassicColor: '',
            hoverItemGradientColor: null,
            hoverItemCustomGradientSwitcher: false,
            hoverItemCustomGradientInputValue: ''
        };
        setAttributes({ sliderItems: [...sliderItems, newItem] });
    };

    return (
        <>
            <Inspector 
                attributes={attributes}
                setAttributes={setAttributes}
                clientId={clientId}
            />

            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon="plus"
                        label={__('Add Slider', 'gutenslider-blocks')}
                        onClick={handleAddItem}
                    />
                </ToolbarGroup>
            </BlockControls>

            <div {...blockProps}>
                <Swiper
                    className='guten-slider-swiper-wrapper'
                    modules={[Navigation, Pagination]}
                    // spaceBetween={50}
                    slidesPerView={1}
                    speed={1000}
                    navigation
                    pagination={{ clickable: true }}
                    loop
                >
                    {sliderItems.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className={`guten-slider-content-wrapper ${item.id}`}>
                                <div className='guten-slider-content-inner-wrapper'>
                                    <div className={`guten-slider-list-item`}>
                                        <div className="guten-slider-list-content">
                                            <RichText
                                                tagName="h3"
                                                className="guten-slider-title"
                                                value={item.title}
                                                onChange={(value) =>
                                                    setAttributes({
                                                        sliderItems: sliderItems.map((sliderItem) =>
                                                            sliderItem.id === item.id
                                                                ? { ...sliderItem, title: value }
                                                                : sliderItem
                                                        ),
                                                    })
                                                }
                                                placeholder={__('Slider Title', 'gutenslider-blocks')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}
