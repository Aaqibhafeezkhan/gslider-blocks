import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import InspectorControl from '@Components/inspector-controls';
import './editor.scss';

export default function Inspector({ attributes, setAttributes, clientId }) {
    const { 
        blockId,
    } = attributes;

    useEffect(() => {
        if (clientId && typeof clientId === "string") {
            setAttributes({ blockId: `gslider-flexi-content-item-${clientId.slice(0, 8)}` });
        }
    }, [clientId]);

    /**
	 * Inspector General Controls
	 */
	const generalControls = (
		<>
		    <PanelBody title={__("Slider", "frontis-blocks")} initialOpen>
            {/* Add general settings here */}
            </PanelBody>
		</>
	);

	/**
	 * Inspector Style Controls
	 */
	const styleControls = (
		<>
            <PanelBody title={__("Style", "frontis-blocks")} initialOpen>
                {/* Add style settings here */}
            </PanelBody>
		</>
	);
		
	/**
	 * Inspector Advanced Controls
	 */
	const advancedControls = (
		<>
            <PanelBody title={__("Layout", "frontis-blocks")} initialOpen>
                {/* Add advanced settings here */}
            </PanelBody>
		</>
	);
    
    return (

        <>
            <InspectorControl
                generalControls={generalControls}
                styleControls={styleControls}
                advancedControls={advancedControls}
            />
        </>
    );
}
