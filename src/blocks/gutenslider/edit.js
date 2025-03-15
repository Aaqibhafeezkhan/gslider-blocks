import { __ } from '@wordpress/i18n';
import {RichText, useBlockProps, BlockControls, } from '@wordpress/block-editor';
import { 
    Toolbar,
    ToolbarGroup,
    ToolbarButton
} from '@wordpress/components';
import { useState, useMemo, useEffect, useRef } from "@wordpress/element";
import SwitchToBlockSettings  from '@Utils/switchToBlockSettings';
import { arrayMove } from '@dnd-kit/sortable';
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
        paginationType,
        dynamicBullets,
    } = attributes;

    const blockProps = useBlockProps({
        className: `guten-slider-container ${blockId}`,
    });

    /**
     * Manages slider item list
     */
    const [sliderItemList, setSliderItemList] = useState(sliderItems);

    /**
     * Manages tab button settings and switches to block settings on click
     */
    const panelRef = useRef(null);
    SwitchToBlockSettings(panelRef);
    
    const swiperRef = useRef();
    const prevSwiperOptions = useRef(null);
    
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
            mousewheel: mousewheelControl,

            navigation: showNavigation ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            } : false,

            pagination: showPagination ? {
                el: '.swiper-pagination',
                type: paginationType,
                dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false, 
                clickable: true,
            } : false,

            // Creative effect settings if needed
            ...(slideEffect === 'creative' && {
                creativeEffect: {
                    prev: { shadow: true, translate: [0, 0, -400] },
                    next: { translate: ['100%', 0, 0] },
                },
            }),
            
            //FlipEffect Fix - Smooth Flip Animation
            ...(slideEffect === 'flip' && {
                flipEffect: {
                    slideShadows: true,
                    limitRotation: true,
                },
            }),
        };
    
        // If the Swiper is already initialized and the new options are the same as the previous options, do nothing.
        if (prevSwiperOptions.current && JSON.stringify(prevSwiperOptions.current) === JSON.stringify(swiperOptions)) {
            return;
        }
    
        try {
            if (swiperRef.current.swiper) {
                swiperRef.current.swiper.destroy(true, true);
            }
    
            swiperRef.current.swiper = new Swiper(swiperRef.current, swiperOptions);
            prevSwiperOptions.current = swiperOptions;
    
        } catch (error) {
            console.error('Swiper initialization error:', error);
        }
    }, [
        sliderType,
        infiniteLoop,
        autoplay,
        autoplayDelay,
        pauseOnHover,
        stopOnLastSlide,
        reverseDirection,
        speed,
        allowTouchMove,
        showNavigation,
        showPagination,
        paginationType,
        dynamicBullets,
        slideEffect,
        carouselEffect,
        carouselPerColumn,
        carouselPerColumnGap,
        mousewheelControl,
    ]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            const oldIndex = sliderItems.findIndex(item => item.id === active.id);
            const newIndex = sliderItems.findIndex(item => item.id === over.id);
            const updatedItems = arrayMove(sliderItems, oldIndex, newIndex);
            setAttributes({ sliderItems: updatedItems });
            setSliderItemList(updatedItems);
        }
    };

    const handleAddItem = () => {
        const newItem = {
            id: `item-${sliderItems.length + 1}`,
            subTitle: 'Enter your subtitle here',
            title: `Slider Item ${sliderItems.length + 1}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum.',
            buttonText: 'Click Here',
            buttonLink: '#',
            buttonTargetLink: false,

            sliderItemBgColorSwitcher: 'normal',

            normalItemBackgroundType: 'classic',
            normalItemClassicColor: '#EDEDED',
            normalItemGradientColor: null,
            normalItemCustomGradientSwitcher: false,
            normalItemCustomGradientInputValue: '',

            normalBackgroundImageUrl: '',
            normalBackgroundImageAlt: '',
            normalBackgroundImageID: '',
            normalBackgroundImagePosition: { x: 0.5, y: 0.5 },
            normalBackgroundImageAttachment: 'scroll',
            normalBackgroundImageRepeat: 'no-repeat',
            normalBackgroundImageSize: 'cover',


            hoverItemBackgroundType: 'classic',
            hoverItemClassicColor: '',
            hoverItemGradientColor: null,
            hoverItemCustomGradientSwitcher: false,
            hoverItemCustomGradientInputValue: '',

            hoverBackgroundImageUrl: '',
            hoverBackgroundImageAlt: '',
            hoverBackgroundImageID: '',
            hoverBackgroundImagePosition: { x: 0.5, y: 0.5 },
            hoverBackgroundImageAttachment: 'scroll',
            hoverBackgroundImageRepeat: 'no-repeat',
            hoverBackgroundImageSize: 'cover',
        };
        setAttributes({ sliderItems: [...sliderItems, newItem] });
        setSliderItemList([...sliderItemList, newItem]);

        // Ensure Swiper updates with new slides
        setTimeout(() => {
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.update(); 
                swiperRef.current.swiper.pagination.update();
                swiperRef.current.swiper.navigation.update();
            }
        }, 100);
    };

    const handleChangeItem = (id, key, value) => {
        const updatedItems = sliderItemList.map(item => {
            if (item.id === id) {
                if (key === 'normalBackgroundImageID') {
                    // Get the full image data from WordPress media library
                    const image = wp.media.attachment(value).toJSON();
                    return {
                        ...item,
                        [key]: value,
                        'normalBackgroundImageUrl': image.url,
                        'normalBackgroundImageAlt': image.alt || ''
                    };
                }
                if (key === 'hoverBackgroundImageID') {
                    // Get the full image data from WordPress media library
                    const image = wp.media.attachment(value).toJSON();
                    return {
                        ...item,
                        [key]: value,
                        'hoverBackgroundImageUrl': image.url,
                        'hoverBackgroundImageAlt': image.alt || ''
                    };
                }
                return { ...item, [key]: value };
            }
            return item;
        });
        
        setSliderItemList(updatedItems);
        setAttributes({ sliderItems: updatedItems });
    };


    const handleDeleteItem = (id) => {
        const updatedItems = sliderItemList.filter(item => item.id !== id);
        setAttributes({ sliderItems: updatedItems });
        setSliderItemList(updatedItems);
    };

    //Sync sliderItemList with attributes.sliderItems
    useEffect(() => {
        setAttributes({ sliderItems: sliderItemList });
    }, [sliderItemList, setAttributes]);

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

    const handleButtonClick = (event) => {
        event.preventDefault();
    };

    // Add this function inside the Edit component
    const updateItem = (index, field, value) => {
        const newItems = sliderItems.map((item, i) => {
            if (i === index) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setAttributes({ sliderItems: newItems });
    };

    return (
        <>
            <Inspector 
                attributes={attributes}
                setAttributes={setAttributes}
                clientId={clientId}
                handleAddItem={handleAddItem}
                handleChangeItem={handleChangeItem}
                handleDeleteItem={handleDeleteItem}
                handleDragEnd={handleDragEnd}
            />

            {renderSliderToolbarControls()}

            <div {...blockProps}>
                <div className="swiper" ref={(el) => { swiperRef.current = el; panelRef.current = el; }}>
                    <div className="swiper-wrapper guten-slider-wrapper">
                        {sliderItems.map((item, index) => (
                            <div key={item.id} className={`swiper-slide ${sliderType === 'slider' ? 'slide-mode' : ''}`}>
                                <div className={`${blockId} guten-slider-content-wrapper ${item.id}`}>
                                    <div className="guten-slider-content-inner-wrapper">
                                        <div className="guten-slider-list-item">
                                            <div className="guten-slider-list-content">
                                                <div className="guten-slider-subtitle-wrapper">
                                                    <RichText
                                                        tagName="span"
                                                        className="guten-slider-subtitle"
                                                        value={item.subTitle}
                                                        onChange={(value) => updateItem(index, 'subTitle', value)}
                                                        placeholder="Enter subtitle"
                                                    />
                                                </div>
                                                <div className="guten-slider-title-wrapper">
                                                    <RichText
                                                        tagName="h3"
                                                        className="guten-slider-title"
                                                        value={item.title}
                                                        onChange={(value) => updateItem(index, 'title', value)}
                                                        placeholder="Enter title"
                                                    />
                                                </div>
                                                <div className="guten-slider-description-wrapper">
                                                    <RichText
                                                        tagName="p"
                                                        className="guten-slider-description"
                                                        value={item.description}
                                                        onChange={(value) => updateItem(index, 'description', value)}
                                                        placeholder="Enter description"
                                                    />
                                                </div>
                                                <div className="guten-slider-button-container">
                                                    {item.buttonLink ? (
                                                        <a 
                                                            className="guten-slider-button"
                                                            href={item.buttonLink}
                                                            target={item.buttonTargetLink ? '_blank' : undefined}
                                                            rel={[
                                                                item.nofollow && 'nofollow',
                                                                item.sponsored && 'sponsored',
                                                                item.buttonTargetLink && 'noopener noreferrer'
                                                            ].filter(Boolean).join(' ')}
                                                            onClick={handleButtonClick}
                                                        >
                                                            <RichText
                                                                value={item.buttonText}
                                                                className="guten-slider-button-text"
                                                                onChange={(value) => updateItem(index, 'buttonText', value)}
                                                                placeholder={__('Enter button text...')}
                                                            />
                                                        </a>
                                                    ) : (
                                                        <RichText
                                                            value={item.buttonText}
                                                            className="guten-slider-button-text"
                                                            onChange={(value) => updateItem(index, 'buttonText', value)}
                                                            placeholder={__('Enter button text...')}
                                                        />
                                                    )}
                                                </div>
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