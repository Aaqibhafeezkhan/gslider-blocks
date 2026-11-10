/* eslint-disable import/no-unresolved */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { VERTICAL_ALIGN, HTML_TAGS } from '@Constants';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import ResponsiveAlignmentControl from '@Components/responsive-alignment-control';
import HtmlTagControl from '@Components/html-tag-control';

/**
 * Inspector panel for slider layout height, vertical alignment, and title HTML tag.
 *
 * @param {Object}   props               Component properties.
 * @param {Object}   props.attributes    Current block attributes.
 * @param {Function} props.setAttributes Block attribute setter callback.
 * @param {string}   props.deviceType    Active responsive viewport.
 * @param {boolean}  props.isOpen        Whether panel is expanded.
 * @param {Function} props.onToggle      Panel toggle callback.
 * @return {Element} Layout and content settings panel element.
 */
const LayoutContentPanel = ( {
	attributes,
	setAttributes,
	deviceType,
	isOpen,
	onToggle,
} ) => {
	const { layoutHeight, layoutHeightUnits, verticalAlign, postTitleHtmlTag } =
		attributes;

	return (
		<PanelBody
			title={ __( 'Layout & Content Setting', 'gslider-blocks' ) }
			opened={ isOpen }
			onToggle={ onToggle }
		>
			<ResponsiveRangeControl
				label={ __( 'Height', 'gslider-blocks' ) }
				rangeValue={ layoutHeight }
				onChangeValue={ ( value ) =>
					setAttributes( { layoutHeight: value } )
				}
				onUnitChange={ ( value ) =>
					setAttributes( { layoutHeightUnits: value } )
				}
				deviceType={ deviceType }
				units={ layoutHeightUnits }
				resetFallbackValue={ {
					px: '150',
					'%': '50',
					vh: '50',
					vw: '50',
					em: '20',
					rem: '20',
				} }
			/>

			<ResponsiveAlignmentControl
				label={ __( 'Vertical Alignment', 'gslider-blocks' ) }
				options={ VERTICAL_ALIGN }
				alignmentValue={ verticalAlign }
				setAlignmentValue={ ( value ) =>
					setAttributes( { verticalAlign: value } )
				}
				deviceType={ deviceType }
				setAttributes={ setAttributes }
				className="gslider-vertical-alignment"
			/>

			<HtmlTagControl
				label={ __( 'Title Tag', 'gslider-blocks' ) }
				options={ HTML_TAGS }
				value={ postTitleHtmlTag }
				onChange={ ( value ) =>
					setAttributes( { postTitleHtmlTag: value } )
				}
			/>
		</PanelBody>
	);
};

export default LayoutContentPanel;
