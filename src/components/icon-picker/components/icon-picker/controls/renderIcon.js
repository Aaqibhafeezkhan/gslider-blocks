import { __ } from '@wordpress/i18n';
import parseSVG from './parseIcon';

const getIconsUrl = () => {
	if ( typeof window !== 'undefined' && window.GSliderBlocksData ) {
		if ( window.GSliderBlocksData.iconsUrl ) {
			return window.GSliderBlocksData.iconsUrl;
		}
		if ( window.GSliderBlocksData.pluginUrl ) {
			return (
				window.GSliderBlocksData.pluginUrl +
				'assets/icon-library/font-awesome.json'
			);
		}
	}
	return '/wp-content/plugins/gslider-blocks/assets/icon-library/font-awesome.json';
};

// Function to check if data exists in localStorage
const getDataFromLocalStorage = () => {
	let data = localStorage.getItem( 'iconData' );
	data = data ? JSON.parse( data ) : null;
	return data;
};

const fetchFromJson = async () => {
	try {
		const iconsUrl = getIconsUrl();
		const response = await fetch( iconsUrl );
		if ( ! response.ok ) {
			throw new Error( 'Network response was not ok' );
		}
		const data = await response.json();
		localStorage.setItem( 'iconData', JSON.stringify( data ) );
		return data;
	} catch ( error ) {
		console.error(
			__( 'Error fetching icon data:', 'gslider-blocks' ),
			error
		);
		return null;
	}
};

// Generate SVG from the json file
function generateSvg( svgArgData ) {
	const svgData = svgArgData.svg.solid;
	const width = svgData.width;
	const height = svgData.height;
	const viewBox = svgData.viewBox;
	const elements = svgData.elements;

	// Start the SVG string
	let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${ width }" height="${ height }" viewBox="${ viewBox }">\n`;

	// Loop through each element and create the appropriate SVG tag
	elements.forEach( ( element ) => {
		const type = element.type;
		const attributes = element.attributes;

		// Start the tag for the current SVG element
		svg += `<${ type }`;

		// Add each attribute
		for ( const attr in attributes ) {
			if ( attributes.hasOwnProperty( attr ) ) {
				svg += ` ${ attr }="${ attributes[ attr ] }"`; // Use double quotes for HTML attributes
			}
		}

		// Close the tag for the current SVG element
		svg += ' />\n';
	} );

	// Close the SVG tag
	svg += '</svg>';

	// Return the complete HTML string
	return svg;
}

// Get data from localStorage or fetch from API
function renderSVG( svg, setAttributes = false, extraProps = {} ) {
	svg = parseSVG( svg );

	let data = getDataFromLocalStorage();
	if ( ! data ) {
		fetchFromJson().then( ( fetchedData ) => {
			data = fetchedData;
		} );
	}

	const svgIcon = data;

	if ( ! svgIcon ) {
		return;
	}

	let fontAwesome;
	fontAwesome = svgIcon[ svg ];

	if ( ! fontAwesome ) {
		return null;
	}

	const fontAwesomeSvg = fontAwesome.svg?.brands
		? fontAwesome.svg.brands
		: fontAwesome.svg.solid;

	const viewBox = `0 0 ${ fontAwesomeSvg.width } ${ fontAwesomeSvg.height }`;
	const path = fontAwesomeSvg.path;

	let align = null;

	if (
		fontAwesome.hasOwnProperty( 'custom_icons' ) &&
		fontAwesome.custom_icons
	) {
		return generateSvg( fontAwesome );
	}
	switch ( svg ) {
		case 'align-center':
			align = {
				fillRule: 'evenodd',
				clipRule: 'evenodd',
				d: 'M4 2H14V0H4V2ZM0 7H18V5H0V7ZM4 12H14V10H4V12Z',
			};
			break;
		case 'align-left':
			align = {
				fillRule: 'evenodd',
				clipRule: 'evenodd',
				d: 'M10 2H0V0H10V2ZM18 7H0V5H18V7ZM10 12H0V10H10V12Z',
			};
			break;
		case 'align-right':
			align = {
				fillRule: 'evenodd',
				clipRule: 'evenodd',
				d: 'M8 2H18V0H8V2ZM0 7H18V5H0V7ZM8 12H18V10H8V12Z',
			};
			break;
		case 'align-justify':
			align = {
				d: 'M0 0H18V2H0V0ZM0 5.00001H18V7.00001H0V5.00001ZM0 10H18V12H0V10Z',
			};
			break;
	}

	if ( align ) {
		return (
			<svg
				width="18"
				height="12"
				viewBox="0 0 18 12"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path { ...align } />
			</svg>
		);
	}

	return ! setAttributes || 'not_set' === setAttributes ? (
		<svg
			xmlns="https://www.w3.org/2000/svg"
			viewBox={ viewBox }
			{ ...extraProps }
		>
			<path d={ path }></path>
		</svg>
	) : (
		<svg
			width="20"
			height="20"
			xmlns="https://www.w3.org/2000/svg"
			viewBox={ viewBox }
			{ ...extraProps }
		>
			<path d={ path }></path>
		</svg>
	);
}

export default renderSVG;
