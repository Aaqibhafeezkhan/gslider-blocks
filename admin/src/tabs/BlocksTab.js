/**
 * BlocksTab component for the GSlider Blocks React Admin Dashboard SPA.
 *
 * Provides live enable/disable toggles for all 5 core slider blocks,
 * updating the WordPress Gutenberg inserter filter via REST API.
 *
 * @package GSlider
 * @since   1.2.0
 */

import { useState, useEffect, useRef } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import ToggleSwitch from '../components/ToggleSwitch';

/**
 * Metadata for all 5 top-level GSlider blocks in alphabetical order.
 */
const BLOCKS_METADATA = [
	{
		slug: 'base',
		name: __('Base Slider', 'gslider-blocks'),
		description: __(
			'Flexible, full-featured carousel block with customizable slides, buttons, and animations.',
			'gslider-blocks'
		),
		icon: (
			<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<rect x="2.5" y="3.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
				<path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
	{
		slug: 'flexi-content',
		name: __('Flexi Content Slider', 'gslider-blocks'),
		description: __(
			'Multi-slide layout container supporting nested Gutenberg blocks per slide.',
			'gslider-blocks'
		),
		icon: (
			<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<rect x="2.5" y="3.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
				<path d="M6 7.5H14M6 10.5H11M6 13.5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
			</svg>
		),
	},
	{
		slug: 'image-slider',
		name: __('Image Slider', 'gslider-blocks'),
		description: __(
			'High-performance image gallery carousel with lightbox and thumbnail navigation.',
			'gslider-blocks'
		),
		icon: (
			<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<rect x="2.5" y="3.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
				<circle cx="6.5" cy="7.5" r="1.25" fill="currentColor" />
				<path d="M4 14.5L8.5 9.5L12 13.5L14 11.5L16.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
	{
		slug: 'logo-carousel',
		name: __('Logo Carousel', 'gslider-blocks'),
		description: __(
			'Continuous client and sponsor logo showcase with grayscale and hover effects.',
			'gslider-blocks'
		),
		icon: (
			<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<rect x="2.5" y="4.5" width="4.5" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
				<rect x="9" y="4.5" width="4.5" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
				<rect x="15.5" y="4.5" width="2" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
			</svg>
		),
	},
	{
		slug: 'testimonial',
		name: __('Testimonial Slider', 'gslider-blocks'),
		description: __(
			'Customer reviews and ratings carousel with star ratings and avatar styling.',
			'gslider-blocks'
		),
		icon: (
			<svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path d="M4 6.5C4 5.11929 5.11929 4 6.5 4H8.5V9H5.5C4.67157 9 4 8.32843 4 7.5V6.5Z" stroke="currentColor" strokeWidth="1.5" />
				<path d="M11.5 6.5C11.5 5.11929 12.6193 4 14 4H16V9H13C12.1716 9 11.5 8.32843 11.5 7.5V6.5Z" stroke="currentColor" strokeWidth="1.5" />
				<path d="M4.5 12H15.5M4.5 15H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
			</svg>
		),
	},
];

/**
 * BlocksTab Component.
 *
 * @param {Object}   props                  Component props.
 * @param {Object}   [props.dashboardData]  Current dashboard metrics.
 * @param {Function} [props.setDashboardData] Parent dashboard state setter.
 * @return {JSX.Element} Rendered blocks management view.
 */
const BlocksTab = ( { dashboardData = null, setDashboardData } ) => {
	const getInitialBlocks = () => {
		const serverBlocks = dashboardData?.blocks || [];
		return BLOCKS_METADATA.map( ( meta ) => {
			const found = serverBlocks.find( ( b ) => b.slug === meta.slug );
			return {
				...meta,
				enabled: found ? Boolean( found.enabled ) : true,
			};
		} );
	};

	const [ blocks, setBlocks ] = useState( getInitialBlocks );
	const [ isToggling, setIsToggling ] = useState( {} );
	const [ isBulkUpdating, setIsBulkUpdating ] = useState( false );
	const [ toast, setToast ] = useState( null );
	const toastTimeoutRef = useRef( null );

	useEffect( () => {
		if ( dashboardData?.blocks && Object.values( isToggling ).every( ( v ) => ! v ) && ! isBulkUpdating ) {
			setBlocks( ( currentBlocks ) =>
				currentBlocks.map( ( block ) => {
					const found = dashboardData.blocks.find( ( b ) => b.slug === block.slug );
					return found ? { ...block, enabled: Boolean( found.enabled ) } : block;
				} )
			);
		}
	}, [ dashboardData, isToggling, isBulkUpdating ] );

	useEffect( () => {
		return () => {
			if ( toastTimeoutRef.current ) {
				clearTimeout( toastTimeoutRef.current );
			}
		};
	}, [] );

	const showToast = ( type, message ) => {
		if ( toastTimeoutRef.current ) {
			clearTimeout( toastTimeoutRef.current );
		}
		setToast( { type, message } );
		toastTimeoutRef.current = setTimeout( () => {
			setToast( null );
		}, 3000 );
	};

	const handleToggle = async ( slug, nextEnabled ) => {
		if ( isToggling[ slug ] || isBulkUpdating ) {
			return;
		}

		const prevBlocks = [ ...blocks ];
		const updatedBlocks = blocks.map( ( b ) =>
			b.slug === slug ? { ...b, enabled: nextEnabled } : b
		);

		setBlocks( updatedBlocks );
		setIsToggling( ( prev ) => ( { ...prev, [ slug ]: true } ) );

		if ( typeof setDashboardData === 'function' ) {
			setDashboardData( ( prev ) =>
				prev
					? {
						...prev,
						blocks: updatedBlocks.map( ( b ) => ( {
							slug: b.slug,
							name: b.name,
							enabled: b.enabled,
						} ) ),
					}
					: prev
			);
		}

		try {
			const response = await apiFetch( {
				path: '/gslider/v1/dashboard/toggle-block',
				method: 'POST',
				data: {
					slug,
					enabled: nextEnabled,
				},
			} );

			if ( response && response.status === 'success' ) {
				const blockMeta = BLOCKS_METADATA.find( ( b ) => b.slug === slug );
				const blockName = blockMeta ? blockMeta.name : slug;

				showToast(
					'success',
					nextEnabled
						? sprintf( __( '%s enabled successfully', 'gslider-blocks' ), blockName )
						: sprintf( __( '%s disabled successfully', 'gslider-blocks' ), blockName )
				);

				if ( response.blocks && typeof setDashboardData === 'function' ) {
					setDashboardData( ( prev ) =>
						prev ? { ...prev, blocks: response.blocks } : prev
					);
				}
			} else {
				throw new Error( 'Toggle rejected by server' );
			}
		} catch ( err ) {
			setBlocks( prevBlocks );
			if ( typeof setDashboardData === 'function' ) {
				setDashboardData( ( prev ) =>
					prev
						? {
							...prev,
							blocks: prevBlocks.map( ( b ) => ( {
								slug: b.slug,
								name: b.name,
								enabled: b.enabled,
							} ) ),
						}
						: prev
				);
			}
			showToast(
				'error',
				__( 'Failed to update block status. Please try again.', 'gslider-blocks' )
			);
		} finally {
			setIsToggling( ( prev ) => ( { ...prev, [ slug ]: false } ) );
		}
	};

	const handleToggleAll = async ( nextEnabled ) => {
		if ( isBulkUpdating ) {
			return;
		}

		const prevBlocks = [ ...blocks ];
		const updatedBlocks = blocks.map( ( b ) => ( { ...b, enabled: nextEnabled } ) );

		setBlocks( updatedBlocks );
		setIsBulkUpdating( true );

		if ( typeof setDashboardData === 'function' ) {
			setDashboardData( ( prev ) =>
				prev
					? {
						...prev,
						blocks: updatedBlocks.map( ( b ) => ( {
							slug: b.slug,
							name: b.name,
							enabled: b.enabled,
						} ) ),
					}
					: prev
			);
		}

		try {
			const response = await apiFetch( {
				path: '/gslider/v1/dashboard/toggle-block',
				method: 'POST',
				data: {
					slug: 'all',
					enabled: nextEnabled,
				},
			} );

			if ( response && response.status === 'success' ) {
				showToast(
					'success',
					nextEnabled
						? __( 'All slider blocks activated successfully', 'gslider-blocks' )
						: __( 'All slider blocks deactivated successfully', 'gslider-blocks' )
				);

				if ( response.blocks && typeof setDashboardData === 'function' ) {
					setDashboardData( ( prev ) =>
						prev ? { ...prev, blocks: response.blocks } : prev
					);
				}
			} else {
				throw new Error( 'Bulk toggle rejected by server' );
			}
		} catch ( err ) {
			setBlocks( prevBlocks );
			if ( typeof setDashboardData === 'function' ) {
				setDashboardData( ( prev ) =>
					prev
						? {
							...prev,
							blocks: prevBlocks.map( ( b ) => ( {
								slug: b.slug,
								name: b.name,
								enabled: b.enabled,
							} ) ),
						}
						: prev
				);
			}
			showToast(
				'error',
				__( 'Failed to update all blocks. Please try again.', 'gslider-blocks' )
			);
		} finally {
			setIsBulkUpdating( false );
		}
	};

	const activeCount = blocks.filter( ( b ) => b.enabled ).length;
	const totalCount = blocks.length;

	return (
		<div className="gslider-dashboard-blocks-container">
			{ /* Header Card */ }
			<div className="gslider-dashboard-card gslider-dashboard-blocks-header-card">
				<div className="gslider-dashboard-blocks-header">
					<div className="gslider-dashboard-blocks-header-left">
						<h2 className="gslider-dashboard-blocks-title">
							{ __( 'Core Slider Blocks', 'gslider-blocks' ) }
						</h2>
						<p className="gslider-dashboard-blocks-desc">
							{ __(
								'Enable or disable individual slider blocks in the Gutenberg inserter. Disabled blocks will not appear in the inserter, but existing published sliders on your site remain fully functional.',
								'gslider-blocks'
							) }
						</p>
					</div>
					<div className="gslider-dashboard-blocks-header-right">
						<div className="gslider-dashboard-blocks-actions">
							<button
								type="button"
								className="gslider-dashboard-btn-sm"
								disabled={ activeCount === totalCount || isBulkUpdating }
								onClick={ () => handleToggleAll( true ) }
							>
								{ __( 'Activate All', 'gslider-blocks' ) }
							</button>
							<button
								type="button"
								className="gslider-dashboard-btn-sm"
								disabled={ activeCount === 0 || isBulkUpdating }
								onClick={ () => handleToggleAll( false ) }
							>
								{ __( 'Deactivate All', 'gslider-blocks' ) }
							</button>
						</div>
						<span className="gslider-dashboard-blocks-badge">
							<svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
								<circle cx="8" cy="8" r="6" fill="currentColor" fillOpacity="0.2" />
								<circle cx="8" cy="8" r="3" fill="currentColor" />
							</svg>
							<span>
								{ sprintf(
									__( '%1$d of %2$d Active', 'gslider-blocks' ),
									activeCount,
									totalCount
								) }
							</span>
						</span>
					</div>
				</div>
			</div>

			{ /* 3-Column / 2-Column Responsive Card Grid */ }
			<div className="gslider-dashboard-blocks-grid" role="list">
				{ blocks.map( ( block ) => (
					<div
						key={ block.slug }
						role="listitem"
						className={ `gslider-dashboard-card gslider-dashboard-block-card ${
							block.enabled ? 'is-enabled' : 'is-disabled'
						} ${ isToggling[ block.slug ] ? 'is-toggling' : '' }` }
					>
						<div className="gslider-dashboard-block-card-top">
							<div className="gslider-dashboard-block-identity">
								<div className="gslider-dashboard-block-icon">{ block.icon }</div>
								<div className="gslider-dashboard-block-meta">
									<h3 className="gslider-dashboard-block-name">{ block.name }</h3>
									<span
										className={ `gslider-dashboard-block-status-tag ${
											block.enabled ? 'is-enabled' : 'is-disabled'
										}` }
									>
										{ block.enabled
											? __( 'Active', 'gslider-blocks' )
											: __( 'Disabled', 'gslider-blocks' ) }
									</span>
								</div>
							</div>
							<div className="gslider-dashboard-block-control">
								<ToggleSwitch
									id={ `gslider-toggle-${ block.slug }` }
									checked={ block.enabled }
									disabled={ Boolean( isToggling[ block.slug ] || isBulkUpdating ) }
									onChange={ ( nextVal ) => handleToggle( block.slug, nextVal ) }
									ariaLabel={ sprintf(
										/* translators: %s: Block name */
										__( 'Toggle %s status', 'gslider-blocks' ),
										block.name
									) }
								/>
							</div>
						</div>

						<div className="gslider-dashboard-block-card-body">
							<p className="gslider-dashboard-block-description">{ block.description }</p>
						</div>
					</div>
				) ) }
			</div>

			{ /* Transient Toast Notification */ }
			{ toast && (
				<div
					className={ `gslider-dashboard-toast ${ toast.type === 'error' ? 'is-error' : 'is-success' }` }
					role="status"
					aria-live="polite"
				>
					{ toast.type === 'success' ? (
						<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="10" cy="10" r="8" fill="#10b981" />
							<path d="M6.5 10L9 12.5L13.5 8" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					) : (
						<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="10" cy="10" r="8" fill="#ef4444" />
							<path d="M10 6V11M10 14H10.01" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" />
						</svg>
					) }
					<span>{ toast.message }</span>
				</div>
			) }
		</div>
	);
};

export default BlocksTab;
