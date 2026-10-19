import { useState } from 'react';
import ResponsiveBackgroundImageControl from '@Components/responsive-background-image-control';

export default {
	title: 'Components/Media/ResponsiveBackgroundImageControl',
	component: ResponsiveBackgroundImageControl,
	tags: [ 'autodocs' ],
	parameters: {
		docs: {
			description: {
				component:
					'ResponsiveBackgroundImageControl manages responsive background images across Desktop, Tablet, and Mobile breakpoints, integrating with WordPress FocalPointPicker for focal coordinate positioning, background-attachment, repeat, and sizing.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description:
				'Label displayed alongside the responsive background image control',
		},
		deviceType: {
			control: { type: 'select' },
			options: [ 'Desktop', 'Tablet', 'Mobile' ],
			description: 'Active viewport device preview',
		},
		globalBackgroundImageUrl: {
			control: 'object',
			description:
				'Responsive image URL object: { Desktop, Tablet, Mobile }',
		},
		globalBackgroundImagePosition: {
			control: 'object',
			description:
				'Responsive focal point coordinates: { Desktop: {x,y}, Tablet, Mobile }',
		},
		globalBackgroundImageAttachment: {
			control: 'object',
			description:
				'Responsive attachment object: { Desktop, Tablet, Mobile }',
		},
		globalBackgroundImageRepeat: {
			control: 'object',
			description:
				'Responsive repeat object: { Desktop, Tablet, Mobile }',
		},
		globalBackgroundImageSize: {
			control: 'object',
			description: 'Responsive size object: { Desktop, Tablet, Mobile }',
		},
	},
};

export const Default = {
	render: ( args ) => {
		const [ device, setDevice ] = useState( args.deviceType || 'Desktop' );
		const [ urls, setUrls ] = useState(
			args.globalBackgroundImageUrl || {
				Desktop:
					'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop',
				Tablet: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop',
				Mobile: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&auto=format&fit=crop',
			}
		);
		const [ positions, setPositions ] = useState(
			args.globalBackgroundImagePosition || {
				Desktop: { x: 0.5, y: 0.5 },
				Tablet: { x: 0.2, y: 0.8 },
				Mobile: { x: 0.7, y: 0.3 },
			}
		);
		const [ attachments, setAttachments ] = useState(
			args.globalBackgroundImageAttachment || {
				Desktop: 'scroll',
				Tablet: 'scroll',
				Mobile: 'scroll',
			}
		);
		const [ repeats, setRepeats ] = useState(
			args.globalBackgroundImageRepeat || {
				Desktop: 'no-repeat',
				Tablet: 'no-repeat',
				Mobile: 'no-repeat',
			}
		);
		const [ sizes, setSizes ] = useState(
			args.globalBackgroundImageSize || {
				Desktop: 'cover',
				Tablet: 'cover',
				Mobile: 'cover',
			}
		);

		const activeUrl = urls[ device ];
		const activePos = positions[ device ] || { x: 0.5, y: 0.5 };
		const activeAttachment = attachments[ device ] || 'scroll';
		const activeRepeat = repeats[ device ] || 'no-repeat';
		const activeSize = sizes[ device ] || 'cover';

		return (
			<div>
				<div
					style={ {
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
						marginBottom: '16px',
						paddingBottom: '12px',
						borderBottom: '1px solid #e0e0e0',
					} }
				>
					<span
						style={ {
							fontSize: '12px',
							fontWeight: 600,
							color: '#50575e',
						} }
					>
						Active Viewport:
					</span>
					{ [ 'Desktop', 'Tablet', 'Mobile' ].map( ( d ) => (
						<button
							key={ d }
							type="button"
							onClick={ () => setDevice( d ) }
							style={ {
								padding: '4px 10px',
								fontSize: '12px',
								fontWeight: device === d ? 700 : 500,
								color: device === d ? '#ffffff' : '#3c434a',
								backgroundColor:
									device === d ? '#007cba' : '#f0f0f1',
								border: '1px solid',
								borderColor:
									device === d ? '#007cba' : '#dcdcde',
								borderRadius: '3px',
								cursor: 'pointer',
								transition: 'all 0.15s ease',
							} }
						>
							{ d }
						</button>
					) ) }
				</div>

				<ResponsiveBackgroundImageControl
					label={ args.label || 'Background Image' }
					deviceType={ device }
					globalBackgroundImageUrl={ urls }
					setGlobalBackgroundImageUrl={ setUrls }
					globalBackgroundImageAlt={ {} }
					setGlobalBackgroundImageAlt={ () => {} }
					globalBackgroundImageID={ {} }
					setGlobalBackgroundImageID={ () => {} }
					globalBackgroundImagePosition={ positions }
					setGlobalBackgroundImagePosition={ setPositions }
					globalBackgroundImageAttachment={ attachments }
					setGlobalBackgroundImageAttachment={ setAttachments }
					globalBackgroundImageRepeat={ repeats }
					setGlobalBackgroundImageRepeat={ setRepeats }
					globalBackgroundImageSize={ sizes }
					setGlobalBackgroundImageSize={ setSizes }
					setAttributes={ () => {} }
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
							marginBottom: '12px',
						} }
					>
						Live Banner Preview ({ device } Viewport)
					</div>
					{ activeUrl ? (
						<div
							style={ {
								position: 'relative',
								height: '140px',
								borderRadius: '6px',
								backgroundColor: '#0f172a',
								backgroundImage: `url("${ activeUrl }")`,
								backgroundPosition: `${
									( activePos?.x ?? 0.5 ) * 100
								}% ${ ( activePos?.y ?? 0.5 ) * 100 }%`,
								backgroundAttachment: activeAttachment,
								backgroundRepeat: activeRepeat,
								backgroundSize: activeSize,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
								overflow: 'hidden',
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
								{ device } Hero Layer
							</div>
							<div
								style={ {
									marginTop: '6px',
									fontSize: '10px',
									color: '#e2e8f0',
									fontFamily: 'monospace',
									background: 'rgba(0, 0, 0, 0.6)',
									padding: '2px 8px',
									borderRadius: '3px',
								} }
							>
								Focal:{ ' ' }
								{ Math.round( ( activePos?.x ?? 0.5 ) * 100 ) }%
								x{ ' ' }
								{ Math.round( ( activePos?.y ?? 0.5 ) * 100 ) }%
								| Size: { activeSize }
							</div>
						</div>
					) : (
						<div
							style={ {
								height: '100px',
								borderRadius: '6px',
								border: '2px dashed #cbd5e1',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#94a3b8',
								fontSize: '12px',
							} }
						>
							No image uploaded for { device } viewport
						</div>
					) }
				</div>
			</div>
		);
	},
	args: {
		label: 'Slide Background Image',
		deviceType: 'Desktop',
	},
};

export const EmptyState = {
	render: ( args ) => {
		const device = args.deviceType || 'Desktop';
		const [ urls, setUrls ] = useState( {
			Desktop: '',
			Tablet: '',
			Mobile: '',
		} );
		const [ positions, setPositions ] = useState( {
			Desktop: { x: 0.5, y: 0.5 },
			Tablet: { x: 0.5, y: 0.5 },
			Mobile: { x: 0.5, y: 0.5 },
		} );
		const [ attachments, setAttachments ] = useState( {
			Desktop: 'scroll',
			Tablet: 'scroll',
			Mobile: 'scroll',
		} );
		const [ repeats, setRepeats ] = useState( {
			Desktop: 'no-repeat',
			Tablet: 'no-repeat',
			Mobile: 'no-repeat',
		} );
		const [ sizes, setSizes ] = useState( {
			Desktop: 'cover',
			Tablet: 'cover',
			Mobile: 'cover',
		} );

		return (
			<div>
				<ResponsiveBackgroundImageControl
					label={ args.label || 'Background Image (Empty)' }
					deviceType={ device }
					globalBackgroundImageUrl={ urls }
					setGlobalBackgroundImageUrl={ setUrls }
					globalBackgroundImageAlt={ {} }
					setGlobalBackgroundImageAlt={ () => {} }
					globalBackgroundImageID={ {} }
					setGlobalBackgroundImageID={ () => {} }
					globalBackgroundImagePosition={ positions }
					setGlobalBackgroundImagePosition={ setPositions }
					globalBackgroundImageAttachment={ attachments }
					setGlobalBackgroundImageAttachment={ setAttachments }
					globalBackgroundImageRepeat={ repeats }
					setGlobalBackgroundImageRepeat={ setRepeats }
					globalBackgroundImageSize={ sizes }
					setGlobalBackgroundImageSize={ setSizes }
					setAttributes={ () => {} }
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
							marginBottom: '12px',
						} }
					>
						Live Banner Preview
					</div>
					<div
						style={ {
							height: '100px',
							borderRadius: '6px',
							border: '2px dashed #cbd5e1',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#94a3b8',
							fontSize: '12px',
						} }
					>
						Click upload above to assign a background image
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Slide Background Image',
		deviceType: 'Desktop',
	},
};
