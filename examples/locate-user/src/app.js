import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import MapGL, {GeolocateControl} from '@goongmaps/goong-map-react';

const GOONG_MAPTILES_KEY = ''; // Set your goong maptiles key here

const geolocateStyle = {
  top: 0,
  left: 0,
  margin: 10
};
const positionOptions = {enableHighAccuracy: true};

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: 96,
    zoom: 3,
    bearing: 0,
    pitch: 0
  });

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="https://tiles.goong.io/assets/goong_map_dark.json"
      onViewportChange={setViewport}
      goongApiAccessToken={GOONG_MAPTILES_KEY}
    >
      <GeolocateControl
        style={geolocateStyle}
        positionOptions={positionOptions}
        trackUserLocation
        auto
      />
    </MapGL>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
