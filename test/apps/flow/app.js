// @flow
import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import MapGL, {NavigationControl} from '@goongmaps/goong-map-react';

import type {ViewportProps} from '@goongmaps/goong-map-react';

const GOONG_MAPTILES_KEY = ''; // Set your goong maptiles key here

function Root() {
  const [viewport, setViewport] = useState<ViewportProps>({
    // width: '100vw', // should generate flow error
    latitude: 21.02923,
    longitude: 105.85061,
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
      onViewportChange={nextViewport => setViewport(nextViewport)}
      goongApiAccessToken={GOONG_MAPTILES_KEY}
    >
      <NavigationControl
      // showCompass="true" // should generate flow error
      />
    </MapGL>
  );
}

/* global document */
if (document.body) {
  document.body.style.margin = '0';
  render(<Root />, document.body.appendChild(document.createElement('div')));
}
