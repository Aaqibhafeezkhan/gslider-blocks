import { useState } from 'react';
import BackgroundControl from '@Components/background-control';

export default {
	title: 'Components/Effects/BackgroundControl',
	component: BackgroundControl,
	tags: [ 'autodocs' ],
	parameters: {
		docs: {
			description: {
				component:
					'BackgroundControl provides a multi-layer background management panel supporting Classic solid colors, multi-stop and custom CSS gradients, and responsive background images with focal point positioning, attachment, repeat, and sizing across Normal and Hover states.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description:
				'Section label displayed above the background controller',
		},
		deviceType: {
			control: { type: 'select' },
			options: [ 'Desktop', 'Tablet', 'Mobile' ],
			description:
				'Active viewport device mode for responsive image attributes',
		},
		isBackgroundImage: {
			control: 'boolean',
			description:
				'Whether to enable the background image control section',
		},
		isHover: {
			control: 'boolean',
			description:
				'Whether to enable the TabPanel with Normal and Hover states',
		},
	},
};

export const ClassicSolid = {
	render: ( args ) => {
		const [ normalBgType, setNormalBgType ] = useState( 'classic' );
		const [ normalColor, setNormalColor ] = useState(
			args.normalClassicColor || '#2563eb'
		);
		const [ hoverBgType, setHoverBgType ] = useState( 'classic' );
		const [ hoverColor, setHoverColor ] = useState(
			args.hoverClassicColor || '#1e40af'
		);
		const [ isHovered, setIsHovered ] = useState( false );

		return (
			<div>
				<BackgroundControl
					label={ args.label || 'Card Background' }
					deviceType="Desktop"
					normalBackgroundType={ normalBgType }
					setNormalBackgroundType={ setNormalBgType }
					normalClassicColor={ normalColor }
					setNormalClassicColor={ setNormalColor }
					hoverBackgroundType={ hoverBgType }
					setHoverBackgroundType={ setHoverBgType }
					hoverClassicColor={ hoverColor }
					setHoverClassicColor={ setHoverColor }
					isBackgroundImage={ false }
					isHover={ true }
					setAttributes={ () => {} }
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
						Live Solid Background (Hover Mouse Below)
					</div>
					<div
						onMouseEnter={ () => setIsHovered( true ) }
						onMouseLeave={ () => setIsHovered( false ) }
						style={ {
							height: '110px',
							borderRadius: '8px',
							backgroundColor: isHovered
								? hoverColor
								: normalColor,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							cursor: 'pointer',
							transition: 'all 0.3s ease',
							boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
						} }
					>
						<span
							style={ {
								padding: '4px 12px',
								borderRadius: '4px',
								background: 'rgba(255, 255, 255, 0.92)',
								color: '#0f172a',
								fontSize: '13px',
								fontWeight: 600,
								fontFamily: 'monospace',
							} }
						>
							{ isHovered
								? `Hover: ${ hoverColor }`
								: `Normal: ${ normalColor }` }
						</span>
						<span
							style={ {
								fontSize: '11px',
								color: 'rgba(255, 255, 255, 0.9)',
								marginTop: '6px',
								textShadow: '0 1px 2px rgba(0,0,0,0.5)',
							} }
						>
							{ isHovered
								? 'Mouse Hover Active'
								: 'Hover mouse to preview state' }
						</span>
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Classic Solid Background',
		normalClassicColor: '#2563eb',
		hoverClassicColor: '#1e40af',
		isBackgroundImage: false,
		isHover: true,
	},
};

export const GradientMode = {
	render: ( args ) => {
		const [ gradientType, setGradientType ] = useState( 'gradient' );
		const [ gradientColor, setGradientColor ] = useState(
			args.normalGradientColor ||
				'linear-gradient(135deg, #12c2e9 0%, #c471ed 50%, #f64f59 100%)'
		);
		const [ customSwitcher, setCustomSwitcher ] = useState( false );
		const [ customInput, setCustomInput ] = useState( '' );

		return (
			<div>
				<BackgroundControl
					label={ args.label || 'Gradient Background' }
					deviceType="Desktop"
					normalBackgroundType={ gradientType }
					setNormalBackgroundType={ setGradientType }
					normalGradientColor={ gradientColor }
					setNormalGradientColor={ setGradientColor }
					normalCustomGradientSwitcher={ customSwitcher }
					setNormalCustomGradientSwitcher={ setCustomSwitcher }
					normalCustomGradientInputValue={ customInput }
					setNormalCustomGradientInputValue={ setCustomInput }
					isBackgroundImage={ false }
					isHover={ false }
					setAttributes={ () => {} }
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
						Live Gradient Layer Preview
					</div>
					<div
						style={ {
							height: '110px',
							borderRadius: '8px',
							background: customSwitcher
								? customInput || gradientColor
								: gradientColor,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
							transition: 'background 0.3s ease',
						} }
					>
						<span
							style={ {
								padding: '4px 12px',
								borderRadius: '4px',
								background: 'rgba(255, 255, 255, 0.95)',
								color: '#0f172a',
								fontSize: '11px',
								fontWeight: 600,
								fontFamily: 'monospace',
								maxWidth: '90%',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
							} }
						>
							{ customSwitcher
								? customInput || gradientColor
								: gradientColor }
						</span>
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Hero Gradient Layer',
		normalGradientColor:
			'linear-gradient(135deg, #12c2e9 0%, #c471ed 50%, #f64f59 100%)',
		isBackgroundImage: false,
		isHover: false,
	},
};

export const WithBackgroundImage = {
	render: ( args ) => {
		const [ bgType, setBgType ] = useState( 'classic' );
		const [ bgColor, setBgColor ] = useState( '#0f172a' );
		const [ imgUrl, setImgUrl ] = useState(
			'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop'
		);
		const [ imgPosition, setImgPosition ] = useState( { x: 0.5, y: 0.5 } );
		const [ imgAttachment, setImgAttachment ] = useState( 'scroll' );
		const [ imgRepeat, setImgRepeat ] = useState( 'no-repeat' );
		const [ imgSize, setImgSize ] = useState( 'cover' );

		return (
			<div>
				<BackgroundControl
					label={ args.label || 'Background Image & Texture' }
					deviceType="Desktop"
					normalBackgroundType={ bgType }
					setNormalBackgroundType={ setBgType }
					normalClassicColor={ bgColor }
					setNormalClassicColor={ setBgColor }
					normalBackgroundImageUrl={ imgUrl }
					setNormalBackgroundImageUrl={ setImgUrl }
					normalBackgroundImagePosition={ imgPosition }
					setNormalBackgroundImagePosition={ setImgPosition }
					normalBackgroundImageAttachment={ imgAttachment }
					setNormalBackgroundImageAttachment={ setImgAttachment }
					normalBackgroundImageRepeat={ imgRepeat }
					setNormalBackgroundImageRepeat={ setImgRepeat }
					normalBackgroundImageSize={ imgSize }
					setNormalBackgroundImageSize={ setImgSize }
					isBackgroundImage={ true }
					isHover={ false }
					setAttributes={ () => {} }
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
						Live Background Texture Preview
					</div>
					<div
						style={ {
							height: '130px',
							borderRadius: '8px',
							backgroundColor: bgColor,
							backgroundImage: imgUrl
								? `url("${ imgUrl }")`
								: 'none',
							backgroundPosition: `${
								( imgPosition?.x ?? 0.5 ) * 100
							}% ${ ( imgPosition?.y ?? 0.5 ) * 100 }%`,
							backgroundAttachment: imgAttachment,
							backgroundRepeat: imgRepeat,
							backgroundSize: imgSize,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							position: 'relative',
							overflow: 'hidden',
							boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
						} }
					>
						<div
							style={ {
								padding: '6px 14px',
								borderRadius: '4px',
								background: 'rgba(15, 23, 42, 0.85)',
								color: '#ffffff',
								fontSize: '12px',
								fontWeight: 600,
								backdropFilter: 'blur(4px)',
							} }
						>
							Background Layered Banner
						</div>
						<div
							style={ {
								marginTop: '6px',
								fontSize: '11px',
								color: '#e2e8f0',
								fontFamily: 'monospace',
								background: 'rgba(0,0,0,0.5)',
								padding: '2px 8px',
								borderRadius: '3px',
							} }
						>
							size: { imgSize } | repeat: { imgRepeat }
						</div>
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Banner Background',
		isBackgroundImage: true,
		isHover: false,
	},
};
