import { __ } from '@wordpress/i18n';
import { BaseControl, SelectControl } from '@wordpress/components';

const SelectControls = ( { label = '', options, value, onChange } ) => {
	return (
		<BaseControl
			className="gslider-select-control"
			label={ __( label, 'gslider-blocks' ) }
		>
			<>
				<SelectControl
					className="gslider-select-control-options"
					value={ value }
					options={ options }
					onChange={ ( value ) => onChange( value ) }
				/>
			</>
		</BaseControl>
	);
};

export default SelectControls;
