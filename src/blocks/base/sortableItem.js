/* eslint-disable import/no-unresolved */
import { __, sprintf } from '@wordpress/i18n';
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
	Button,
	BaseControl,
	Dropdown,
	Dashicon,
	TextControl,
	TextareaControl,
	ToggleControl,
	RangeControl,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import BackgroundControl from '@Components/background-control';
import UrlControl from '@Components/url-control';

export default function SortableItem( {
	id,
	item,
	handleChangeItem,
	handleDeleteItem,
	handleDuplicateItem,
	index,
	deviceType,
	setAttributes,
} ) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable( { id } );
	const [ isOpen, setIsOpen ] = useState( false );

	const style = {
		transform: CSS.Transform.toString( transform ),
		transition,
	};

	const toggleOpen = () => setIsOpen( ! isOpen );

	return (
		<li
			className="sortable-item"
			ref={ setNodeRef }
			{ ...attributes }
			style={ style }
		>
			<div className="sortable-header">
				<span
					className="sortable-title"
					role="button"
					tabIndex={ 0 }
					onClick={ toggleOpen }
					onKeyDown={ ( event ) => {
						if ( event.key === 'Enter' || event.key === ' ' ) {
							event.preventDefault();
							toggleOpen();
						}
					} }
				>
					{ item.title ||
						/* translators: %d: slider item number */ sprintf(
							__( 'Slider Item %d', 'gslider-blocks' ),
							index + 1
						) }
				</span>
				<span
					className="sortable-sort"
					{ ...listeners }
					style={ { cursor: 'grab' } }
				>
					<Button
						icon="move"
						label={ __( 'Sort', 'gslider-blocks' ) }
						aria-label={ __( 'Move item', 'gslider-blocks' ) }
					/>
				</span>
				<span className="sortable-duplicate">
					<Button
						icon="admin-page"
						label={ __( 'Duplicate', 'gslider-blocks' ) }
						aria-label={ __( 'Duplicate item', 'gslider-blocks' ) }
						onClick={ () => handleDuplicateItem( item.id ) }
					/>
				</span>
				<span className="sortable-delete">
					<Button
						icon="trash"
						label={ __( 'Delete', 'gslider-blocks' ) }
						aria-label={ __( 'Delete item', 'gslider-blocks' ) }
						onClick={ () => handleDeleteItem( item.id ) }
					/>
				</span>
			</div>

			{ isOpen && (
				<div className="sortable-item-content">
					<BaseControl
						id={ `base-slide-content-${ item.id }` }
						className="gslider-setting-background-color-setting-wrapper"
						label={ __( 'Slide Content', 'gslider-blocks' ) }
					>
						<Dropdown
							className="gslider-setting-icon-dropdown"
							contentClassName="gslider-setting-icon-dropdown-content sortable-item-content-dropdown"
							popoverProps={ { placement: 'bottom-start' } }
							renderToggle={ ( {
								isOpen: dropdownIsOpen,
								onToggle,
							} ) => (
								<Button
									variant="primary"
									onClick={ onToggle }
									aria-expanded={ dropdownIsOpen }
									className="gslider-setting-icon-btn"
								>
									<Dashicon
										icon="edit"
										className="gslider-setting-panel-icon"
									/>
								</Button>
							) }
							renderContent={ () => (
								<div className="gslider-setting-contant-popup-wrapper">
									<TextControl
										label={ __(
											'Sub Title',
											'gslider-blocks'
										) }
										value={ item.subTitle }
										onChange={ ( value ) =>
											handleChangeItem(
												item.id,
												'subTitle',
												value
											)
										}
										help="Leave blank to hide subtitle"
									/>
									<TextareaControl
										label={ __(
											'Title',
											'gslider-blocks'
										) }
										value={ item.title }
										onChange={ ( value ) =>
											handleChangeItem(
												item.id,
												'title',
												value
											)
										}
										help="Leave blank to hide title"
									/>
									<TextareaControl
										label={ __(
											'Description',
											'gslider-blocks'
										) }
										value={ item.description }
										onChange={ ( value ) =>
											handleChangeItem(
												item.id,
												'description',
												value
											)
										}
										help="Leave blank to hide description"
									/>
									<TextControl
										label={ __(
											'Primary Button',
											'gslider-blocks'
										) }
										value={ item.primaryButtonText }
										onChange={ ( value ) =>
											handleChangeItem(
												item.id,
												'primaryButtonText',
												value
											)
										}
										help="Leave blank to hide button text"
									/>
									<UrlControl
										url={ item.primaryButtonLink }
										onChangeUrl={ ( value ) =>
											handleChangeItem(
												item.id,
												'primaryButtonLink',
												value
											)
										}
										openInNewTab={
											item.primaryButtonTargetLink
										}
										onChangeOpenInNewTab={ ( value ) =>
											handleChangeItem(
												item.id,
												'primaryButtonTargetLink',
												value
											)
										}
										nofollow={ item.primaryButtonNofollow }
										onChangeNofollow={ ( value ) =>
											handleChangeItem(
												item.id,
												'primaryButtonNofollow',
												value
											)
										}
										sponsored={
											item.primaryButtonSponsored
										}
										onChangeSponsored={ ( value ) =>
											handleChangeItem(
												item.id,
												'primaryButtonSponsored',
												value
											)
										}
									/>
									<ToggleControl
										label={ __(
											'Enable Secondary Button',
											'gslider-blocks'
										) }
										checked={ item.secondaryButtonSwitcher }
										onChange={ ( value ) =>
											handleChangeItem(
												item.id,
												'secondaryButtonSwitcher',
												value
											)
										}
									/>
									{ item.secondaryButtonSwitcher && (
										<>
											<TextControl
												label={ __(
													'Button Text',
													'gslider-blocks'
												) }
												value={
													item.secondaryButtonText
												}
												onChange={ ( value ) =>
													handleChangeItem(
														item.id,
														'secondaryButtonText',
														value
													)
												}
												help="Leave blank to hide button text"
											/>
											<UrlControl
												url={ item.secondaryButtonLink }
												onChangeUrl={ ( value ) =>
													handleChangeItem(
														item.id,
														'secondaryButtonLink',
														value
													)
												}
												openInNewTab={
													item.secondaryButtonTargetLink
												}
												onChangeOpenInNewTab={ (
													value
												) =>
													handleChangeItem(
														item.id,
														'secondaryButtonTargetLink',
														value
													)
												}
												nofollow={
													item.secondaryButtonNofollow
												}
												onChangeNofollow={ ( value ) =>
													handleChangeItem(
														item.id,
														'secondaryButtonNofollow',
														value
													)
												}
												sponsored={
													item.secondaryButtonSponsored
												}
												onChangeSponsored={ ( value ) =>
													handleChangeItem(
														item.id,
														'secondaryButtonSponsored',
														value
													)
												}
											/>
										</>
									) }
								</div>
							) }
						/>
					</BaseControl>
					<BaseControl
						id={ `base-background-${ item.id }` }
						className="gslider-setting-background-color-setting-wrapper"
						label={ __( 'Background', 'gslider-blocks' ) }
					>
						<Dropdown
							className="gslider-setting-icon-dropdown"
							contentClassName="gslider-setting-icon-dropdown-content sortable-item-content-dropdown"
							popoverProps={ { placement: 'bottom-start' } }
							renderToggle={ ( {
								isOpen: dropdownIsOpen,
								onToggle,
							} ) => (
								<Button
									onClick={ onToggle }
									aria-expanded={ dropdownIsOpen }
									className="gslider-setting-icon-btn"
								>
									<Dashicon
										icon="edit"
										className="gslider-setting-panel-icon"
									/>
								</Button>
							) }
							renderContent={ () => (
								<div className="gslider-setting-background-color-popup-wrapper">
									<BackgroundControl
										deviceType={ deviceType }
										normalBackgroundType={
											item.normalItemBackgroundType
										}
										setNormalBackgroundType={ ( value ) =>
											handleChangeItem(
												item.id,
												'normalItemBackgroundType',
												value
											)
										}
										normalClassicColor={
											item.normalItemClassicColor
										}
										setNormalClassicColor={ ( value ) =>
											handleChangeItem(
												item.id,
												'normalItemClassicColor',
												value
											)
										}
										normalGradientColor={
											item.normalItemGradientColor
										}
										setNormalGradientColor={ ( value ) =>
											handleChangeItem(
												item.id,
												'normalItemGradientColor',
												value
											)
										}
										normalCustomGradientSwitcher={
											item.normalItemCustomGradientSwitcher
										}
										setNormalCustomGradientSwitcher={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalItemCustomGradientSwitcher',
												value
											)
										}
										normalCustomGradientInputValue={
											item.normalItemCustomGradientInputValue
										}
										setNormalCustomGradientInputValue={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalItemCustomGradientInputValue',
												value
											)
										}
										normalBackgroundImageUrl={
											item.normalBackgroundImageUrl
										}
										setNormalBackgroundImageUrl={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalBackgroundImageUrl',
												value
											)
										}
										normalBackgroundImageAlt={
											item.normalBackgroundImageAlt
										}
										setNormalBackgroundImageAlt={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalBackgroundImageAlt',
												value
											)
										}
										normalBackgroundImageID={
											item.normalBackgroundImageID
										}
										setNormalBackgroundImageID={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalBackgroundImageID',
												value
											)
										}
										normalBackgroundImagePosition={
											item.normalBackgroundImagePosition
										}
										setNormalBackgroundImagePosition={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalBackgroundImagePosition',
												value
											)
										}
										normalBackgroundImageAttachment={
											item.normalBackgroundImageAttachment
										}
										setNormalBackgroundImageAttachment={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalBackgroundImageAttachment',
												value
											)
										}
										normalBackgroundImageRepeat={
											item.normalBackgroundImageRepeat
										}
										setNormalBackgroundImageRepeat={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalBackgroundImageRepeat',
												value
											)
										}
										normalBackgroundImageSize={
											item.normalBackgroundImageSize
										}
										setNormalBackgroundImageSize={ (
											value
										) =>
											handleChangeItem(
												item.id,
												'normalBackgroundImageSize',
												value
											)
										}
										normalClassicDefaultColor={ '#EDEDED' }
										setAttributes={ setAttributes }
										isHover={ false }
									/>
									<ToggleControl
										label={ __(
											'Enable Overlay',
											'gslider-blocks'
										) }
										checked={
											item.itemBackgroundOverlaySwitcher
										}
										onChange={ ( value ) =>
											handleChangeItem(
												item.id,
												'itemBackgroundOverlaySwitcher',
												value
											)
										}
									/>
									{ item.itemBackgroundOverlaySwitcher && (
										<>
											<BackgroundControl
												deviceType={ deviceType }
												normalBackgroundType={
													item.itemBackgroundOverlayType
												}
												setNormalBackgroundType={ (
													value
												) =>
													handleChangeItem(
														item.id,
														'itemBackgroundOverlayType',
														value
													)
												}
												normalClassicColor={
													item.itemBackgroundOverlayClassicColor
												}
												setNormalClassicColor={ (
													value
												) =>
													handleChangeItem(
														item.id,
														'itemBackgroundOverlayClassicColor',
														value
													)
												}
												normalGradientColor={
													item.itemBackgroundOverlayGradientColor
												}
												setNormalGradientColor={ (
													value
												) =>
													handleChangeItem(
														item.id,
														'itemBackgroundOverlayGradientColor',
														value
													)
												}
												normalCustomGradientSwitcher={
													item.itemBackgroundOverlayCustomGradientSwitcher
												}
												setNormalCustomGradientSwitcher={ (
													value
												) =>
													handleChangeItem(
														item.id,
														'itemBackgroundOverlayCustomGradientSwitcher',
														value
													)
												}
												normalCustomGradientInputValue={
													item.itemBackgroundOverlayCustomGradientInputValue
												}
												setNormalCustomGradientInputValue={ (
													value
												) =>
													handleChangeItem(
														item.id,
														'itemBackgroundOverlayCustomGradientInputValue',
														value
													)
												}
												setAttributes={ setAttributes }
												isBackgroundImage={ false }
												isHover={ false }
											/>
											<RangeControl
												label={ __(
													'Opacity',
													'gslider-blocks'
												) }
												value={
													item.itemBackgroundOverlayOpacity
												}
												onChange={ ( value ) =>
													handleChangeItem(
														item.id,
														'itemBackgroundOverlayOpacity',
														value
													)
												}
												min={ 0 }
												max={ 1 }
												step={ 0.1 }
											/>
										</>
									) }
								</div>
							) }
						/>
					</BaseControl>
				</div>
			) }
		</li>
	);
}
