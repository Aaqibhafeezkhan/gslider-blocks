/**
 * MetricCard component for GSlider Blocks Admin Dashboard.
 *
 * Displays executive metrics with skeleton loading states,
 * custom SVG icons, subtitles, and optional action buttons.
 *
 * @since 1.2.0
 */

const MetricCard = ( {
	title,
	value,
	subtitle,
	icon,
	badge,
	isLoading = false,
	emptyMessage = null,
	action = null,
} ) => {
	if ( isLoading ) {
		return (
			<div className="gslider-dashboard-card gslider-dashboard-metric-card is-loading">
				<div className="gslider-dashboard-metric-header">
					<div className="gslider-dashboard-skeleton gslider-skeleton-icon" />
					<div className="gslider-dashboard-skeleton gslider-skeleton-title" />
				</div>
				<div className="gslider-dashboard-metric-body">
					<div className="gslider-dashboard-skeleton gslider-skeleton-value" />
					<div className="gslider-dashboard-skeleton gslider-skeleton-text" />
				</div>
			</div>
		);
	}

	return (
		<div className="gslider-dashboard-card gslider-dashboard-metric-card">
			<div className="gslider-dashboard-metric-header">
				<div className="gslider-dashboard-metric-header-left">
					{ icon && (
						<div className="gslider-dashboard-metric-icon">
							{ icon }
						</div>
					) }
					<h3 className="gslider-dashboard-metric-title">
						{ title }
					</h3>
				</div>
				{ badge && (
					<span className="gslider-dashboard-metric-badge">
						{ badge }
					</span>
				) }
			</div>

			<div className="gslider-dashboard-metric-body">
				{ value !== undefined && value !== null && (
					<div className="gslider-dashboard-metric-value">
						{ value }
					</div>
				) }

				{ emptyMessage ? (
					<p className="gslider-dashboard-metric-empty">
						{ emptyMessage }
					</p>
				) : (
					subtitle && (
						<p className="gslider-dashboard-metric-subtitle">
							{ subtitle }
						</p>
					)
				) }

				{ action && (
					<div className="gslider-dashboard-metric-action">
						{ action }
					</div>
				) }
			</div>
		</div>
	);
};

export default MetricCard;
