import { __ } from '@wordpress/i18n';
import { useEffect, useMemo, useCallback } from 'react';
import { RangeControl, BaseControl } from '@wordpress/components';
import ResponsiveDeviceControl from '@Components/responsive-device-control';
import UnitsControl from '@Components/unit-control';
import { DEFAULT_UNIT_BOUNDS } from '@Constants';

const ResponsiveRangeControl = ( {
	// Optional global overrides
	min,
	max,
	step,
	// Required Label
	label,
	rangeValue,
	onChangeValue,
	onUnitChange,
	deviceType,
	units,
	// Falback Value
	resetFallbackValue,
	// Optional
	isRangeUnit = true,
	// Partial unit-specific overrides
	unitBounds,
} ) => {
	const activeUnit = units?.[ deviceType ] || 'px';
	const wantsBlank = resetFallbackValue === '';

	// --- helpers ---
	const clamp = ( v, lo, hi ) => Math.min( Math.max( v, lo ), hi );

	// fallback picker: scalar | per-unit map | default
	const pickFallback = useCallback( ( rfv, unit ) => {
		if ( rfv && typeof rfv === 'object' && ! Array.isArray( rfv ) ) {
			return rfv[ unit ] ?? rfv.default ?? 0;
		}
		return rfv;
	}, [] );

	// number coercion with unit-aware fallback
	const toNum = useCallback(
		( v, unitForFallback = activeUnit ) => {
			const n = parseFloat( v );
			if ( Number.isFinite( n ) ) {
				return n;
			}
			const fb = pickFallback( resetFallbackValue, unitForFallback );
			const fbNum = parseFloat( fb );
			return Number.isFinite( fbNum ) ? fbNum : 0;
		},
		[ activeUnit, pickFallback, resetFallbackValue ]
	);

	// Merge defaults + unitBounds (partial friendly)
	const merged = useMemo( () => {
		const base = { ...DEFAULT_UNIT_BOUNDS };
		if ( unitBounds ) {
			Object.keys( unitBounds ).forEach( ( u ) => {
				base[ u ] = {
					...( base[ u ] || {} ),
					...( unitBounds[ u ] || {} ),
				};
			} );
		}
		return base;
	}, [ unitBounds ] );

	// Effective bounds (prop override > merged > defaults)
	const bounds = useMemo( () => {
		const unitCfg = merged[ activeUnit ] || merged.px;
		return {
			min: typeof min === 'number' ? min : unitCfg.min,
			max: typeof max === 'number' ? max : unitCfg.max,
			step: typeof step === 'number' ? step : unitCfg.step,
		};
	}, [ merged, activeUnit, min, max, step ] );

	const safeMin = Math.min( bounds.min, bounds.max );
	const safeMax = Math.max( bounds.min, bounds.max );

	// Initial seed: if undefined, set blank or clamped fallback
	useEffect( () => {
		if ( rangeValue[ deviceType ] === undefined ) {
			const next = wantsBlank
				? ''
				: String(
						clamp(
							toNum( resetFallbackValue, activeUnit ),
							safeMin,
							safeMax
						)
				  );
			onChangeValue( { ...rangeValue, [ deviceType ]: next } );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ deviceType ] ); // seed once per device change

	const setRangeValue = useCallback(
		( value ) => {
			if ( value === null || value === '' ) {
				const next = wantsBlank
					? ''
					: String(
							clamp(
								toNum( resetFallbackValue, activeUnit ),
								safeMin,
								safeMax
							)
					  );
				onChangeValue( { ...rangeValue, [ deviceType ]: next } );
				return;
			}
			const clamped = clamp(
				toNum( value, activeUnit ),
				safeMin,
				safeMax
			);
			onChangeValue( {
				...rangeValue,
				[ deviceType ]: String( clamped ),
			} );
		},
		[
			activeUnit,
			deviceType,
			onChangeValue,
			rangeValue,
			resetFallbackValue,
			wantsBlank,
			safeMin,
			safeMax,
			toNum,
		]
	);

	const setRangeUnit = useCallback(
		( unit ) => {
			const newUnits = { ...units, [ deviceType ]: unit };
			const uCfg = merged[ unit ] || merged.px;

			const targetMin = typeof min === 'number' ? min : uCfg.min;
			const targetMax = typeof max === 'number' ? max : uCfg.max;
			const lo = Math.min( targetMin, targetMax );
			const hi = Math.max( targetMin, targetMax );

			const curr = rangeValue?.[ deviceType ];

			// keep blank if requested
			if ( ( curr === '' || curr == null ) && wantsBlank ) {
				onUnitChange( newUnits );
				onChangeValue( { ...rangeValue, [ deviceType ]: '' } );
				return;
			}

			const currentNum = toNum( curr ?? resetFallbackValue, unit );
			const coerced = clamp( currentNum, lo, hi );

			onUnitChange( newUnits );
			onChangeValue( {
				...rangeValue,
				[ deviceType ]: String( coerced ),
			} );
		},
		[
			deviceType,
			units,
			merged,
			min,
			max,
			onUnitChange,
			onChangeValue,
			rangeValue,
			resetFallbackValue,
			wantsBlank,
			toNum,
		]
	);

	const resetRangeValue = useCallback( () => {
		if ( wantsBlank ) {
			onChangeValue( { ...rangeValue, [ deviceType ]: '' } );
		} else {
			const fb = pickFallback( resetFallbackValue, activeUnit );
			setRangeValue( fb );
		}
	}, [
		activeUnit,
		deviceType,
		onChangeValue,
		rangeValue,
		wantsBlank,
		pickFallback,
		resetFallbackValue,
		setRangeValue,
	] );

	return (
		<BaseControl>
			<div className="gslider-setting-spacing-container">
				<div className="gslider-setting-spacing-inner-container">
					<div className="gslider-setting-spacing-label-container range">
						<ResponsiveDeviceControl
							label={ __( label, 'gslider-blocks' ) }
							device={ deviceType }
						/>
						<div className="gslider-unit-wrapper">
							{ rangeValue[ deviceType ] !== undefined &&
								rangeValue[ deviceType ] !== '' && (
									<div
										className="gslider-reset-control-container"
										onClick={ resetRangeValue }
									>
										<button
											className="gslider-reset-button gslider-reset-has-value"
											aria-label="Reset"
										>
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
								) }
							{ isRangeUnit && (
								<UnitsControl
									currentUnit={ activeUnit }
									onUnitChange={ setRangeUnit }
								/>
							) }
						</div>
					</div>

					<RangeControl
						value={
							rangeValue[ deviceType ] !== '' &&
							rangeValue[ deviceType ] !== undefined
								? Number( rangeValue[ deviceType ] )
								: undefined
						}
						onChange={ setRangeValue }
						min={ safeMin }
						max={ safeMax }
						step={ bounds.step }
						resetFallbackValue={
							wantsBlank
								? undefined
								: pickFallback( resetFallbackValue, activeUnit )
						}
					/>
				</div>
			</div>
		</BaseControl>
	);
};

export default ResponsiveRangeControl;
