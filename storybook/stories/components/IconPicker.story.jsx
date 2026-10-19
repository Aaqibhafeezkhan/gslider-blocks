import { useState } from 'react';
import IconPicker from '@Components/icon-picker';
import renderSVG from '@Components/icon-picker/components/icon-picker/controls/renderIcon';

export default {
	title: 'Components/Primitives/IconPicker',
	component: IconPicker,
	tags: [ 'autodocs' ],
	parameters: {
		docs: {
			description: {
				component:
					'IconPicker provides an interactive SVG icon library selector featuring a virtualized 8-column icon grid, live keyword search filtering, category tabs, and real-time icon preview for slider navigation arrows and buttons.',
			},
		},
	},
	argTypes: {
		value: {
			control: 'text',
			description:
				'Current icon slug identifier (e.g. "angle-right", "arrow-left", "star")',
		},
		setIconHandler: {
			action: 'iconSelected',
			description:
				'Callback fired when an icon is selected from the library modal',
		},
	},
};

export const Default = {
	render: ( args ) => {
		const [ icon, setIcon ] = useState( args.value || 'angle-right' );

		const handleIconChange = ( newIcon ) => {
			setIcon( newIcon );
			args.setIconHandler?.( newIcon );
		};

		return (
			<div>
				<div
					style={ {
						fontSize: '12px',
						fontWeight: 600,
						color: '#50575e',
						marginBottom: '8px',
					} }
				>
					Navigation Arrow Icon
				</div>

				<IconPicker
					value={ icon }
					setIconHandler={ handleIconChange }
				/>

				<div
					style={ {
						marginTop: '24px',
						padding: '20px',
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
							marginBottom: '14px',
						} }
					>
						Selected Icon Preview
					</div>
					<div
						style={ {
							display: 'flex',
							alignItems: 'center',
							gap: '16px',
							padding: '16px',
							background: '#ffffff',
							borderRadius: '6px',
							border: '1px solid #e2e8f0',
						} }
					>
						<div
							style={ {
								width: '48px',
								height: '48px',
								borderRadius: '8px',
								background: '#eff6ff',
								color: '#2563eb',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							} }
						>
							<div
								style={ {
									width: '24px',
									height: '24px',
									fill: 'currentColor',
								} }
							>
								{ icon ? renderSVG( icon ) : 'None' }
							</div>
						</div>
						<div>
							<div
								style={ {
									fontSize: '13px',
									fontWeight: 600,
									color: '#0f172a',
									fontFamily: 'monospace',
								} }
							>
								{ icon || 'No Icon Selected' }
							</div>
							<div
								style={ {
									fontSize: '11px',
									color: '#64748b',
									marginTop: '2px',
								} }
							>
								Click "Change icon" above to open the library
								modal
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
	args: {
		value: 'angle-right',
	},
};

export const NavigationArrows = {
	render: ( args ) => {
		const [ leftIcon, setLeftIcon ] = useState(
			args.leftIcon || 'angle-left'
		);
		const [ rightIcon, setRightIcon ] = useState(
			args.rightIcon || 'angle-right'
		);

		return (
			<div>
				<div style={ { marginBottom: '16px' } }>
					<div
						style={ {
							fontSize: '12px',
							fontWeight: 600,
							color: '#50575e',
							marginBottom: '8px',
						} }
					>
						Previous Arrow (Left)
					</div>
					<IconPicker
						value={ leftIcon }
						setIconHandler={ setLeftIcon }
					/>
				</div>

				<div style={ { marginBottom: '16px' } }>
					<div
						style={ {
							fontSize: '12px',
							fontWeight: 600,
							color: '#50575e',
							marginBottom: '8px',
						} }
					>
						Next Arrow (Right)
					</div>
					<IconPicker
						value={ rightIcon }
						setIconHandler={ setRightIcon }
					/>
				</div>

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
						Live Slider Navigation Preview
					</div>
					<div
						style={ {
							position: 'relative',
							height: '110px',
							borderRadius: '8px',
							background:
								'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							padding: '0 20px',
						} }
					>
						<button
							type="button"
							style={ {
								width: '40px',
								height: '40px',
								borderRadius: '50%',
								background: 'rgba(255, 255, 255, 0.2)',
								border: 'none',
								color: '#ffffff',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								cursor: 'pointer',
								backdropFilter: 'blur(4px)',
								transition: 'background 0.2s ease',
							} }
						>
							<div
								style={ {
									width: '18px',
									height: '18px',
									fill: 'currentColor',
								} }
							>
								{ renderSVG( leftIcon ) }
							</div>
						</button>

						<div
							style={ {
								color: '#94a3b8',
								fontSize: '13px',
								fontWeight: 500,
							} }
						>
							Slide 1 of 5
						</div>

						<button
							type="button"
							style={ {
								width: '40px',
								height: '40px',
								borderRadius: '50%',
								background: 'rgba(255, 255, 255, 0.2)',
								border: 'none',
								color: '#ffffff',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								cursor: 'pointer',
								backdropFilter: 'blur(4px)',
								transition: 'background 0.2s ease',
							} }
						>
							<div
								style={ {
									width: '18px',
									height: '18px',
									fill: 'currentColor',
								} }
							>
								{ renderSVG( rightIcon ) }
							</div>
						</button>
					</div>
				</div>
			</div>
		);
	},
	args: {
		leftIcon: 'angle-left',
		rightIcon: 'angle-right',
	},
};

export const WithCustomStyling = {
	render: ( args ) => {
		const [ icon, setIcon ] = useState( args.value || 'star' );
		const [ size, setSize ] = useState( 32 );
		const [ color, setColor ] = useState( '#f59e0b' );

		return (
			<div>
				<div
					style={ {
						fontSize: '12px',
						fontWeight: 600,
						color: '#50575e',
						marginBottom: '8px',
					} }
				>
					Accent Feature Icon
				</div>

				<IconPicker value={ icon } setIconHandler={ setIcon } />

				<div style={ { marginTop: '16px' } }>
					<label
						style={ {
							display: 'block',
							fontSize: '12px',
							fontWeight: 600,
							color: '#50575e',
							marginBottom: '6px',
						} }
					>
						Icon Size: { size }px
					</label>
					<input
						type="range"
						min="16"
						max="64"
						value={ size }
						onChange={ ( e ) =>
							setSize( Number( e.target.value ) )
						}
						style={ { width: '100%' } }
					/>
				</div>

				<div style={ { marginTop: '12px' } }>
					<label
						style={ {
							display: 'block',
							fontSize: '12px',
							fontWeight: 600,
							color: '#50575e',
							marginBottom: '6px',
						} }
					>
						Icon Color
					</label>
					<div style={ { display: 'flex', gap: '8px' } }>
						{ [
							'#f59e0b',
							'#2563eb',
							'#10b981',
							'#ef4444',
							'#8b5cf6',
						].map( ( c ) => (
							<button
								key={ c }
								type="button"
								onClick={ () => setColor( c ) }
								style={ {
									width: '28px',
									height: '28px',
									borderRadius: '50%',
									backgroundColor: c,
									border:
										color === c
											? '2px solid #0f172a'
											: '2px solid transparent',
									cursor: 'pointer',
								} }
							/>
						) ) }
					</div>
				</div>

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
						Styled Icon Badge
					</div>
					<div
						style={ {
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '30px',
							background: '#ffffff',
							borderRadius: '8px',
							border: '1px solid #e2e8f0',
						} }
					>
						<div
							style={ {
								width: `${ size * 2 }px`,
								height: `${ size * 2 }px`,
								borderRadius: '50%',
								background: `${ color }15`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transition: 'all 0.2s ease',
							} }
						>
							<div
								style={ {
									width: `${ size }px`,
									height: `${ size }px`,
									fill: color,
									transition: 'all 0.2s ease',
								} }
							>
								{ icon ? renderSVG( icon ) : null }
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
	args: {
		value: 'star',
	},
};
