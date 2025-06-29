const fetchSvgIcons = async () => {
	const url = 'https://svg-icons.boomdevs.com/';
	const token = 'b9e9d7516943744aed44d0be39217694a92784ce737e07c9e12397eca99fded0';

	const { ajaxUrl, nonce } = window.FrontisBlocksData;

	const mergeOldNewArray = (data, iconCustomData) => {
		const chunkSize = 8; // Maximum items per sub-array
		const customIconArray = [];

		for (let i = 0; i < iconCustomData.length; i += chunkSize) {
			customIconArray.push(iconCustomData.slice(i, i + chunkSize));
		}

		data = data ? JSON.parse(data) : [];

		return data.concat(customIconArray);
	}

	// Function to check if data exists in localStorage
	const getDataFromLocalStorage = () => {
		let data = localStorage.getItem('iconData');
		data = data ? JSON.parse(data) : null;

		let customIconData = localStorage.getItem('iconCustomData');
		customIconData = customIconData ? JSON.parse(customIconData) : null;
		return { ...data, ...customIconData };
	};

	// Fetch SVG icons from the API
	const fetchFromApi = async () => {
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			localStorage.setItem('iconData', JSON.stringify(data)); // Store data in localStorage
			return data;
		} catch (error) {
			console.error('Error fetching SVG icons:', error);
			return null;
		}
	};

	// Fetch custom icons svg from the db
	const fetchCustomIcons = async () => {
		try {
			const response = await jQuery.ajax({
				url: ajaxUrl,
				type: 'POST',
				data: {
					action: 'fb_get_custom_icons_category',
					security: nonce
				}
			});
			if(response.data) {
				localStorage.setItem('iconCustomData', JSON.stringify(response.data.icons));
				return response.data.icons;
			}
		} catch (error) {
			console.error('Error fetching custom icons:', error);
		}
	}

	// Get data from localStorage or fetch from API
	let data = getDataFromLocalStorage();
	if (!data) {
		data = await fetchFromApi();
		const customData = await fetchCustomIcons();

		data = { ...data, ...customData };
	}

	return data; // Return the fetched or retrieved data
};

export default fetchSvgIcons;
