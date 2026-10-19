import { useState } from 'react';
import ResponsiveRangeControl from '@Components/responsive-range-control';

export default {
	title: 'Components/Responsive/ResponsiveRangeControl',
	component: ResponsiveRangeControl,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'ResponsiveRangeControl pairs WordPress RangeControl with GSlider ResponsiveDeviceControl and UnitsControl, providing responsive numeric adjustments with unit switching and independent values across Desktop, Tablet, and Mobile viewports.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label displayed alongside the responsive range control',
		},
		deviceType: {
			control: { type: 'select' },
			options: ['Desktop', 'Tablet', 'Mobile'],
			description: 'Active viewport device preview',
		},
		rangeValue: {
			control: 'object',
			description: 'Responsive value object: { Desktop, Tablet, Mobile }',
		},
		units: {
			control: 'object',
			description: 'Responsive unit object: { Desktop, Tablet, Mobile }',
		},
		isRangeUnit: {
			control: 'boolean',
			description: 'Whether to show the unit selector dropdown',
		},
		min: {
			control: 'number',
			description: 'Minimum allowed value override',
		},
		max: {
			control: 'number',
			description: 'Maximum allowed value override',
		},
		step: {
			control: 'number',
			description: 'Increment step override',
		},
		resetFallbackValue: {
			control: 'text',
			description: 'Default value used when resetting the slider',
		},
		onChangeValue: {
			action: 'rangeValueChanged',
			description: 'Callback fired when range value updates',
		},
		onUnitChange: {
			action: 'unitChanged',
			description: 'Callback fired when active unit updates',
		},
	},
};

export const Default = {
	render: (args) => {
		const [device, setDevice] = useState(args.deviceType || 'Desktop');
		const [values, setValues] = useState(
			args.rangeValue || {
				Desktop: '50',
				Tablet: '40',
				Mobile: '30',
			}
		);

		const activeVal = values[device] ?? '50';

		return (
			<div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						marginBottom: '16px',
						paddingBottom: '12px',
						borderBottom: '1px solid #e0e0e0',
					}}
				>
					<span
						style={{
							fontSize: '12px',
							fontWeight: 600,
							color: '#50575e',
						}}
					>
						Active Viewport:
					</span>
					{['Desktop', 'Tablet', 'Mobile'].map((d) => (
						<button
							key={d}
							onClick={() => setDevice(d)}
							style={{
								padding: '4px 10px',
								fontSize: '12px',
								background: device === d ? '#2271b1' : '#f0f0f1',
								color: device === d ? '#fff' : '#1e1e1e',
								border: '1px solid #c3c4c7',
								borderRadius: '3px',
								cursor: 'pointer',
								fontWeight: device === d ? '600' : 'normal',
							}}
						>
							{d} ({values[d]})
						</button>
					))}
				</div>

				<ResponsiveRangeControl
					{...args}
					deviceType={device}
					rangeValue={values}
					onChangeValue={(newVal) => {
						setValues(newVal);
						args.onChangeValue?.(newVal);
					}}
				/>

				<div
					style={{
						marginTop: '20px',
						padding: '16px',
						background: '#f9f9f9',
						border: '1px dashed #c3c4c7',
						borderRadius: '4px',
					}}
				>
					<div
						style={{
							fontSize: '11px',
							textTransform: 'uppercase',
							color: '#646970',
							marginBottom: '8px',
						}}
					>
						Live Slider Preview ({device}): {activeVal}
					</div>
					<div
						style={{
							height: '12px',
							background: '#e2e4e7',
							borderRadius: '6px',
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								height: '100%',
								width: `${Math.min(Math.max(Number(activeVal), 0), 100)}%`,
								background: '#2271b1',
								transition: 'width 0.15s ease',
							}}
						/>
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Border Radius',
		deviceType: 'Desktop',
		rangeValue: {
			Desktop: '50',
			Tablet: '40',
			Mobile: '30',
		},
		min: 0,
		max: 100,
		step: 1,
		isRangeUnit: false,
		resetFallbackValue: '0',
	},
};

export const WithUnits = {
	render: (args) => {
		const [device, setDevice] = useState(args.deviceType || 'Desktop');
		const [values, setValues] = useState(
			args.rangeValue || {
				Desktop: '450',
				Tablet: '350',
				Mobile: '250',
			}
		);
		const [units, setUnits] = useState(
			args.units || {
				Desktop: 'px',
				Tablet: 'px',
				Mobile: 'px',
			}
		);

		const activeVal = values[device] ?? '450';
		const activeUnit = units[device] ?? 'px';

		return (
			<div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						marginBottom: '16px',
						paddingBottom: '12px',
						borderBottom: '1px solid #e0e0e0',
					}}
				>
					<span
						style={{
							fontSize: '12px',
							fontWeight: 600,
							color: '#50575e',
						}}
					>
						Active Viewport:
					</span>
					{['Desktop', 'Tablet', 'Mobile'].map((d) => (
						<button
							key={d}
							onClick={() => setDevice(d)}
							style={{
								padding: '4px 10px',
								fontSize: '12px',
								background: device === d ? '#2271b1' : '#f0f0f1',
								color: device === d ? '#fff' : '#1e1e1e',
								border: '1px solid #c3c4c7',
								borderRadius: '3px',
								cursor: 'pointer',
								fontWeight: device === d ? '600' : 'normal',
							}}
						>
							{d} ({values[d]}{units[d]})
						</button>
					))}
				</div>

				<ResponsiveRangeControl
					{...args}
					deviceType={device}
					rangeValue={values}
					units={units}
					onChangeValue={(newVal) => {
						setValues(newVal);
						args.onChangeValue?.(newVal);
					}}
					onUnitChange={(newUnits) => {
						setUnits(newUnits);
						args.onUnitChange?.(newUnits);
					}}
				/>

				<div
					style={{
						marginTop: '20px',
						padding: '16px',
						background: '#fff',
						border: '1px solid #c3c4c7',
						borderRadius: '4px',
					}}
				>
					<div
						style={{
							fontSize: '12px',
							color: '#50575e',
							marginBottom: '8px',
						}}
					>
						Rendered Box Height: <strong>{activeVal}{activeUnit}</strong> ({device})
					</div>
					<div
						style={{
							height: activeUnit === 'px' ? `${Math.min(Number(activeVal), 200)}px` : `${Math.min(Number(activeVal), 100)}%`,
							minHeight: '40px',
							maxHeight: '200px',
							background: 'linear-gradient(135deg, #2271b1 0%, #72aee6 100%)',
							borderRadius: '4px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#fff',
							fontSize: '13px',
							fontWeight: 500,
							transition: 'height 0.2s ease',
						}}
					>
						Slide Container Preview
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Slide Min Height',
		deviceType: 'Desktop',
		isRangeUnit: true,
		rangeValue: {
			Desktop: '450',
			Tablet: '350',
			Mobile: '250',
		},
		units: {
			Desktop: 'px',
			Tablet: 'px',
			Mobile: 'px',
		},
		resetFallbackValue: {
			px: '500',
			'%': '50',
			vh: '50',
			vw: '50',
		},
	},
};

export const CustomBounds = {
	render: (args) => {
		const [device, setDevice] = useState(args.deviceType || 'Desktop');
		const [values, setValues] = useState(
			args.rangeValue || {
				Desktop: '3000',
				Tablet: '2500',
				Mobile: '2000',
			}
		);

		const activeVal = values[device] ?? '3000';

		return (
			<div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						marginBottom: '16px',
						paddingBottom: '12px',
						borderBottom: '1px solid #e0e0e0',
					}}
				>
					<span
						style={{
							fontSize: '12px',
							fontWeight: 600,
							color: '#50575e',
						}}
					>
						Active Viewport:
					</span>
					{['Desktop', 'Tablet', 'Mobile'].map((d) => (
						<button
							key={d}
							onClick={() => setDevice(d)}
							style={{
								padding: '4px 10px',
								fontSize: '12px',
								background: device === d ? '#2271b1' : '#f0f0f1',
								color: device === d ? '#fff' : '#1e1e1e',
								border: '1px solid #c3c4c7',
								borderRadius: '3px',
								cursor: 'pointer',
								fontWeight: device === d ? '600' : 'normal',
							}}
						>
							{d} ({values[d]} ms)
						</button>
					))}
				</div>

				<ResponsiveRangeControl
					{...args}
					deviceType={device}
					rangeValue={values}
					onChangeValue={(newVal) => {
						setValues(newVal);
						args.onChangeValue?.(newVal);
					}}
				/>

				<div
					style={{
						marginTop: '20px',
						padding: '16px',
						background: '#f0f6fc',
						border: '1px solid #c5d9ed',
						borderRadius: '4px',
						fontSize: '13px',
						color: '#1e1e1e',
					}}
				>
					<strong>Configured Timing:</strong> <code>{activeVal} ms</code> (Bounds: {args.min}ms – {args.max}ms with step: {args.step}ms)
				</div>
			</div>
		);
	},
	args: {
		label: 'Autoplay Delay',
		deviceType: 'Desktop',
		min: 500,
		max: 10000,
		step: 250,
		isRangeUnit: false,
		rangeValue: {
			Desktop: '3000',
			Tablet: '2500',
			Mobile: '2000',
		},
		resetFallbackValue: '3000',
	},
};
