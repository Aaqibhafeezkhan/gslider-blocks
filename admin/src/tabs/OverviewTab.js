/**
 * OverviewTab component for the GSlider Blocks React Admin Dashboard SPA.
 *
 * Renders the hero banner, real-time metric cards, and a 3-step
 * Gutenberg Quick Start guide.
 *
 * @package GSlider
 * @since   1.2.0
 */

import { __, sprintf } from '@wordpress/i18n';
import MetricCard from '../components/MetricCard';

/**
 * OverviewTab Component.
 *
 * @param {Object}   props                  Component props.
 * @param {Function} props.setActiveTab     Callback to switch active tabs.
 * @param {Object}   [props.dashboardData]  REST API dashboard data.
 * @param {boolean}  [props.isLoading=false] Whether data is loading.
 * @param {boolean}  [props.hasError=false]  Whether data fetch resulted in an error.
 * @return {JSX.Element} The rendered overview tab view.
 */
const OverviewTab = ( {
	setActiveTab,
	dashboardData = null,
	isLoading = false,
	hasError = false,
} ) => {
	const adminUrl = window.GSliderDashboardData?.adminUrl || 'post-new.php?post_type=page';
	const createPageUrl = adminUrl.endsWith( '/' )
		? `${ adminUrl }post-new.php?post_type=page`
		: `${ adminUrl }/post-new.php?post_type=page`;

	const slidersCount = dashboardData?.sliders_count;
	const blocksList = dashboardData?.blocks || [];
	const totalBlocks = blocksList.length || 5;
	const activeBlocksCount = blocksList.length > 0
		? blocksList.filter( ( b ) => b.enabled ).length
		: 5;

	return (
		<div className="gslider-dashboard-overview">
			{ /* Section 1: Hero Banner */ }
			<section className="gslider-dashboard-hero" aria-label={ __( 'Dashboard Overview Hero', 'gslider-blocks' ) }>
				<div className="gslider-dashboard-hero-content">
					<span className="gslider-dashboard-hero-badge">
						{ __( 'Gutenberg Studio', 'gslider-blocks' ) }
					</span>
					<h2 className="gslider-dashboard-hero-title">
						{ __( 'Welcome to GSlider Blocks Studio', 'gslider-blocks' ) }
					</h2>
					<p className="gslider-dashboard-hero-subtitle">
						{ __(
							'Modern, touch-responsive carousels and sliders built directly for the Gutenberg editor.',
							'gslider-blocks'
						) }
					</p>
				</div>
				<div className="gslider-dashboard-hero-actions">
					<a
						href={ createPageUrl }
						className="gslider-dashboard-btn gslider-dashboard-btn-primary"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								d="M10 4V16M4 10H16"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<span>{ __( 'Create New Page with Slider', 'gslider-blocks' ) }</span>
					</a>
				</div>
			</section>

			{ /* Section 2: Stat Cards Grid */ }
			<section
				className="gslider-dashboard-grid gslider-dashboard-metrics-grid"
				aria-label={ __( 'Key Metrics', 'gslider-blocks' ) }
			>
				{ /* Card 1: Sliders */ }
				<MetricCard
					title={ __( 'Sliders', 'gslider-blocks' ) }
					value={
						hasError
							? '—'
							: typeof slidersCount === 'number' && slidersCount > 0
							? slidersCount
							: null
					}
					subtitle={ hasError ? null : __( 'On published posts and pages', 'gslider-blocks' ) }
					isLoading={ isLoading }
					emptyMessage={
						hasError
							? __(
								'Unable to load live metrics. Refresh page to try again.',
								'gslider-blocks'
							)
							: slidersCount === 0
							? __(
								'No sliders created yet. Insert your first GSlider block in any page or post to see live metrics here.',
								'gslider-blocks'
							)
							: null
					}
					icon={
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="2.5" y="3.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
							<path d="M6 8.5L8.5 11L11.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<circle cx="14" cy="7" r="1" fill="currentColor" />
						</svg>
					}
					badge={ __( 'Live Metric', 'gslider-blocks' ) }
				/>

				{ /* Card 2: Active Core Blocks */ }
				<MetricCard
					title={ __( 'Active Core Blocks', 'gslider-blocks' ) }
					value={
						hasError
							? '—'
							: sprintf( __( '%1$d of %2$d Active', 'gslider-blocks' ), activeBlocksCount, totalBlocks )
					}
					subtitle={
						hasError
							? __( 'Unable to load block status', 'gslider-blocks' )
							: __( 'Core Gutenberg slider modules', 'gslider-blocks' )
					}
					isLoading={ isLoading }
					action={
						<button
							type="button"
							className="gslider-dashboard-card-link"
							onClick={ () => setActiveTab( 'blocks' ) }
						>
							<span>{ __( 'Manage Blocks', 'gslider-blocks' ) }</span>
							<svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>
					}
					icon={
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
							<rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
							<rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
							<rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
						</svg>
					}
					badge={ hasError ? null : __( '5 Core Modules', 'gslider-blocks' ) }
				/>

				{ /* Card 3: Modern Architecture Highlight */ }
				<MetricCard
					title={ __( 'Modern Architecture', 'gslider-blocks' ) }
					value={ __( 'Zero jQuery', 'gslider-blocks' ) }
					subtitle={ __( 'Pure Swiper.js + React runtime, 0 jQuery dependencies', 'gslider-blocks' ) }
					isLoading={ isLoading }
					icon={
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M11 2L4 11H10L9 18L16 9H10L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					}
					badge={ __( 'Pure React + Swiper', 'gslider-blocks' ) }
				/>
			</section>

			{ /* Section 3: 3-Step Gutenberg Quick Start Guide */ }
			<section
				className="gslider-dashboard-card gslider-dashboard-quickstart"
				aria-label={ __( 'Gutenberg Quick Start Guide', 'gslider-blocks' ) }
			>
				<div className="gslider-dashboard-quickstart-header">
					<span className="gslider-dashboard-quickstart-badge">
						{ __( 'Quick Start', 'gslider-blocks' ) }
					</span>
					<h3 className="gslider-dashboard-quickstart-title">
						{ __( 'Create Your First Slider in 3 Simple Steps', 'gslider-blocks' ) }
					</h3>
					<p className="gslider-dashboard-quickstart-subtitle">
						{ __(
							'Build and deploy responsive carousels directly in the WordPress Block Editor with zero coding required.',
							'gslider-blocks'
						) }
					</p>
				</div>

				<div className="gslider-dashboard-steps-grid">
					{ /* Step 1 */ }
					<div className="gslider-dashboard-step-item">
						<div className="gslider-dashboard-step-number">1</div>
						<div className="gslider-dashboard-step-content">
							<h4 className="gslider-dashboard-step-title">
								{ __( 'Open Block Editor', 'gslider-blocks' ) }
							</h4>
							<p className="gslider-dashboard-step-desc">
								{ __( 'Open any Page or Post in the WordPress Block Editor.', 'gslider-blocks' ) }
							</p>
						</div>
					</div>

					{ /* Step 2 */ }
					<div className="gslider-dashboard-step-item">
						<div className="gslider-dashboard-step-number">2</div>
						<div className="gslider-dashboard-step-content">
							<h4 className="gslider-dashboard-step-title">
								{ __( 'Insert a GSlider Block', 'gslider-blocks' ) }
							</h4>
							<p className="gslider-dashboard-step-desc">
								{ __(
									'Click + and search for "GSlider" (e.g. Image Slider, Testimonial, Logo Carousel).',
									'gslider-blocks'
								) }
							</p>
						</div>
					</div>

					{ /* Step 3 */ }
					<div className="gslider-dashboard-step-item">
						<div className="gslider-dashboard-step-number">3</div>
						<div className="gslider-dashboard-step-content">
							<h4 className="gslider-dashboard-step-title">
								{ __( 'Customize & Publish', 'gslider-blocks' ) }
							</h4>
							<p className="gslider-dashboard-step-desc">
								{ __( 'Customize slide items and publish.', 'gslider-blocks' ) }
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default OverviewTab;
