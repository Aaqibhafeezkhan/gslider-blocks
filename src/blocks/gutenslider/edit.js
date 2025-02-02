import { __ } from '@wordpress/i18n';
import {RichText, useBlockProps, BlockControls, } from '@wordpress/block-editor';
import { 
    Toolbar,
    ToolbarGroup,
    ToolbarButton
} from '@wordpress/components';
import { useState, useMemo, useEffect, useRef } from "@wordpress/element";
import Inspector from './inspector';

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
            // Set effect based on sliderType
            effect: sliderType === 'carousel' ? carouselEffect : slideEffect,
            
            // Carousel-specific settings with default values
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
            
            mousewheel: mousewheelControl ? {
                enabled: true,
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
            } : false,
            
            navigation: showNavigation ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            } : false,
            
            pagination: showPagination ? {
                el: '.swiper-pagination',
                clickable: true,
            } : false,
            
            // Creative effect settings if needed
            ...(slideEffect === 'creative' && {
                creativeEffect: {
                    prev: { shadow: true, translate: [0, 0, -400] },
                    next: { translate: ['100%', 0, 0] },
                },
            }),

        };
    
        try {
            if (swiperRef.current.swiper) {
                swiperRef.current.swiper.destroy(true, true);
            }
            
            new Swiper(swiperRef.current, swiperOptions);
            
        } catch (error) {
            console.error('Swiper initialization error:', error);
        }
    }, [
        sliderType,
        infiniteLoop,
        carouselPerColumn,
        carouselPerColumnGap,
        autoplay,
        autoplayDelay,
        pauseOnHover,
        stopOnLastSlide,
        reverseDirection,
        speed,
        allowTouchMove,
        showNavigation,
        showPagination,
        slideEffect,
        carouselEffect,
        mousewheelControl,
    ]);

    const handleAddItem = () => {
        const newItem = {
            id: `item-${sliderItems.length + 1}`,
            title: `Slider Item ${sliderItems.length + 1}`,
            sliderItemBgColorSwitcher: 'normal',
            normalItemBackgroundType: 'classic',
            normalItemClassicColor: '#E3F2FD',
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
                        onClick={handleAddItem}
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

            {renderSliderToolbarControls()}

            <div {...blockProps}>
                <div className="swiper" ref={swiperRef}>
                    <div className="swiper-wrapper guten-slider-wrapper">
                        {sliderItems.map((item, index) => (
                            <div key={item.id} className={`swiper-slide ${sliderType === 'slider' ? 'slide-mode' : ''}`}>
                                <div className={`${blockId} guten-slider-content-wrapper ${item.id}`}>
                                    <div className="guten-slider-content-inner-wrapper">
                                        <div className="guten-slider-list-item">
                                            <div className="guten-slider-list-content">
                                                <RichText
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
                    {showPagination && <div className="guten-slider swiper-pagination"></div>}
                    {showNavigation && 
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