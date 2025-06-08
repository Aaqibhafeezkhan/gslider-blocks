import React from 'react';
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, ButtonGroup } from '@wordpress/components';
import ResponsiveDeviceControl from '@Components/responsive-device-control';
import { Dashicon } from '@wordpress/components';

import { 
    TEXT_ALIGN,
    VERTICAL_ALIGN,
    HORIZONTAL_ALIGN
} from "@Constants";

const ResponsiveAlignmentControl = ({ 
	label='',
	globalAlignment,
	setGlobalAlignment,
	deviceType,
	setAttributes,
	textAlignment = true,
	verticalAlignment = false,
	horizontalAlignment = false,
 }) => {

	const handleAlignmentChange = (value) => {
		setGlobalAlignment({
			...globalAlignment,
			[deviceType]: value
		});

		setAttributes({
			globalAlignment: {
				...globalAlignment,
				[deviceType]: value
			}
		});
	};

	return (
		<BaseControl
			className="gslider-alignment-control"
		>
			<ResponsiveDeviceControl
				label={label}
                device={deviceType}
            />
			{textAlignment && (
			<ButtonGroup className="gslider-alignment-group-btn gslider-text-alignment">
				{TEXT_ALIGN.map((item) => (
					<Button
						key={item.value}
						onClick={() => handleAlignmentChange(item.value)}
						className={`gslider-alignment-single-btn ${globalAlignment[deviceType] === item.value ? 'active' : ''}`}
					>
						{item.label}
					</Button>
				))}
			</ButtonGroup>
			)}
			{verticalAlignment && (
				<ButtonGroup className="gslider-alignment-group-btn gslider-vertical-alignment">
					{VERTICAL_ALIGN.map((item) => (
						<Button
							key={item.value}
							onClick={() => handleAlignmentChange(item.value)}
							className={`gslider-alignment-single-btn ${globalAlignment[deviceType] === item.value ? 'active' : ''}`}
						>
							{item.label}
						</Button>
					))}
				</ButtonGroup>
			)}
			{horizontalAlignment && (
				<ButtonGroup className="gslider-alignment-group-btn gslider-horizontal-alignment">
					{HORIZONTAL_ALIGN.map((item) => (
						<Button
							key={item.value}
							onClick={() => handleAlignmentChange(item.value)}
							className={`gslider-alignment-single-btn ${globalAlignment[deviceType] === item.value ? 'active' : ''}`}
						>
							{item.label}
						</Button>
					))}
				</ButtonGroup>
			)}
		</BaseControl>
	);
};

export default ResponsiveAlignmentControl;