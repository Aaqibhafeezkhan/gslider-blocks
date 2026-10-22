export const isCustomizerPage = () => {
	// We need to run this script only on customizer page.
	if ( ! window.location.href.includes( '/customize.php' ) ) {
		return false;
	}

	if ( ! window?.wp?.customize ) {
		return false;
	}

	return true;
};
