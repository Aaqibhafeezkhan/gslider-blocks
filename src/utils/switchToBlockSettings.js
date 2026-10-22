import { useEffect } from '@wordpress/element';

const SwitchToBlockSettings = ( panelRef ) => {
	useEffect( () => {
		if ( panelRef.current ) {
			panelRef.current.addEventListener( 'click', () => {
				setTimeout( () => {
					const settingsTabButton = document.querySelector(
						'button[data-tab-id="edit-post/block"]'
					);
					const settingsPanelButton = document.querySelector(
						'.interface-pinned-items .components-button.is-compact.has-icon[aria-label="Settings"]'
					);

					if ( settingsTabButton ) {
						const event = new window.MouseEvent( 'click', {
							bubbles: true,
							cancelable: true,
							view: window,
						} );
						settingsTabButton.dispatchEvent( event );
					}

					if (
						settingsPanelButton &&
						! settingsPanelButton.classList.contains( 'is-pressed' )
					) {
						settingsPanelButton.click();
					}
				}, 100 );
			} );
		}
	}, [ panelRef ] );
};

export default SwitchToBlockSettings;
