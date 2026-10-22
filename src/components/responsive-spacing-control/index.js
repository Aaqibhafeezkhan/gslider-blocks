import React from 'react';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { BaseControl } from '@wordpress/components';
import ResponsiveDeviceControl from '@Components/responsive-device-control';
import UnitsControl from '@Components/unit-control';

export default function ResponsiveSpacingControl( {
	label,
	deviceType,
	onChangeDeviceType,
	units,
	onChangeUnits,
	desktopSpacing,
	onChangeDesktopSpacing,
	desktopSpacingStyle,
	tabletSpacing,
	onChangeTabletSpacing,
	tabletSpacingStyle,
	mobileSpacing,
	onChangeMobileSpacing,
	mobileSpacingStyle,
	isLinked,
	onChangeLink,
} ) {
	/**
	 * Get Spacing Value
	 * @param position
	 * @since 1.0.0
	 */
	const getSpacingValue = ( position ) => {
		if ( deviceType === 'Desktop' ) {
			return desktopSpacing[ position ];
		} else if ( deviceType === 'Tablet' ) {
			return tabletSpacing[ position ];
		}

		return mobileSpacing[ position ];
	};

	/**
	 * Handle Link Toggle
	 * @since 1.0.0
	 */
	const handleLinkToggle = () => {
		onChangeLink( ! isLinked );
	};

	/**
	 * Handle Unit Types
	 * @param unit
	 * @since 1.0.0
	 */
	const setSpacingUnit = ( unit ) => {
		const updatedUnits = { ...units, [ deviceType ]: unit };
		onChangeUnits( updatedUnits );
	};

	/**
	 * Handle Spacing Change
	 * @param event
	 * @param position
	 * @since 1.0.0
	 */
	const onChangeSpacing = ( event, position ) => {
		const value = event.target.value;
		if ( isLinked ) {
			switch ( deviceType ) {
				case 'Desktop':
					onChangeDesktopSpacing( {
						top: value,
						right: value,
						bottom: value,
						left: value,
					} );
					break;
				case 'Tablet':
					onChangeTabletSpacing( {
						top: value,
						right: value,
						bottom: value,
						left: value,
					} );
					break;
				case 'Mobile':
					onChangeMobileSpacing( {
						top: value,
						right: value,
						bottom: value,
						left: value,
					} );
					break;
				default:
					break;
			}
		} else {
			switch ( deviceType ) {
				case 'Desktop':
					onChangeDesktopSpacing( {
						...desktopSpacing,
						[ position ]: value,
					} );
					break;
				case 'Tablet':
					onChangeTabletSpacing( {
						...tabletSpacing,
						[ position ]: value,
					} );
					break;
				case 'Mobile':
					onChangeMobileSpacing( {
						...mobileSpacing,
						[ position ]: value,
					} );
					break;
				default:
					break;
			}
		}
	};

	/**
	 * Manage Format Spacing Value
	 * @since 1.0.0
	 */
	useEffect( () => {
		const spacingFormat = ( spacing, units ) => {
			return spacing.top ||
				spacing.right ||
				spacing.bottom ||
				spacing.left
				? `${ spacing.top }${ units } ${ spacing.right }${ units } ${ spacing.bottom }${ units } ${ spacing.left }${ units }`
				: '';
		};

		const desktopSpacingWidth = spacingFormat(
			desktopSpacing,
			units.Desktop
		);
		const tabletSpacingWidth = spacingFormat( tabletSpacing, units.Tablet );
		const mobileSpacingWidth = spacingFormat( mobileSpacing, units.Mobile );

		if ( desktopSpacingStyle ) {
			desktopSpacingStyle( desktopSpacingWidth );
		}
		if ( tabletSpacingStyle ) {
			tabletSpacingStyle( tabletSpacingWidth );
		}
		if ( mobileSpacingStyle ) {
			mobileSpacingStyle( mobileSpacingWidth );
		}
	}, [
		desktopSpacing,
		tabletSpacing,
		mobileSpacing,
		units,
		desktopSpacingStyle,
		tabletSpacingStyle,
		mobileSpacingStyle,
	] );

	/**
	 * Reset Spacing Value
	 * @since 1.0.0
	 */
	const resetSpacingValue = () => {
		const defaultSpacing = { top: '', right: '', bottom: '', left: '' };
		onChangeDesktopSpacing( defaultSpacing );
		onChangeTabletSpacing( defaultSpacing );
		onChangeMobileSpacing( defaultSpacing );

		onChangeUnits( {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		} );
	};

	return (
		<BaseControl>
			<div className="gslider-setting-spacing-container">
				<div className="gslider-setting-spacing-inner-container">
					<div className="gslider-setting-spacing-label-container spacing">
						<ResponsiveDeviceControl
							label={ __( label, 'gslider-blocks' ) }
							device={ deviceType }
						/>
						<div className="gslider-unit-wrapper">
							{ getSpacingValue( 'top' ) &&
								getSpacingValue( 'right' ) &&
								getSpacingValue( 'bottom' ) &&
								getSpacingValue( 'left' ) && (
									<div
										className="gslider-reset-control-container"
										onClick={ resetSpacingValue }
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
												/>
											</svg>
										</button>
									</div>
								) }
							<UnitsControl
								currentUnit={ units[ deviceType ] }
								onUnitChange={ setSpacingUnit }
							/>
						</div>
					</div>
					<div className="gslider-setting-spacing-input-container">
						<div className="gslider-setting-spacing-input-wrapper">
							<label className="gslider-setting-spacing-input-label">
								{ __( 'Top', 'gslider-blocks' ) }
							</label>
							<input
								type="number"
								name="top"
								value={ getSpacingValue( 'top' ) }
								onChange={ ( e ) =>
									onChangeSpacing( e, 'top' )
								}
							/>
						</div>
						<div className="gslider-setting-spacing-input-wrapper">
							<label className="gslider-setting-spacing-input-label">
								{ __( 'Right', 'gslider-blocks' ) }
							</label>
							<input
								type="number"
								name="right"
								value={ getSpacingValue( 'right' ) }
								onChange={ ( e ) =>
									onChangeSpacing( e, 'right' )
								}
							/>
						</div>
						<div className="gslider-setting-spacing-input-wrapper">
							<label className="gslider-setting-spacing-input-label">
								{ __( 'Bottom', 'gslider-blocks' ) }
							</label>
							<input
								type="number"
								name="bottom"
								value={ getSpacingValue( 'bottom' ) }
								onChange={ ( e ) =>
									onChangeSpacing( e, 'bottom' )
								}
							/>
						</div>
						<div className="gslider-setting-spacing-input-wrapper">
							<label className="gslider-setting-spacing-input-label">
								{ __( 'Left', 'gslider-blocks' ) }
							</label>
							<input
								type="number"
								name="left"
								value={ getSpacingValue( 'left' ) }
								onChange={ ( e ) =>
									onChangeSpacing( e, 'left' )
								}
							/>
						</div>
						<div className="gslider-setting-spacing-input-wrapper">
							<label className="gslider-setting-spacing-input-label link-label">
								Link
							</label>
							<span
								className={ `dashicons ${
									isLinked
										? 'dashicons-admin-links'
										: 'dashicons-editor-unlink'
								} ${ isLinked ? 'is-checked' : '' }` }
								onClick={ handleLinkToggle }
							></span>
						</div>
					</div>
				</div>
			</div>
		</BaseControl>
	);
}
