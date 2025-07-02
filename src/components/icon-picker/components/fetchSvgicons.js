import { __ } from '@wordpress/i18n';

const fetchSvgIcons = async () => {
	// Function to check if data exists in localStorage
	const getDataFromLocalStorage = () => {
		let data = localStorage.getItem('iconData');
		data = data ? JSON.parse(data) : null;
		return data;
	};

	const fetchFromJson = async () => {
		try {
			const response = await fetch('https://raw.githubusercontent.com/noruzzamans/plugins-demo-content/master/icons.json');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			localStorage.setItem('iconData', JSON.stringify(data));
			return data;
		} catch (error) {
			console.error(__('Error fetching icon data:', 'gslider-blocks'), error);
			return null;
		}
	};

	// Get data from localStorage or insert icon_Data
	let data = getDataFromLocalStorage();
	if (!data) {
		data = await fetchFromJson();
		data = { ...data };
	}

	return data;
};

export default fetchSvgIcons;

