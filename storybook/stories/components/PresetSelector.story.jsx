/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import PresetSelector from '@Components/preset-selector';

export default {
	title: 'Components/Layout/PresetSelector',
	component: PresetSelector,
	tags: [ 'autodocs' ],
	parameters: {
		docs: {
			description: {
				component:
					'PresetSelector provides an interactive visual grid of card presets with Dashicons, labels, and Pro badges. Selecting a preset applies predefined design tokens, classes, and responsive styles.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label displayed above the preset card grid',
		},
		help: {
			control: 'text',
			description: 'Helpful guidance text displayed below the grid',
		},
		value: {
			control: 'text',
			description: 'Currently active preset CSS class / identifier',
		},
		presets: {
			control: 'object',
			description:
				'Array of preset definitions { value, label, icon, attributes?, isPro?, description?, isDefault? }',
		},
		columns: {
			control: { type: 'select' },
			options: [ 2, 3, 4 ],
			description: 'Number of columns in grid layout',
		},
		isProActive: {
			control: 'boolean',
			description: 'Whether Pro license is active to unlock Pro presets',
		},
		defaultPresetValue: {
			control: 'text',
			description: 'Fallback preset identifier used for reset action',
		},
		onChange: {
			action: 'presetChanged',
			description: 'Callback fired when a preset card is selected',
		},
		setAttributes: {
			action: 'attributesUpdated',
			description:
				'Callback fired with attribute overrides associated with the chosen preset',
		},
	},
};

const BASE_PRESETS = [
	{
		value: 'preset-classic',
		label: 'Classic',
		icon: 'align-center',
		description: 'Centered layout with balanced padding and neutral tones',
		isDefault: true,
		attributes: [
			{
				label: 'contentAlignment',
				value: {
					Desktop: 'center',
					Tablet: 'center',
					Mobile: 'center',
				},
			},
			{
				label: 'contentPaddingDesktop',
				value: { top: '30', right: '30', bottom: '30', left: '30' },
			},
		],
	},
	{
		value: 'preset-modern',
		label: 'Modern',
		icon: 'align-left',
		description: 'Left-aligned clean design with prominent typography',
		attributes: [
			{
				label: 'contentAlignment',
				value: { Desktop: 'left', Tablet: 'left', Mobile: 'left' },
			},
			{
				label: 'contentPaddingDesktop',
				value: { top: '40', right: '30', bottom: '40', left: '30' },
			},
		],
	},
	{
		value: 'preset-minimal',
		label: 'Minimal',
		icon: 'editor-kitchensink',
		description: 'Slim borders with subtle shadows and compact spacing',
		attributes: [
			{
				label: 'contentAlignment',
				value: {
					Desktop: 'center',
					Tablet: 'center',
					Mobile: 'center',
				},
			},
			{
				label: 'contentPaddingDesktop',
				value: { top: '15', right: '15', bottom: '15', left: '15' },
			},
		],
	},
	{
		value: 'preset-bold',
		label: 'Bold Hero',
		icon: 'star-filled',
		description: 'Heavy contrast hero preset with generous padding',
		attributes: [
			{
				label: 'contentAlignment',
				value: {
					Desktop: 'center',
					Tablet: 'center',
					Mobile: 'center',
				},
			},
			{
				label: 'contentPaddingDesktop',
				value: { top: '60', right: '40', bottom: '60', left: '40' },
			},
		],
	},
];

const PRESETS_WITH_PRO = [
	...BASE_PRESETS.slice( 0, 2 ),
	{
		value: 'preset-glassmorphism',
		label: 'Glass Pro',
		icon: 'art',
		description: 'Translucent frosted glass backdrop with blur effect',
		isPro: true,
		attributes: [
			{
				label: 'contentAlignment',
				value: {
					Desktop: 'center',
					Tablet: 'center',
					Mobile: 'center',
				},
			},
		],
	},
	{
		value: 'preset-neon-glow',
		label: 'Neon Glow',
		icon: 'lightbulb',
		description: 'Vibrant neon gradient shadows and dark mode styling',
		isPro: true,
		attributes: [
			{
				label: 'contentAlignment',
				value: {
					Desktop: 'center',
					Tablet: 'center',
					Mobile: 'center',
				},
			},
		],
	},
];

export const Default = {
	render: function Render( args ) {
		const [ activePreset, setActivePreset ] = useState(
			args.value || 'preset-classic'
		);
		const [ activeAttributes, setActiveAttributes ] = useState( {} );

		return (
			<div
				style={ {
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
				} }
			>
				<PresetSelector
					{ ...args }
					value={ activePreset }
					onChange={ ( val ) => {
						setActivePreset( val );
						args.onChange?.( val );
					} }
					setAttributes={ ( attrs ) => {
						setActiveAttributes( attrs );
						args.setAttributes?.( attrs );
					} }
				/>
				<div
					style={ {
						padding: '12px 16px',
						background: '#f6f7f7',
						border: '1px solid #dcdcde',
						borderRadius: '4px',
						fontSize: '12px',
						color: '#3c434a',
					} }
				>
					<div style={ { marginBottom: '4px' } }>
						<strong>Active Preset Class:</strong>{ ' ' }
						<code
							style={ {
								background: '#e0e0e0',
								padding: '2px 6px',
								borderRadius: '3px',
							} }
						>
							{ activePreset }
						</code>
					</div>
					<div>
						<strong>Applied Overrides:</strong>{ ' ' }
						{ Object.keys( activeAttributes ).length
							? JSON.stringify( activeAttributes )
							: '(Default settings applied)' }
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Card Style Presets',
		help: 'Choose a preset to instantly re-theme layout, padding, and alignment.',
		presets: BASE_PRESETS,
		value: 'preset-classic',
		columns: 2,
		isProActive: false,
		defaultPresetValue: 'preset-classic',
	},
};

export const WithProPresetsLocked = {
	render: function Render( args ) {
		const [ activePreset, setActivePreset ] = useState(
			args.value || 'preset-classic'
		);

		return (
			<div
				style={ {
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
				} }
			>
				<PresetSelector
					{ ...args }
					value={ activePreset }
					onChange={ ( val ) => {
						setActivePreset( val );
						args.onChange?.( val );
					} }
				/>
				<div
					style={ {
						padding: '10px 14px',
						background: '#fff8e5',
						border: '1px solid #f0b849',
						borderRadius: '4px',
						fontSize: '12px',
						color: '#614700',
					} }
				>
					🔒 <strong>Pro Presets Locked:</strong> Click the Pro badges
					to see protected click behavior.
				</div>
			</div>
		);
	},
	args: {
		label: 'Choose Slider Preset',
		help: 'Pro presets require an active GSlider Pro license.',
		presets: PRESETS_WITH_PRO,
		value: 'preset-classic',
		columns: 2,
		isProActive: false,
	},
};

export const WithProPresetsUnlocked = {
	render: function Render( args ) {
		const [ activePreset, setActivePreset ] = useState(
			args.value || 'preset-glassmorphism'
		);

		return (
			<div
				style={ {
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
				} }
			>
				<PresetSelector
					{ ...args }
					value={ activePreset }
					onChange={ ( val ) => {
						setActivePreset( val );
						args.onChange?.( val );
					} }
				/>
				<div
					style={ {
						padding: '10px 14px',
						background: '#edf7ed',
						border: '1px solid #4caf50',
						borderRadius: '4px',
						fontSize: '12px',
						color: '#1e4620',
					} }
				>
					✨ <strong>Pro Unlocked:</strong> All premium presets are
					selectable without restrictions.
				</div>
			</div>
		);
	},
	args: {
		label: 'Choose Slider Preset',
		help: 'GSlider Pro license verified and active.',
		presets: PRESETS_WITH_PRO,
		value: 'preset-glassmorphism',
		columns: 2,
		isProActive: true,
	},
};

export const ThreeColumnsGrid = {
	render: function Render( args ) {
		const [ activePreset, setActivePreset ] = useState(
			args.value || 'preset-classic'
		);

		return (
			<PresetSelector
				{ ...args }
				value={ activePreset }
				onChange={ ( val ) => {
					setActivePreset( val );
					args.onChange?.( val );
				} }
			/>
		);
	},
	args: {
		label: 'Multi-Column Presets Grid',
		help: 'Expanded 3-column layout suited for wider inspector sidebars or modal dialogs.',
		presets: [
			...BASE_PRESETS,
			{
				value: 'preset-compact',
				label: 'Compact',
				icon: 'grid-view',
				description: 'Dense layout for thumbnail sliders',
			},
			{
				value: 'preset-creative',
				label: 'Creative',
				icon: 'slides',
				description: 'Asymmetric artistic layout',
			},
		],
		value: 'preset-classic',
		columns: 3,
		isProActive: true,
	},
};

export const WithResetButton = {
	render: function Render( args ) {
		const [ activePreset, setActivePreset ] = useState(
			args.value || 'preset-bold'
		);

		return (
			<div
				style={ {
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
				} }
			>
				<PresetSelector
					{ ...args }
					value={ activePreset }
					onChange={ ( val ) => {
						setActivePreset( val );
						args.onChange?.( val );
					} }
				/>
				<div
					style={ {
						padding: '10px 14px',
						background: '#f0f0f1',
						borderRadius: '4px',
						fontSize: '12px',
						color: '#3c434a',
					} }
				>
					Current non-default selection triggers the{ ' ' }
					<strong>↺ Reset button</strong> in the header.
				</div>
			</div>
		);
	},
	args: {
		label: 'Card Style Presets',
		help: 'Click the reset icon in the top right to revert to default preset.',
		presets: BASE_PRESETS,
		value: 'preset-bold',
		columns: 2,
		defaultPresetValue: 'preset-classic',
	},
};
