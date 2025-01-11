import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { PanelBody, TabPanel, Button } from '@wordpress/components';
import SortableItem from './sortableItem';
import './editor.scss';

export default function Inspector({ attributes, setAttributes, clientId }) {
    const { 
        blockId,
        sliderItems,
        blockStyle,
    } = attributes;

    useEffect(() => {
        if (clientId) {
            setAttributes({ blockId: `guten-slider-${clientId.slice(0, 8)}` });
        }
    }, [clientId]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            const oldIndex = sliderItems.findIndex(item => item.id === active.id);
            const newIndex = sliderItems.findIndex(item => item.id === over.id);
            const updatedItems = arrayMove(sliderItems, oldIndex, newIndex);
            setAttributes({ sliderItems: updatedItems });
        }
    };

    const handleAddItem = () => {
        const newItem = {
            id: `item-${sliderItems.length + 1}`,
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

    const handleChangeItem = (id, key, value) => {
        const updatedItems = sliderItems.map(item => 
            item.id === id ? { ...item, [key]: value } : item
        );
        setAttributes({ sliderItems: updatedItems });
    };

    const handleDeleteItem = (id) => {
        const updatedItems = sliderItems.filter(item => item.id !== id);
        setAttributes({ sliderItems: updatedItems });
    };

    /** Start Slider Item Color Style */
    const sliderItemColorStyle = useMemo(() => {
        let style = '';
        sliderItems.forEach(item => {

            const normalItemBackgroundType = item.normalItemBackgroundType;
            const normalItemGradientColor = item.normalItemGradientColor || item.normalItemClassicColor; // Check if gradient is empty, fallback to classic color
            
            if (normalItemBackgroundType === 'gradient') {
                const gradientStyle = `.${blockId} .guten-slider-content-wrapper.item-${item.id}  {
                    background: ${item.normalItemCustomGradientSwitcher && item.normalItemCustomGradientInputValue ? item.normalItemCustomGradientInputValue : normalItemGradientColor};
                }`;
                style += gradientStyle;

            } else {
                const classicStyle = `.${blockId} .guten-slider-content-wrapper.item-${item.id} {
                    background: ${item.normalItemClassicColor};
                }`;
                style += classicStyle;
            }

            const hoverItemBackgroundType = item.hoverItemBackgroundType;
            const hoverItemGradientColor = item.hoverItemGradientColor || item.hoverItemClassicColor; // Similar fallback for hover state
            
            if (hoverItemBackgroundType === 'gradient') {
                const hoverGradientStyle = `.${blockId} .guten-slider-content-wrapper.item-${item.id}:hover {
                    background: ${item.hoverItemCustomGradientSwitcher && item.hoverItemCustomGradientInputValue ? item.hoverItemCustomGradientInputValue : hoverItemGradientColor};
                }`;
                style += hoverGradientStyle;

            } else {
                const hoverClassicStyle = `.${blockId} .guten-slider-content-wrapper.item-${item.id}:hover {
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
                                    <PanelBody title={__("Slider", "gutenslider-blocks")} initialOpen>
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
                                            <Button isPrimary onClick={handleAddItem}>
                                                {__("Add Slider", "gutenslider-blocks")}
                                            </Button>
                                        </div>
                                    </PanelBody>
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
