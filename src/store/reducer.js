const DEFAULT_STATE = {
	deviceType: 'Desktop',
};
function reducer( state = DEFAULT_STATE, action ) {
	switch ( action.type ) {
		case 'UPDATE_INITIAL_STATE':
			return {
				...state,
				...action.value,
			};
		case 'UPDATE_DEVICE_TYPE':
			return {
				...state,
				deviceType: action.value,
			};
	}

	return state;
}

export default reducer;
