import * as React from 'react';

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Highlight Features Containing Similar Data</h3>
      <p>Hover over counties to highlight counties that share the same name.</p>
      <div className="source-link">
        <a
          href="https://github.com/goong-io/goong-map-react/tree/master/examples/filter"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
