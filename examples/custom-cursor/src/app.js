/* global window */
import * as React from 'react';
import {useState, useCallback} from 'react';
import {render} from 'react-dom';
import MapGL from '@goongmaps/goong-map-react';
import ControlPanel from './control-panel';
import MAP_STYLE from '../../map-style-basic-v8.json';

const GOONG_MAPTILES_KEY = ''; // Set your goong maptiles key here

function getCursor({isHovering, isDragging}) {
  return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'default';
}

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 21.02727,
    longitude: 105.85119,
    zoom: 13,
    bearing: 0,
    pitch: 0
  });
  const [interactiveLayerIds, setInteractiveLayerIds] = useState([]);

  const onInteractiveLayersChange = useCallback(layerFilter => {
    setInteractiveLayerIds(MAP_STYLE.layers.map(layer => layer.id).filter(layerFilter));
  }, []);

  const onClick = useCallback(event => {
    const feature = event.features && event.features[0];

    if (feature) {
      window.alert(`Clicked layer ${feature.layer.id}`); // eslint-disable-line no-alert
    }
  }, []);

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle={MAP_STYLE}
        clickRadius={2}
        onClick={onClick}
        getCursor={getCursor}
        interactiveLayerIds={interactiveLayerIds}
        onViewportChange={setViewport}
        goongApiAccessToken={GOONG_MAPTILES_KEY}
      />
      <ControlPanel onChange={onInteractiveLayersChange} />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
