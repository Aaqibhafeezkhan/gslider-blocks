import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { TabPanel } from '@wordpress/components';

const InspectorControl = ({
  generalControls = null,
  styleControls = null,
  advancedControls = null,
}) => {
  return (
    <InspectorControls key="controls">
      <div className="gslider-inspector-control">
        <TabPanel
          className="gslider-parent-tab-panel"
          activeClass="active-tab"
          tabs={[
            { name: "general", title: __("General", "gslider-blocks"), className: "gslider-tab-panel general" },
            { name: "styles", title: __("Style", "gslider-blocks"), className: "gslider-tab-panel styles" },
            { name: "advanced", title: __("Advanced", "gslider-blocks"), className: "gslider-tab-panel advanced" },
          ]}
        >
          {(tab) => (
            <div className={`gslider-tab-panel-controls ${tab.name}`}>
              {tab.name === 'general' && generalControls}
              {tab.name === 'styles' && styleControls}
              {tab.name === 'advanced' && advancedControls}
            </div>
          )}
        </TabPanel>
      </div>
    </InspectorControls>
  );
};

export default InspectorControl;