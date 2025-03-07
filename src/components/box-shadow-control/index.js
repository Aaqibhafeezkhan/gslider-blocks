import { __ } from '@wordpress/i18n';
import React, { useState, useEffect } from 'react';
import Control from './control';
import { Dashicon, BaseControl, Button, Dropdown} from '@wordpress/components';
import './editor.lazy.scss';

export default function BoxShadowSettingsControl({ label = __("Box Shadow", "gutenslider-blocks"), onBoxShadowChange, initialShadowValue, onBoxShadowStyleChange, }) {
	const [boxShadow, setBoxShadow] = useState(initialShadowValue || [0, 0, 0, 0, '', '#00000000']);

	useEffect(() => {
		onBoxShadowChange(boxShadow);
	}, [boxShadow, onBoxShadowChange]);

	useEffect(() => {
        const boxShadowStyle = boxShadow.map((value, index) => {
            if (index === 4) return value;
            if (index === 5) return value;
            return `${value}px`;
        }).join(' ');

        if (onBoxShadowStyleChange) {
            onBoxShadowStyleChange(boxShadowStyle);
        }
    }, [boxShadow, onBoxShadowStyleChange]);

	function onChangeHandler(value, index) {
		setBoxShadow((prevBoxShadow) => {
			const newBoxShadow = [...prevBoxShadow];
			switch (index) {
				case 5:
					newBoxShadow[index] = value;
					break;
				case 4:
					newBoxShadow[index] = value ? 'inset' : '';
					break;
				default:
					newBoxShadow[index] = +value;
					break;
			}
			return newBoxShadow;
		});
	}

	return (
		<>
		    <div className="global-setting-color-container">
				<BaseControl 
					label={label}
					className="global-box-shadow-wrapper shadow-color global-setting-color-switcher-wrapper"
				>
					<Dropdown
						className="global-box-shadow-icon-dropdown"
						contentClassName="global-box-shadow-icon-dropdown-content"
						popoverProps={{ placement: 'bottom-start' }}
						renderToggle={({ isOpen, onToggle }) => (
							<Button
								onClick={onToggle}
								aria-expanded={isOpen}
								className="color-ball"
							>
							</Button>
						)}
						renderContent={() => (
							<div className="controlPane controls">
								<Control
									label="Inset"
									type="checkbox"
									value={boxShadow[4] === 'inset'}
									onChangeHandler={(e) => onChangeHandler(e, 4)}
								/>
								<Control
									label="Color"
									type="color"
									value={boxShadow[5]}
									onChangeHandler={(e) => onChangeHandler(e, 5)}
								/>
								<Control
									label="Offset X"
									type="range"
									value={boxShadow[0]}
									onChangeHandler={(e) => onChangeHandler(e, 0)}
								/>
								<Control
									label="Offset Y"
									type="range"
									value={boxShadow[1]}
									onChangeHandler={(e) => onChangeHandler(e, 1)}
								/>
								<Control
									label="Blur"
									type="range"
									value={boxShadow[2]}
									onChangeHandler={(e) => onChangeHandler(e, 2)}
								/>
								<Control
									label="Spread"
									type="range"
									value={boxShadow[3]}
									onChangeHandler={(e) => onChangeHandler(e, 3)}
								/>
							</div>
						)}
					/>
				</BaseControl>
			</div>
		</>
	);
}
