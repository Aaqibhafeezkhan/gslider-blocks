import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';
import ResponsiveDeviceControl from '@Components/responsive-device-control';
import UnitsControl from '@Components/unit-control';
import './editor.lazy.scss';

const ResponsiveRangeControl = ({
	min,
	max,
	label,
	rangeValue,
	onChangeValue,
	onUnitChange,
	deviceType,
	units,
	step,
	resetFallbackValue,
	isRangeUnit = true,
}) => {
	// Ensure default/fallback value for the current deviceType
	useEffect(() => {
		if (rangeValue[deviceType] === undefined) {
			const newRangeValue = { ...rangeValue, [deviceType]: resetFallbackValue };
			onChangeValue(newRangeValue);
		}
	}, [deviceType, rangeValue, onChangeValue, resetFallbackValue]);

	const setRangeValue = (value) => {
		const newRangeValue = {...rangeValue, [deviceType]: value !== null ? String(value) : String(resetFallbackValue)};
		onChangeValue(newRangeValue);
	};

	const setRangeUnit = (unit) => {
		const newUnits = { ...units, [deviceType]: unit };
		onUnitChange(newUnits);
	};

	const resetRangeValue = () => {
		setRangeValue(resetFallbackValue);
	};

	return (
		<div className="global-setting-spacing-container">
			<div className="global-setting-spacing-inner-container">
				<div className="global-setting-spacing-label-container">
                    <ResponsiveDeviceControl
						label={ __( label, 'gutenslider-blocks' )}
						device={ deviceType }
					/>
					
					<div className="global-unit-wrapper"> 
						{rangeValue[deviceType] && (
							<div className="global-reset-control-container" onClick={resetRangeValue}>
								<button className="global-reset-button global-reset-has-value">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10.6817 6.23162H14.0101V6.23044M1.98926 13.0956V9.76718M1.98926 9.76718L5.31768 9.76718M1.98926 9.76718L4.10985 11.8892C4.7702 12.5507 5.60824 13.0527 6.57607 13.312C9.51014 14.0982 12.526 12.357 13.3122 9.42292M2.68699 6.57591C3.47317 3.64184 6.48902 1.90064 9.42308 2.68682C10.3909 2.94615 11.229 3.4481 11.8893 4.10969L14.0101 6.23044M14.0101 2.90322V6.23044" stroke="#555E72"></path></svg>
								</button>
							</div>
						)}
						{isRangeUnit && (
							<UnitsControl
								currentUnit={units[deviceType]}
								onUnitChange={setRangeUnit}
							/>
						)}
					</div>

				</div>
				<RangeControl
					value={rangeValue[deviceType] !== "" ? Number(rangeValue[deviceType]) : undefined}
					onChange={setRangeValue}
					min={min}
					max={max}
					step={step}
					resetFallbackValue={resetFallbackValue}
				/>
			</div>
		</div>
	);
};

export default ResponsiveRangeControl;
