// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n';
import React from 'react';
import {
	ColorPicker,
	RangeControl,
	ToggleControl,
	BaseControl,
	Button,
	Dropdown,
	ColorPalette,
} from '@wordpress/components';

function Control( { label, type, onChangeHandler, value } ) {
	const resetColor = () => {
		onChangeHandler( '' );
	};

	return (
		<div className={ `paneChild ${ type }` }>
			{ type === 'color' ? (
				<BaseControl
					label={ __( label, 'gslider-blocks' ) }
					className="gslider-setting-color-switcher-wrapper"
				>
					<Dropdown
						className="gslider-box-shadow-icon-dropdown gslider-setting-color-dropdown"
						contentClassName="gslider-setting-icon-dropdown-content"
						popoverProps={ { placement: 'bottom-start' } }
						renderToggle={ ( { isOpen, onToggle } ) => (
							<>
								<div
									className="gslider-reset-control-container"
									onClick={ resetColor }
								>
									<button className="gslider-reset-button gslider-reset-has-value">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
										>
											<path
												d="M10.6817 6.23162H14.0101V6.23044M1.98926 13.0956V9.76718M1.98926 9.76718L5.31768 9.76718M1.98926 9.76718L4.10985 11.8892C4.7702 12.5507 5.60824 13.0527 6.57607 13.312C9.51014 14.0982 12.526 12.357 13.3122 9.42292M2.68699 6.57591C3.47317 3.64184 6.48902 1.90064 9.42308 2.68682C10.3909 2.94615 11.229 3.4481 11.8893 4.10969L14.0101 6.23044M14.0101 2.90322V6.23044"
												stroke="#555E72"
											></path>
										</svg>
									</button>
								</div>
								<Button
									onClick={ onToggle }
									aria-expanded={ isOpen }
									className="color-ball"
									style={ { background: value || '' } }
								></Button>
							</>
						) }
						renderContent={ () => (
							<div className="gslider-box-shadow-icon-popup">
								<BaseControl className="gslider-box-shadow-popup-inner">
									<div className="gslider-box-shadow-color">
										<ColorPicker
											color={ value }
											onChange={ onChangeHandler }
											enableAlpha={ true }
										/>
										<div className="gslider-box-shadow-label">
											{ __(
												'Default Colors',
												'gslider-blocks'
											) }
										</div>
										<ColorPalette
											colors={ [
												{ color: '#F72585' },
												{ color: '#7209B7' },
												{ color: '#3A0CA3' },
												{ color: '#4361EE' },
												{ color: '#4CC9F0' },
											] }
											disableCustomColors={ true }
											value={ value }
											onChange={ onChangeHandler }
										/>
									</div>
								</BaseControl>
							</div>
						) }
					/>
				</BaseControl>
			) : type === 'checkbox' ? (
				<ToggleControl
					label={ label }
					checked={ value }
					onChange={ onChangeHandler }
				/>
			) : (
				<RangeControl
					label={ label }
					value={ value }
					onChange={ onChangeHandler }
					min={ label === 'Spread' || label === 'Blur' ? 0 : -350 }
					max={ label === 'Spread' || label === 'Blur' ? 350 : 350 }
				/>
			) }
		</div>
	);
}

export default Control;
