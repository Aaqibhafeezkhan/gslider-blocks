import { useState } from 'react';
import ColorControl from '@Components/color-control';
import SwitcherControl from '@Components/switcher-control';
import { NORMAL_HOVER } from '@Constants/index';

export default {
	title: 'Components/Color/ColorControl',
	component: ColorControl,
	tags: [ 'autodocs' ],
	parameters: {
		docs: {
			description: {
				component:
					'ColorControl provides a unified Gutenberg solid color picker dropdown with alpha opacity support, reset button, 50 built-in palette presets, and theme color integration.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description:
				'Label displayed alongside the color picker in BaseControl',
		},
		color: {
			control: 'color',
			description: 'Current color value (HEX, RGB, or RGBA string)',
		},
		defaultColor: {
			control: 'color',
			description:
				'Fallback color applied when clicking the reset button',
		},
		onChangeColor: {
			action: 'colorChanged',
			description:
				'Callback fired when the color value is changed or reset',
		},
	},
};

export const Default = {
	render: ( args ) => {
		const [ color, setColor ] = useState( args.color || '#2563eb' );

		const handleColorChange = ( newColor ) => {
			setColor( newColor );
			args.onChangeColor?.( newColor );
		};

		return (
			<div>
				<ColorControl
					label={ args.label || 'Accent Color' }
					color={ color }
					onChangeColor={ handleColorChange }
					defaultColor={ args.defaultColor ?? '#2563eb' }
				/>

				<div
					style={ {
						marginTop: '20px',
						padding: '16px',
						borderRadius: '6px',
						background: '#f8fafc',
						border: '1px solid #e2e8f0',
					} }
				>
					<div
						style={ {
							fontSize: '11px',
							fontWeight: 600,
							textTransform: 'uppercase',
							letterSpacing: '0.05em',
							color: '#64748b',
							marginBottom: '10px',
						} }
					>
						Live Color Preview
					</div>
					<div
						style={ {
							height: '70px',
							borderRadius: '6px',
							backgroundColor: color || 'transparent',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
							transition: 'background-color 0.2s ease',
						} }
					>
						<span
							style={ {
								padding: '4px 10px',
								borderRadius: '4px',
								background: 'rgba(255, 255, 255, 0.9)',
								color: '#0f172a',
								fontSize: '12px',
								fontFamily: 'monospace',
								fontWeight: 600,
								boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
							} }
						>
							{ color || 'None (Transparent)' }
						</span>
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Button Color',
		color: '#2563eb',
		defaultColor: '#2563eb',
	},
};

export const WithAlpha = {
	render: ( args ) => {
		const [ color, setColor ] = useState(
			args.color || 'rgba(37, 99, 235, 0.65)'
		);

		const handleColorChange = ( newColor ) => {
			setColor( newColor );
			args.onChangeColor?.( newColor );
		};

		return (
			<div>
				<ColorControl
					label={ args.label || 'Overlay Color (Alpha)' }
					color={ color }
					onChangeColor={ handleColorChange }
					defaultColor={ args.defaultColor ?? 'rgba(37, 99, 235, 1)' }
				/>

				<div
					style={ {
						marginTop: '20px',
						padding: '16px',
						borderRadius: '6px',
						background: '#f8fafc',
						border: '1px solid #e2e8f0',
					} }
				>
					<div
						style={ {
							fontSize: '11px',
							fontWeight: 600,
							textTransform: 'uppercase',
							letterSpacing: '0.05em',
							color: '#64748b',
							marginBottom: '10px',
						} }
					>
						Checkered Transparency Preview
					</div>
					<div
						style={ {
							height: '70px',
							borderRadius: '6px',
							backgroundImage:
								'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)',
							backgroundSize: '16px 16px',
							backgroundPosition:
								'0 0, 0 8px, 8px -8px, -8px 0px',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
						} }
					>
						<div
							style={ {
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: color || 'transparent',
								transition: 'background-color 0.2s ease',
							} }
						/>
						<span
							style={ {
								position: 'relative',
								zIndex: 1,
								padding: '4px 10px',
								borderRadius: '4px',
								background: 'rgba(255, 255, 255, 0.95)',
								color: '#0f172a',
								fontSize: '12px',
								fontFamily: 'monospace',
								fontWeight: 600,
								boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
							} }
						>
							{ color || 'None (Transparent)' }
						</span>
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Overlay Color',
		color: 'rgba(37, 99, 235, 0.65)',
		defaultColor: 'rgba(37, 99, 235, 1)',
	},
};

export const NormalAndHoverTabs = {
	render: ( args ) => {
		const [ activeTab, setActiveTab ] = useState( 'normal' );
		const [ normalColor, setNormalColor ] = useState(
			args.color || '#2563eb'
		);
		const [ hoverColor, setHoverColor ] = useState(
			args.hoverColor || '#1d4ed8'
		);
		const [ isHovered, setIsHovered ] = useState( false );

		return (
			<div>
				<SwitcherControl
					label="Border Color Mode"
					options={ NORMAL_HOVER }
					value={ activeTab }
					onChange={ setActiveTab }
				/>

				{ activeTab === 'normal' && (
					<ColorControl
						label="Normal Color"
						color={ normalColor }
						onChangeColor={ ( val ) => {
							setNormalColor( val );
							args.onChangeColor?.( val );
						} }
						defaultColor="#2563eb"
					/>
				) }

				{ activeTab === 'hover' && (
					<ColorControl
						label="Hover Color"
						color={ hoverColor }
						onChangeColor={ ( val ) => {
							setHoverColor( val );
							args.onChangeColor?.( val );
						} }
						defaultColor="#1d4ed8"
					/>
				) }

				<div
					style={ {
						marginTop: '20px',
						padding: '16px',
						borderRadius: '6px',
						background: '#f8fafc',
						border: '1px solid #e2e8f0',
					} }
				>
					<div
						style={ {
							fontSize: '11px',
							fontWeight: 600,
							textTransform: 'uppercase',
							letterSpacing: '0.05em',
							color: '#64748b',
							marginBottom: '10px',
						} }
					>
						Interactive Hover Target (Hover Mouse Below)
					</div>
					<button
						type="button"
						onMouseEnter={ () => setIsHovered( true ) }
						onMouseLeave={ () => setIsHovered( false ) }
						style={ {
							width: '100%',
							padding: '12px 20px',
							borderRadius: '6px',
							border: 'none',
							backgroundColor: isHovered
								? hoverColor
								: normalColor,
							color: '#ffffff',
							fontSize: '14px',
							fontWeight: 600,
							cursor: 'pointer',
							transition: 'all 0.25s ease',
							boxShadow: isHovered
								? '0 6px 14px rgba(0, 0, 0, 0.2)'
								: '0 2px 6px rgba(0, 0, 0, 0.1)',
						} }
					>
						{ isHovered
							? `Hover State (${ hoverColor })`
							: `Normal State (${ normalColor })` }
					</button>
				</div>
			</div>
		);
	},
	args: {
		label: 'Interactive States',
		color: '#2563eb',
		hoverColor: '#1d4ed8',
	},
};

export const PaletteSelection = {
	render: ( args ) => {
		const [ color, setColor ] = useState( args.color || '#f59e0b' );

		const handleColorChange = ( newColor ) => {
			setColor( newColor );
			args.onChangeColor?.( newColor );
		};

		return (
			<div>
				<ColorControl
					label={ args.label || 'Theme & Preset Palette' }
					color={ color }
					onChangeColor={ handleColorChange }
					defaultColor={ args.defaultColor ?? '#f59e0b' }
				/>

				<div
					style={ {
						marginTop: '20px',
						padding: '16px',
						borderRadius: '6px',
						background: '#f8fafc',
						border: '1px solid #e2e8f0',
					} }
				>
					<div
						style={ {
							fontSize: '11px',
							fontWeight: 600,
							textTransform: 'uppercase',
							letterSpacing: '0.05em',
							color: '#64748b',
							marginBottom: '8px',
						} }
					>
						Active Swatch
					</div>
					<div
						style={ {
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
						} }
					>
						<div
							style={ {
								width: '28px',
								height: '28px',
								borderRadius: '50%',
								backgroundColor: color || '#f59e0b',
								boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
							} }
						/>
						<span
							style={ {
								fontFamily: 'monospace',
								fontSize: '13px',
								fontWeight: 600,
								color: '#0f172a',
							} }
						>
							{ color }
						</span>
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Preset Swatches',
		color: '#f59e0b',
		defaultColor: '#f59e0b',
	},
};
