/**
 * Root Application component for the GSlider Blocks React Admin Dashboard SPA.
 *
 * @package GSlider
 * @since   1.2.0
 */

import { __ } from '@wordpress/i18n';
import Header from './components/Header';

/**
 * Main Dashboard Application component.
 *
 * @return {JSX.Element} The root dashboard element.
 */
const App = () => {
	return (
		<div className="gslider-dashboard-wrap">
			<Header />
			<main className="gslider-dashboard-main">
				<div className="gslider-dashboard-card">
					<h2>{__('GSlider Studio Ready', 'gslider-blocks')}</h2>
					<p>
						{__(
							'React SPA mount container is online and ready for dashboard components.',
							'gslider-blocks'
						)}
					</p>
				</div>
			</main>
		</div>
	);
};

export default App;
