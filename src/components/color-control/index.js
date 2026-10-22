import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	Dropdown,
	ColorPicker,
	ColorPalette,
	Dashicon,
	Button,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

const ColorControl = ( { label, color, onChangeColor, defaultColor = '' } ) => {
	const themeColors = useSelect( ( select ) => {
		return select( 'core/editor' ).getEditorSettings().colors;
	}, [] );

	const resetColor = () => {
		onChangeColor( defaultColor );
	};

	return (
		<BaseControl
			label={ __( label, 'gslider-blocks' ) }
			className="gslider-setting-color-switcher-wrapper"
		>
			<Dropdown
				className="gslider-setting-icon-dropdown gslider-setting-color-dropdown"
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
							style={ { background: color || '' } }
						></Button>
					</>
				) }
				renderContent={ () => (
					<div className="gslider-setting-panel-icon-popup">
						<BaseControl className="gslider-setting-panel-icon-popup-inner">
							<div className="gslider-setting-color">
								<ColorPicker
									color={ color }
									onChange={ onChangeColor }
									enableAlpha={ true }
								/>
								<div className="gslider-setting-color-label">
									{ __( 'Default Colors', 'gslider-blocks' ) }
								</div>
								<ColorPalette
									colors={ [
										{ color: '#2563eb' },
										{ color: '#FFFFFF' },
										{ color: '#000000' },
										{ color: '#4285F4' },
										{ color: '#FBBC05' },
										{ color: '#34A853' },
										{ color: '#EA4335' },
										{ color: '#55ACEE' },
										{ color: '#66757F' },
										{ color: '#3B5998' },
										{ color: '#8B9DC3' },
										{ color: '#F65314' },
										{ color: '#7CBB00' },
										{ color: '#00A1F1' },
										{ color: '#0F7DC2' },
										{ color: '#3F729B' },
										{ color: '#006699' },
										{ color: '#7B0099' },
										{ color: '#FF9900' },
										{ color: '#A4C639' },
										{ color: '#F72585' },
										{ color: '#3A0CA3' },
										{ color: '#4CC9F0' },
										{ color: '#2FF3E0' },
										{ color: '#F8D210' },
										{ color: '#B7AC44' },
										{ color: '#FF8300' },
										{ color: '#B6E2D3' },
										{ color: '#FF4500' },
										{ color: '#4040a1' },
										{ color: '#EEB5EB' },
										{ color: '#C26DBC' },
										{ color: '#C8F4F9' },
										{ color: '#3CACAE' },
										{ color: '#4C5270' },
										{ color: '#C8DF52' },
										{ color: '#000C66' },
										{ color: '#0000FF' },
										{ color: '#D8A7B1' },
										{ color: '#7EC8E3' },
										{ color: '#FDB750' },
										{ color: '#116530' },
										{ color: '#21B6A8' },
										{ color: '#A3EBB1' },
										{ color: '#76B947' },
										{ color: '#B1D8B7' },
										{ color: '#00FF22' },
										{ color: '#94C973' },
										{ color: '#EF7C8E' },
										{ color: '#FAE8E0' },
									] }
									disableCustomColors={ true }
									value={ color }
									onChange={ onChangeColor }
								/>
								{ themeColors.length > 0 && (
									<>
										<div className="gslider-setting-color-label">
											{ __(
												'Theme Colors',
												'gslider-blocks'
											) }
										</div>
										<ColorPalette
											colors={ themeColors }
											disableCustomColors={ true }
											value={ color }
											onChange={ onChangeColor }
										/>
									</>
								) }
							</div>
						</BaseControl>
					</div>
				) }
			/>
		</BaseControl>
	);
};

export default ColorControl;
