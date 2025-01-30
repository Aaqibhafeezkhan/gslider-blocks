import { __ } from '@wordpress/i18n';
import {RichText, useBlockProps, BlockControls, } from '@wordpress/block-editor';
import { 
    Toolbar,
    ToolbarGroup,
    ToolbarButton
} from '@wordpress/components';
import { useState, useMemo, useEffect, useRef } from "@wordpress/element";
import Inspector from './inspector';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle'; // Ensure styles are applied

export default function Edit({ attributes, setAttributes, clientId }) {
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
    } = attributes;

    const blockProps = useBlockProps({
        className: `guten-slider-container ${blockId}`,
    });

    const swiperRef = useRef();



    useEffect(() => {
        if (!swiperRef.current) return;
    
        const swiperOptions = {
            slidesPerView: sliderType === 'carousel' ? parseInt(carouselPerColumn) : 1,
            spaceBetween: sliderType === 'carousel' ? parseInt(carouselPerColumnGap) : 0,
            loop: infiniteLoop,
            autoplay: autoplay ? {
                delay: (autoplayDelay || 1) * 1000, // Ensure a valid delay
                pauseOnMouseEnter: pauseOnHover,
                stopOnLastSlide: stopOnLastSlide,
                reverseDirection: reverseDirection,
            } : false,
            speed: (speed || 8) * 100, // Ensure valid speed
            effect: slideEffect,
            allowTouchMove: allowTouchMove,
            mousewheel: mousewheelControl ? {
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
            } : false,
            navigation: showNavigation ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            } : undefined,
            pagination: showPagination ? {
                el: '.swiper-pagination',
                clickable: true,
            } : undefined,
            ...(slideEffect === 'creative' && {
                creativeEffect: {
                    prev: { shadow: true, translate: [0, 0, -400] },
                    next: { translate: ['100%', 0, 0] },
                },
            }),
        };
    
        try {
            // ✅ Destroy existing instance before creating a new one
            if (swiperRef.current.swiper) {
                swiperRef.current.swiper.destroy(true, true);
            }
    
            // ✅ Properly initialize Swiper
            swiperRef.current.swiper = new Swiper(swiperRef.current, swiperOptions);
            
        } catch (error) {
            console.error('Swiper initialization error:', error);
        }
    }, [
        infiniteLoop, autoplay, autoplayDelay, pauseOnHover, 
        stopOnLastSlide, reverseDirection, speed, showNavigation,
        showPagination, sliderType, slideEffect, carouselEffect, mousewheelControl
    ]);




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

    const renderSliderToolbarControls = () => {
        return (
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon="plus"
                        label={ __( 'Add New Slide', 'gutenslider-blocks' ) }
                        onClick={ () => {
                            // Add new item
                            handleAddItem();
                        } }
                    />
                </ToolbarGroup>
            </BlockControls>
        );
    };

    return (
        <>
            <Inspector 
                attributes={attributes}
                setAttributes={setAttributes}
                clientId={clientId}
            />

            { renderSliderToolbarControls () }

            <div {...blockProps}>
                <div className="swiper" ref={swiperRef}>
                    <div className="swiper-wrapper guten-slider-wrapper">
                        {sliderItems.map((item, index) => (
                            <div key={item.id} className={`swiper-slide ${sliderType === 'slider' ? 'slide-mode' : ''}`}>
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
                    { showPagination && <div className="guten-slider swiper-pagination"></div> }
                    { showNavigation && 
                        <>
                            <div className="guten-slider swiper-button-next" aria-label="Next slide"></div>
                            <div className="guten-slider swiper-button-prev" aria-label="Previous slide"></div>
                        </>
                    }
                </div>
            </div>
        </>
    );
}