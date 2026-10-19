import { useState } from 'react';
import SwitcherControl from '@Components/switcher-control';

export default {
	title: 'Components/Primitives/SwitcherControl',
	component: SwitcherControl,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'SwitcherControl provides a multi-option button group selector (e.g. Normal vs Hover, Auto vs Fixed, Solid vs Gradient) used extensively across GSlider inspector settings.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label displayed above the switcher button group',
		},
		value: {
			control: 'text',
			description: 'Currently active option value',
		},
		options: {
			control: 'object',
			description: 'Array of option items with { label, value }',
		},
		help: {
			control: 'text',
			description: 'Helpful guidance text displayed below the field',
		},
		onChange: {
			action: 'switcherChanged',
			description: 'Callback fired when an option button is selected',
		},
	},
};

export const Default = {
	render: (args) => {
		const [val, setVal] = useState(args.value || 'normal');
		return (
			<SwitcherControl
				{...args}
				value={val}
				onChange={(newVal) => {
					setVal(newVal);
					args.onChange?.(newVal);
				}}
			/>
		);
	},
	args: {
		label: 'Color Mode',
		value: 'normal',
		options: [
			{ label: 'Normal', value: 'normal' },
			{ label: 'Hover', value: 'hover' },
		],
		help: 'Switch between normal and hover styling states.',
	},
};

export const LayoutHeightSwitcher = {
	render: (args) => {
		const [val, setVal] = useState(args.value || 'auto');
		return (
			<SwitcherControl
				{...args}
				value={val}
				onChange={(newVal) => {
					setVal(newVal);
					args.onChange?.(newVal);
				}}
			/>
		);
	},
	args: {
		label: 'Layout Height Switcher',
		value: 'auto',
		options: [
			{ label: 'Auto', value: 'auto' },
			{ label: 'Fixed', value: 'fixed' },
		],
		help: 'Choose auto height or a fixed slider height.',
	},
};

export const TripleOptions = {
	render: (args) => {
		const [val, setVal] = useState(args.value || 'solid');
		return (
			<SwitcherControl
				{...args}
				value={val}
				onChange={(newVal) => {
					setVal(newVal);
					args.onChange?.(newVal);
				}}
			/>
		);
	},
	args: {
		label: 'Background Type',
		value: 'solid',
		options: [
			{ label: 'Classic', value: 'solid' },
			{ label: 'Gradient', value: 'gradient' },
			{ label: 'Image', value: 'image' },
		],
		help: 'Select background filling method.',
	},
};
