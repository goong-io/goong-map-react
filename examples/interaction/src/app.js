import * as React from 'react';
import {useState, useCallback} from 'react';
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
    pitch: 50
  });
  const [interactionState, setInteractionState] = useState({});
  const [settings, setSettings] = useState({
    dragPan: true,
    dragRotate: true,
    scrollZoom: true,
    touchZoom: true,
    touchRotate: true,
    keyboard: true,
    doubleClickZoom: true,
    minZoom: 0,
    maxZoom: 20,
    minPitch: 0,
    maxPitch: 85
  });

  const updateSettings = useCallback(
    (name, value) =>
      setSettings(s => ({
        ...s,
        [name]: value
      })),
    []
  );

  return (
    <>
      <MapGL
        {...viewport}
        {...settings}
        width="100%"
        height="100%"
        mapStyle="https://tiles.goong.io/assets/goong_map_dark.json"
        onViewportChange={setViewport}
        onInteractionStateChange={s => setInteractionState({...s})}
        goongApiAccessToken={GOONG_MAPTILES_KEY}
      />
      <ControlPanel
        settings={settings}
        interactionState={interactionState}
        onChange={updateSettings}
      />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
