import { useState } from 'react';
import ImageControl from '@Components/image-control';

export default {
	title: 'Components/Media/ImageControl',
	component: ImageControl,
	tags: [ 'autodocs' ],
	parameters: {
		docs: {
			description: {
				component:
					'ImageControl provides a single-image uploader and manager integrated with the WordPress media library, supporting image replacement, deletion, alternative text, and object-fit rendering settings.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label displayed above the image controller',
		},
		imageUrl: {
			control: 'text',
			description: 'Current image URL string',
		},
		imageAlt: {
			control: 'text',
			description: 'Alternative text attribute for accessibility',
		},
		imageID: {
			control: 'number',
			description: 'WordPress attachment ID',
		},
		imageSize: {
			control: { type: 'select' },
			options: [ 'none', 'fill', 'contain', 'cover', 'scale-down' ],
			description: 'CSS object-fit property for image sizing',
		},
		isImageSize: {
			control: 'boolean',
			description: 'Whether to show the object-fit size selector',
		},
		helpText: {
			control: 'text',
			description: 'Helpful guidance text displayed beneath the control',
		},
		setImageUrl: {
			action: 'imageUrlChanged',
			description: 'Callback fired when the image URL updates',
		},
		setImageAlt: {
			action: 'imageAltChanged',
			description: 'Callback fired when the image alt text updates',
		},
		setImageID: {
			action: 'imageIdChanged',
			description: 'Callback fired when the image attachment ID updates',
		},
		setImageSize: {
			action: 'imageSizeChanged',
			description: 'Callback fired when the object-fit property updates',
		},
	},
};

export const Default = {
	render: ( args ) => {
		const [ url, setUrl ] = useState(
			args.imageUrl ||
				'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop'
		);
		const [ alt, setAlt ] = useState(
			args.imageAlt || 'Abstract colorful gradient texture'
		);
		const [ id, setId ] = useState( args.imageID || 101 );
		const [ fit, setFit ] = useState( args.imageSize || 'cover' );

		const handleSetUrl = ( newUrl ) => {
			setUrl( newUrl );
			args.setImageUrl?.( newUrl );
		};

		const handleSetAlt = ( newAlt ) => {
			setAlt( newAlt );
			args.setImageAlt?.( newAlt );
		};

		const handleSetId = ( newId ) => {
			setId( newId );
			args.setImageID?.( newId );
		};

		const handleSetFit = ( newFit ) => {
			setFit( newFit );
			args.setImageSize?.( newFit );
		};

		return (
			<div>
				<ImageControl
					label={ args.label || 'Slide Image' }
					imageUrl={ url }
					setImageUrl={ handleSetUrl }
					imageAlt={ alt }
					setImageAlt={ handleSetAlt }
					imageID={ id }
					setImageID={ handleSetId }
					imageSize={ fit }
					setImageSize={ handleSetFit }
					isImageSize={ args.isImageSize ?? true }
					helpText={
						args.helpText ||
						'Upload or select an image for this slide.'
					}
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
						Live Slide Image Preview
					</div>
					{ url ? (
						<div
							style={ {
								position: 'relative',
								height: '140px',
								borderRadius: '6px',
								overflow: 'hidden',
								background: '#0f172a',
								border: '1px solid #cbd5e1',
							} }
						>
							<img
								src={ url }
								alt={ alt || '' }
								style={ {
									width: '100%',
									height: '100%',
									objectFit: fit || 'cover',
									display: 'block',
								} }
							/>
							<div
								style={ {
									position: 'absolute',
									bottom: '8px',
									left: '8px',
									padding: '2px 8px',
									borderRadius: '3px',
									background: 'rgba(0, 0, 0, 0.75)',
									color: '#f8fafc',
									fontSize: '10px',
									fontFamily: 'monospace',
								} }
							>
								object-fit: { fit || 'cover' } | ID:{ ' ' }
								{ id || 'none' }
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
							No Image Selected
						</div>
					) }
				</div>
			</div>
		);
	},
	args: {
		label: 'Featured Slide Image',
		imageUrl:
			'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop',
		imageAlt: 'Abstract colorful gradient texture',
		imageID: 101,
		imageSize: 'cover',
		isImageSize: true,
		helpText: 'Recommended size: 1200x800px. Supports JPG, PNG, and WebP.',
	},
};

export const EmptyState = {
	render: ( args ) => {
		const [ url, setUrl ] = useState( '' );
		const [ alt, setAlt ] = useState( '' );
		const [ id, setId ] = useState( null );
		const [ fit, setFit ] = useState( 'cover' );

		return (
			<div>
				<ImageControl
					label={ args.label || 'Slide Image (Empty)' }
					imageUrl={ url }
					setImageUrl={ ( newUrl ) => {
						setUrl( newUrl );
						args.setImageUrl?.( newUrl );
					} }
					imageAlt={ alt }
					setImageAlt={ ( newAlt ) => {
						setAlt( newAlt );
						args.setImageAlt?.( newAlt );
					} }
					imageID={ id }
					setImageID={ ( newId ) => {
						setId( newId );
						args.setImageID?.( newId );
					} }
					imageSize={ fit }
					setImageSize={ ( newFit ) => {
						setFit( newFit );
						args.setImageSize?.( newFit );
					} }
					isImageSize={ true }
					helpText={
						args.helpText ||
						'Click the upload button to choose an image from your library.'
					}
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
						Live Slide Image Preview
					</div>
					{ url ? (
						<div
							style={ {
								position: 'relative',
								height: '140px',
								borderRadius: '6px',
								overflow: 'hidden',
								background: '#0f172a',
								border: '1px solid #cbd5e1',
							} }
						>
							<img
								src={ url }
								alt={ alt || '' }
								style={ {
									width: '100%',
									height: '100%',
									objectFit: fit || 'cover',
									display: 'block',
								} }
							/>
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
							Upload an image to see live preview
						</div>
					) }
				</div>
			</div>
		);
	},
	args: {
		label: 'Slide Image',
		helpText:
			'Click the upload button to select an image from the library.',
	},
};

export const ObjectFitComparison = {
	render: ( args ) => {
		const sampleUrl =
			'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop';
		const [ fit, setFit ] = useState( 'cover' );

		return (
			<div>
				<ImageControl
					label="Object Fit Experiment"
					imageUrl={ sampleUrl }
					setImageUrl={ () => {} }
					imageAlt="Tropical beach"
					setImageAlt={ () => {} }
					imageID={ 42 }
					setImageID={ () => {} }
					imageSize={ fit }
					setImageSize={ setFit }
					isImageSize={ true }
					helpText="Select different Object Fit values to compare how the image adapts to its container."
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
						Container Aspect Ratio: 16:9 (Object-Fit: { fit })
					</div>
					<div
						style={ {
							height: '140px',
							borderRadius: '6px',
							background: '#0f172a',
							border: '2px solid #3b82f6',
							overflow: 'hidden',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						} }
					>
						<img
							src={ sampleUrl }
							alt="Beach"
							style={ {
								width: '100%',
								height: '100%',
								objectFit: fit,
								display: 'block',
							} }
						/>
					</div>
				</div>
			</div>
		);
	},
};
