/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import ContentOrderControl from '@Components/content-order-control';

export default {
	title: 'Components/Layout/ContentOrderControl',
	component: ContentOrderControl,
	tags: [ 'autodocs' ],
	parameters: {
		docs: {
			description: {
				component:
					'ContentOrderControl provides an accessible drag-and-drop list using `@dnd-kit` for reordering slider slide content elements such as Title, Subtitle, Description, and Action Buttons.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label displayed above the reorderable list',
		},
		help: {
			control: 'text',
			description: 'Helpful guidance text displayed below the control',
		},
		items: {
			control: 'object',
			description:
				'Available items with key, label, and WordPress Dashicon/icon identifier',
		},
		order: {
			control: 'object',
			description:
				'Array of item keys representing current ordering sequence',
		},
		onChange: {
			action: 'orderChanged',
			description:
				'Callback fired when items are reordered via drag-and-drop',
		},
	},
};

const DEFAULT_SLIDE_ITEMS = [
	{ key: 'title', label: 'Slide Title', icon: 'editor-textcolor' },
	{ key: 'subtitle', label: 'Subtitle / Tagline', icon: 'text' },
	{ key: 'description', label: 'Description', icon: 'editor-paragraph' },
	{ key: 'buttons', label: 'Action Buttons', icon: 'button' },
];

export const Default = {
	render: function Render( args ) {
		const [ currentOrder, setCurrentOrder ] = useState(
			args.order || DEFAULT_SLIDE_ITEMS.map( ( item ) => item.key )
		);

		return (
			<div
				style={ {
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
				} }
			>
				<ContentOrderControl
					{ ...args }
					order={ currentOrder }
					onChange={ ( newOrder ) => {
						setCurrentOrder( newOrder );
						args.onChange?.( newOrder );
					} }
				/>
				<div
					style={ {
						padding: '10px 14px',
						background: '#f0f0f1',
						borderRadius: '4px',
						fontSize: '12px',
						color: '#3c434a',
					} }
				>
					<strong>Active Sequence:</strong>{ ' ' }
					{ currentOrder.join( ' → ' ) }
				</div>
			</div>
		);
	},
	args: {
		label: 'Slide Content Order',
		help: 'Drag the handles to rearrange the visual stacking order of slide elements.',
		items: DEFAULT_SLIDE_ITEMS,
		order: [ 'title', 'subtitle', 'description', 'buttons' ],
	},
};

const TESTIMONIAL_ITEMS = [
	{ key: 'quote', label: 'Quote Icon', icon: 'format-quote' },
	{ key: 'content', label: 'Testimonial Text', icon: 'editor-paragraph' },
	{ key: 'rating', label: 'Star Rating', icon: 'star-filled' },
	{ key: 'author', label: 'Author & Designation', icon: 'admin-users' },
];

export const TestimonialSections = {
	render: function Render( args ) {
		const [ currentOrder, setCurrentOrder ] = useState(
			args.order || TESTIMONIAL_ITEMS.map( ( item ) => item.key )
		);

		return (
			<div
				style={ {
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
				} }
			>
				<ContentOrderControl
					{ ...args }
					order={ currentOrder }
					onChange={ ( newOrder ) => {
						setCurrentOrder( newOrder );
						args.onChange?.( newOrder );
					} }
				/>
				<div
					style={ {
						padding: '10px 14px',
						background: '#f0f0f1',
						borderRadius: '4px',
						fontSize: '12px',
						color: '#3c434a',
					} }
				>
					<strong>Render Order:</strong>{ ' ' }
					{ currentOrder.join( ' → ' ) }
				</div>
			</div>
		);
	},
	args: {
		label: 'Testimonial Layout Order',
		help: 'Customize the hierarchy between quote mark, text body, star ratings, and author info.',
		items: TESTIMONIAL_ITEMS,
		order: [ 'quote', 'content', 'rating', 'author' ],
	},
};

export const CustomPreReordered = {
	render: function Render( args ) {
		const [ currentOrder, setCurrentOrder ] = useState( args.order );

		return (
			<div
				style={ {
					display: 'flex',
					flexDirection: 'column',
					gap: '16px',
				} }
			>
				<ContentOrderControl
					{ ...args }
					order={ currentOrder }
					onChange={ ( newOrder ) => {
						setCurrentOrder( newOrder );
						args.onChange?.( newOrder );
					} }
				/>
				<div
					style={ {
						padding: '10px 14px',
						background: '#e7f5ea',
						borderRadius: '4px',
						fontSize: '12px',
						color: '#1b5e20',
					} }
				>
					<strong>Custom Stacking:</strong>{ ' ' }
					{ currentOrder.join( ' → ' ) }
				</div>
			</div>
		);
	},
	args: {
		label: 'Hero Slider Hierarchy',
		help: 'Buttons placed at top above description for unique hero layouts.',
		items: DEFAULT_SLIDE_ITEMS,
		order: [ 'subtitle', 'title', 'buttons', 'description' ],
	},
};

export const MinimalTwoItems = {
	render: function Render( args ) {
		const [ currentOrder, setCurrentOrder ] = useState( args.order );

		return (
			<ContentOrderControl
				{ ...args }
				order={ currentOrder }
				onChange={ ( newOrder ) => {
					setCurrentOrder( newOrder );
					args.onChange?.( newOrder );
				} }
			/>
		);
	},
	args: {
		label: 'Media & Caption Order',
		help: 'Reorder image media and caption text.',
		items: [
			{ key: 'media', label: 'Slider Image', icon: 'format-image' },
			{ key: 'caption', label: 'Overlay Caption', icon: 'text' },
		],
		order: [ 'media', 'caption' ],
	},
};
