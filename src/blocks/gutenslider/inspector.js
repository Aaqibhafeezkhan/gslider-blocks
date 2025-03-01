import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useState, useEffect, useMemo } from '@wordpress/element';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { PanelBody, TabPanel, ToggleControl, RangeControl, SelectControl, BaseControl, Button, ButtonGroup } from '@wordpress/components';
import SortableItem from './sortableItem';
import { BORDER_STYLES, SLIDER_EFFECT_OPTIONS, CAROUSEL_EFFECT_OPTIONS, SLIDER_TYPE, PAGINATION_TYPE } from "./constants/constants";
import './editor.scss';

import SwitcherControl from '@Components/switcher-control';
import ResponsiveSpacingControl from '@Components/responsive-spacing-control';
import ColorControl from '@Components/color-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import ResponsiveTypographyControl from '@Components/responsive-typography-control';
import BoxShadowSettingsControl from '@Components/box-shadow-control';
import BackgroundColorControl from '@Components/background-color-control';
import LoadGoogleFont from '@Utils/loadGoogleFont';

export default function Inspector({ attributes, setAttributes, clientId, onAddItem}) {
    const { 
        blockId,
        sliderItems,
        blockStyle,
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
        slideEffect,
        carouselEffect,
        mousewheelControl,
        showNavigation,
        showPagination,
        paginationType,
        dynamicBullets,
    } = attributes;

    useEffect(() => {
        if (clientId) {
            setAttributes({ blockId: `guten-slider-${clientId.slice(0, 8)}` });
        }
    }, [clientId]);

    const [sliderItemList, setSliderItemList] = useState(sliderItems);

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

    // const handleDeleteItem = (id) => {
    //     const updatedItems = sliderItems.filter(item => item.id !== id);
    //     setAttributes({ sliderItems: updatedItems });
    // };


    const handleDeleteItem = (id) => {
        const updatedItems = sliderItemList.filter(item => item.id !== id);
        setAttributes({ sliderItems: updatedItems });
        setSliderItemList(updatedItems);
    };

    //Sync sliderItemList with attributes.sliderItems
    useEffect(() => {
        setAttributes({ sliderItems: sliderItemList });
    }, [sliderItemList, setAttributes]);

    /** Start Slider Item Color Style */
    const sliderItemColorStyle = useMemo(() => {
        let style = '';
        sliderItems.forEach(item => {

            const normalItemBackgroundType = item.normalItemBackgroundType;
            const normalItemGradientColor = item.normalItemGradientColor || item.normalItemClassicColor; // Check if gradient is empty, fallback to classic color
            
            if (normalItemBackgroundType === 'gradient') {
                const gradientStyle = `.${blockId}.guten-slider-content-wrapper.${item.id}  {
                    background: ${item.normalItemCustomGradientSwitcher && item.normalItemCustomGradientInputValue ? item.normalItemCustomGradientInputValue : normalItemGradientColor};
                }`;
                style += gradientStyle;

            } else if (item.normalBackgroundImageUrl) {

                // Convert background position object to proper CSS format
                const backgroundPosition = item.normalBackgroundImagePosition
                ? `${item.normalBackgroundImagePosition.x * 100}% ${item.normalBackgroundImagePosition.y * 100}%`
                : "50% 50%"; // Default to 50% 50% if not provided

                const backgroundImageStyle = `.${blockId}.guten-slider-content-wrapper.${item.id} {
                    background-image: url(${item.normalBackgroundImageUrl});
                    background-position: ${backgroundPosition};
                    background-attachment: ${item.normalBackgroundImageAttachment};
                    background-repeat: ${item.normalBackgroundImageRepeat};
                    background-size: ${item.normalBackgroundImageSize};
                }`;
                style += backgroundImageStyle;
            } else {
                const classicStyle = `.${blockId}.guten-slider-content-wrapper.${item.id} {
                    background: ${item.normalItemClassicColor};
                }`;
                style += classicStyle;
            }

            const hoverItemBackgroundType = item.hoverItemBackgroundType;
            const hoverItemGradientColor = item.hoverItemGradientColor || item.hoverItemClassicColor; // Similar fallback for hover state
            
            if (hoverItemBackgroundType === 'gradient') {
                const hoverGradientStyle = `.${blockId}.guten-slider-content-wrapper.${item.id}:hover {
                    background: ${item.hoverItemCustomGradientSwitcher && item.hoverItemCustomGradientInputValue ? item.hoverItemCustomGradientInputValue : hoverItemGradientColor};
                }`;
                style += hoverGradientStyle;

            }else if (item.hoverBackgroundImageUrl) { 

                // Convert background position object to proper CSS format
                const backgroundPosition = item.hoverBackgroundImagePosition
                ? `${item.hoverBackgroundImagePosition.x * 100}% ${item.hoverBackgroundImagePosition.y * 100}%`
                : "50% 50%"; // Default to 50% 50% if not provided

                const backgroundImageStyle = `.${blockId}.guten-slider-content-wrapper.${item.id}:hover {
                    background-image: url(${item.hoverBackgroundImageUrl});
                    background-position: ${backgroundPosition};
                    background-attachment: ${item.hoverBackgroundImageAttachment};
                    background-repeat: ${item.hoverBackgroundImageRepeat};
                    background-size: ${item.hoverBackgroundImageSize};
                }`;
                style += backgroundImageStyle;
            } else {
                const hoverClassicStyle = `.${blockId}.guten-slider-content-wrapper.${item.id}:hover {
                    background: ${item.hoverItemClassicColor};
                }`;
                style += hoverClassicStyle;
            }

        });
        return style;
    }, [sliderItems, blockId]);


    useEffect(() => {
        setAttributes({blockStyle: `${sliderItemColorStyle}`.replace(/\s+/g, ' ').trim()});
    }, [sliderItemColorStyle]);

    const editorStyle = sliderItemColorStyle.replace(/\s+/g, ' ').trim();


    return (

        <>
            <style>
            	{editorStyle}
            </style>
            <InspectorControls>
                <div className="guten-slider-inspector-control">
                    <TabPanel
                        className="guten-slider-parent-tab-panel"
                        activeClass="active-tab"
                        tabs={[
                            { name: "general", title: __("General", "gutenslider-blocks"), className: "guten-slider-tab general" },
                            { name: "styles", title: __("Style", "gutenslider-blocks"), className: "guten-slider-tab styles" },
                            { name: "advanced", title: __("Advanced", "gutenslider-blocks"), className: "guten-slider-tab advanced" },
                        ]}
                    >
                        {(tab) => (
                            <div className={`guten-slider-tab-controls ${tab.name}`}>
                                {tab.name === "general" && (
                                    <>
                                        <PanelBody title={__("Slider Items", "gutenslider-blocks")} initialOpen>
                                            <div className="guten-slider-wrapper">
                                                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                                    <SortableContext items={sliderItems.map((item) => item.id)}>
                                                        <ul className="dnd-items-wrapper">
                                                            {sliderItems.map((item, index) => (
                                                                <SortableItem
                                                                    key={item.id}
                                                                    id={item.id}
                                                                    item={item}
                                                                    handleChangeItem={handleChangeItem}
                                                                    handleDeleteItem={handleDeleteItem}
                                                                    index={index}
                                                                />
                                                            ))}
                                                        </ul>
                                                    </SortableContext>
                                                </DndContext>
                                                <Button isPrimary onClick={onAddItem}>
                                                    {__("Add Slide", "gutenslider-blocks")}
                                                </Button>
                                            </div>
                                        </PanelBody>
                                        <PanelBody title={__("Slider Type", "gutenslider-blocks")} initialOpen={false}>
                                            <div className="global-setting-switcher-container">
                                                <BaseControl
                                                    label={__("Slider Type", "gutenslider-blocks")}
                                                    className="global-setting-switcher-panel-wrapper"
                                                >
                                                    <ButtonGroup className="global-setting-switcher-panel-btn">
                                                        {SLIDER_TYPE.map((item, key) => (
                                                            <Button
                                                                key={key}
                                                                onClick={() => setAttributes({ sliderType: item.value })}
                                                                className={`global-setting-switcher-panel-btn-switcher ${sliderType === item.value ? 'active' : ''}`}
                                                            >
                                                                {item.label}
                                                            </Button>
                                                        ))}
                                                    </ButtonGroup>
                                                </BaseControl>
                                            </div>
                                        </PanelBody>
                                        <PanelBody title={__("General Settings", "gutenslider-blocks")} initialOpen={false}>
                                            <ToggleControl
                                                label={ __( 'Infinite Loop', 'gutenslider-blocks' ) }
                                                checked={ infiniteLoop }
                                                onChange={(value) => setAttributes({ infiniteLoop: value })}
                                            />
                                            <ToggleControl
                                                label={ __( 'Touch Swipe Control', 'gutenslider-blocks' ) }
                                                checked={ allowTouchMove }
                                                onChange={(value) => setAttributes({ allowTouchMove: value })}
                                            />
                                            <ToggleControl
                                                label={__("Pause on Hover", "gutenslider-blocks")}
                                                checked={pauseOnHover}
                                                onChange={(value) => setAttributes({ pauseOnHover: value })}
                                            />
                                            <ToggleControl
                                                label={__("Stop Autoplay at Last Slide", "gutenslider-blocks")}
                                                checked={stopOnLastSlide}
                                                onChange={(value) => {
                                                    setAttributes({ stopOnLastSlide: value });
                                                    if (value) {
                                                        setAttributes({ infiniteLoop: false });
                                                        setAttributes({ autoplay: true });
                                                    }
                                                }}
                                            />
                                            <ToggleControl
                                                label={__("Reverse Autoplay Direction", "gutenslider-blocks")}
                                                checked={reverseDirection}
                                                onChange={(value) => {
                                                    setAttributes({ reverseDirection: value });
                                                    if (value) {
                                                        setAttributes({ autoplay: true });
                                                    }
                                                }}
                                            />
                                            <ToggleControl
                                                label={__("Mousewheel Navigation", "gutenslider-blocks")}
                                                checked={mousewheelControl}
                                                onChange={(value) => setAttributes({ mousewheelControl: value })}
                                            />
                                            <ToggleControl
                                                label={ __( "Show Navigation", "gutenslider-blocks" ) }
                                                checked={ showNavigation }
                                                onChange={(value) => setAttributes({ showNavigation: value })}
                                            />
                                            <ToggleControl
                                                label={ __( "Show Pagination", "gutenslider-blocks" ) }
                                                checked={ showPagination }
                                                onChange={(value) => setAttributes({ showPagination: value })}
                                            />
                                            <ToggleControl
                                                label={ __( 'Autoplay', 'gutenslider-blocks' ) }
                                                checked={ autoplay }
                                                onChange={(value) => setAttributes({ autoplay: value })}
                                            />
                                            { autoplay && (
                                            <RangeControl
                                                label={__('Autoplay Delay (ms)', 'gutenslider-blocks')}
                                                value={autoplayDelay}
                                                onChange={(value) => setAttributes({ autoplayDelay: value })}
                                                min={1000}
                                                max={10000}
                                            />
                                            )}
                                            <RangeControl
                                                label={__("Transition Speed (ms)", "gutenslider-blocks")}
                                                value={speed}
                                                onChange={(value) => setAttributes({ speed: value })}
                                                min={100}
                                                max={5000}
                                            />
                                        </PanelBody>
                                        {sliderType === 'carousel' && (
                                            <PanelBody title={__("Carousel Settings", "gutenslider-blocks")} initialOpen={false}>
                                                <RangeControl
                                                    label={__('Number of Columns', 'gutenslider-blocks')}
                                                    value={carouselPerColumn}
                                                    onChange={(value) => setAttributes({ carouselPerColumn: value })}
                                                    min={1}
                                                    max={10}
                                                    step={1}
                                                    initialPosition={1}
                                                />
                                                <RangeControl
                                                    label={__('Column Gap (px)', 'gutenslider-blocks')}
                                                    value={carouselPerColumnGap}
                                                    onChange={(value) => setAttributes({ carouselPerColumnGap: value })}
                                                    min={0}
                                                    max={200}
                                                    step={1}
                                                    initialPosition={1}
                                                />
                                            </PanelBody>
                                        )}
                                        {sliderType === 'carousel' && (
                                            <PanelBody title={__("Carousel Effect", "gutenslider-blocks")} initialOpen={false}>
                                                <SelectControl
                                                    label={__('Select Carousel Effect', 'gutenslider-blocks')}
                                                    value={carouselEffect}
                                                    options={CAROUSEL_EFFECT_OPTIONS}
                                                    onChange={(value) => setAttributes({ carouselEffect: value })}
                                                />
                                            </PanelBody>
                                        )}
                                        {sliderType === 'slider' && (
                                            <PanelBody title={__("Slider Effect", "gutenslider-blocks")} initialOpen={false}>
                                                <SelectControl
                                                    label={__('Select Slider Effect', 'gutenslider-blocks')}
                                                    value={slideEffect}
                                                    options={SLIDER_EFFECT_OPTIONS}
                                                    onChange={(value) => setAttributes({ slideEffect: value })}
                                                />
                                            </PanelBody>
                                        )}

                                        {showPagination && (
                                            <PanelBody title={__("Pagination", "gutenslider-blocks")} initialOpen={false}>
                                                <SelectControl
                                                    label={__('Pagination Type', 'gutenslider-blocks')}
                                                    value={paginationType}
                                                    options={PAGINATION_TYPE}
                                                    onChange={(value) => setAttributes({ paginationType: value })}
                                                />
                                                {paginationType === 'bullets' && (
                                                    <ToggleControl
                                                        label={__("Dynamic Bullets", "slider-blocks")}
                                                        checked={dynamicBullets}
                                                        onChange={(value) => setAttributes({ dynamicBullets: value })}
                                                    />
                                                )}
                                            </PanelBody>
                                        )}
                                        
                                    </>
                                )}

                                {tab.name === "styles" && (
                                    <PanelBody title={__("Slider", "gutenslider-blocks")} initialOpen>
                                        {/* Add style settings here */}
                                    </PanelBody>
                                )}

                                {tab.name === "advanced" && (
                                    <PanelBody title={__("Advanced", "gutenslider-blocks")} initialOpen>
                                        {/* Add advanced settings here */}
                                    </PanelBody>
                                )}
                            </div>
                        )}
                    </TabPanel>
                </div>
            </InspectorControls>
        </>
    );
}
