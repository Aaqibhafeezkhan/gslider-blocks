import { useState } from 'react';
import SelectControls from '@Components/select-controls';
import { SLIDER_EFFECT_OPTIONS, BORDER_STYLES } from '@Constants';

export default {
	title: 'Components/Primitives/SelectControls',
	component: SelectControls,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'SelectControls provides a styled dropdown select menu wrapping WordPress BaseControl and SelectControl, used for selecting slider effects, border styles, alignment modes, and layout behaviors across GSlider inspector settings.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label displayed above the select dropdown',
		},
		value: {
			control: 'text',
			description: 'Currently selected option value',
		},
		options: {
			control: 'object',
			description: 'Array of option items with { label, value }',
		},
		onChange: {
			action: 'selectChanged',
			description: 'Callback fired when an option is chosen from the dropdown',
		},
	},
};

export const Default = {
	render: (args) => {
		const [val, setVal] = useState(args.value || 'slide');
		return (
			<div>
				<SelectControls
					{...args}
					value={val}
					onChange={(newVal) => {
						setVal(newVal);
						args.onChange?.(newVal);
					}}
				/>
				<div
					style={{
						marginTop: '16px',
						padding: '12px',
						background: '#f0f0f1',
						borderRadius: '4px',
						fontSize: '13px',
						color: '#1e1e1e',
					}}
				>
					<strong>Selected Effect:</strong> <code>{val}</code>
				</div>
			</div>
		);
	},
	args: {
		label: 'Slide Effect',
		value: 'slide',
		options: SLIDER_EFFECT_OPTIONS,
	},
};

export const BorderStyles = {
	render: (args) => {
		const [val, setVal] = useState(args.value || 'solid');
		return (
			<div>
				<SelectControls
					{...args}
					value={val}
					onChange={(newVal) => {
						setVal(newVal);
						args.onChange?.(newVal);
					}}
				/>
				<div
					style={{
						marginTop: '16px',
						padding: '20px',
						background: '#fff',
						border: `3px ${val} #2271b1`,
						borderRadius: '4px',
						textAlign: 'center',
						fontSize: '13px',
						color: '#1e1e1e',
					}}
				>
					Previewing border style: <strong>{val}</strong>
				</div>
			</div>
		);
	},
	args: {
		label: 'Border Style',
		value: 'solid',
		options: BORDER_STYLES,
	},
};

export const CustomOptions = {
	render: (args) => {
		const [val, setVal] = useState(args.value || 'auto');
		return (
			<div>
				<SelectControls
					{...args}
					value={val}
					onChange={(newVal) => {
						setVal(newVal);
						args.onChange?.(newVal);
					}}
				/>
				<div
					style={{
						marginTop: '16px',
						fontSize: '12px',
						color: '#646970',
					}}
				>
					Current height mode: <code>{val}</code>
				</div>
			</div>
		);
	},
	args: {
		label: 'Layout Mode',
		value: 'auto',
		options: [
			{ label: 'Auto (Content Based)', value: 'auto' },
			{ label: 'Fixed Height', value: 'fixed' },
			{ label: 'Adapt to First Slide', value: 'adapt' },
			{ label: 'Full Screen Viewport', value: 'fullscreen' },
		],
	},
};
