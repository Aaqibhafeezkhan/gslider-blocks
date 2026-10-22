import { __ } from '@wordpress/i18n';
import React, { useState, useEffect } from 'react';
import Control from './control';
import { Dashicon, BaseControl, Button, Dropdown } from '@wordpress/components';

export default function BoxShadowSettingsControl( {
	label = __( 'Box Shadow', 'gslider-blocks' ),
	onBoxShadowChange,
	initialShadowValue,
	onBoxShadowStyleChange,
} ) {
	const [ boxShadow, setBoxShadow ] = useState(
		initialShadowValue || [ 0, 0, 0, 0, '', '#00000000' ]
	);

	useEffect( () => {
		onBoxShadowChange( boxShadow );
	}, [ boxShadow, onBoxShadowChange ] );

	useEffect( () => {
		const boxShadowStyle = boxShadow
			.map( ( value, index ) => {
				if ( index === 4 ) {
					return value;
				}
				if ( index === 5 ) {
					return value;
				}
				return `${ value }px`;
			} )
			.join( ' ' );

		if ( onBoxShadowStyleChange ) {
			onBoxShadowStyleChange( boxShadowStyle );
		}
	}, [ boxShadow, onBoxShadowStyleChange ] );

	function onChangeHandler( value, index ) {
		setBoxShadow( ( prevBoxShadow ) => {
			const newBoxShadow = [ ...prevBoxShadow ];
			switch ( index ) {
				case 5:
					newBoxShadow[ index ] = value;
					break;
				case 4:
					newBoxShadow[ index ] = value ? 'inset' : '';
					break;
				default:
					newBoxShadow[ index ] = +value;
					break;
			}
			return newBoxShadow;
		} );
	}

	const resetColor = () => {
		setBoxShadow( [ 0, 0, 0, 0, '', '' ] );
		if ( onBoxShadowStyleChange ) {
			onBoxShadowStyleChange( '0px 0px 0px 0px' );
		}
	};

	return (
		<BaseControl
			label={ label }
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
							style={ { background: boxShadow[ 5 ] || '' } }
						></Button>
					</>
				) }
				renderContent={ () => (
					<div className="gslider-box-shadow-controlPane controls">
						<Control
							label={ __( 'Inset', 'gslider-blocks' ) }
							type="checkbox"
							value={ boxShadow[ 4 ] === 'inset' }
							onChangeHandler={ ( e ) => onChangeHandler( e, 4 ) }
						/>
						<Control
							label={ __( 'Color', 'gslider-blocks' ) }
							type="color"
							value={ boxShadow[ 5 ] }
							onChangeHandler={ ( e ) => onChangeHandler( e, 5 ) }
						/>
						<Control
							label={ __( 'Offset X', 'gslider-blocks' ) }
							type="range"
							value={ boxShadow[ 0 ] }
							onChangeHandler={ ( e ) => onChangeHandler( e, 0 ) }
						/>
						<Control
							label={ __( 'Offset Y', 'gslider-blocks' ) }
							type="range"
							value={ boxShadow[ 1 ] }
							onChangeHandler={ ( e ) => onChangeHandler( e, 1 ) }
						/>
						<Control
							label={ __( 'Blur', 'gslider-blocks' ) }
							type="range"
							value={ boxShadow[ 2 ] }
							onChangeHandler={ ( e ) => onChangeHandler( e, 2 ) }
						/>
						<Control
							label={ __( 'Spread', 'gslider-blocks' ) }
							type="range"
							value={ boxShadow[ 3 ] }
							onChangeHandler={ ( e ) => onChangeHandler( e, 3 ) }
						/>
					</div>
				) }
			/>
		</BaseControl>
	);
}
