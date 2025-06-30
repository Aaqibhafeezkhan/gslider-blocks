import { __ } from '@wordpress/i18n';
import icon_Data from './icons.json';

const fetchSvgIcons = async () => {
	// Function to check if data exists in localStorage
	const getDataFromLocalStorage = () => {
		let data = localStorage.getItem('iconData');
		data = data ? JSON.parse(data) : null;
		return data;
	};

	// Insert icon_Data instead of json file
	const fetchFromJson = async () => {
		try {
			const data = icon_Data;
			console.log(data);
			localStorage.setItem('iconData', JSON.stringify(data));
			return data;
		} catch (error) {
			console.error(__('Error inserting icon data:', 'gslider-blocks'), error);
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

