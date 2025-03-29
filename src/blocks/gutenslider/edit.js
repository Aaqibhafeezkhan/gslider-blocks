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

    /**
     * Manages block props with appropriate class names for the slider container
     */
    const blockProps = useBlockProps({
        className: `guten-slider-container ${blockId}`,
    });

    /**
     * Manages the state of slider items for rendering and manipulation
     */
    const [sliderItemList, setSliderItemList] = useState(sliderItems);
    
    /**
     * Tracks the currently selected/active slide index for editor interactions
     */
    const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);

    /**
     * Reference to the panel element for block settings navigation
     * Used by SwitchToBlockSettings utility to focus settings panel
     */
    const panelRef = useRef(null);
    SwitchToBlockSettings(panelRef);
    
    /**
     * Reference to the Swiper instance for direct manipulation
     */
    const swiperRef = useRef();

    /**
     * Caches previous Swiper options to prevent unnecessary re-initialization
     */
    const prevSwiperOptions = useRef(null);

    /**
     * Initializes and updates Swiper instance when slider configuration changes
     * Handles different slider types, effects, and interactive options
     */
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
            
            // Track active slide
            on: {
                slideChange: function() {
                    setSelectedSlideIndex(this.activeIndex);
                }
            }
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

    /**
     * Handles slide reordering via drag and drop functionality
     * Updates slide order in both state and attributes
     */
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            const oldIndex = sliderItems.findIndex(item => item.id === active.id);
            const newIndex = sliderItems.findIndex(item => item.id === over.id);
            const updatedItems = arrayMove(sliderItems, oldIndex, newIndex);
            setAttributes({ sliderItems: updatedItems });
            setSliderItemList(updatedItems);
        }

        // Ensure Swiper updates with new slides
        setTimeout(() => {
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.update(); 
                swiperRef.current.swiper.pagination.update();
                swiperRef.current.swiper.navigation.update();
            }
        }, 100);
    };

    /**
     * Creates a duplicate of an existing slide with a new unique ID
     * Adds the duplicate to the slider items collection
     */
    const handleDuplicateItem = (id) => {
        const itemToDuplicate = sliderItems.find(item => item.id === id);
        if (itemToDuplicate) {
            const newItem = { ...itemToDuplicate, id: `item-${sliderItems.length + 1}` };
            setAttributes({ sliderItems: [...sliderItems, newItem] });
            setSliderItemList([...sliderItemList, newItem]);
        }
        // Ensure Swiper updates with new slides
        setTimeout(() => {
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.update(); 
                swiperRef.current.swiper.pagination.update();
                swiperRef.current.swiper.navigation.update();
            }
        }, 100);
    };

    /**
     * Creates and adds a new slide with default content and settings
     * Generates a unique ID for the new slide
     */
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

    /**
     * Updates a specific property of a slide item
     * Handles special cases for background images with WordPress media integration
     */
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

    /**
     * Removes a slide from the slider by its ID
     * Updates both state and block attributes
     */
    const handleDeleteItem = (id) => {
        const updatedItems = sliderItemList.filter(item => item.id !== id);
        setAttributes({ sliderItems: updatedItems });
        setSliderItemList(updatedItems);
    };

    /**
     * Ensures sliderItems attribute stays in sync with local state
     * Prevents state/props mismatch issues
     */
    useEffect(() => {
        setAttributes({ sliderItems: sliderItemList });
    }, [sliderItemList, setAttributes]);

    /**
     * Renders toolbar controls for slide management
     * Provides buttons for adding and duplicating slides
     */
    const renderSliderToolbarControls = () => {
        return (
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon="plus"
                        label={ __( 'Add New Slide', 'gutenslider-blocks' ) }
                        onClick={handleAddItem}
                    />
                    <ToolbarButton
                        icon="admin-page"
                        label={ __( 'Duplicate Current Slide', 'gutenslider-blocks' ) } 
                        onClick={() => {
                            // Get the currently visible slide's ID
                            const currentSlideId = sliderItems[selectedSlideIndex]?.id;
                            if (currentSlideId) {
                                handleDuplicateItem(currentSlideId);
                            }
                        }}
                    />
                </ToolbarGroup>
            </BlockControls>
        );
    };

    /**
     * Prevents default behavior for button clicks in the editor
     * Stops navigation when editing button content
     */
    const handleButtonClick = (event) => {
        event.preventDefault();
    };

    /**
     * Updates a specific field of a slide at the given index
     * Used for RichText component changes
     */
    const updateItem = (index, field, value) => {
        const newItems = sliderItems.map((item, i) => {
            if (i === index) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setAttributes({ sliderItems: newItems });
    };

    /**
     * Renders the complete slider interface with all slides and controls
     * Includes Inspector panel, toolbar controls, and Swiper implementation
     */
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
                handleDuplicateItem ={handleDuplicateItem}
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