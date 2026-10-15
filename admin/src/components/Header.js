/**
 * Header component for the GSlider Blocks Admin Dashboard.
 *
 * Displays the brand logo, title, dynamic version badge, and resource links.
 *
 * @package GSlider
 * @since   1.2.0
 */

import { __ } from '@wordpress/i18n';

/**
 * GSlider Dashboard Header component.
 *
 * @return {JSX.Element} The rendered header section.
 */
const Header = () => {
	const version = window.GSliderDashboardData?.version || '1.1.9';

	return (
		<header className="gslider-dashboard-header" aria-label={__('GSlider Blocks Header', 'gslider-blocks')}>
			<div className="gslider-dashboard-brand">
				<svg
					width="32"
					height="32"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="gslider-dashboard-logo"
					aria-hidden="true"
				>
					<rect width="32" height="32" rx="8" fill="#007cba" />
					<rect x="8" y="9" width="16" height="11" rx="2" fill="#ffffff" />
					<rect x="5" y="11" width="2" height="7" rx="1" fill="#ffffff" fillOpacity="0.5" />
					<rect x="25" y="11" width="2" height="7" rx="1" fill="#ffffff" fillOpacity="0.5" />
					<circle cx="12" cy="23" r="1.25" fill="#ffffff" />
					<circle cx="16" cy="23" r="1.5" fill="#ffffff" />
					<circle cx="20" cy="23" r="1.25" fill="#ffffff" fillOpacity="0.5" />
				</svg>
				<h1 className="gslider-dashboard-title">{__('GSlider Blocks', 'gslider-blocks')}</h1>
				<span className="gslider-dashboard-version-pill">
					{`v${version}`}
				</span>
			</div>
			<div className="gslider-dashboard-actions">
				<a
					href="https://github.com/noruzzamans/gslider-blocks#readme"
					target="_blank"
					rel="noopener noreferrer"
					className="gslider-dashboard-btn"
				>
					<span>{__('Documentation', 'gslider-blocks')}</span>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M3.5 2H10M10 2V8.5M10 2L2 10"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</a>
				<a
					href="https://wordpress.org/support/plugin/gslider-blocks/"
					target="_blank"
					rel="noopener noreferrer"
					className="gslider-dashboard-btn"
				>
					<span>{__('Support Forum', 'gslider-blocks')}</span>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M3.5 2H10M10 2V8.5M10 2L2 10"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</a>
			</div>
		</header>
	);
};

export default Header;
