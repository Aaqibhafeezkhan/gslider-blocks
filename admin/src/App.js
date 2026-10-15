/**
 * Root Application component for the GSlider Blocks React Admin Dashboard SPA.
 *
 * Manages tab navigation state with bidirectional browser URL hash synchronization.
 *
 * @package GSlider
 * @since   1.2.0
 */

import { useState, useEffect, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import Header from './components/Header';
import Navigation from './components/Navigation';

/**
 * Valid tab identifiers.
 */
const VALID_TABS = ['overview', 'blocks', 'settings', 'tools'];
const DEFAULT_TAB = 'overview';

/**
 * Helper to parse the initial tab from the window URL hash.
 *
 * @return {string} Valid tab id.
 */
const getTabFromHash = () => {
	if (typeof window === 'undefined') {
		return DEFAULT_TAB;
	}
	const hash = window.location.hash.replace('#', '').toLowerCase();
	return VALID_TABS.includes(hash) ? hash : DEFAULT_TAB;
};

/**
 * Main Dashboard Application component.
 *
 * @return {JSX.Element} The root dashboard element.
 */
const App = () => {
	const [activeTab, setActiveTabState] = useState(getTabFromHash);

	/**
	 * Sets the active tab and synchronizes the browser URL hash.
	 */
	const setActiveTab = useCallback((tabId) => {
		if (VALID_TABS.includes(tabId)) {
			setActiveTabState(tabId);
			if (window.location.hash !== `#${tabId}`) {
				window.location.hash = tabId;
			}
		}
	}, []);

	/**
	 * Listens to hashchange events to support browser back/forward and bookmarking.
	 */
	useEffect(() => {
		const handleHashChange = () => {
			const newTab = getTabFromHash();
			setActiveTabState(newTab);
		};

		window.addEventListener('hashchange', handleHashChange);
		return () => {
			window.removeEventListener('hashchange', handleHashChange);
		};
	}, []);

	return (
		<div className="gslider-dashboard-wrap">
			<Header />
			<Navigation activeTab={activeTab} setActiveTab={setActiveTab} activeBlocksCount={5} />
			<main className="gslider-dashboard-main">
				<div
					role="tabpanel"
					id={`gslider-tabpanel-${activeTab}`}
					aria-labelledby={`gslider-tab-${activeTab}`}
					className="gslider-dashboard-tabpanel"
					tabIndex={0}
				>
					{activeTab === 'overview' && (
						<div className="gslider-dashboard-card">
							<h2>{__('Welcome to GSlider Studio', 'gslider-blocks')}</h2>
							<p>
								{__(
									'High-performance, modern responsive slider and carousel blocks engineered for Gutenberg and Full Site Editing.',
									'gslider-blocks'
								)}
							</p>
						</div>
					)}

					{activeTab === 'blocks' && (
						<div className="gslider-dashboard-card">
							<h2>{__('GSlider Core Blocks', 'gslider-blocks')}</h2>
							<p>
								{__(
									'Manage and configure the 5 core slider blocks: Base Slider, Testimonial Slider, Image Slider, Logo Carousel, and Flexi Content Slider.',
									'gslider-blocks'
								)}
							</p>
						</div>
					)}

					{activeTab === 'settings' && (
						<div className="gslider-dashboard-card">
							<h2>{__('Global Preferences & Settings', 'gslider-blocks')}</h2>
							<p>
								{__(
									'Configure asset loading optimization, Swiper defaults, and global styling behaviors.',
									'gslider-blocks'
								)}
							</p>
						</div>
					)}

					{activeTab === 'tools' && (
						<div className="gslider-dashboard-card">
							<h2>{__('System Information & Diagnostics', 'gslider-blocks')}</h2>
							<p>
								{__(
									'Inspect system environment, active WordPress REST endpoints, and debug telemetry.',
									'gslider-blocks'
								)}
							</p>
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default App;
