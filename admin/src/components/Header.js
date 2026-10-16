/**
 * Header component for the GSlider Blocks Admin Dashboard.
 *
 * Displays the brand logo, title, dynamic version badge, and resource links.
 *
 * @since 1.2.0
 */

import { __ } from '@wordpress/i18n';
import { DashboardLogo, ExternalLinkIcon } from '../icons';

/**
 * GSlider Dashboard Header component.
 *
 * @return {JSX.Element} The rendered header section.
 */
const Header = () => {
	const version = window.GSliderDashboardData?.version || '1.1.9';

	return (
		<header
			className="gslider-dashboard-header"
			aria-label={ __( 'GSlider Blocks Header', 'gslider-blocks' ) }
		>
			<div className="gslider-dashboard-brand">
				<DashboardLogo />
				<h1 className="gslider-dashboard-title">
					{ __( 'GSlider Blocks', 'gslider-blocks' ) }
				</h1>
				<span className="gslider-dashboard-version-pill">
					{ `v${ version }` }
				</span>
			</div>
			<div className="gslider-dashboard-actions">
				<a
					href="https://github.com/noruzzamans/gslider-blocks#readme"
					target="_blank"
					rel="noopener noreferrer"
					className="gslider-dashboard-btn"
				>
					<span>{ __( 'Documentation', 'gslider-blocks' ) }</span>
					<ExternalLinkIcon />
				</a>
				<a
					href="https://wordpress.org/support/plugin/gslider-blocks/"
					target="_blank"
					rel="noopener noreferrer"
					className="gslider-dashboard-btn"
				>
					<span>{ __( 'Support Forum', 'gslider-blocks' ) }</span>
					<ExternalLinkIcon />
				</a>
			</div>
		</header>
	);
};

export default Header;
