import React from 'react';
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, ButtonGroup } from '@wordpress/components';

import { 
    HTML_TAGS,
} from "@Constants";

const HtmlTagControl = ({ label, globalHtmlTag, setGlobalHtmlTag }) => {
	return (
		<BaseControl
			label={label ? __(label, "gslider-blocks") : __("HTML Tag", "gslider-blocks")}
			className="gslider-html-tag-control"
		>
			<ButtonGroup className="gslider-html-tag-control-btn-group">
				{HTML_TAGS.map((item) => (
					<Button
						key={item.value}
						onClick={() => setGlobalHtmlTag(item.value)}
						className={`gslider-html-tag-control-single-btn ${globalHtmlTag === item.value ? 'active' : ''}`}
					>
						{item.label}
					</Button>
				))}
			</ButtonGroup>
		</BaseControl>
	);
};

export default HtmlTagControl;