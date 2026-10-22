import { __ } from '@wordpress/i18n';
import { Button, BaseControl, ButtonGroup } from '@wordpress/components';

const SwitcherControl = ( {
	label = '',
	options,
	value,
	onChange,
	help = '',
} ) => {
	return (
		<BaseControl label={ label } help={ help }>
			<ButtonGroup className="gslider-setting-switcher-panel-btn">
				{ options.map( ( item, key ) => (
					<Button
						key={ key }
						onClick={ () => onChange( item.value ) }
						className={ `gslider-setting-switcher-panel-btn-switcher ${
							value === item.value ? 'active' : ''
						}` }
					>
						{ item.label }
					</Button>
				) ) }
			</ButtonGroup>
		</BaseControl>
	);
};

export default SwitcherControl;
