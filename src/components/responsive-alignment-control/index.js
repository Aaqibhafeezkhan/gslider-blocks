import React from 'react';
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, ButtonGroup } from '@wordpress/components';
import ResponsiveDeviceControl from '@Components/responsive-device-control';

const ResponsiveAlignmentControl = ( {
	label = '',
	options,
	alignmentValue,
	setAlignmentValue,
	deviceType,
	setAttributes,
	className = '',
} ) => {
	const handleAlignmentChange = ( value ) => {
		setAlignmentValue( {
			...alignmentValue,
			[ deviceType ]: value,
		} );

		setAttributes( {
			alignmentValue: {
				...alignmentValue,
				[ deviceType ]: value,
			},
		} );
	};

	return (
		<BaseControl className="gslider-alignment-control">
			<ResponsiveDeviceControl label={ label } device={ deviceType } />
			<ButtonGroup
				className={ `gslider-alignment-group-btn ${ className }` }
			>
				{ options.map( ( item ) => (
					<Button
						key={ item.value }
						onClick={ () => handleAlignmentChange( item.value ) }
						className={ `gslider-alignment-single-btn ${
							alignmentValue[ deviceType ] === item.value
								? 'active'
								: ''
						}` }
					>
						{ item.label }
					</Button>
				) ) }
			</ButtonGroup>
		</BaseControl>
	);
};

export default ResponsiveAlignmentControl;
