import { useState, useCallback } from 'react';
import BoxShadowSettingsControl from '@Components/box-shadow-control';
import SwitcherControl from '@Components/switcher-control';
import { NORMAL_HOVER } from '@Constants/index';

export default {
	title: 'Components/Effects/BoxShadowControl',
	component: BoxShadowSettingsControl,
	tags: [ 'autodocs' ],
	parameters: {
		docs: {
			description: {
				component:
					'BoxShadowSettingsControl provides a complete CSS box-shadow configurator via a popover dropdown, controlling horizontal offset, vertical offset, blur radius, spread radius, color with alpha transparency, and inset/outset toggling.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label displayed in the base control wrapper',
		},
		initialShadowValue: {
			control: 'object',
			description:
				'6-tuple shadow definition array: [offsetX, offsetY, blur, spread, inset, color]',
		},
		onBoxShadowChange: {
			action: 'boxShadowChanged',
			description: 'Callback fired with raw 6-tuple shadow array',
		},
		onBoxShadowStyleChange: {
			action: 'boxShadowStyleChanged',
			description: 'Callback fired with serialized CSS box-shadow string',
		},
	},
};

export const Default = {
	render: ( args ) => {
		const [ shadowValue, setShadowValue ] = useState(
			args.initialShadowValue || [
				0,
				8,
				24,
				0,
				'',
				'rgba(0, 0, 0, 0.15)',
			]
		);
		const [ cssStyle, setCssStyle ] = useState(
			'0px 8px 24px 0px rgba(0, 0, 0, 0.15)'
		);

		const handleShadowChange = useCallback(
			( val ) => {
				setShadowValue( val );
				args.onBoxShadowChange?.( val );
			},
			[ args ]
		);

		const handleStyleChange = useCallback(
			( style ) => {
				setCssStyle( style );
				args.onBoxShadowStyleChange?.( style );
			},
			[ args ]
		);

		return (
			<div>
				<BoxShadowSettingsControl
					label={ args.label || 'Box Shadow' }
					initialShadowValue={ shadowValue }
					onBoxShadowChange={ handleShadowChange }
					onBoxShadowStyleChange={ handleStyleChange }
				/>

				<div
					style={ {
						marginTop: '24px',
						padding: '24px',
						borderRadius: '8px',
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
							marginBottom: '16px',
						} }
					>
						Live Elevation Preview
					</div>
					<div
						style={ {
							padding: '30px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							background: '#ffffff',
							borderRadius: '8px',
							border: '1px dashed #cbd5e1',
						} }
					>
						<div
							style={ {
								width: '180px',
								height: '110px',
								borderRadius: '8px',
								background: '#ffffff',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								boxShadow: cssStyle,
								transition: 'box-shadow 0.2s ease',
							} }
						>
							<span
								style={ {
									fontSize: '13px',
									fontWeight: 600,
									color: '#1e293b',
								} }
							>
								Elevated Card
							</span>
							<span
								style={ {
									fontSize: '11px',
									color: '#64748b',
									marginTop: '4px',
								} }
							>
								{ shadowValue[ 4 ] === 'inset'
									? 'Inset Shadow'
									: 'Drop Shadow' }
							</span>
						</div>
					</div>
					<div
						style={ {
							marginTop: '12px',
							padding: '8px 12px',
							borderRadius: '4px',
							background: '#0f172a',
							color: '#38bdf8',
							fontSize: '11px',
							fontFamily: 'monospace',
							wordBreak: 'break-all',
						} }
					>
						box-shadow: { cssStyle || 'none' };
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Card Elevation',
		initialShadowValue: [ 0, 8, 24, 0, '', 'rgba(0, 0, 0, 0.15)' ],
	},
};

export const InsetShadow = {
	render: ( args ) => {
		const [ shadowValue, setShadowValue ] = useState(
			args.initialShadowValue || [
				0,
				4,
				12,
				0,
				'inset',
				'rgba(0, 0, 0, 0.25)',
			]
		);
		const [ cssStyle, setCssStyle ] = useState(
			'0px 4px 12px 0px inset rgba(0, 0, 0, 0.25)'
		);

		const handleShadowChange = useCallback(
			( val ) => {
				setShadowValue( val );
				args.onBoxShadowChange?.( val );
			},
			[ args ]
		);

		const handleStyleChange = useCallback(
			( style ) => {
				setCssStyle( style );
				args.onBoxShadowStyleChange?.( style );
			},
			[ args ]
		);

		return (
			<div>
				<BoxShadowSettingsControl
					label={ args.label || 'Inner Inset Shadow' }
					initialShadowValue={ shadowValue }
					onBoxShadowChange={ handleShadowChange }
					onBoxShadowStyleChange={ handleStyleChange }
				/>

				<div
					style={ {
						marginTop: '24px',
						padding: '24px',
						borderRadius: '8px',
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
							marginBottom: '16px',
						} }
					>
						Inner Well / Pressed State Preview
					</div>
					<div
						style={ {
							padding: '30px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							background: '#f1f5f9',
							borderRadius: '8px',
						} }
					>
						<div
							style={ {
								width: '180px',
								height: '110px',
								borderRadius: '8px',
								background: '#e2e8f0',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								boxShadow: cssStyle,
								transition: 'box-shadow 0.2s ease',
							} }
						>
							<span
								style={ {
									fontSize: '13px',
									fontWeight: 600,
									color: '#334155',
								} }
							>
								Sunken Container
							</span>
							<span
								style={ {
									fontSize: '11px',
									color: '#64748b',
									marginTop: '4px',
								} }
							>
								inset mode active
							</span>
						</div>
					</div>
					<div
						style={ {
							marginTop: '12px',
							padding: '8px 12px',
							borderRadius: '4px',
							background: '#0f172a',
							color: '#38bdf8',
							fontSize: '11px',
							fontFamily: 'monospace',
							wordBreak: 'break-all',
						} }
					>
						box-shadow: { cssStyle || 'none' };
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Well / Pressed Shadow',
		initialShadowValue: [ 0, 4, 12, 0, 'inset', 'rgba(0, 0, 0, 0.25)' ],
	},
};

export const ColoredGlow = {
	render: ( args ) => {
		const [ shadowValue, setShadowValue ] = useState(
			args.initialShadowValue || [
				0,
				10,
				30,
				2,
				'',
				'rgba(37, 99, 235, 0.45)',
			]
		);
		const [ cssStyle, setCssStyle ] = useState(
			'0px 10px 30px 2px rgba(37, 99, 235, 0.45)'
		);

		const handleShadowChange = useCallback(
			( val ) => {
				setShadowValue( val );
				args.onBoxShadowChange?.( val );
			},
			[ args ]
		);

		const handleStyleChange = useCallback(
			( style ) => {
				setCssStyle( style );
				args.onBoxShadowStyleChange?.( style );
			},
			[ args ]
		);

		return (
			<div>
				<BoxShadowSettingsControl
					label={ args.label || 'Colored Glow Shadow' }
					initialShadowValue={ shadowValue }
					onBoxShadowChange={ handleShadowChange }
					onBoxShadowStyleChange={ handleStyleChange }
				/>

				<div
					style={ {
						marginTop: '24px',
						padding: '24px',
						borderRadius: '8px',
						background: '#0f172a',
						border: '1px solid #1e293b',
					} }
				>
					<div
						style={ {
							fontSize: '11px',
							fontWeight: 600,
							textTransform: 'uppercase',
							letterSpacing: '0.05em',
							color: '#94a3b8',
							marginBottom: '16px',
						} }
					>
						Dark Mode Colored Glow Preview
					</div>
					<div
						style={ {
							padding: '30px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '8px',
						} }
					>
						<div
							style={ {
								width: '180px',
								height: '110px',
								borderRadius: '8px',
								background: '#1e293b',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								boxShadow: cssStyle,
								border: '1px solid #334155',
								transition: 'box-shadow 0.2s ease',
							} }
						>
							<span
								style={ {
									fontSize: '13px',
									fontWeight: 600,
									color: '#f8fafc',
								} }
							>
								Neon Element
							</span>
							<span
								style={ {
									fontSize: '11px',
									color: '#38bdf8',
									marginTop: '4px',
								} }
							>
								Accent Glow
							</span>
						</div>
					</div>
					<div
						style={ {
							marginTop: '12px',
							padding: '8px 12px',
							borderRadius: '4px',
							background: '#020617',
							color: '#38bdf8',
							fontSize: '11px',
							fontFamily: 'monospace',
							wordBreak: 'break-all',
						} }
					>
						box-shadow: { cssStyle || 'none' };
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Neon Accent Glow',
		initialShadowValue: [ 0, 10, 30, 2, '', 'rgba(37, 99, 235, 0.45)' ],
	},
};

export const NormalAndHoverTransition = {
	render: ( args ) => {
		const [ tab, setTab ] = useState( 'normal' );
		const [ normalShadow, setNormalShadow ] = useState(
			args.initialShadowValue || [
				0,
				4,
				10,
				0,
				'',
				'rgba(0, 0, 0, 0.08)',
			]
		);
		const [ normalCss, setNormalCss ] = useState(
			'0px 4px 10px 0px rgba(0, 0, 0, 0.08)'
		);
		const [ hoverShadow, setHoverShadow ] = useState(
			args.hoverShadowValue || [ 0, 16, 32, 0, '', 'rgba(0, 0, 0, 0.18)' ]
		);
		const [ hoverCss, setHoverCss ] = useState(
			'0px 16px 32px 0px rgba(0, 0, 0, 0.18)'
		);
		const [ isHovered, setIsHovered ] = useState( false );

		const handleNormalShadowChange = useCallback( ( val ) => {
			setNormalShadow( val );
		}, [] );

		const handleNormalCssChange = useCallback( ( style ) => {
			setNormalCss( style );
		}, [] );

		const handleHoverShadowChange = useCallback( ( val ) => {
			setHoverShadow( val );
		}, [] );

		const handleHoverCssChange = useCallback( ( style ) => {
			setHoverCss( style );
		}, [] );

		return (
			<div>
				<SwitcherControl
					label="Shadow State Mode"
					options={ NORMAL_HOVER }
					value={ tab }
					onChange={ setTab }
				/>

				{ tab === 'normal' && (
					<BoxShadowSettingsControl
						label="Normal Shadow"
						initialShadowValue={ normalShadow }
						onBoxShadowChange={ handleNormalShadowChange }
						onBoxShadowStyleChange={ handleNormalCssChange }
					/>
				) }

				{ tab === 'hover' && (
					<BoxShadowSettingsControl
						label="Hover Shadow"
						initialShadowValue={ hoverShadow }
						onBoxShadowChange={ handleHoverShadowChange }
						onBoxShadowStyleChange={ handleHoverCssChange }
					/>
				) }

				<div
					style={ {
						marginTop: '24px',
						padding: '24px',
						borderRadius: '8px',
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
							marginBottom: '16px',
						} }
					>
						Interactive Hover Target (Hover Mouse Below)
					</div>
					<div
						style={ {
							padding: '30px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							background: '#ffffff',
							borderRadius: '8px',
							border: '1px dashed #cbd5e1',
						} }
					>
						<div
							onMouseEnter={ () => setIsHovered( true ) }
							onMouseLeave={ () => setIsHovered( false ) }
							style={ {
								width: '200px',
								height: '110px',
								borderRadius: '8px',
								background: '#ffffff',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								boxShadow: isHovered ? hoverCss : normalCss,
								transform: isHovered
									? 'translateY(-4px)'
									: 'translateY(0)',
								transition:
									'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
								cursor: 'pointer',
								border: '1px solid #e2e8f0',
							} }
						>
							<span
								style={ {
									fontSize: '13px',
									fontWeight: 600,
									color: '#0f172a',
								} }
							>
								{ isHovered
									? 'Hover Elevated'
									: 'Resting State' }
							</span>
							<span
								style={ {
									fontSize: '11px',
									color: '#64748b',
									marginTop: '4px',
								} }
							>
								{ isHovered
									? 'hover shadow active'
									: 'normal shadow active' }
							</span>
						</div>
					</div>
					<div
						style={ {
							marginTop: '12px',
							display: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: '8px',
						} }
					>
						<div
							style={ {
								padding: '8px 10px',
								borderRadius: '4px',
								background: ! isHovered ? '#0f172a' : '#1e293b',
								color: ! isHovered ? '#38bdf8' : '#94a3b8',
								fontSize: '10px',
								fontFamily: 'monospace',
							} }
						>
							Normal: { normalCss }
						</div>
						<div
							style={ {
								padding: '8px 10px',
								borderRadius: '4px',
								background: isHovered ? '#0f172a' : '#1e293b',
								color: isHovered ? '#38bdf8' : '#94a3b8',
								fontSize: '10px',
								fontFamily: 'monospace',
							} }
						>
							Hover: { hoverCss }
						</div>
					</div>
				</div>
			</div>
		);
	},
	args: {
		initialShadowValue: [ 0, 4, 10, 0, '', 'rgba(0, 0, 0, 0.08)' ],
		hoverShadowValue: [ 0, 16, 32, 0, '', 'rgba(0, 0, 0, 0.18)' ],
	},
};
