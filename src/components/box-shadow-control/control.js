// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import { ColorPicker, RangeControl, ToggleControl, BaseControl, Button, Dropdown, ColorPalette } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Dashicon } from '@wordpress/components';

function Control({ label, type, onChangeHandler, value }) {
	return (
		<div className={`paneChild ${type}`}>
			{type === 'color' ? (
					<>
						<div className="gslider-setting-color-container">
							<BaseControl 
								label={__(label, "gslider-blocks")}
								className="gslider-box-shadow-wrapper shadow-color gslider-setting-color-switcher-wrapper"
							>
								<Dropdown
									className="gslider-box-shadow-icon-dropdown"
									contentClassName="gslider-box-shadow-icon-dropdown-content"
									popoverProps={{ placement: 'bottom-start' }}
									renderToggle={({ isOpen, onToggle }) => (
										<Button
											onClick={onToggle}
											aria-expanded={isOpen}
                            				className="color-ball"
										>
										</Button>
									)}
									renderContent={() => (
										<div className="gslider-box-shadow-icon-popup">
											<BaseControl className="gslider-box-shadow-popup-inner">
												<div className="gslider-box-shadow-color">
													<ColorPicker
														color={value}
														onChange={onChangeHandler}
														enableAlpha={true}
													/>
													<div className="gslider-box-shadow-label">{__("Default Colors", "gslider-blocks")}</div>
													<ColorPalette
														colors={[
															{ color: '#F72585' },
															{ color: '#7209B7' },
															{ color: '#3A0CA3' },
															{ color: '#4361EE' },
															{ color: '#4CC9F0' },
														]}
														disableCustomColors={true}
														value={value}
														onChange={onChangeHandler}
													/>
												</div>
											</BaseControl>
										</div>
									)}
								/>
							</BaseControl>
						</div>
					</>
			) : type === 'checkbox' ? (
				<ToggleControl
					label={label}
					checked={value}
					onChange={onChangeHandler}
				/>
			) : (
				<RangeControl
					label={label}
					value={value}
					onChange={onChangeHandler}
					min={(label === 'Spread' || label === 'Blur') ? 0 : -350}
					max={(label === 'Spread' || label === 'Blur') ? 350 : 350}
				/>
			)}
		</div>
	);
}

export default Control;
