import { useState } from 'react';

const UnitsControl = ( { currentUnit, unitTypes = null, onUnitChange } ) => {
	/** Default unit types */
	const UNIT_TYPES = unitTypes || [
		{ label: 'px', value: 'px' },
		{ label: '%', value: '%' },
		{ label: 'em', value: 'em' },
		{ label: 'rem', value: 'rem' },
		{ label: 'vh', value: 'vh' },
		{ label: 'vw', value: 'vw' },
	];

	/** State to manage dropdown visibility */
	const [ isDropdownOpen, setDropdownOpen ] = useState( false );

	const toggleDropdown = () => {
		setDropdownOpen( ( prevState ) => ! prevState );
	};

	const selectUnit = ( unit ) => {
		onUnitChange( unit );
		setDropdownOpen( false );
	};

	return (
		<>
			<div className="gslider-setting-units-type">
				<div
					className="gslider-setting-units-current"
					onClick={ toggleDropdown }
				>
					{ currentUnit }
				</div>
				{ isDropdownOpen && (
					<div className="gslider-setting-units-dropdown">
						{ UNIT_TYPES.map( ( item, key ) => (
							<div
								key={ key }
								className={ `gslider-setting-units-option ${
									currentUnit === item.value ? 'active' : ''
								}` }
								onClick={ () => selectUnit( item.value ) }
							>
								{ item.label }
							</div>
						) ) }
					</div>
				) }
			</div>
		</>
	);
};

export default UnitsControl;
