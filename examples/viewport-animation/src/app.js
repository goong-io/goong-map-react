import * as React from 'react';
import {useState, useCallback} from 'react';
import {render} from 'react-dom';
import MapGL, {FlyToInterpolator} from '@goongmaps/goong-map-react';

import ControlPanel from './control-panel';

const GOONG_MAPTILES_KEY = ''; // Set your goong maptiles key here

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 37.7751,
    longitude: -122.4193,
    zoom: 11,
    bearing: 0,
    pitch: 0
  });

  const onSelectCity = useCallback(({longitude, latitude}) => {
    setViewport({
      longitude,
      latitude,
      zoom: 11,
      transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
      transitionDuration: 'auto'
    });
  }, []);

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="https://tiles.goong.io/assets/goong_map_web.json"
        onViewportChange={setViewport}
        dragRotate={false}
        goongApiAccessToken={GOONG_MAPTILES_KEY}
      />
      <ControlPanel onSelectCity={onSelectCity} />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
