import { __ } from '@wordpress/i18n';

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

const fetchSvgIcons = async () => {
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

	// Get data from localStorage or insert icon_Data
	let data = getDataFromLocalStorage();
	if ( ! data ) {
		data = await fetchFromJson();
		data = { ...data };
	}

	return data;
};

export default fetchSvgIcons;
