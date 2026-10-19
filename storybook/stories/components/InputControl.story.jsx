import { useState } from 'react';
import InputControl from '@Components/input-control';

export default {
	title: 'Components/Primitives/InputControl',
	component: InputControl,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'InputControl wraps WordPress BaseControl and __experimentalInputControl for text, number, and custom slider input fields.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label displayed above the input field',
		},
		value: {
			control: 'text',
			description: 'Current value of the input',
		},
		helpText: {
			control: 'text',
			description: 'Helpful guidance text displayed below the field',
		},
		onChangeValue: {
			action: 'valueChange',
			description: 'Callback fired when input value changes',
		},
	},
};

export const Default = {
	render: (args) => {
		const [val, setVal] = useState(args.value || 'GSlider Slide 1');
		return (
			<InputControl
				{...args}
				value={val}
				onChangeValue={(newVal) => {
					setVal(newVal);
					args.onChangeValue?.(newVal);
				}}
			/>
		);
	},
	args: {
		label: 'Slide Title',
		value: 'GSlider Slide 1',
		helpText: 'Enter a descriptive title for this slide.',
	},
};

export const NumberInput = {
	render: (args) => {
		const [val, setVal] = useState(args.value || '5000');
		return (
			<InputControl
				{...args}
				value={val}
				onChangeValue={(newVal) => {
					setVal(newVal);
					args.onChangeValue?.(newVal);
				}}
			/>
		);
	},
	args: {
		label: 'Autoplay Delay (ms)',
		value: '5000',
		helpText: 'Time between slide transitions in milliseconds.',
	},
};
