import { __ } from '@wordpress/i18n';
import { setDeviceType } from '@Utils/displayType';

const ResponsiveDeviceControl = ( { label, device } ) => {
	/**
	 * Handle the device type change
	 * @param {string} deviceType - The device type to set
	 */
	const handleDevice = ( deviceType ) => {
		if ( ! deviceType ) {
			console.error( 'Invalid device type:', deviceType );
			return;
		}
		try {
			setDeviceType( deviceType, false );
		} catch ( error ) {
			console.error( 'Error setting device type:', error );
		}
	};

	/**
	 * Toggle the device visibility
	 * @param {Event} e - The event object
	 */
	const toggleDeviceVisibility = ( e ) => {
		const wrapper = e.currentTarget;
		wrapper.classList.toggle( 'gslider-device-switchers-open' );
	};

	return (
		<>
			<div className="gslider-setting-device-label-wrapper">
				<span className="gslider-setting-label-text">
					{ __( label, 'gslider-blocks' ) }
				</span>
				<div
					className="gslider-responsive-device-wrapper"
					onClick={ toggleDeviceVisibility }
				>
					<div className="gslider-responsive-device-inner-wrapper">
						<button
							className={ `gslider-device-switcher gslider-responsive-desktop-device ${
								device === 'Desktop' ? 'active' : ''
							}` }
							onClick={ () => handleDevice( 'Desktop' ) }
						>
							<svg
								width="10"
								height="10"
								viewBox="0 0 10 10"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M4.64645 7.35355C4.84171 7.15829 5.15829 7.15829 5.35355 7.35355L7.14645 9.14645C7.46143 9.46143 7.23835 10 6.79289 10H3.20711C2.76165 10 2.53857 9.46143 2.85355 9.14645L4.64645 7.35355Z"
									fill="#1E1E1E"
								></path>
								<rect
									x="0.5"
									y="1.5"
									width="9"
									height="6"
									rx="1"
									stroke="#1E1E1E"
								></rect>
							</svg>
						</button>
						<button
							className={ `gslider-device-switcher gslider-responsive-tablet-device ${
								device === 'Tablet' ? 'active' : ''
							}` }
							onClick={ () => handleDevice( 'Tablet' ) }
						>
							<svg
								width="10"
								height="10"
								viewBox="0 0 10 10"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									x="1.5"
									y="0.5"
									width="7"
									height="9"
									rx="1"
									stroke="#1E1E1E"
								></rect>
								<circle
									cx="5"
									cy="8"
									r="1"
									fill="#1E1E1E"
								></circle>
							</svg>
						</button>
						<button
							className={ `gslider-device-switcher gslider-responsive-mobile-device ${
								device === 'Mobile' ? 'active' : ''
							}` }
							onClick={ () => handleDevice( 'Mobile' ) }
						>
							<svg
								width="10"
								height="10"
								viewBox="0 0 10 10"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									x="2.5"
									y="0.5"
									width="5"
									height="9"
									rx="1"
									stroke="#1E1E1E"
								></rect>
								<path
									d="M7 1.08412C6.9572 1.59704 6.52662 2 6.00175 2H3.99825C3.47338 2 3.0428 1.59704 3 1.08412C3.15567 1.02963 3.32306 1 3.49738 1H6.50262C6.67694 1 6.84433 1.02963 7 1.08412Z"
									fill="#1E1E1E"
								></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ResponsiveDeviceControl;
