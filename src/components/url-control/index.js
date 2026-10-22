import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	TextControl,
	Dropdown,
	Button,
	Dashicon,
	ToggleControl,
} from '@wordpress/components';

const UrlControl = ( {
	label,
	url,
	onChangeUrl,
	openInNewTab,
	onChangeOpenInNewTab,
	nofollow,
	onChangeNofollow,
	sponsored,
	onChangeSponsored,
} ) => {
	const handleUrlChange = ( newUrl ) => {
		onChangeUrl( newUrl );
	};

	const handleOpenInNewTabChange = ( newOpenInNewTab ) => {
		onChangeOpenInNewTab( newOpenInNewTab );
	};

	const handleNofollowChange = ( newNofollow ) => {
		onChangeNofollow( newNofollow );
	};

	const handleSponsoredChange = ( newSponsored ) => {
		onChangeSponsored( newSponsored );
	};

	return (
		<BaseControl label={ label } className="gslider-url-control-wrapper">
			<div className="gslider-url-control-inner-wrapper">
				<TextControl
					value={ url }
					onChange={ handleUrlChange }
					className="gslider-url-control-input"
					placeholder={ __( 'https://', 'gslider-blocks' ) }
				/>
				<Dropdown
					className="gslider-setting-icon-dropdown gslider-url-control-dropdown-wrapper"
					contentClassName="gslider-setting-icon-dropdown-content gslider-url-control-dropdown-content"
					popoverProps={ { placement: 'bottom-start' } }
					renderToggle={ ( { isOpen, onToggle } ) => (
						<Button
							variant="primary"
							onClick={ onToggle }
							aria-expanded={ isOpen }
							className="gslider-setting-icon-btn"
						>
							<Dashicon
								icon="edit"
								className="gslider-setting-panel-icon"
							/>
						</Button>
					) }
					renderContent={ () => (
						<div className="gslider-url-control-dropdown-popup">
							<BaseControl className="gslider-url-control-dropdown-popup-inner">
								<ToggleControl
									label={ __(
										'Open in new tab',
										'gslider-blocks'
									) }
									checked={ openInNewTab }
									onChange={ handleOpenInNewTabChange }
								/>
								<ToggleControl
									label={ __(
										'Add Nofollow rel',
										'gslider-blocks'
									) }
									checked={ nofollow }
									onChange={ handleNofollowChange }
								/>
								<ToggleControl
									label={ __(
										'Add Sponsored rel',
										'gslider-blocks'
									) }
									checked={ sponsored }
									onChange={ handleSponsoredChange }
								/>
							</BaseControl>
						</div>
					) }
				/>
			</div>
		</BaseControl>
	);
};

export default UrlControl;
