/**
 * Entry point for the GSlider Blocks React SPA Admin Dashboard.
 *
 * Mounts the Single Page Application to the #gslider-admin-dashboard root.
 *
 * @since 1.2.0
 */

import { createRoot, render } from '@wordpress/element';
import App from './App';

/**
 * Initializes and mounts the React dashboard application.
 */
const initDashboard = () => {
	const container = document.getElementById( 'gslider-admin-dashboard' );
	if ( ! container ) {
		return;
	}

	if ( createRoot ) {
		createRoot( container ).render( <App /> );
	} else if ( render ) {
		render( <App />, container );
	}
};

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', initDashboard );
} else {
	initDashboard();
}
