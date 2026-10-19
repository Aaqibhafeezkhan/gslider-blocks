import { useState } from 'react';
import ResponsiveToggleControl from '@Components/responsive-toggle-control';

export default {
	title: 'Components/Responsive/ResponsiveToggleControl',
	component: ResponsiveToggleControl,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'ResponsiveToggleControl pairs a WordPress ToggleControl with GSlider ResponsiveDeviceControl, allowing independent ON/OFF states per device breakpoint (Desktop, Tablet, Mobile).',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label displayed alongside the responsive toggle',
		},
		deviceType: {
			control: { type: 'select' },
			options: ['Desktop', 'Tablet', 'Mobile'],
			description: 'Active viewport device preview',
		},
		toggleValue: {
			control: 'object',
			description: 'Responsive boolean state { Desktop, Tablet, Mobile }',
		},
		setToggleValue: {
			action: 'toggleChanged',
			description: 'Callback fired when toggle state updates',
		},
	},
};

export const Default = {
	render: (args) => {
		const [device, setDevice] = useState(args.deviceType || 'Desktop');
		const [values, setValues] = useState(
			args.toggleValue || {
				Desktop: false,
				Tablet: false,
				Mobile: false,
			}
		);

		return (
			<div>
				<div
					style={{
						display: 'flex',
						gap: '8px',
						marginBottom: '12px',
					}}
				>
					{['Desktop', 'Tablet', 'Mobile'].map((d) => (
						<button
							key={d}
							onClick={() => setDevice(d)}
							style={{
								padding: '4px 10px',
								fontSize: '12px',
								background:
									device === d ? '#0073aa' : '#f0f0f1',
								color: device === d ? '#fff' : '#1e1e1e',
								border: '1px solid #ccc',
								borderRadius: '3px',
								cursor: 'pointer',
							}}
						>
							{d}
						</button>
					))}
				</div>
				<ResponsiveToggleControl
					{...args}
					deviceType={device}
					toggleValue={values}
					setToggleValue={(newVal) => {
						setValues(newVal);
						args.setToggleValue?.(newVal);
					}}
					setAttributes={() => {}}
				/>
			</div>
		);
	},
	args: {
		label: 'Show Navigation Arrows',
		deviceType: 'Desktop',
		toggleValue: {
			Desktop: false,
			Tablet: false,
			Mobile: false,
		},
	},
};

export const ActiveOnDesktop = {
	render: (args) => {
		const [device, setDevice] = useState(args.deviceType || 'Desktop');
		const [values, setValues] = useState(
			args.toggleValue || {
				Desktop: true,
				Tablet: true,
				Mobile: false,
			}
		);

		return (
			<div>
				<div
					style={{
						display: 'flex',
						gap: '8px',
						marginBottom: '12px',
					}}
				>
					{['Desktop', 'Tablet', 'Mobile'].map((d) => (
						<button
							key={d}
							onClick={() => setDevice(d)}
							style={{
								padding: '4px 10px',
								fontSize: '12px',
								background:
									device === d ? '#0073aa' : '#f0f0f1',
								color: device === d ? '#fff' : '#1e1e1e',
								border: '1px solid #ccc',
								borderRadius: '3px',
								cursor: 'pointer',
							}}
						>
							{d}
						</button>
					))}
				</div>
				<ResponsiveToggleControl
					{...args}
					deviceType={device}
					toggleValue={values}
					setToggleValue={(newVal) => {
						setValues(newVal);
						args.setToggleValue?.(newVal);
					}}
					setAttributes={() => {}}
				/>
			</div>
		);
	},
	args: {
		label: 'Enable Autoplay',
		deviceType: 'Desktop',
		toggleValue: {
			Desktop: true,
			Tablet: true,
			Mobile: false,
		},
	},
};
