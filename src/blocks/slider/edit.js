import { __ } from '@wordpress/i18n';
import {RichText, useBlockProps, BlockControls, } from '@wordpress/block-editor';
import { 
    Toolbar,
    ToolbarGroup,
    ToolbarButton
} from '@wordpress/components';
import { useState, useMemo, useEffect, useRef } from "@wordpress/element";
import Inspector from './inspector';
import { Swiper, SwiperSlide } from 'swiper/react';
import { 
    Navigation, 
    Pagination, 
    Autoplay, 
    Manipulation,
    Mousewheel,
    EffectFade,
    EffectCube,
    EffectCoverflow,
    EffectFlip,
    EffectCreative,
    EffectCards
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-cards';

export default function Edit({ attributes, setAttributes, clientId }) {
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

    const blockProps = useBlockProps({
        className: `guten-slider-container ${blockId}`,
    });


    const handleAddItem = () => {
        const newItem = {
            id: `item-${sliderItems.length + 1}`, // Fixed ID format
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

    // Enhanced settings for Swiper
    const settings = useMemo(() => ({
        slidesPerView: slidePerView,
        spaceBetween: spaceBetween,
        autoplay: autoplay ? {
            delay: autoplaySpeed,
            disableOnInteraction: false,
            stopOnLastSlide: stopOnLastSlide,
            reverseDirection: reverseDirection,
            pauseOnMouseEnter: pauseOnHover,
        } : false,
        speed: transitionSpeed,
        loop: loop,
        effect: effect,
        creativeEffect: {
            prev: {
                shadow: true,
                translate: ['-20%', 0, -1],
            },
            next: {
                translate: ['100%', 0, 0],
            },
        },
        allowTouchMove: allowTouchMove,
        navigation: {
            enabled: true,
        },
        pagination: {
            enabled: true,
            clickable: true,
        },
        // Add effect-specific settings
        ...(effect === 'creative' && {
            creativeEffect: {
                prev: {
                    translate: [0, 0, -400],
                },
                next: {
                    translate: ['100%', 0, 0],
                },
            },
        }),
        ...(effect === 'cube' && {
            cubeEffect: {
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
            },
        }),
        ...(effect === 'coverflow' && {
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
        }),
    }), [
        slidePerView,
        spaceBetween,
        autoplay,
        autoplaySpeed,
        stopOnLastSlide,
        reverseDirection,
        pauseOnHover,
        transitionSpeed,
        loop,
        allowTouchMove,
        effect,
    ]);

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
                    {...settings}
                    modules={[
                        Navigation,
                        Pagination,
                        Autoplay,
                        Manipulation,
                        Mousewheel,
                        EffectFade,
                        EffectCube,
                        EffectCoverflow,
                        EffectFlip,
                        EffectCreative,
                        EffectCards
                    ]}
                >
                    {sliderItems.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className={`${blockId} guten-slider-content-wrapper ${item.id}`}>
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
