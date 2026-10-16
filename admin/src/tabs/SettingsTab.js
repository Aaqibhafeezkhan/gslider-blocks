/**
 * SettingsTab component for the GSlider Blocks React Admin Dashboard SPA.
 *
 * Provides global preference management for GDPR Google Fonts privacy,
 * dynamic CSS delivery methods, and displays SVG upload security status.
 *
 * @since 1.2.0
 */

import { useState, useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import ToggleSwitch from '../components/ToggleSwitch';
import {
	SpinnerIcon,
	CheckIcon,
	GlobeIcon,
	InfoCircleIcon,
	CodeIcon,
	ShieldCheckIcon,
	LockIcon,
	CrossCircleIcon,
	CloseIcon,
} from '../icons';

/**
 * SettingsTab Component.
 *
 * @param {Object}   props                    Component properties.
 * @param {Object}   [props.dashboardData]    Dashboard API data including current settings.
 * @param {Function} [props.setDashboardData] State setter for parent dashboard data.
 * @return {JSX.Element} The rendered settings tab view.
 */
const SettingsTab = ( { dashboardData, setDashboardData } ) => {
	const initialPrivacy =
		dashboardData?.settings?.google_fonts_privacy ?? false;
	const initialDelivery = dashboardData?.settings?.css_delivery ?? 'file';

	const [ googleFontsPrivacy, setGoogleFontsPrivacy ] =
		useState( initialPrivacy );
	const [ cssDelivery, setCssDelivery ] = useState( initialDelivery );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ toast, setToast ] = useState( null );
	const toastTimeoutRef = useRef( null );

	// Synchronize when parent dashboardData is updated or loaded
	useEffect( () => {
		if ( dashboardData?.settings ) {
			setGoogleFontsPrivacy(
				Boolean( dashboardData.settings.google_fonts_privacy )
			);
			setCssDelivery( dashboardData.settings.css_delivery || 'file' );
		}
	}, [ dashboardData?.settings ] );

	// Cleanup toast timer on unmount
	useEffect( () => {
		return () => {
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
	 * Saves global settings to the REST API endpoint.
	 */
	const handleSave = async () => {
		setIsSaving( true );

		try {
			const response = await apiFetch( {
				path: '/gslider/v1/dashboard/settings',
				method: 'POST',
				data: {
					google_fonts_privacy: googleFontsPrivacy,
					css_delivery: cssDelivery,
				},
			} );

			if ( response && response.status === 'success' ) {
				if ( typeof setDashboardData === 'function' ) {
					setDashboardData( ( prev ) => ( {
						...prev,
						settings: response.settings,
					} ) );
				}
				showToast(
					__( 'Settings saved successfully.', 'gslider-blocks' ),
					'success'
				);
			} else {
				showToast(
					__(
						'Failed to save settings. Please try again.',
						'gslider-blocks'
					),
					'error'
				);
			}
		} catch ( err ) {
			showToast(
				__(
					'Failed to save settings. Please check your network connection.',
					'gslider-blocks'
				),
				'error'
			);
		} finally {
			setIsSaving( false );
		}
	};

	return (
		<div className="gslider-dashboard-settings-container">
			{ /* Header Description Card */ }
			<div className="gslider-dashboard-card gslider-dashboard-settings-header-card">
				<div className="gslider-dashboard-settings-header">
					<div className="gslider-dashboard-settings-header-left">
						<h2 className="gslider-dashboard-settings-title">
							{ __(
								'Global Preferences & Settings',
								'gslider-blocks'
							) }
						</h2>
						<p className="gslider-dashboard-settings-desc">
							{ __(
								'Configure privacy compliance, CSS delivery architecture, and verify system security protections for GSlider Blocks across your WordPress site.',
								'gslider-blocks'
							) }
						</p>
					</div>
					<div className="gslider-dashboard-settings-header-right">
						<button
							type="button"
							className="gslider-settings-save-btn"
							onClick={ handleSave }
							disabled={ isSaving }
							aria-label={ __(
								'Save global settings',
								'gslider-blocks'
							) }
						>
							{ isSaving ? (
								<>
									<SpinnerIcon />
									<span>
										{ __( 'Saving…', 'gslider-blocks' ) }
									</span>
								</>
							) : (
								<>
									<CheckIcon />
									<span>
										{ __(
											'Save Settings',
											'gslider-blocks'
										) }
									</span>
								</>
							) }
						</button>
					</div>
				</div>
			</div>

			{ /* Setting 1: Google Fonts Privacy Mode (GDPR) */ }
			<div className="gslider-settings-card">
				<div className="gslider-settings-card-header">
					<div className="gslider-settings-card-info">
						<div className="gslider-settings-card-title-row">
							<span className="gslider-settings-card-icon">
								<GlobeIcon />
							</span>
							<h3 className="gslider-settings-card-title">
								{ __(
									'Google Fonts Privacy Mode (GDPR)',
									'gslider-blocks'
								) }
							</h3>
							<span className="gslider-settings-badge is-gdpr">
								{ __( 'GDPR Compliant', 'gslider-blocks' ) }
							</span>
						</div>
						<p className="gslider-settings-card-desc">
							{ __(
								'When enabled, prevents all external HTTP requests to Google Fonts servers (fonts.googleapis.com). Blocks will safely fall back to native system font stacks (Inter, -apple-system, Segoe UI, Roboto) to ensure 100% GDPR, DSGVO, and LGPD compliance without external tracking.',
								'gslider-blocks'
							) }
						</p>
					</div>
					<div className="gslider-settings-card-action">
						<ToggleSwitch
							id="gslider-google-fonts-privacy-toggle"
							checked={ googleFontsPrivacy }
							onChange={ ( val ) => setGoogleFontsPrivacy( val ) }
							ariaLabel={ __(
								'Toggle Google Fonts GDPR privacy mode',
								'gslider-blocks'
							) }
						/>
					</div>
				</div>

				<div
					className={ `gslider-settings-status-box ${
						googleFontsPrivacy ? 'is-active' : 'is-idle'
					}` }
				>
					<span className="gslider-settings-status-icon">
						{ googleFontsPrivacy ? (
							<CheckIcon />
						) : (
							<InfoCircleIcon />
						) }
					</span>
					<span>
						{ googleFontsPrivacy ? (
							<>
								<strong>
									{ __(
										'Privacy Mode Active',
										'gslider-blocks'
									) }
								</strong>
								{ ' — ' }
								{ __(
									'All external requests to Google Fonts are blocked. Sliders will automatically render with fast, native system font stacks.',
									'gslider-blocks'
								) }
							</>
						) : (
							<>
								<strong>
									{ __(
										'Standard Mode Active',
										'gslider-blocks'
									) }
								</strong>
								{ ' — ' }
								{ __(
									'Google Fonts are enqueued from fonts.googleapis.com when custom font families are selected in slider block inspector controls.',
									'gslider-blocks'
								) }
							</>
						) }
					</span>
				</div>
			</div>

			{ /* Setting 2: Dynamic CSS Delivery Method */ }
			<div className="gslider-settings-card">
				<div className="gslider-settings-card-header">
					<div className="gslider-settings-card-info">
						<div className="gslider-settings-card-title-row">
							<span className="gslider-settings-card-icon">
								<CodeIcon />
							</span>
							<h3 className="gslider-settings-card-title">
								{ __(
									'Dynamic CSS Delivery Method',
									'gslider-blocks'
								) }
							</h3>
						</div>
						<p className="gslider-settings-card-desc">
							{ __(
								'Choose how dynamically generated block styles are served to site visitors. Both methods sanitize all styles via the GSlider CssSanitizer engine to guarantee security.',
								'gslider-blocks'
							) }
						</p>
					</div>
				</div>

				<div
					className="gslider-settings-radio-grid"
					role="radiogroup"
					aria-label={ __(
						'Dynamic CSS Delivery Method',
						'gslider-blocks'
					) }
				>
					{ /* Option 1: File Delivery (Default & Recommended) */ }
					<div
						role="radio"
						aria-checked={ cssDelivery === 'file' }
						tabIndex={ 0 }
						className={ `gslider-settings-radio-card ${
							cssDelivery === 'file' ? 'is-selected' : ''
						}` }
						onClick={ () => setCssDelivery( 'file' ) }
						onKeyDown={ ( e ) => {
							if ( e.key === ' ' || e.key === 'Enter' ) {
								e.preventDefault();
								setCssDelivery( 'file' );
							}
						} }
					>
						<div className="gslider-settings-radio-top">
							<div className="gslider-settings-radio-title-group">
								<span className="gslider-settings-radio-circle" />
								<h4 className="gslider-settings-radio-title">
									{ __(
										'Generated External Stylesheet',
										'gslider-blocks'
									) }
								</h4>
							</div>
							<span className="gslider-settings-badge is-recommended">
								{ __( 'Recommended', 'gslider-blocks' ) }
							</span>
						</div>
						<p className="gslider-settings-radio-desc">
							{ __(
								'Saves compiled styles into minified .css files in',
								'gslider-blocks'
							) }{ ' ' }
							<code className="gslider-settings-radio-code">
								wp-content/uploads/gslider-blocks/css/
							</code>{ ' ' }
							{ __(
								'and enqueues them via standard WordPress handles. Delivers maximum caching performance and CDN compatibility.',
								'gslider-blocks'
							) }
						</p>
					</div>

					{ /* Option 2: Inline <style> in <head> */ }
					<div
						role="radio"
						aria-checked={ cssDelivery === 'inline' }
						tabIndex={ 0 }
						className={ `gslider-settings-radio-card ${
							cssDelivery === 'inline' ? 'is-selected' : ''
						}` }
						onClick={ () => setCssDelivery( 'inline' ) }
						onKeyDown={ ( e ) => {
							if ( e.key === ' ' || e.key === 'Enter' ) {
								e.preventDefault();
								setCssDelivery( 'inline' );
							}
						} }
					>
						<div className="gslider-settings-radio-top">
							<div className="gslider-settings-radio-title-group">
								<span className="gslider-settings-radio-circle" />
								<h4 className="gslider-settings-radio-title">
									{ __(
										'Direct Inline <style> in <head>',
										'gslider-blocks'
									) }
								</h4>
							</div>
						</div>
						<p className="gslider-settings-radio-desc">
							{ __(
								'Injects minified, sanitized styles directly into the document',
								'gslider-blocks'
							) }{ ' ' }
							<code className="gslider-settings-radio-code">
								&lt;head&gt;
							</code>{ ' ' }
							{ __(
								'via wp_head. Ideal for hosting environments with read-only filesystems or strict server-side disk write restrictions.',
								'gslider-blocks'
							) }
						</p>
					</div>
				</div>
			</div>

			{ /* Informative Security Card: SVG Upload Security Shield (Display-Only) */ }
			<div className="gslider-settings-card">
				<div className="gslider-settings-card-header">
					<div className="gslider-settings-card-info">
						<div className="gslider-settings-card-title-row">
							<span className="gslider-settings-card-icon is-security">
								<ShieldCheckIcon />
							</span>
							<h3 className="gslider-settings-card-title">
								{ __(
									'SVG Upload Security Shield',
									'gslider-blocks'
								) }
							</h3>
							<span className="gslider-settings-badge is-active-security">
								<CheckIcon
									width="10"
									height="10"
									strokeWidth="2.5"
								/>
								{ __( 'Active & Enforced', 'gslider-blocks' ) }
							</span>
						</div>
						<p className="gslider-settings-card-desc">
							{ __(
								'GSlider Blocks includes hardened server-side SVG sanitization powered by SupportSVG.php. All uploaded vector files are rigorously inspected to strip malicious JavaScript, inline event handlers (onload, onerror), embedded iframes, and XML External Entity (XXE) injection payloads before storage.',
								'gslider-blocks'
							) }
						</p>
					</div>
				</div>

				<div className="gslider-settings-status-box is-security-note">
					<span className="gslider-settings-status-icon">
						<LockIcon />
					</span>
					<span>
						<strong>
							{ __(
								'Permanent Security Protection',
								'gslider-blocks'
							) }
						</strong>
						{ ' — ' }
						{ __(
							'To protect 100% of websites from stored Cross-Site Scripting (XSS) vulnerabilities, SVG security sanitization is permanently enabled and cannot be turned off.',
							'gslider-blocks'
						) }
					</span>
				</div>
			</div>

			{ /* Bottom Save Actions Footer */ }
			<div className="gslider-settings-footer">
				<div className="gslider-settings-footer-info">
					{ __(
						'Settings take effect immediately upon saving and apply to all published slider blocks.',
						'gslider-blocks'
					) }
				</div>
				<button
					type="button"
					className="gslider-settings-save-btn"
					onClick={ handleSave }
					disabled={ isSaving }
					aria-label={ __(
						'Save global settings',
						'gslider-blocks'
					) }
				>
					{ isSaving ? (
						<>
							<SpinnerIcon />
							<span>{ __( 'Saving…', 'gslider-blocks' ) }</span>
						</>
					) : (
						<>
							<CheckIcon />
							<span>
								{ __( 'Save Settings', 'gslider-blocks' ) }
							</span>
						</>
					) }
				</button>
			</div>

			{ /* Toast Notification Banner */ }
			{ toast && (
				<div
					role="status"
					aria-live="polite"
					className={ `gslider-settings-toast ${
						toast.type === 'error' ? 'is-error' : ''
					}` }
				>
					<span
						className={ `gslider-settings-toast-icon ${
							toast.type === 'error' ? 'is-error' : ''
						}` }
					>
						{ toast.type === 'error' ? (
							<CrossCircleIcon />
						) : (
							<CheckIcon width="18" height="18" />
						) }
					</span>
					<span>{ toast.message }</span>
					<button
						type="button"
						className="gslider-settings-toast-close"
						onClick={ () => setToast( null ) }
						aria-label={ __(
							'Dismiss notification',
							'gslider-blocks'
						) }
					>
						<CloseIcon />
					</button>
				</div>
			) }
		</div>
	);
};

export default SettingsTab;
