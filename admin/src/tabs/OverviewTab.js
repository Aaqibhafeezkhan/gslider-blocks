/**
 * OverviewTab component for the GSlider Blocks React Admin Dashboard SPA.
 *
 * Renders the hero banner, real-time metric cards, and a 3-step
 * Gutenberg Quick Start guide.
 *
 * @since 1.2.0
 */

import { __, sprintf } from '@wordpress/i18n';
import MetricCard from '../components/MetricCard';
import {
	PlusIcon,
	SlidersMetricIcon,
	BlocksMetricIcon,
	LightningIcon,
	ChevronRightIcon,
} from '../icons';

/**
 * OverviewTab Component.
 *
 * @param {Object}   props                   Component props.
 * @param {Function} props.setActiveTab      Callback to switch active tabs.
 * @param {Object}   [props.dashboardData]   REST API dashboard data.
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
	const adminUrl =
		window.GSliderDashboardData?.adminUrl || 'post-new.php?post_type=page';
	const createPageUrl = adminUrl.endsWith( '/' )
		? `${ adminUrl }post-new.php?post_type=page`
		: `${ adminUrl }/post-new.php?post_type=page`;

	const slidersCount = dashboardData?.sliders_count;
	const blocksList = dashboardData?.blocks || [];
	const totalBlocks = blocksList.length || 5;
	const activeBlocksCount =
		blocksList.length > 0
			? blocksList.filter( ( b ) => b.enabled ).length
			: 5;

	let sliderMetricValue = null;
	if ( hasError ) {
		sliderMetricValue = '—';
	} else if ( typeof slidersCount === 'number' && slidersCount > 0 ) {
		sliderMetricValue = slidersCount;
	}

	let sliderEmptyMessage = null;
	if ( hasError ) {
		sliderEmptyMessage = __(
			'Unable to load live metrics. Refresh page to try again.',
			'gslider-blocks'
		);
	} else if ( slidersCount === 0 ) {
		sliderEmptyMessage = __(
			'No sliders created yet. Insert your first GSlider block in any page or post to see live metrics here.',
			'gslider-blocks'
		);
	}

	let activeBlocksDisplay = '—';
	if ( ! hasError ) {
		activeBlocksDisplay = sprintf(
			/* translators: 1: number of active blocks, 2: total number of blocks */
			__( '%1$d of %2$d Active', 'gslider-blocks' ),
			activeBlocksCount,
			totalBlocks
		);
	}

	return (
		<div className="gslider-dashboard-overview">
			{ /* Section 1: Hero Banner */ }
			<section
				className="gslider-dashboard-hero"
				aria-label={ __( 'Dashboard Overview Hero', 'gslider-blocks' ) }
			>
				<div className="gslider-dashboard-hero-content">
					<span className="gslider-dashboard-hero-badge">
						{ __( 'Gutenberg Studio', 'gslider-blocks' ) }
					</span>
					<h2 className="gslider-dashboard-hero-title">
						{ __(
							'Welcome to GSlider Blocks Studio',
							'gslider-blocks'
						) }
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
						<PlusIcon />
						<span>
							{ __(
								'Create New Page with Slider',
								'gslider-blocks'
							) }
						</span>
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
					value={ sliderMetricValue }
					subtitle={
						hasError
							? null
							: __(
									'On published posts and pages',
									'gslider-blocks'
							  )
					}
					isLoading={ isLoading }
					emptyMessage={ sliderEmptyMessage }
					icon={ <SlidersMetricIcon /> }
					badge={ __( 'Live Metric', 'gslider-blocks' ) }
				/>

				{ /* Card 2: Active Core Blocks */ }
				<MetricCard
					title={ __( 'Active Core Blocks', 'gslider-blocks' ) }
					value={ activeBlocksDisplay }
					subtitle={
						hasError
							? __(
									'Unable to load block status',
									'gslider-blocks'
							  )
							: __(
									'Core Gutenberg slider modules',
									'gslider-blocks'
							  )
					}
					isLoading={ isLoading }
					action={
						<button
							type="button"
							className="gslider-dashboard-card-link"
							onClick={ () => setActiveTab( 'blocks' ) }
						>
							<span>
								{ __( 'Manage Blocks', 'gslider-blocks' ) }
							</span>
							<ChevronRightIcon />
						</button>
					}
					icon={ <BlocksMetricIcon /> }
					badge={
						hasError
							? null
							: __( '5 Core Modules', 'gslider-blocks' )
					}
				/>

				{ /* Card 3: Modern Architecture Highlight */ }
				<MetricCard
					title={ __( 'Modern Architecture', 'gslider-blocks' ) }
					value={ __( 'Zero jQuery', 'gslider-blocks' ) }
					subtitle={ __(
						'Pure Swiper.js + React runtime, 0 jQuery dependencies',
						'gslider-blocks'
					) }
					isLoading={ isLoading }
					icon={ <LightningIcon /> }
					badge={ __( 'Pure React + Swiper', 'gslider-blocks' ) }
				/>
			</section>

			{ /* Section 3: 3-Step Gutenberg Quick Start Guide */ }
			<section
				className="gslider-dashboard-card gslider-dashboard-quickstart"
				aria-label={ __(
					'Gutenberg Quick Start Guide',
					'gslider-blocks'
				) }
			>
				<div className="gslider-dashboard-quickstart-header">
					<span className="gslider-dashboard-quickstart-badge">
						{ __( 'Quick Start', 'gslider-blocks' ) }
					</span>
					<h3 className="gslider-dashboard-quickstart-title">
						{ __(
							'Create Your First Slider in 3 Simple Steps',
							'gslider-blocks'
						) }
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
								{ __(
									'Open any Page or Post in the WordPress Block Editor.',
									'gslider-blocks'
								) }
							</p>
						</div>
					</div>

					{ /* Step 2 */ }
					<div className="gslider-dashboard-step-item">
						<div className="gslider-dashboard-step-number">2</div>
						<div className="gslider-dashboard-step-content">
							<h4 className="gslider-dashboard-step-title">
								{ __(
									'Insert a GSlider Block',
									'gslider-blocks'
								) }
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
								{ __(
									'Customize & Publish',
									'gslider-blocks'
								) }
							</h4>
							<p className="gslider-dashboard-step-desc">
								{ __(
									'Customize slide items and publish.',
									'gslider-blocks'
								) }
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default OverviewTab;
