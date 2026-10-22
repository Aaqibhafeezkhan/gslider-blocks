import { useEffect } from '@wordpress/element';

const LoadGoogleFont = ( font ) => {
	useEffect( () => {
		if ( font !== 'Default' ) {
			const fontUrl = `https://fonts.googleapis.com/css?family=${ font.replace(
				' ',
				'+'
			) }:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic`;

			// Add font to the main document
			const linkElement = document.createElement( 'link' );
			linkElement.rel = 'stylesheet';
			linkElement.href = fontUrl;
			document.head.appendChild( linkElement );

			// If an iframe is provided, add the font to its head
			const iframe = document.querySelector(
				'iframe[name="editor-canvas"]'
			);
			if ( iframe ) {
				try {
					const iframeDoc =
						iframe.contentDocument || iframe.contentWindow.document;
					if ( iframeDoc ) {
						const iframeLinkElement =
							iframeDoc.createElement( 'link' );
						iframeLinkElement.rel = 'stylesheet';
						iframeLinkElement.href = fontUrl;
						iframeDoc.head.appendChild( iframeLinkElement );
					}
				} catch ( error ) {
					// eslint-disable-next-line no-console
					console.error( 'Failed to access iframe document:', error );
				}
			}

			// Cleanup: Remove the link element on unmount
			return () => {
				linkElement.remove();
				if ( iframe && iframe.contentDocument ) {
					const iframeLink = iframe.contentDocument.querySelector(
						`link[href="${ fontUrl }"]`
					);
					if ( iframeLink ) {
						iframeLink.remove();
					}
				}
			};
		}
	}, [ font ] );

	return null;
};

export default LoadGoogleFont;
