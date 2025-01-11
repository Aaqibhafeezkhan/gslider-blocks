import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
    Button, 
    ButtonGroup, 
    BaseControl, 
    Dropdown,
    Dashicon, 
    ColorPicker,
    ColorPalette,
    TextControl,

} from '@wordpress/components';
import FB_BackgroundColorControl from '@Components/background-color-control';

export default function SortableItem({ id, item, handleChangeItem, handleDeleteItem, index }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const [isOpen, setIsOpen] = useState(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <li className="sortable-item" ref={setNodeRef} {...attributes} style={style}>
            <div className="sortable-header">
                <span className="sortable-title" onClick={toggleOpen}>
                    {item.title || __( `Social Item ${index + 1}`, "gutenslider-blocks" )}
                </span>
                <span className="sortable-sort" {...listeners} style={{ cursor: 'grab' }}>
                    <Button icon="move" label={__("Sort", "gutenslider-blocks")} aria-label={__("Move item", "gutenslider-blocks")} />
                </span>
                <span className="sortable-delete">
                    <Button 
                        icon="trash" 
                        label={__("Delete", "gutenslider-blocks")} 
                        aria-label={__("Delete item", "gutenslider-blocks")}
                        onClick={() => handleDeleteItem(item.id)} 
                    />
                </span>
            </div>

            {isOpen && (
                <div className="sortable-item-content">

                <BaseControl
                    className="global-setting-background-color-setting-wrapper"
                    label={__("Slide Content", "button-blocks")}
                >
                    <Dropdown
                        className="global-setting-background-color-setting-icon-dropdown"
                        contentClassName="global-setting-background-color-setting-icon-dropdown-content"
                        popoverProps={{ placement: 'bottom-start' }}
                        renderToggle={({ isOpen, onToggle }) => (
                            <Button
                                variant="primary"
                                onClick={onToggle}
                                aria-expanded={isOpen}
                                className="global-setting-background-color-setting-icon-btn"
                            >
                                <Dashicon icon="color-picker" className="global-setting-background-color-panel-icon" />
                            </Button>
                        )}
                        renderContent={() => (
                            <div className="global-setting-background-color-popup-wrapper">
                                <TextControl
                                    label={__("Title", "gutenslider-blocks")}
                                    value={item.title}
                                    onChange={(value) => handleChangeItem(item.id, "title", value)}
                                />
                            </div>
                        )}
                    />
                </BaseControl>
                <BaseControl
                    className="global-setting-background-color-setting-wrapper"
                    label={__("Background", "button-blocks")}
                >
                    <Dropdown
                        className="global-setting-background-color-setting-icon-dropdown"
                        contentClassName="global-setting-background-color-setting-icon-dropdown-content"
                        popoverProps={{ placement: 'bottom-start' }}
                        renderToggle={({ isOpen, onToggle }) => (
                            <Button
                                variant="primary"
                                onClick={onToggle}
                                aria-expanded={isOpen}
                                className="global-setting-background-color-setting-icon-btn"
                            >
                                <Dashicon icon="color-picker" className="global-setting-background-color-panel-icon" />
                            </Button>
                        )}
                        renderContent={() => (
                            <div className="global-setting-background-color-popup-wrapper">
                                <FB_BackgroundColorControl
                                    label={__("Background", "gutenslider-blocks")}
                                    bgColorSwitcher={item.sliderItemBgColorSwitcher}
                                    setBgColorSwitcher={(value) => handleChangeItem(item.id, 'sliderItemBgColorSwitcher', value)}
                                            
                                    normalBackgroundType={item.normalItemBackgroundType}
                                    setNormalBackgroundType={(value) => handleChangeItem(item.id, 'normalItemBackgroundType', value)}
                                    normalClassicColor={item.normalItemClassicColor}
                                    setNormalClassicColor={(value) => handleChangeItem(item.id, 'normalItemClassicColor', value)}
                                    normalGradientColor={item.normalItemGradientColor}
                                    setNormalGradientColor={(value) => handleChangeItem(item.id, 'normalItemGradientColor', value)}
                                    normalCustomGradientSwitcher={item.normalItemCustomGradientSwitcher}
                                    setNormalCustomGradientSwitcher={(value) => handleChangeItem(item.id, 'normalItemCustomGradientSwitcher', value)}
                                    normalCustomGradientInputValue={item.normalItemCustomGradientInputValue}
                                    setNormalCustomGradientInputValue={(value) => handleChangeItem(item.id, 'normalItemCustomGradientInputValue', value)}
                                            
                                    hoverBackgroundType={item.hoverItemBackgroundType}
                                    setHoverBackgroundType={(value) => handleChangeItem(item.id, 'hoverItemBackgroundType', value)}
                                    hoverClassicColor={item.hoverItemClassicColor}
                                    setHoverClassicColor={(value) => handleChangeItem(item.id, 'hoverItemClassicColor', value)}
                                    hoverGradientColor={item.hoverItemGradientColor} 
                                    setHoverGradientColor={(value) => handleChangeItem(item.id, 'hoverItemGradientColor', value)}
                                    hoverCustomGradientSwitcher={item.hoverItemCustomGradientSwitcher}
                                    setHoverCustomGradientSwitcher={(value) => handleChangeItem(item.id, 'hoverItemCustomGradientSwitcher', value)}
                                    hoverCustomGradientInputValue={item.hoverItemCustomGradientInputValue}
                                    setHoverCustomGradientInputValue={(value) => handleChangeItem(item.id, 'hoverItemCustomGradientInputValue', value)}

                                    isBackgroundImage={false}
                                />
                            </div>
                        )}
                    />
                </BaseControl>
                </div>
            )}
        </li>
    );
}
