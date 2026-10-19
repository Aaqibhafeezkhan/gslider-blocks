import { useState } from 'react';
import UnitControl from '@Components/unit-control';

export default {
	title: 'Components/Primitives/UnitControl',
	component: UnitControl,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'UnitControl allows users to switch between CSS units (px, %, em, rem, vh, vw) via an interactive dropdown popup.',
			},
		},
	},
	argTypes: {
		currentUnit: {
			control: { type: 'select' },
			options: ['px', '%', 'em', 'rem', 'vh', 'vw'],
			description: 'Currently selected CSS unit',
		},
		unitTypes: {
			control: 'object',
			description: 'Array of selectable unit options { label, value }',
		},
		onUnitChange: {
			action: 'unitChanged',
			description: 'Callback fired when unit is selected',
		},
	},
};

export const Default = {
	render: (args) => {
		const [unit, setUnit] = useState(args.currentUnit || 'px');
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '8px 0',
				}}
			>
				<span
					style={{
						fontSize: '13px',
						fontWeight: 500,
						color: '#1e1e1e',
					}}
				>
					Units
				</span>
				<UnitControl
					{...args}
					currentUnit={unit}
					onUnitChange={(newUnit) => {
						setUnit(newUnit);
						args.onUnitChange?.(newUnit);
					}}
				/>
			</div>
		);
	},
	args: {
		currentUnit: 'px',
	},
};

export const CustomUnits = {
	render: (args) => {
		const [unit, setUnit] = useState(args.currentUnit || 'rem');
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '8px 0',
				}}
			>
				<span
					style={{
						fontSize: '13px',
						fontWeight: 500,
						color: '#1e1e1e',
					}}
				>
					Typography Units
				</span>
				<UnitControl
					{...args}
					currentUnit={unit}
					onUnitChange={(newUnit) => {
						setUnit(newUnit);
						args.onUnitChange?.(newUnit);
					}}
				/>
			</div>
		);
	},
	args: {
		currentUnit: 'rem',
		unitTypes: [
			{ label: 'px', value: 'px' },
			{ label: 'rem', value: 'rem' },
			{ label: 'em', value: 'em' },
		],
	},
};
