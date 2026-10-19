import { useState } from 'react';
import ResponsiveTypographyControl from '@Components/responsive-typography-control';

export default {
	title: 'Components/Responsive/ResponsiveTypographyControl',
	component: ResponsiveTypographyControl,
	tags: [ 'autodocs' ],
	parameters: {
		docs: {
			description: {
				component:
					'ResponsiveTypographyControl provides an all-in-one typography popup controller covering Google Fonts selection, responsive font size, font weight, line height, letter spacing, word spacing, text transform, and text decoration.',
			},
		},
	},
	argTypes: {
		fontFamily: {
			control: 'text',
			description: 'Selected Google Font family or CSS fallback',
		},
		fontWeight: {
			control: 'text',
			description: 'Font weight (e.g. 300, 400, 600, 700, bold)',
		},
		fontStyle: {
			control: 'text',
			description: 'Font style (normal, italic, oblique)',
		},
		textTransform: {
			control: 'text',
			description:
				'CSS text-transform (none, uppercase, lowercase, capitalize)',
		},
		textDecoration: {
			control: 'text',
			description: 'CSS text-decoration (none, underline, line-through)',
		},
		deviceType: {
			control: { type: 'select' },
			options: [ 'Desktop', 'Tablet', 'Mobile' ],
			description: 'Active viewport device preview',
		},
		fontSize: {
			control: 'object',
			description:
				'Responsive font size object: { Desktop, Tablet, Mobile }',
		},
		fontSizeUnits: {
			control: 'object',
			description:
				'Responsive font size unit object: { Desktop, Tablet, Mobile }',
		},
		lineHeight: {
			control: 'object',
			description:
				'Responsive line height object: { Desktop, Tablet, Mobile }',
		},
		lineHeightUnits: {
			control: 'object',
			description:
				'Responsive line height unit object: { Desktop, Tablet, Mobile }',
		},
		letterSpacing: {
			control: 'object',
			description:
				'Responsive letter spacing object: { Desktop, Tablet, Mobile }',
		},
		letterSpacingUnits: {
			control: 'object',
			description:
				'Responsive letter spacing unit object: { Desktop, Tablet, Mobile }',
		},
		wordSpacing: {
			control: 'object',
			description:
				'Responsive word spacing object: { Desktop, Tablet, Mobile }',
		},
		wordSpacingUnits: {
			control: 'object',
			description:
				'Responsive word spacing unit object: { Desktop, Tablet, Mobile }',
		},
	},
};

export const Default = {
	render: ( args ) => {
		const [ device, setDevice ] = useState( args.deviceType || 'Desktop' );
		const [ fontFamily, setFontFamily ] = useState(
			args.fontFamily || 'Roboto'
		);
		const [ fontSize, setFontSize ] = useState(
			args.fontSize || { Desktop: '36', Tablet: '28', Mobile: '22' }
		);
		const [ fontSizeUnits, setFontSizeUnits ] = useState(
			args.fontSizeUnits || { Desktop: 'px', Tablet: 'px', Mobile: 'px' }
		);
		const [ fontWeight, setFontWeight ] = useState(
			args.fontWeight || '700'
		);
		const [ fontStyle, setFontStyle ] = useState(
			args.fontStyle || 'normal'
		);
		const [ textTransform, setTextTransform ] = useState(
			args.textTransform || 'none'
		);
		const [ textDecoration, setTextDecoration ] = useState(
			args.textDecoration || 'none'
		);
		const [ lineHeight, setLineHeight ] = useState(
			args.lineHeight || { Desktop: '1.3', Tablet: '1.3', Mobile: '1.2' }
		);
		const [ lineHeightUnits, setLineHeightUnits ] = useState(
			args.lineHeightUnits || {
				Desktop: 'em',
				Tablet: 'em',
				Mobile: 'em',
			}
		);
		const [ letterSpacing, setLetterSpacing ] = useState(
			args.letterSpacing || { Desktop: '0', Tablet: '0', Mobile: '0' }
		);
		const [ letterSpacingUnits, setLetterSpacingUnits ] = useState(
			args.letterSpacingUnits || {
				Desktop: 'px',
				Tablet: 'px',
				Mobile: 'px',
			}
		);
		const [ wordSpacing, setWordSpacing ] = useState(
			args.wordSpacing || { Desktop: '0', Tablet: '0', Mobile: '0' }
		);
		const [ wordSpacingUnits, setWordSpacingUnits ] = useState(
			args.wordSpacingUnits || {
				Desktop: 'px',
				Tablet: 'px',
				Mobile: 'px',
			}
		);

		const activeFontSize = `${ fontSize[ device ] || '36' }${
			fontSizeUnits[ device ] || 'px'
		}`;
		const activeLineHeight = `${ lineHeight[ device ] || '1.3' }${
			lineHeightUnits[ device ] || 'em'
		}`;
		const activeLetterSpacing = `${ letterSpacing[ device ] || '0' }${
			letterSpacingUnits[ device ] || 'px'
		}`;
		const activeWordSpacing = `${ wordSpacing[ device ] || '0' }${
			wordSpacingUnits[ device ] || 'px'
		}`;

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
							onClick={ () => setDevice( d ) }
							style={ {
								padding: '4px 10px',
								fontSize: '12px',
								background:
									device === d ? '#2271b1' : '#f0f0f1',
								color: device === d ? '#fff' : '#1e1e1e',
								border: '1px solid #c3c4c7',
								borderRadius: '3px',
								cursor: 'pointer',
								fontWeight: device === d ? '600' : 'normal',
							} }
						>
							{ d } ({ fontSize[ d ] }
							{ fontSizeUnits[ d ] })
						</button>
					) ) }
				</div>

				<div style={ { maxWidth: '280px' } }>
					<ResponsiveTypographyControl
						{ ...args }
						deviceType={ device }
						fontFamily={ fontFamily }
						onChangeFontFamily={ ( val ) => {
							setFontFamily( val );
							args.onChangeFontFamily?.( val );
						} }
						fontSize={ fontSize }
						onChangeFontSize={ ( val ) => {
							setFontSize( val );
							args.onChangeFontSize?.( val );
						} }
						fontSizeUnits={ fontSizeUnits }
						onChangeFontSizeUnit={ ( val ) => {
							setFontSizeUnits( val );
							args.onChangeFontSizeUnit?.( val );
						} }
						fontWeight={ fontWeight }
						onChangeFontWeight={ ( val ) => {
							setFontWeight( val );
							args.onChangeFontWeight?.( val );
						} }
						fontStyle={ fontStyle }
						onChangeFontStyle={ ( val ) => {
							setFontStyle( val );
							args.onChangeFontStyle?.( val );
						} }
						textTransform={ textTransform }
						onChangeTextTransform={ ( val ) => {
							setTextTransform( val );
							args.onChangeTextTransform?.( val );
						} }
						textDecoration={ textDecoration }
						onChangeTextDecoration={ ( val ) => {
							setTextDecoration( val );
							args.onChangeTextDecoration?.( val );
						} }
						lineHeight={ lineHeight }
						onChangeLineHeight={ ( val ) => {
							setLineHeight( val );
							args.onChangeLineHeight?.( val );
						} }
						lineHeightUnits={ lineHeightUnits }
						onChangeLineHeightUnit={ ( val ) => {
							setLineHeightUnits( val );
							args.onChangeLineHeightUnit?.( val );
						} }
						letterSpacing={ letterSpacing }
						onChangeLetterSpacing={ ( val ) => {
							setLetterSpacing( val );
							args.onChangeLetterSpacing?.( val );
						} }
						letterSpacingUnits={ letterSpacingUnits }
						onChangeLetterSpacingUnit={ ( val ) => {
							setLetterSpacingUnits( val );
							args.onChangeLetterSpacingUnit?.( val );
						} }
						wordSpacing={ wordSpacing }
						onChangeWordSpacing={ ( val ) => {
							setWordSpacing( val );
							args.onChangeWordSpacing?.( val );
						} }
						wordSpacingUnits={ wordSpacingUnits }
						onChangeWordSpacingUnit={ ( val ) => {
							setWordSpacingUnits( val );
							args.onChangeWordSpacingUnit?.( val );
						} }
					/>
				</div>

				<div
					style={ {
						marginTop: '24px',
						padding: '24px',
						background: '#fff',
						border: '1px solid #c3c4c7',
						borderRadius: '4px',
						boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
					} }
				>
					<div
						style={ {
							fontSize: '11px',
							textTransform: 'uppercase',
							color: '#646970',
							marginBottom: '12px',
						} }
					>
						Live Typography Preview ({ device }: { activeFontSize },{ ' ' }
						{ fontWeight })
					</div>
					<h2
						style={ {
							margin: '0 0 12px 0',
							fontFamily: fontFamily || 'inherit',
							fontSize: activeFontSize,
							fontWeight: fontWeight || 'bold',
							fontStyle: fontStyle || 'normal',
							textTransform: textTransform || 'none',
							textDecoration: textDecoration || 'none',
							lineHeight: activeLineHeight,
							letterSpacing: activeLetterSpacing,
							wordSpacing: activeWordSpacing,
							color: '#1e1e1e',
						} }
					>
						Modern Hero Slider Heading
					</h2>
					<div
						style={ {
							fontSize: '12px',
							color: '#50575e',
							background: '#f6f7f7',
							padding: '8px 12px',
							borderRadius: '3px',
						} }
					>
						Family: <code>{ fontFamily }</code> | Weight:{ ' ' }
						<code>{ fontWeight }</code> | Size:{ ' ' }
						<code>{ activeFontSize }</code> | Line-Height:{ ' ' }
						<code>{ activeLineHeight }</code>
					</div>
				</div>
			</div>
		);
	},
	args: {
		deviceType: 'Desktop',
		fontFamily: 'Roboto',
		fontSize: { Desktop: '36', Tablet: '28', Mobile: '22' },
		fontSizeUnits: { Desktop: 'px', Tablet: 'px', Mobile: 'px' },
		fontWeight: '700',
		fontStyle: 'normal',
		textTransform: 'none',
		textDecoration: 'none',
		lineHeight: { Desktop: '1.3', Tablet: '1.3', Mobile: '1.2' },
		lineHeightUnits: { Desktop: 'em', Tablet: 'em', Mobile: 'em' },
		letterSpacing: { Desktop: '0', Tablet: '0', Mobile: '0' },
		letterSpacingUnits: { Desktop: 'px', Tablet: 'px', Mobile: 'px' },
		wordSpacing: { Desktop: '0', Tablet: '0', Mobile: '0' },
		wordSpacingUnits: { Desktop: 'px', Tablet: 'px', Mobile: 'px' },
	},
};

export const BodyParagraph = {
	render: ( args ) => {
		const [ device, setDevice ] = useState( args.deviceType || 'Desktop' );
		const [ fontFamily, setFontFamily ] = useState(
			args.fontFamily || 'Open Sans'
		);
		const [ fontSize, setFontSize ] = useState(
			args.fontSize || { Desktop: '16', Tablet: '15', Mobile: '14' }
		);
		const [ fontSizeUnits, setFontSizeUnits ] = useState(
			args.fontSizeUnits || { Desktop: 'px', Tablet: 'px', Mobile: 'px' }
		);
		const [ fontWeight, setFontWeight ] = useState(
			args.fontWeight || '400'
		);
		const [ lineHeight, setLineHeight ] = useState(
			args.lineHeight || { Desktop: '1.6', Tablet: '1.6', Mobile: '1.5' }
		);
		const [ lineHeightUnits, setLineHeightUnits ] = useState(
			args.lineHeightUnits || {
				Desktop: 'em',
				Tablet: 'em',
				Mobile: 'em',
			}
		);

		const activeFontSize = `${ fontSize[ device ] || '16' }${
			fontSizeUnits[ device ] || 'px'
		}`;
		const activeLineHeight = `${ lineHeight[ device ] || '1.6' }${
			lineHeightUnits[ device ] || 'em'
		}`;

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
							onClick={ () => setDevice( d ) }
							style={ {
								padding: '4px 10px',
								fontSize: '12px',
								background:
									device === d ? '#2271b1' : '#f0f0f1',
								color: device === d ? '#fff' : '#1e1e1e',
								border: '1px solid #c3c4c7',
								borderRadius: '3px',
								cursor: 'pointer',
								fontWeight: device === d ? '600' : 'normal',
							} }
						>
							{ d }
						</button>
					) ) }
				</div>

				<div style={ { maxWidth: '280px' } }>
					<ResponsiveTypographyControl
						{ ...args }
						deviceType={ device }
						fontFamily={ fontFamily }
						onChangeFontFamily={ ( val ) => {
							setFontFamily( val );
							args.onChangeFontFamily?.( val );
						} }
						fontSize={ fontSize }
						onChangeFontSize={ ( val ) => {
							setFontSize( val );
							args.onChangeFontSize?.( val );
						} }
						fontSizeUnits={ fontSizeUnits }
						onChangeFontSizeUnit={ ( val ) => {
							setFontSizeUnits( val );
							args.onChangeFontSizeUnit?.( val );
						} }
						fontWeight={ fontWeight }
						onChangeFontWeight={ ( val ) => {
							setFontWeight( val );
							args.onChangeFontWeight?.( val );
						} }
						lineHeight={ lineHeight }
						onChangeLineHeight={ ( val ) => {
							setLineHeight( val );
							args.onChangeLineHeight?.( val );
						} }
						lineHeightUnits={ lineHeightUnits }
						onChangeLineHeightUnit={ ( val ) => {
							setLineHeightUnits( val );
							args.onChangeLineHeightUnit?.( val );
						} }
					/>
				</div>

				<div
					style={ {
						marginTop: '24px',
						padding: '24px',
						background: '#fff',
						border: '1px solid #c3c4c7',
						borderRadius: '4px',
					} }
				>
					<p
						style={ {
							margin: 0,
							fontFamily: fontFamily || 'inherit',
							fontSize: activeFontSize,
							fontWeight: fontWeight || '400',
							lineHeight: activeLineHeight,
							color: '#3c434a',
						} }
					>
						GSlider Blocks delivers lightning-fast slider
						performance with zero runtime bloat, responsive
						breakpoint synchronization, and complete Gutenberg
						editor native integration. Experience fluid carousel
						animations configured with precision.
					</p>
				</div>
			</div>
		);
	},
	args: {
		deviceType: 'Desktop',
		fontFamily: 'Open Sans',
		fontSize: { Desktop: '16', Tablet: '15', Mobile: '14' },
		fontSizeUnits: { Desktop: 'px', Tablet: 'px', Mobile: 'px' },
		fontWeight: '400',
		lineHeight: { Desktop: '1.6', Tablet: '1.6', Mobile: '1.5' },
		lineHeightUnits: { Desktop: 'em', Tablet: 'em', Mobile: 'em' },
	},
};
