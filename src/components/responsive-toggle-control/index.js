import React from 'react';
import { __ } from '@wordpress/i18n';
import { ToggleControl, BaseControl } from '@wordpress/components';
import ResponsiveDeviceControl from '@Components/responsive-device-control';

const ResponsiveToggleControl = ( {
	label = '',
	toggleValue,
	setToggleValue,
	deviceType,
	setAttributes,
	className = '',
} ) => {
	const handleToggleChange = ( newVal ) => {
		const updatedValue = {
			...toggleValue,
			[ deviceType ]: newVal,
		};

		setToggleValue( updatedValue );

		setAttributes( {
			toggleValue: updatedValue,
		} );
	};

	return (
		<BaseControl
			className={ `gslider-responsive-toggle-control-wrapper ${ className }` }
		>
			<ToggleControl
				// label={`${label} (${deviceType})`}
				checked={ toggleValue?.[ deviceType ] ?? false }
				onChange={ handleToggleChange }
				className="gslider-responsive-toggle-control"
			/>
			<ResponsiveDeviceControl label={ label } device={ deviceType } />
		</BaseControl>
	);
};

export default ResponsiveToggleControl;
