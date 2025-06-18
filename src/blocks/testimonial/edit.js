import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	BlockControls,
} from '@wordpress/block-editor';
import {
	Toolbar,
	ToolbarGroup,
	ToolbarButton
} from '@wordpress/components';
import { useState, useEffect, useRef } from "@wordpress/element";
import SwitchToBlockSettings from '@Utils/switchToBlockSettings';
import { arrayMove } from '@dnd-kit/sortable';
import Inspector from './inspector';
import {useDeviceType} from "@Utils/displayType"; 

// Import Swiper React components and required modules
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

// Import Swiper styles for all functionalities
// import 'swiper/css';
import 'swiper/css/bundle';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/mousewheel';
// import 'swiper/css/effect-fade';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/effect-flip';
// import 'swiper/css/effect-creative';
// import 'swiper/css/autoplay';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		blockId,
        deviceType,
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
        generateBackgroundStyle,
	} = attributes;

	// Block props for container
	const blockProps = useBlockProps({
		className: `gslider-testimonial-wrapper ${blockId}`,
	});

	// const deviceType = useDeviceType();

	// Local state management for slider items and active slide index
	const [sliderItemList, setSliderItemList] = useState(sliderItems);
	const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);

	// A key to force re-mounting of <Swiper> when critical settings change
	const [swiperKey, setSwiperKey] = useState(0);

	// Ref for panel settings focus management
	const panelRef = useRef(null);
	SwitchToBlockSettings(panelRef);

    /**
     * Initializes and updates Swiper instance when slider configuration changes
     * Handles different slider types, effects, and interactive options
     */
	const swiperSettings = {

        // Set effect based on sliderType
		effect: sliderType === 'carousel' ? carouselEffect : slideEffect,

        // Carousel-specific settings with default values
		slidesPerView: sliderType === 'carousel' ? (carouselPerColumn || 2) : 1,
		spaceBetween: sliderType === 'carousel' ? (carouselPerColumnGap || 20) : 0,

        // Common settings
        loop: infiniteLoop,
        autoplay: autoplay
        ? {
                delay: autoplayDelay,
                pauseOnMouseEnter: pauseOnHover,
                disableOnInteraction: false,
                stopOnLastSlide: stopOnLastSlide,
                reverseDirection: reverseDirection,
          }
        : false,

        speed: speed,
        allowTouchMove: allowTouchMove,
        mousewheel: mousewheelControl,

        // Navigation and pagination settings
		navigation: showNavigation,
		pagination: showPagination ? {
			clickable: true,
			type: paginationType,
			dynamicBullets: paginationType === 'bullets' ? dynamicBullets : false,
		} : false,

        // Creative effect settings if needed
        ...(slideEffect === 'creative' && {
            creativeEffect: {
                prev: { shadow: true, translate: [0, 0, -400] },
                next: { translate: ['100%', 0, 0] },
            },
        }),

        // Event handler for slide changes
		onSlideChange: (swiper) => setSelectedSlideIndex(swiper.activeIndex),
	};

    /**
     * When any of these settings change, update the key to reinitialize Swiper
     */
	useEffect(() => {
		setSwiperKey(prevKey => prevKey + 1);
	}, [
		sliderType,
		infiniteLoop,
		allowTouchMove,
		pauseOnHover,
		stopOnLastSlide,
		reverseDirection,
		mousewheelControl,
		showNavigation,
		showPagination,
		autoplay,
		autoplayDelay,
		speed,
		slideEffect,
		carouselEffect,
		carouselPerColumn,
		carouselPerColumnGap,
		paginationType,
		dynamicBullets
	]);


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
            buttonText: 'Get Started',
            buttonLink: '#',
            buttonTargetLink: false,

            normalItemBackgroundType: 'classic',
            normalItemClassicColor: '#EDEDED',
            normalItemGradientColor: null,
            normalItemCustomGradientSwitcher: false,
            normalItemCustomGradientInputValue: '',

            normalBackgroundImageUrl: {
                Desktop: '',
                Tablet: '',
                Mobile: '',
            },
            normalBackgroundImageAlt: {
                Desktop: '',
                Tablet: '',
                Mobile: '',
            },
            normalBackgroundImageID: {
                Desktop: '',
                Tablet: '',
                Mobile: '',
            },
            normalBackgroundImagePosition: {
                Desktop: { x: 0.5, y: 0.5 },
                Tablet: { x: 0.5, y: 0.5 },
                Mobile: { x: 0.5, y: 0.5 },
            },
            normalBackgroundImageAttachment: {
                Desktop: 'scroll',
                Tablet: 'scroll',
                Mobile: 'scroll',
            },
            normalBackgroundImageRepeat: {
                Desktop: 'no-repeat',
                Tablet: 'no-repeat',
                Mobile: 'no-repeat',
            },
            normalBackgroundImageSize: {
                Desktop: 'cover',
                Tablet: 'cover',
                Mobile: 'cover',
            },

            itemBackgroundOverlaySwitcher: false,
            itemBackgroundOverlayType: 'classic',
            itemBackgroundOverlayClassicColor: '#000',
            itemBackgroundOverlayGradientColor: null,
            itemBackgroundOverlayCustomGradientSwitcher: false,
            itemBackgroundOverlayCustomGradientInputValue: '',
            itemBackgroundOverlayOpacity: 0.5,
            
        };
        setAttributes({ sliderItems: [...sliderItems, newItem] });
        setSliderItemList([...sliderItemList, newItem]);
    };


    /**
     * Updates a specific property of a slide item
     * Handles special cases for background images with WordPress media integration
     */
    const handleChangeItem = (id, key, value) => {
        // Get current device type ("Desktop", "Tablet", or "Mobile")
        const currentDevice = deviceType; 

        const updatedItems = sliderItemList.map(item => {
            if (item.id === id) {
                // Handle normal background image updates for the current device only
                if (key === 'normalBackgroundImageID') {
                    // Get the full image data from WordPress media library
                    const image = wp.media.attachment(value).toJSON();
                    return {
                        ...item,
                        normalBackgroundImageID: {
                            ...item.normalBackgroundImageID,
                            [currentDevice]: value,
                        },
                        normalBackgroundImageUrl: {
                            ...item.normalBackgroundImageUrl,
                            [currentDevice]: image.url,
                        },
                        normalBackgroundImageAlt: {
                            ...item.normalBackgroundImageAlt,
                            [currentDevice]: image.alt || '',
                        },
                    };
                }

                // Handle hover background image updates for the current device only
                if (key === 'hoverBackgroundImageID') {
                    const image = wp.media.attachment(value).toJSON();
                    return {
                        ...item,
                        hoverBackgroundImageID: {
                            ...item.hoverBackgroundImageID,
                            [currentDevice]: value,
                        },
                        hoverBackgroundImageUrl: {
                            ...item.hoverBackgroundImageUrl,
                            [currentDevice]: image.url,
                        },
                        hoverBackgroundImageAlt: {
                            ...item.hoverBackgroundImageAlt,
                            [currentDevice]: image.alt || '',
                        },
                    };
                }

                // For other properties, update as before
                return { ...item, [key]: value };
            }
            return item;
        });

        setSliderItemList(updatedItems);
        setAttributes({ sliderItems: updatedItems });
    };


    /**
     * Handles duplicate slide functionality
     */
    const handleDuplicateItem = (id) => {
        const itemToDuplicate = sliderItems.find(item => item.id === id);
        if (itemToDuplicate) {
            const newItem = { ...itemToDuplicate, id: `item-${sliderItems.length + 1}` };
            setAttributes({ sliderItems: [...sliderItems, newItem] });
            setSliderItemList([...sliderItemList, newItem]);
        }
    };

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
     * Keep sliderItems attribute in sync with local state
     */
	useEffect(() => {
		setAttributes({ sliderItems: sliderItemList });
	}, [sliderItemList, setAttributes]);

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
     * Renders toolbar controls for slide management
     * Provides buttons for adding and duplicating slides
     */
    const renderSliderToolbarControls = () => {
        return (
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon="plus"
                        label={ __( 'Add New Slide', 'gslider-blocks' ) }
                        onClick={handleAddItem}
                    />
                    <ToolbarButton
                        icon="admin-page"
                        label={ __( 'Duplicate Current Slide', 'gslider-blocks' ) } 
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
     * Prevent default behavior for link clicks in the editor
     */
	const handleButtonClick = (event) => {
		event.preventDefault();
	};

	return (
		<>
			<Inspector 
				attributes={attributes}
				setAttributes={setAttributes}
				clientId={clientId}
				handleAddItem={handleAddItem}
                handleChangeItem={handleChangeItem}
                handleDuplicateItem={handleDuplicateItem}
				handleDragEnd={handleDragEnd}
                handleDeleteItem={handleDeleteItem}
			/>
			{renderSliderToolbarControls()}
			<div {...blockProps}>
				<Swiper
					key={swiperKey}
					{...swiperSettings}
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
					{sliderItemList.map((item, index) => (
						<SwiperSlide key={item.id}>
							<div className={`gslider-content-wrapper ${item.id}`} ref={panelRef}>
								<div className="gslider-content-inner-wrapper">
									<div className="gslider-list-item">
										<div className="gslider-list-content">
											<div className="gslider-subtitle-wrapper">
												<RichText
													tagName="span"
													className="gslider-subtitle"
													value={item.subTitle}
													onChange={(value) => updateItem(index, 'subTitle', value)}
													placeholder="Enter subtitle"
												/>
											</div>
											<div className="gslider-title-wrapper">
												<RichText
													tagName="h3"
													className="gslider-title"
													value={item.title}
													onChange={(value) => updateItem(index, 'title', value)}
													placeholder="Enter title"
												/>
											</div>
											<div className="gslider-description-wrapper">
												<RichText
													tagName="p"
													className="gslider-description"
													value={item.description}
													onChange={(value) => updateItem(index, 'description', value)}
													placeholder="Enter description"
												/>
											</div>
											<div className="gslider-button-container">
												{item.buttonLink ? (
													<a
														className="gslider-button"
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
															className="gslider-button-text"
															onChange={(value) => updateItem(index, 'buttonText', value)}
															placeholder={__('Enter button text...', 'gslider-blocks')}
														/>
													</a>
												) : (
													<RichText
														value={item.buttonText}
														className="gslider-button-text"
														onChange={(value) => updateItem(index, 'buttonText', value)}
														placeholder={__('Enter button text...', 'gslider-blocks')}
													/>
												)}
											</div>
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
