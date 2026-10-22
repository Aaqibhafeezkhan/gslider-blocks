import React from 'react';
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, ButtonGroup } from '@wordpress/components';

const HtmlTagControl = ( { label = '', options, value, onChange } ) => {
	return (
		<BaseControl
			label={
				label
					? __( label, 'gslider-blocks' )
					: __( 'HTML Tag', 'gslider-blocks' )
			}
			className="gslider-html-tag-control"
		>
			<ButtonGroup className="gslider-html-tag-control-btn-group">
				{ options.map( ( item ) => (
					<Button
						key={ item.value }
						onClick={ () => onChange( item.value ) }
						className={ `gslider-html-tag-control-single-btn ${
							value === item.value ? 'active' : ''
						}` }
					>
						{ item.label }
					</Button>
				) ) }
			</ButtonGroup>
		</BaseControl>
	);
};

export default HtmlTagControl;
