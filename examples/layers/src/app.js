import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import ControlPanel from './control-panel';

const GOONG_MAPTILES_KEY = ''; // Set your goong maptiles key here

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 21.02727,
    longitude: 105.85119,
    zoom: 12,
    bearing: 0,
    pitch: 0
  });
  const [mapStyle, setMapStyle] = useState('');

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle={mapStyle}
        onViewportChange={setViewport}
        goongApiAccessToken={GOONG_MAPTILES_KEY}
      />

      <ControlPanel onChange={setMapStyle} />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
