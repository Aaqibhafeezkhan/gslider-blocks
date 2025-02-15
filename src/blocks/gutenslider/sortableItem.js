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
    TextareaControl,

} from '@wordpress/components';
import BackgroundColorControl from '@Components/background-color-control';
import UrlControl from '@Components/url-control';

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
                    label={__("Slide Content", "gutenslider-blocks")}
                >
                    <Dropdown
                        className="global-setting-icon-dropdown"
                        contentClassName="global-setting-icon-dropdown-content"
                        popoverProps={{ placement: 'bottom-start' }}
                        renderToggle={({ isOpen, onToggle }) => (
                            <Button
                                variant="primary"
                                onClick={onToggle}
                                aria-expanded={isOpen}
                                className="global-setting-icon-btn"
                            >
                                <Dashicon icon="admin-generic" className="global-setting-panel-icon" />
                            </Button>
                        )}
                        renderContent={() => (
                            <div className="global-setting-contant-popup-wrapper">
                                <TextControl
                                    label={__("Sub Title", "gutenslider-blocks")}
                                    value={item.subTitle}
                                    onChange={(value) => handleChangeItem(item.id, "subTitle", value)}
                                    help= "Leave blank to hide subtitle"
                                />
                                <TextareaControl
                                    label={__("Title", "gutenslider-blocks")}
                                    value={item.title}
                                    onChange={(value) => handleChangeItem(item.id, "title", value)}
                                    help= "Leave blank to hide title"
                                />
                                <TextareaControl
                                    label={__("Description", "gutenslider-blocks")}
                                    value={item.description}
                                    onChange={(value) => handleChangeItem(item.id, "description", value)}
                                    help= "Leave blank to hide description"
                                />
                                <TextControl
                                    label={__("Button Text", "gutenslider-blocks")}
                                    value={item.buttonText}
                                    onChange={(value) => handleChangeItem(item.id, "buttonText", value)}
                                    help= "Leave blank to hide button text"
                                />
                                <UrlControl
                                    url={item.buttonLink}
                                    onChangeUrl={(value) => handleChangeItem(item.id, "buttonLink", value)}
                                    openInNewTab={item.buttonTargetLink}
                                    onChangeOpenInNewTab={(value) => handleChangeItem(item.id, "buttonTargetLink", value)}
                                    nofollow={item.nofollow}
                                    onChangeNofollow={(value) => handleChangeItem(item.id, "nofollow", value)}
                                    sponsored={item.sponsored}
                                    onChangeSponsored={(value) => handleChangeItem(item.id, "sponsored", value)}
                                />
                            </div>
                        )}
                    />
                </BaseControl>
                <BaseControl
                    className="global-setting-background-color-setting-wrapper"
                    label={__("Background", "gutenslider-blocks")}
                >
                    <Dropdown
                        className="global-setting-icon-dropdown"
                        contentClassName="global-setting-icon-dropdown-content"
                        popoverProps={{ placement: 'bottom-start' }}
                        renderToggle={({ isOpen, onToggle }) => (
                            <Button
                                variant="primary"
                                onClick={onToggle}
                                aria-expanded={isOpen}
                                className="global-setting-icon-btn"
                            >
                                <Dashicon icon="admin-generic" className="global-setting-panel-icon" />
                            </Button>
                        )}
                        renderContent={() => (
                            <div className="global-setting-background-color-popup-wrapper">
                                <BackgroundColorControl
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
                                    normalBackgroundImageUrl={item.normalBackgroundImageUrl}
                                    setNormalBackgroundImageUrl={(value) => handleChangeItem(item.id, 'normalBackgroundImageUrl', value)}
                                    normalBackgroundImageAlt={item.normalBackgroundImageAlt}
                                    setNormalBackgroundImageAlt={(value) => handleChangeItem(item.id, 'normalBackgroundImageAlt', value)}
                                    normalBackgroundImageID={item.normalBackgroundImageID}
                                    setNormalBackgroundImageID={(value) => handleChangeItem(item.id, 'normalBackgroundImageID', value)}
                                    normalBackgroundImagePosition={item.normalBackgroundImagePosition}
                                    setNormalBackgroundImagePosition={(value) => handleChangeItem(item.id, 'normalBackgroundImagePosition', value)}
                                    normalBackgroundImageAttachment={item.normalBackgroundImageAttachment}
                                    setNormalBackgroundImageAttachment={(value) => handleChangeItem(item.id, 'normalBackgroundImageAttachment', value)}
                                    normalBackgroundImageRepeat={item.normalBackgroundImageRepeat}
                                    setNormalBackgroundImageRepeat={(value) => handleChangeItem(item.id, 'normalBackgroundImageRepeat', value)}
                                    normalBackgroundImageSize={item.normalBackgroundImageSize}
                                    setNormalBackgroundImageSize={(value) => handleChangeItem(item.id, 'normalBackgroundImageSize', value)}
                                            
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
                                    hoverBackgroundImageUrl={item.hoverBackgroundImageUrl}
                                    setHoverBackgroundImageUrl={(value) => handleChangeItem(item.id, 'hoverBackgroundImageUrl', value)}
                                    hoverBackgroundImageAlt={item.hoverBackgroundImageAlt}
                                    setHoverBackgroundImageAlt={(value) => handleChangeItem(item.id, 'hoverBackgroundImageAlt', value)}
                                    hoverBackgroundImageID={item.hoverBackgroundImageID}
                                    setHoverBackgroundImageID={(value) => handleChangeItem(item.id, 'hoverBackgroundImageID', value)}
                                    hoverBackgroundImagePosition={item.hoverBackgroundImagePosition}
                                    setHoverBackgroundImagePosition={(value) => handleChangeItem(item.id, 'hoverBackgroundImagePosition', value)}
                                    hoverBackgroundImageAttachment={item.hoverBackgroundImageAttachment}
                                    setHoverBackgroundImageAttachment={(value) => handleChangeItem(item.id, 'hoverBackgroundImageAttachment', value)}
                                    hoverBackgroundImageRepeat={item.hoverBackgroundImageRepeat}
                                    setHoverBackgroundImageRepeat={(value) => handleChangeItem(item.id, 'hoverBackgroundImageRepeat', value)}
                                    hoverBackgroundImageSize={item.hoverBackgroundImageSize}
                                    setHoverBackgroundImageSize={(value) => handleChangeItem(item.id, 'hoverBackgroundImageSize', value)}
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
