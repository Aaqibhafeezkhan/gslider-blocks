import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	__experimentalInputControl as InputControl,
} from '@wordpress/components';

const InputControls = ( {
	label = '',
	value,
	onChangeValue,
	helpText = '',
} ) => {
	const handleChange = ( newValue ) => {
		onChangeValue( newValue );
	};

	return (
		<BaseControl label={ label } className="gslider-setting-label-text">
			<InputControl
				value={ value }
				onChange={ handleChange }
				help={ helpText }
				className="gslider-setting-input-control"
			/>
		</BaseControl>
	);
};

export default InputControls;
