import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import './editor.lazy.scss';

const ResponsiveDeviceControl = ({label, selectedDevice, onDeviceChange}) => {

	/** 
	 * Dispatch Device Type
	 * @since 1.0.0
	 */	
	const { setDeviceType } = useDispatch(editorStore);

	/** 
	 * Handle Device Change
	 * @since 1.0.0
	 */
	const handleDevice = (deviceName) => {
		onDeviceChange(deviceName);
		setDeviceType(deviceName);
	}

	/** 
	 * Toggle Device Visibility
	 * @since 1.0.0
	 */
	const toggleDeviceVisibility = (e) => {
		const wrapper = e.currentTarget;
		wrapper.classList.toggle('global-device-switchers-open');
	}

	return (
		<>
			<div className="global-setting-device-label-wrapper">
				<p className="global-setting-label-text">{ __( label, 'gutenslider-blocks' ) }</p>
				<div className="global-responsive-device-wrapper" onClick={toggleDeviceVisibility}>
					<div className="global-responsive-device-inner-wrapper">
						<button className={`global-device-switcher guten-slider-responsive-desktop-device ${selectedDevice === 'Desktop' ? 'active' : ''}`} onClick={() => handleDevice('Desktop')}>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="#007cba">
								<path fillRule="evenodd" clipRule="evenodd" d="M1.5 3.5C1.5 2.39543 2.39543 1.5 3.5 1.5H12.5C13.6046 1.5 14.5 2.39543 14.5 3.5V10C14.5 11.1046 13.6046 12 12.5 12H10.5V12.1716C10.5 12.5694 10.658 12.9509 10.9393 13.2322L11.3536 13.6464C11.4966 13.7894 11.5393 14.0045 11.4619 14.1913C11.3845 14.3782 11.2022 14.5 11 14.5H5C4.79777 14.5 4.61545 14.3782 4.53806 14.1913C4.46067 14.0045 4.50345 13.7894 4.64645 13.6464L5.06066 13.2322C5.34196 12.9509 5.5 12.5694 5.5 12.1716V12H3.5C2.39543 12 1.5 11.1046 1.5 10V3.5ZM2.5 3.5V8.5C2.5 9.05228 2.94772 9.5 3.5 9.5H12.5C13.0523 9.5 13.5 9.05228 13.5 8.5V3.5C13.5 2.94772 13.0523 2.5 12.5 2.5H3.5C2.94772 2.5 2.5 2.94772 2.5 3.5Z" fill="#007cba"/>
							</svg>
						</button>
						<button className={`global-device-switcher guten-slider-responsive-tablet-device ${selectedDevice === 'Tablet' ? 'active' : ''}`} onClick={() => handleDevice('Tablet')}>
							<svg width="6" height="7" viewBox="0 0 6 7">
								<path d="M5 0H1C0.446667 0 0 0.390833 0 0.875V6.125C0 6.60917 0.446667 7 1 7H5C5.55333 7 6 6.60917 6 6.125V0.875C6 0.390833 5.55333 0 5 0ZM3.66667 6.41667H2.33333V6.125H3.66667V6.41667ZM5.41667 5.54167H0.583333V0.875H5.41667V5.54167Z" fill="#007cba"></path>
							</svg>
						</button>
						<button className={`global-device-switcher guten-slider-responsive-mobile-device ${selectedDevice === 'Mobile' ? 'active' : ''}`} onClick={() => handleDevice('Mobile')}>
							<svg width="4" height="7" viewBox="0 0 4 7">
								<path d="M3.33333 0H0.666667C0.297778 0 0 0.390833 0 0.875V6.125C0 6.60917 0.297778 7 0.666667 7H3.33333C3.70222 7 4 6.60917 4 6.125V0.875C4 0.390833 3.70222 0 3.33333 0ZM2.44444 6.41667H1.55556V6.125H2.44444V6.41667ZM3.61111 5.54167H0.388889V0.875H3.61111V5.54167Z"></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ResponsiveDeviceControl;