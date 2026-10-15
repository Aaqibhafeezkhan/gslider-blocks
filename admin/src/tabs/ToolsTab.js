/**
 * ToolsTab component for the GSlider Blocks React Admin Dashboard SPA.
 *
 * Provides a 1-click dynamic CSS cache purger and a sanitized system
 * diagnostics report generator with 1-click clipboard export.
 *
 * @package
 * @since   1.2.0
 */

import { useState, useEffect, useCallback, useRef } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

/**
 * ToolsTab Component.
 *
 * @param {Object}   props                    Component properties.
 * @param {Object}   [props.dashboardData]    Dashboard API data including cache & system metrics.
 * @param {Function} [props.setDashboardData] State setter for parent dashboard data.
 * @return {JSX.Element} The rendered tools tab view.
 */
const ToolsTab = ( { dashboardData, setDashboardData } ) => {
	const [ isPurging, setIsPurging ] = useState( false );
	const [ isReportLoading, setIsReportLoading ] = useState( false );
	const [ systemReport, setSystemReport ] = useState( null );
	const [ isCopied, setIsCopied ] = useState( false );
	const [ toast, setToast ] = useState( null );

	const copyTimeoutRef = useRef( null );
	const toastTimeoutRef = useRef( null );

	// Cleanup timers on unmount
	useEffect( () => {
		return () => {
			if ( copyTimeoutRef.current ) {
				clearTimeout( copyTimeoutRef.current );
			}
			if ( toastTimeoutRef.current ) {
				clearTimeout( toastTimeoutRef.current );
			}
		};
	}, [] );

	/**
	 * Shows a self-dismissing toast notification.
	 *
	 * @param {string} message          The notification message to display.
	 * @param {string} [type='success'] Notification type ('success' or 'error').
	 */
	const showToast = ( message, type = 'success' ) => {
		if ( toastTimeoutRef.current ) {
			clearTimeout( toastTimeoutRef.current );
		}
		setToast( { message, type } );
		toastTimeoutRef.current = setTimeout( () => {
			setToast( null );
		}, 3500 );
	};

	/**
	 * Fetches the detailed system diagnostics report from the REST API.
	 */
	const fetchSystemReport = useCallback( async () => {
		setIsReportLoading( true );
		try {
			const response = await apiFetch( {
				path: '/gslider/v1/dashboard/system-report',
			} );

			const reportData = response?.data || response?.report;
			if ( response && response.status === 'success' && reportData ) {
				setSystemReport( reportData );
			}
		} catch ( err ) {
			// Fail gracefully without interrupting UI
		} finally {
			setIsReportLoading( false );
		}
	}, [] );

	// Load system report on mount
	useEffect( () => {
		fetchSystemReport();
	}, [ fetchSystemReport ] );

	/**
	 * Purges generated dynamic CSS files via the REST API.
	 */
	const handlePurgeCache = async () => {
		setIsPurging( true );

		try {
			const response = await apiFetch( {
				path: '/gslider/v1/dashboard/clear-cache',
				method: 'POST',
			} );

			if ( response && response.status === 'success' ) {
				const deletedCount = response.deleted_files ?? 0;

				// Update parent dashboard data cache stats to 0
				if ( typeof setDashboardData === 'function' ) {
					setDashboardData( ( prev ) => ( {
						...prev,
						cache: {
							files_count: 0,
							total_size_bytes: 0,
							total_size_formatted: '0 KB',
						},
					} ) );
				}

				showToast(
					response.message ||
						sprintf(
							/* translators: %d: number of deleted files */
							__(
								'Dynamic CSS cache purged successfully (%d files removed).',
								'gslider-blocks'
							),
							deletedCount
						),
					'success'
				);
			} else {
				showToast(
					__(
						'Failed to purge dynamic CSS cache. Please try again.',
						'gslider-blocks'
					),
					'error'
				);
			}
		} catch ( err ) {
			showToast(
				__(
					'Failed to purge cache. Please check your user permissions or network connection.',
					'gslider-blocks'
				),
				'error'
			);
		} finally {
			setIsPurging( false );
		}
	};

	/**
	 * Copies the formatted system diagnostic report to the user's clipboard.
	 */
	const handleCopyReport = async () => {
		const textToCopy = systemReport?.formatted_text;
		if ( ! textToCopy ) {
			return;
		}

		try {
			if (
				typeof window !== 'undefined' &&
				window.navigator?.clipboard?.writeText
			) {
				await window.navigator.clipboard.writeText( textToCopy );
			} else if ( typeof document !== 'undefined' ) {
				// Fallback for older browsers
				const textArea = document.createElement( 'textarea' );
				textArea.value = textToCopy;
				textArea.style.position = 'fixed';
				textArea.style.left = '-999999px';
				textArea.style.top = '-999999px';
				document.body.appendChild( textArea );
				textArea.focus();
				textArea.select();
				document.execCommand( 'copy' );
				document.body.removeChild( textArea );
			}

			setIsCopied( true );
			showToast(
				__(
					'System report copied to clipboard successfully.',
					'gslider-blocks'
				),
				'success'
			);

			if ( copyTimeoutRef.current ) {
				clearTimeout( copyTimeoutRef.current );
			}
			copyTimeoutRef.current = setTimeout( () => {
				setIsCopied( false );
			}, 2500 );
		} catch ( err ) {
			showToast(
				__(
					'Failed to copy report to clipboard. Please copy manually from the preview below.',
					'gslider-blocks'
				),
				'error'
			);
		}
	};

	const filesCount = dashboardData?.cache?.files_count ?? 0;
	const totalSizeFormatted =
		dashboardData?.cache?.total_size_formatted ?? '0 KB';

	const metrics = systemReport?.metrics || {};
	const wpVersion =
		metrics.wp_version || dashboardData?.system?.wp_version || 'N/A';
	const phpVersion =
		metrics.php_version || dashboardData?.system?.php_version || 'N/A';
	const memoryLimit =
		metrics.memory_limit || dashboardData?.system?.memory_limit || 'N/A';
	const webServer = metrics.web_server || 'N/A';
	const maxExecutionTime = metrics.max_execution_time || 'N/A';
	const themeName = metrics.theme_name
		? `${ metrics.theme_name } (${ metrics.theme_version || '' })`
		: 'N/A';
	const cssDelivery =
		metrics.css_delivery || dashboardData?.settings?.css_delivery || 'file';
	const deliveryLabel =
		cssDelivery === 'inline'
			? __( 'Direct Inline Style', 'gslider-blocks' )
			: __( 'External Generated Stylesheet', 'gslider-blocks' );
	const googleFontsPrivacy =
		metrics.google_fonts_privacy ??
		dashboardData?.settings?.google_fonts_privacy ??
		false;
	const privacyLabel = googleFontsPrivacy
		? __( 'Enabled (GDPR Compliant)', 'gslider-blocks' )
		: __( 'Disabled (Google Fonts Allowed)', 'gslider-blocks' );
	const totalSliders =
		metrics.sliders_count ?? dashboardData?.sliders_count ?? 0;

	return (
		<div className="gslider-dashboard-tools-container">
			{ /* Header Description Card */ }
			<div className="gslider-dashboard-card gslider-dashboard-tools-header-card">
				<div className="gslider-dashboard-tools-header">
					<div className="gslider-dashboard-tools-header-left">
						<h2 className="gslider-dashboard-tools-title">
							{ __(
								'System Tools & Diagnostics',
								'gslider-blocks'
							) }
						</h2>
						<p className="gslider-dashboard-tools-desc">
							{ __(
								'Purge pre-compiled dynamic CSS caches and export sanitized diagnostic reports for troubleshooting and GitHub support issues.',
								'gslider-blocks'
							) }
						</p>
					</div>
				</div>
			</div>

			{ /* Tool 1: Dynamic CSS Cache Purger */ }
			<div className="gslider-tools-card">
				<div className="gslider-tools-card-header">
					<div className="gslider-tools-card-info">
						<div className="gslider-tools-card-title-row">
							<span
								className="gslider-tools-card-icon"
								aria-hidden="true"
							>
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
									<polyline points="3.27 6.96 12 12.01 20.73 6.96" />
									<line x1="12" y1="22.08" x2="12" y2="12" />
								</svg>
							</span>
							<h3 className="gslider-tools-card-title">
								{ __(
									'Dynamic CSS Cache Purger',
									'gslider-blocks'
								) }
							</h3>
							<span className="gslider-tools-badge is-cached">
								{ __( 'Auto-Generated', 'gslider-blocks' ) }
							</span>
						</div>
						<p className="gslider-tools-card-desc">
							{ __(
								'GSlider Blocks compiles dynamic block styling into minified, high-performance static stylesheets inside your uploads folder. Purging deletes only generated CSS files and safely regenerates fresh assets on subsequent visitor requests.',
								'gslider-blocks'
							) }
						</p>
					</div>

					<div className="gslider-tools-card-action">
						<button
							type="button"
							className="gslider-tools-action-btn is-danger"
							onClick={ handlePurgeCache }
							disabled={ isPurging }
							aria-label={ __(
								'Purge dynamic CSS cache',
								'gslider-blocks'
							) }
						>
							{ isPurging ? (
								<>
									<svg
										width="15"
										height="15"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="gslider-spin"
										aria-hidden="true"
									>
										<line x1="12" y1="2" x2="12" y2="6" />
										<line x1="12" y1="18" x2="12" y2="22" />
										<line
											x1="4.93"
											y1="4.93"
											x2="7.76"
											y2="7.76"
										/>
										<line
											x1="16.24"
											y1="16.24"
											x2="19.07"
											y2="19.07"
										/>
										<line x1="2" y1="12" x2="6" y2="12" />
										<line x1="18" y1="12" x2="22" y2="12" />
										<line
											x1="4.93"
											y1="19.07"
											x2="7.76"
											y2="16.24"
										/>
										<line
											x1="16.24"
											y1="7.76"
											x2="19.07"
											y2="4.93"
										/>
									</svg>
									<span>
										{ __( 'Purging…', 'gslider-blocks' ) }
									</span>
								</>
							) : (
								<>
									<svg
										width="15"
										height="15"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										aria-hidden="true"
									>
										<polyline points="1 4 1 10 7 10" />
										<polyline points="23 20 23 14 17 14" />
										<path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
									</svg>
									<span>
										{ __(
											'Purge Dynamic CSS Cache',
											'gslider-blocks'
										) }
									</span>
								</>
							) }
						</button>
					</div>
				</div>

				{ /* Cache Stats Summary Cards */ }
				<div className="gslider-tools-stats-grid">
					<div className="gslider-tools-stat-card">
						<span className="gslider-tools-stat-label">
							{ __( 'Cached Stylesheets', 'gslider-blocks' ) }
						</span>
						<span className="gslider-tools-stat-value">
							{ filesCount }{ ' ' }
							<span
								style={ { fontSize: '13px', fontWeight: 500 } }
							>
								{ filesCount === 1
									? __( 'file', 'gslider-blocks' )
									: __( 'files', 'gslider-blocks' ) }
							</span>
						</span>
					</div>

					<div className="gslider-tools-stat-card">
						<span className="gslider-tools-stat-label">
							{ __( 'Total Disk Size', 'gslider-blocks' ) }
						</span>
						<span className="gslider-tools-stat-value">
							{ totalSizeFormatted }
						</span>
					</div>

					<div className="gslider-tools-stat-card">
						<span className="gslider-tools-stat-label">
							{ __( 'Storage Location', 'gslider-blocks' ) }
						</span>
						<span className="gslider-tools-stat-value is-path">
							wp-content/uploads/gslider-blocks/css/
						</span>
					</div>
				</div>

				<div className="gslider-tools-info-note">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<circle cx="12" cy="12" r="10" />
						<line x1="12" y1="16" x2="12" y2="12" />
						<line x1="12" y1="8" x2="12.01" y2="8" />
					</svg>
					<span>
						{ __(
							'Cache purging is strictly scoped to GSlider generated files matching "gslider-blocks-dynamic-styles-*.min.css". Your media uploads and other plugin files are never touched.',
							'gslider-blocks'
						) }
					</span>
				</div>
			</div>

			{ /* Tool 2: System Status & Diagnostic Report */ }
			<div className="gslider-tools-card">
				<div className="gslider-tools-card-header">
					<div className="gslider-tools-card-info">
						<div className="gslider-tools-card-title-row">
							<span
								className="gslider-tools-card-icon is-info"
								aria-hidden="true"
							>
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<polyline points="4 17 10 11 4 5" />
									<line x1="12" y1="19" x2="20" y2="19" />
								</svg>
							</span>
							<h3 className="gslider-tools-card-title">
								{ __(
									'System Status & Diagnostic Report',
									'gslider-blocks'
								) }
							</h3>
							<span className="gslider-tools-badge is-sanitized">
								{ __( 'Sanitized & Safe', 'gslider-blocks' ) }
							</span>
						</div>
						<p className="gslider-tools-card-desc">
							{ __(
								'View WordPress environment, server metrics, and active plugins. Sensitive data such as database credentials and absolute filesystem paths are automatically omitted.',
								'gslider-blocks'
							) }
						</p>
					</div>

					<div className="gslider-tools-card-action">
						<button
							type="button"
							className={ `gslider-tools-action-btn ${
								isCopied ? 'is-copied' : 'is-secondary'
							}` }
							onClick={ handleCopyReport }
							disabled={ ! systemReport?.formatted_text }
							aria-label={ __(
								'Copy system diagnostic report to clipboard',
								'gslider-blocks'
							) }
						>
							{ isCopied ? (
								<>
									<svg
										width="15"
										height="15"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										aria-hidden="true"
									>
										<path
											d="M16.6667 5L7.50001 14.1667L3.33334 10"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									<span>
										{ __(
											'Copied to Clipboard!',
											'gslider-blocks'
										) }
									</span>
								</>
							) : (
								<>
									<svg
										width="15"
										height="15"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										aria-hidden="true"
									>
										<rect
											x="9"
											y="9"
											width="13"
											height="13"
											rx="2"
											ry="2"
										/>
										<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
									</svg>
									<span>
										{ __(
											'Copy System Report',
											'gslider-blocks'
										) }
									</span>
								</>
							) }
						</button>
					</div>
				</div>

				{ /* System Metrics Grid */ }
				<div className="gslider-tools-system-grid">
					<div className="gslider-tools-metric-item">
						<span className="gslider-tools-metric-label">
							{ __( 'WordPress Version', 'gslider-blocks' ) }
						</span>
						<span className="gslider-tools-metric-val">
							{ wpVersion }
						</span>
					</div>

					<div className="gslider-tools-metric-item">
						<span className="gslider-tools-metric-label">
							{ __( 'PHP Version', 'gslider-blocks' ) }
						</span>
						<span className="gslider-tools-metric-val">
							{ phpVersion }
						</span>
					</div>

					<div className="gslider-tools-metric-item">
						<span className="gslider-tools-metric-label">
							{ __( 'Web Server', 'gslider-blocks' ) }
						</span>
						<span className="gslider-tools-metric-val">
							{ webServer }
						</span>
					</div>

					<div className="gslider-tools-metric-item">
						<span className="gslider-tools-metric-label">
							{ __( 'PHP Memory Limit', 'gslider-blocks' ) }
						</span>
						<span className="gslider-tools-metric-val">
							{ memoryLimit }
						</span>
					</div>

					<div className="gslider-tools-metric-item">
						<span className="gslider-tools-metric-label">
							{ __( 'Max Execution Time', 'gslider-blocks' ) }
						</span>
						<span className="gslider-tools-metric-val">
							{ maxExecutionTime }
						</span>
					</div>

					<div className="gslider-tools-metric-item">
						<span className="gslider-tools-metric-label">
							{ __( 'Active Theme', 'gslider-blocks' ) }
						</span>
						<span className="gslider-tools-metric-val">
							{ themeName }
						</span>
					</div>

					<div className="gslider-tools-metric-item">
						<span className="gslider-tools-metric-label">
							{ __( 'Dynamic CSS Delivery', 'gslider-blocks' ) }
						</span>
						<span className="gslider-tools-metric-val">
							{ deliveryLabel }
						</span>
					</div>

					<div className="gslider-tools-metric-item">
						<span className="gslider-tools-metric-label">
							{ __( 'Google Fonts Privacy', 'gslider-blocks' ) }
						</span>
						<span className="gslider-tools-metric-val">
							{ privacyLabel }
						</span>
					</div>

					<div className="gslider-tools-metric-item">
						<span className="gslider-tools-metric-label">
							{ __( 'Published Sliders', 'gslider-blocks' ) }
						</span>
						<span className="gslider-tools-metric-val">
							{ totalSliders }
						</span>
					</div>
				</div>

				{ /* Preformatted Raw Report Preview */ }
				<div className="gslider-tools-report-container">
					<div className="gslider-tools-report-header">
						<span className="gslider-tools-report-title">
							{ __(
								'Diagnostics Report Preview',
								'gslider-blocks'
							) }
						</span>
						<button
							type="button"
							className="gslider-tools-action-btn is-secondary"
							style={ {
								padding: '4px 10px',
								fontSize: '11.5px',
								backgroundColor: '#334155',
								color: '#fff',
								borderColor: '#475569',
							} }
							onClick={ handleCopyReport }
							disabled={ ! systemReport?.formatted_text }
						>
							{ isCopied
								? __( 'Copied!', 'gslider-blocks' )
								: __( 'Copy', 'gslider-blocks' ) }
						</button>
					</div>
					<pre className="gslider-tools-report-pre">
						{ isReportLoading
							? __(
									'Generating system diagnostic report…',
									'gslider-blocks'
							  )
							: systemReport?.formatted_text ||
							  __(
									'System report unavailable.',
									'gslider-blocks'
							  ) }
					</pre>
				</div>
			</div>

			{ /* Toast Notification Banner */ }
			{ toast && (
				<div
					className={ `gslider-settings-toast ${
						toast.type === 'error' ? 'is-error' : ''
					}` }
					role="status"
					aria-live="polite"
				>
					<span
						className={ `gslider-settings-toast-icon ${
							toast.type === 'error' ? 'is-error' : ''
						}` }
					>
						{ toast.type === 'error' ? (
							<svg
								width="18"
								height="18"
								viewBox="0 0 20 20"
								fill="none"
								aria-hidden="true"
							>
								<circle
									cx="10"
									cy="10"
									r="9"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<line
									x1="10"
									y1="6"
									x2="10"
									y2="10"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
								<circle
									cx="10"
									cy="14"
									r="1"
									fill="currentColor"
								/>
							</svg>
						) : (
							<svg
								width="18"
								height="18"
								viewBox="0 0 20 20"
								fill="none"
								aria-hidden="true"
							>
								<circle
									cx="10"
									cy="10"
									r="9"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<path
									d="M6 10L9 13L14 7"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						) }
					</span>
					<span>{ toast.message }</span>
					<button
						type="button"
						className="gslider-settings-toast-close"
						onClick={ () => setToast( null ) }
						aria-label={ __(
							'Close notification',
							'gslider-blocks'
						) }
					>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>
			) }
		</div>
	);
};

export default ToolsTab;
