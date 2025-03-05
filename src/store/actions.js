// This action is used to set the device type. If the Gutenberg stores do not provide device type support, this action serves as a fallback.
export function setDeviceType( value ) {
	return {
		type: 'UPDATE_DEVICE_TYPE',
		value,
	};
}
