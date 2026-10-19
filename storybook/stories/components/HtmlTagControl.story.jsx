import { useState } from 'react';
import HtmlTagControl from '@Components/html-tag-control';
import { HTML_TAGS } from '@Constants';

export default {
	title: 'Components/Primitives/HtmlTagControl',
	component: HtmlTagControl,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'HtmlTagControl provides an accessible button group selector for choosing semantic HTML tags (H1–H6, P, Span, Div) for slider titles, subtitles, and captions.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description: 'Label displayed above the button group',
		},
		value: {
			control: { type: 'select' },
			options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
			description: 'Currently selected semantic HTML tag',
		},
		options: {
			control: 'object',
			description: 'Array of tag options { label, value }',
		},
		onChange: {
			action: 'tagChanged',
			description: 'Callback fired when a tag button is clicked',
		},
	},
};

export const Default = {
	render: (args) => {
		const [tag, setTag] = useState(args.value || 'h2');
		return (
			<HtmlTagControl
				{...args}
				value={tag}
				onChange={(newTag) => {
					setTag(newTag);
					args.onChange?.(newTag);
				}}
			/>
		);
	},
	args: {
		label: 'Title HTML Tag',
		value: 'h2',
		options: HTML_TAGS,
	},
};

export const SubtitleTag = {
	render: (args) => {
		const [tag, setTag] = useState(args.value || 'p');
		return (
			<HtmlTagControl
				{...args}
				value={tag}
				onChange={(newTag) => {
					setTag(newTag);
					args.onChange?.(newTag);
				}}
			/>
		);
	},
	args: {
		label: 'Subtitle Tag',
		value: 'p',
		options: HTML_TAGS,
	},
};
