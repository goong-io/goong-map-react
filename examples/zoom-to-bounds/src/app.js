import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import MapGL, {LinearInterpolator, WebMercatorViewport} from '@goongmaps/goong-map-react';
import bbox from '@turf/bbox';

import ControlPanel from './control-panel';
import MAP_STYLE from './map-style';

const TOKEN = ''; // Set your goong maptiles key here

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 37.78,
    longitude: -122.4,
    zoom: 11,
    bearing: 0,
    pitch: 0
  });

  const onClick = event => {
    const feature = event.features[0];
    if (feature) {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);
      // construct a viewport instance from the current state
      const vp = new WebMercatorViewport(viewport);
      const {longitude, latitude, zoom} = vp.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat]
        ],
        {
          padding: 40
        }
      );

      setViewport({
        ...viewport,
        longitude,
        latitude,
        zoom,
        transitionInterpolator: new LinearInterpolator({
          around: [event.offsetCenter.x, event.offsetCenter.y]
        }),
        transitionDuration: 1000
      });
    }
  };

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle={MAP_STYLE}
        interactiveLayerIds={['sf-neighborhoods-fill']}
        onClick={onClick}
        onViewportChange={v => setViewport(v)}
        goongApiAccessToken={TOKEN}
      />
      <ControlPanel />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
