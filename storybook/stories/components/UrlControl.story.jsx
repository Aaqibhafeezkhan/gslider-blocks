/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import UrlControl from '@Components/url-control';

export default {
	title: 'Components/Primitives/UrlControl',
	component: UrlControl,
	tags: [ 'autodocs' ],
	parameters: {
		docs: {
			description: {
				component:
					'UrlControl provides an input field for web URLs with an expandable settings dropdown popover for link attributes such as Open in new tab, Nofollow, and Sponsored rel.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label displayed above the link URL field',
		},
		url: {
			control: 'text',
			description: 'Destination link target URL',
		},
		openInNewTab: {
			control: 'boolean',
			description:
				'Whether link should open in a new window/tab (_blank)',
		},
		nofollow: {
			control: 'boolean',
			description:
				'Whether rel="nofollow" attribute should be appended for SEO',
		},
		sponsored: {
			control: 'boolean',
			description:
				'Whether rel="sponsored" attribute should be appended for paid/affiliate links',
		},
		onChangeUrl: {
			action: 'urlChanged',
			description: 'Callback fired when URL input changes',
		},
		onChangeOpenInNewTab: {
			action: 'openInNewTabChanged',
			description: 'Callback fired when new tab toggle changes',
		},
		onChangeNofollow: {
			action: 'nofollowChanged',
			description: 'Callback fired when nofollow toggle changes',
		},
		onChangeSponsored: {
			action: 'sponsoredChanged',
			description: 'Callback fired when sponsored toggle changes',
		},
	},
};

export const Default = {
	render: function Render( args ) {
		const [ url, setUrl ] = useState( args.url || 'https://example.com' );
		const [ openInNewTab, setOpenInNewTab ] = useState(
			Boolean( args.openInNewTab )
		);
		const [ nofollow, setNofollow ] = useState( Boolean( args.nofollow ) );
		const [ sponsored, setSponsored ] = useState(
			Boolean( args.sponsored )
		);

		const relParts = [];
		if ( openInNewTab ) {
			relParts.push( 'noopener', 'noreferrer' );
		}
		if ( nofollow ) {
			relParts.push( 'nofollow' );
		}
		if ( sponsored ) {
			relParts.push( 'sponsored' );
		}
		const relString = relParts.join( ' ' );

		return (
			<div
				style={ {
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
				} }
			>
				<UrlControl
					{ ...args }
					url={ url }
					openInNewTab={ openInNewTab }
					nofollow={ nofollow }
					sponsored={ sponsored }
					onChangeUrl={ ( newUrl ) => {
						setUrl( newUrl );
						args.onChangeUrl?.( newUrl );
					} }
					onChangeOpenInNewTab={ ( val ) => {
						setOpenInNewTab( val );
						args.onChangeOpenInNewTab?.( val );
					} }
					onChangeNofollow={ ( val ) => {
						setNofollow( val );
						args.onChangeNofollow?.( val );
					} }
					onChangeSponsored={ ( val ) => {
						setSponsored( val );
						args.onChangeSponsored?.( val );
					} }
				/>
				<div
					style={ {
						padding: '12px 14px',
						background: '#f6f7f7',
						border: '1px solid #dcdcde',
						borderRadius: '4px',
						fontSize: '12px',
						color: '#3c434a',
					} }
				>
					<div style={ { marginBottom: '4px' } }>
						<strong>Rendered Anchor Attributes:</strong>
					</div>
					<div>
						<code>
							{ `<a href="${ url || '#' }"` }
							{ openInNewTab ? ' target="_blank"' : '' }
							{ relString ? ` rel="${ relString }"` : '' }
							{ `>Link</a>` }
						</code>
					</div>
				</div>
			</div>
		);
	},
	args: {
		label: 'Slide Target URL',
		url: 'https://wordpress.org',
		openInNewTab: false,
		nofollow: false,
		sponsored: false,
	},
};

export const OpenInNewTabActive = {
	render: function Render( args ) {
		const [ url, setUrl ] = useState( args.url );
		const [ openInNewTab, setOpenInNewTab ] = useState( args.openInNewTab );
		const [ nofollow, setNofollow ] = useState( args.nofollow );
		const [ sponsored, setSponsored ] = useState( args.sponsored );

		return (
			<UrlControl
				{ ...args }
				url={ url }
				openInNewTab={ openInNewTab }
				nofollow={ nofollow }
				sponsored={ sponsored }
				onChangeUrl={ ( newUrl ) => {
					setUrl( newUrl );
					args.onChangeUrl?.( newUrl );
				} }
				onChangeOpenInNewTab={ ( val ) => {
					setOpenInNewTab( val );
					args.onChangeOpenInNewTab?.( val );
				} }
				onChangeNofollow={ ( val ) => {
					setNofollow( val );
					args.onChangeNofollow?.( val );
				} }
				onChangeSponsored={ ( val ) => {
					setSponsored( val );
					args.onChangeSponsored?.( val );
				} }
			/>
		);
	},
	args: {
		label: 'External Partner Link',
		url: 'https://github.com/noruzzamans/gslider-blocks',
		openInNewTab: true,
		nofollow: false,
		sponsored: false,
	},
};

export const AffiliateSponsoredLink = {
	render: function Render( args ) {
		const [ url, setUrl ] = useState( args.url );
		const [ openInNewTab, setOpenInNewTab ] = useState( args.openInNewTab );
		const [ nofollow, setNofollow ] = useState( args.nofollow );
		const [ sponsored, setSponsored ] = useState( args.sponsored );

		return (
			<UrlControl
				{ ...args }
				url={ url }
				openInNewTab={ openInNewTab }
				nofollow={ nofollow }
				sponsored={ sponsored }
				onChangeUrl={ ( newUrl ) => {
					setUrl( newUrl );
					args.onChangeUrl?.( newUrl );
				} }
				onChangeOpenInNewTab={ ( val ) => {
					setOpenInNewTab( val );
					args.onChangeOpenInNewTab?.( val );
				} }
				onChangeNofollow={ ( val ) => {
					setNofollow( val );
					args.onChangeNofollow?.( val );
				} }
				onChangeSponsored={ ( val ) => {
					setSponsored( val );
					args.onChangeSponsored?.( val );
				} }
			/>
		);
	},
	args: {
		label: 'Affiliate Button Link',
		url: 'https://example.com/affiliate-product?ref=gslider',
		openInNewTab: true,
		nofollow: true,
		sponsored: true,
	},
};

export const EmptyInitialState = {
	render: function Render( args ) {
		const [ url, setUrl ] = useState( '' );
		const [ openInNewTab, setOpenInNewTab ] = useState( false );
		const [ nofollow, setNofollow ] = useState( false );
		const [ sponsored, setSponsored ] = useState( false );

		return (
			<UrlControl
				{ ...args }
				url={ url }
				openInNewTab={ openInNewTab }
				nofollow={ nofollow }
				sponsored={ sponsored }
				onChangeUrl={ ( newUrl ) => {
					setUrl( newUrl );
					args.onChangeUrl?.( newUrl );
				} }
				onChangeOpenInNewTab={ ( val ) => {
					setOpenInNewTab( val );
					args.onChangeOpenInNewTab?.( val );
				} }
				onChangeNofollow={ ( val ) => {
					setNofollow( val );
					args.onChangeNofollow?.( val );
				} }
				onChangeSponsored={ ( val ) => {
					setSponsored( val );
					args.onChangeSponsored?.( val );
				} }
			/>
		);
	},
	args: {
		label: 'Button Action URL',
		url: '',
		openInNewTab: false,
		nofollow: false,
		sponsored: false,
	},
};
