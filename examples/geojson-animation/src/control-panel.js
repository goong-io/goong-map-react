import * as React from 'react';

function ControlPanel() {
  return (
    <div className="control-panel">
      <h3>Animated GeoJSON</h3>
      <p>Render animation by updating GeoJSON data source.</p>
      <div className="source-link">
        <a
          href="https://github.com/goong-io/goong-map-react/tree/main/examples/geojson-animation"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);
