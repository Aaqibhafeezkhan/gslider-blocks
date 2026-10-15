/**
 * Navigation tabs component for GSlider Blocks React Admin Dashboard.
 *
 * Provides floating pill tabs with keyboard accessibility and ARIA semantics.
 *
 * @package GSlider
 * @since   1.2.0
 */

import { useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Tab items definition with lightweight inline SVGs.
 */
const TABS = [
	{
		id: 'overview',
		label: __('Overview', 'gslider-blocks'),
		icon: (
			<svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<rect x="2" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
				<rect x="9" y="2" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
				<rect x="2" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
				<rect x="9" y="9" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
			</svg>
		),
	},
	{
		id: 'blocks',
		label: __('Blocks', 'gslider-blocks'),
		hasBadge: true,
		icon: (
			<svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
				<path d="M5 6V10M8 6V10M11 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
			</svg>
		),
	},
	{
		id: 'settings',
		label: __('Settings', 'gslider-blocks'),
		icon: (
			<svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path d="M2.5 4.5H9.5M12.5 4.5H13.5M6.5 11.5H13.5M2.5 11.5H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				<circle cx="11" cy="4.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
				<circle cx="5" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
			</svg>
		),
	},
	{
		id: 'tools',
		label: __('Tools', 'gslider-blocks'),
		icon: (
			<svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path d="M10 2L14 6L6.5 13.5H2.5V9.5L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M8.5 3.5L12.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
];

/**
 * Navigation Component.
 *
 * @param {Object}   props                   Component properties.
 * @param {string}   props.activeTab         Current active tab identifier.
 * @param {Function} props.setActiveTab      Function to update the active tab.
 * @param {number|null} [props.activeBlocksCount=null] Total count of active blocks for badge.
 * @return {JSX.Element} Navigation tablist.
 */
const Navigation = ({ activeTab, setActiveTab, activeBlocksCount = null }) => {
	const tabRefs = useRef({});

	/**
	 * Handles arrow key navigation across tabs.
	 *
	 * @param {KeyboardEvent} event Keyboard event.
	 * @param {number}        index Current tab index.
	 */
	const handleKeyDown = (event, index) => {
		const count = TABS.length;
		let nextIndex = null;

		switch (event.key) {
			case 'ArrowRight':
				nextIndex = (index + 1) % count;
				break;
			case 'ArrowLeft':
				nextIndex = (index - 1 + count) % count;
				break;
			case 'Home':
				nextIndex = 0;
				break;
			case 'End':
				nextIndex = count - 1;
				break;
			default:
				return;
		}

		event.preventDefault();
		const nextTab = TABS[nextIndex];
		if (nextTab) {
			setActiveTab(nextTab.id);
			if (tabRefs.current[nextTab.id]) {
				tabRefs.current[nextTab.id].focus();
			}
		}
	};

	return (
		<nav className="gslider-dashboard-nav" aria-label={__('Dashboard Navigation', 'gslider-blocks')}>
			<div className="gslider-dashboard-tabs" role="tablist" aria-orientation="horizontal">
				{TABS.map((tab, index) => {
					const isActive = activeTab === tab.id;
					const badgeCount = tab.hasBadge && typeof activeBlocksCount === 'number' ? activeBlocksCount : null;

					return (
						<button
							key={tab.id}
							ref={(el) => {
								tabRefs.current[tab.id] = el;
							}}
							role="tab"
							id={`gslider-tab-${tab.id}`}
							aria-selected={isActive}
							aria-controls={`gslider-tabpanel-${tab.id}`}
							tabIndex={isActive ? 0 : -1}
							className={`gslider-dashboard-tab ${isActive ? 'is-active' : ''}`}
							onClick={() => setActiveTab(tab.id)}
							onKeyDown={(e) => handleKeyDown(e, index)}
							type="button"
						>
							<span className="gslider-dashboard-tab-icon">{tab.icon}</span>
							<span className="gslider-dashboard-tab-label">{tab.label}</span>
							{badgeCount !== null && (
								<span className="gslider-dashboard-tab-badge">
									{badgeCount}
								</span>
							)}
						</button>
					);
				})}
			</div>
		</nav>
	);
};

export default Navigation;
