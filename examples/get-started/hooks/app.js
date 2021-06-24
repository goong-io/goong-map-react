/* global document */
import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import MapGL from '@goongmaps/goong-map-react';

const GOONG_MAPTILES_KEY = ''; // Set your goong maptiles key here

function Root() {
  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14,
    bearing: 0,
    pitch: 0
  });

  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      mapStyle="https://tiles.goong.io/assets/goong_map_dark.json"
      onViewportChange={setViewport}
      goongApiAccessToken={GOONG_MAPTILES_KEY}
    />
  );
}

document.body.style.margin = 0;
render(<Root />, document.body.appendChild(document.createElement('div')));
