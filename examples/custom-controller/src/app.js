/* global window */
import * as React from 'react';
import {useState, useCallback} from 'react';
import {render} from 'react-dom';
import MapGL from '@goongmaps/goong-map-react';

import ControlPanel from './control-panel';
import MapController from './map-controller';
const customController = new MapController();

const GOONG_MAPTILES_KEY = ''; // Set your goong maptiles key here

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 21.02727,
    longitude: 105.85119,
    zoom: 12.5,
    bearing: 0,
    pitch: 0
  });
  const [settings, setSettings] = useState({
    invertZoom: false,
    invertPan: false,
    longPress: false
  });

  const onSettingsChange = useCallback((name, value) => {
    setSettings(s => ({...s, [name]: value}));
  }, []);

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="https://tiles.goong.io/assets/goong_map_dark.json"
        controller={customController}
        invertZoom={settings.invertZoom}
        invertPan={settings.invertPan}
        onPress={settings.longPress ? () => window.alert('pressed') : null} // eslint-disable-line no-alert
        onViewportChange={setViewport}
        goongApiAccessToken={GOONG_MAPTILES_KEY}
      />
      <ControlPanel settings={settings} onChange={onSettingsChange} />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
