import { useState } from 'react';
import ResponsiveAlignmentControl from '@Components/responsive-alignment-control';
import {
	HORIZONTAL_POSITION_ICONS,
	VERTICAL_ALIGN,
} from '@Constants';

const JUSTIFY_ICON = (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		aria-hidden="true"
		focusable="false"
	>
		<path
			d="M4 5h16v1.5H4V5zm0 6h16v1.5H4V11zm0 6h16v1.5H4V17z"
			fill="currentColor"
		/>
	</svg>
);

const HORIZONTAL_ALIGN_WITH_JUSTIFY = [
	{ label: HORIZONTAL_POSITION_ICONS.left, value: 'left' },
	{ label: HORIZONTAL_POSITION_ICONS.center, value: 'center' },
	{ label: HORIZONTAL_POSITION_ICONS.right, value: 'right' },
	{ label: JUSTIFY_ICON, value: 'justify' },
];

const TEXT_ALIGN_OPTIONS = [
	{
		label: (
			<span style={{ fontSize: '11px', fontWeight: 600 }}>LEFT</span>
		),
		value: 'left',
	},
	{
		label: (
			<span style={{ fontSize: '11px', fontWeight: 600 }}>CENTER</span>
		),
		value: 'center',
	},
	{
		label: (
			<span style={{ fontSize: '11px', fontWeight: 600 }}>RIGHT</span>
		),
		value: 'right',
	},
	{
		label: (
			<span style={{ fontSize: '11px', fontWeight: 600 }}>JUSTIFY</span>
		),
		value: 'justify',
	},
];

export default {
	title: 'Components/Responsive/ResponsiveAlignmentControl',
	component: ResponsiveAlignmentControl,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'ResponsiveAlignmentControl provides device-aware alignment button groups (Horizontal, Vertical, Text align) allowing users to configure distinct alignments across Desktop, Tablet, and Mobile viewports.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label displayed alongside the responsive device selector',
		},
		deviceType: {
			control: { type: 'select' },
			options: ['Desktop', 'Tablet', 'Mobile'],
			description: 'Active viewport device preview',
		},
		options: {
			control: 'object',
			description: 'Alignment button options array with { label, value }',
		},
		alignmentValue: {
			control: 'object',
			description: 'Responsive alignment object { Desktop, Tablet, Mobile }',
		},
		className: {
			control: 'text',
			description: 'Optional CSS class passed to the button group wrapper',
		},
		setAlignmentValue: {
			action: 'alignmentChanged',
			description: 'Callback fired when an alignment option is selected',
		},
		setAttributes: {
			action: 'attributesUpdated',
			description: 'Gutenberg setAttributes handler',
		},
	},
};

export const HorizontalAlignment = {
	render: (args) => {
		const [device, setDevice] = useState(args.deviceType || 'Desktop');
		const [values, setValues] = useState(
			args.alignmentValue || {
				Desktop: 'center',
				Tablet: 'left',
				Mobile: 'center',
			}
		);

		const activeAlignment = values[device] || 'center';

		const getJustify = (align) => {
			if (align === 'left') return 'flex-start';
			if (align === 'right') return 'flex-end';
			if (align === 'justify') return 'space-between';
			return 'center';
		};

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
						Switch Viewport:
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

				<ResponsiveAlignmentControl
					{...args}
					deviceType={device}
					alignmentValue={values}
					setAlignmentValue={(newVal) => {
						setValues(newVal);
						args.setAlignmentValue?.(newVal);
					}}
					setAttributes={(newAttrs) => {
						if (newAttrs?.alignmentValue) {
							setValues(newAttrs.alignmentValue);
						}
						args.setAttributes?.(newAttrs);
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
						{device} Viewport Live Preview ({activeAlignment})
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: getJustify(activeAlignment),
							background: '#fff',
							padding: '12px',
							border: '1px solid #e2e4e7',
							borderRadius: '3px',
						}}
					>
						<div
							style={{
								padding: '8px 16px',
								background: '#2271b1',
								color: '#fff',
								borderRadius: '3px',
								fontSize: '13px',
								fontWeight: 500,
							}}
						>
							Content Block ({activeAlignment})
						</div>
						{activeAlignment === 'justify' && (
							<div
								style={{
									padding: '8px 16px',
									background: '#72aee6',
									color: '#fff',
									borderRadius: '3px',
									fontSize: '13px',
									fontWeight: 500,
								}}
							>
								Second Item
							</div>
						)}
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Horizontal Alignment',
		deviceType: 'Desktop',
		options: HORIZONTAL_ALIGN_WITH_JUSTIFY,
		alignmentValue: {
			Desktop: 'center',
			Tablet: 'left',
			Mobile: 'center',
		},
	},
};

export const VerticalAlignment = {
	render: (args) => {
		const [device, setDevice] = useState(args.deviceType || 'Desktop');
		const [values, setValues] = useState(
			args.alignmentValue || {
				Desktop: 'center',
				Tablet: 'flex-start',
				Mobile: 'flex-end',
			}
		);

		const activeAlignment = values[device] || 'center';

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
						Switch Viewport:
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

				<ResponsiveAlignmentControl
					{...args}
					deviceType={device}
					alignmentValue={values}
					className="gslider-vertical-alignment"
					setAlignmentValue={(newVal) => {
						setValues(newVal);
						args.setAlignmentValue?.(newVal);
					}}
					setAttributes={(newAttrs) => {
						if (newAttrs?.alignmentValue) {
							setValues(newAttrs.alignmentValue);
						}
						args.setAttributes?.(newAttrs);
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
						{device} Viewport Live Preview (Height: 140px, align: {activeAlignment})
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: activeAlignment,
							justifyContent: 'center',
							height: '140px',
							background: '#fff',
							border: '1px solid #e2e4e7',
							borderRadius: '3px',
						}}
					>
						<div
							style={{
								padding: '8px 16px',
								background: '#3858e9',
								color: '#fff',
								borderRadius: '3px',
								fontSize: '13px',
								fontWeight: 500,
							}}
						>
							Vertical Position ({activeAlignment})
						</div>
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Vertical Alignment',
		deviceType: 'Desktop',
		options: VERTICAL_ALIGN,
		alignmentValue: {
			Desktop: 'center',
			Tablet: 'flex-start',
			Mobile: 'flex-end',
		},
		className: 'gslider-vertical-alignment',
	},
};

export const TextAlignment = {
	render: (args) => {
		const [device, setDevice] = useState(args.deviceType || 'Desktop');
		const [values, setValues] = useState(
			args.alignmentValue || {
				Desktop: 'left',
				Tablet: 'center',
				Mobile: 'center',
			}
		);

		const activeAlignment = values[device] || 'left';

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
						Switch Viewport:
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

				<ResponsiveAlignmentControl
					{...args}
					deviceType={device}
					alignmentValue={values}
					setAlignmentValue={(newVal) => {
						setValues(newVal);
						args.setAlignmentValue?.(newVal);
					}}
					setAttributes={(newAttrs) => {
						if (newAttrs?.alignmentValue) {
							setValues(newAttrs.alignmentValue);
						}
						args.setAttributes?.(newAttrs);
					}}
				/>

				<div
					style={{
						marginTop: '20px',
						padding: '16px',
						background: '#fff',
						border: '1px solid #e2e4e7',
						borderRadius: '4px',
						textAlign: activeAlignment,
					}}
				>
					<h4 style={{ margin: '0 0 8px 0', color: '#1e1e1e' }}>
						Slide Heading ({activeAlignment})
					</h4>
					<p
						style={{
							margin: 0,
							fontSize: '13px',
							color: '#646970',
							lineHeight: 1.6,
						}}
					>
						GSlider Blocks provides ultra-fast, responsive sliders and carousels
						built natively for Gutenberg editor with precision control over typography,
						alignment, and responsive breakpoints.
					</p>
				</div>
			</div>
		);
	},
	args: {
		label: 'Text Alignment',
		deviceType: 'Desktop',
		options: TEXT_ALIGN_OPTIONS,
		alignmentValue: {
			Desktop: 'left',
			Tablet: 'center',
			Mobile: 'center',
		},
	},
};
