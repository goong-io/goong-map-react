import * as React from 'react';
import {useState, useMemo, useCallback} from 'react';
import {render} from 'react-dom';
import MapGL, {Popup, Source, Layer} from 'react-map-gl';
import ControlPanel from './control-panel';

import {countiesLayer, highlightLayer} from './map-style.js';

const GOONG_MAPTILES_KEY = ''; // Set your goong maptiles key here

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 38.88,
    longitude: -98,
    zoom: 3,
    minZoom: 2,
    bearing: 0,
    pitch: 0
  });
  const [hoverInfo, setHoverInfo] = useState(null);

  const onHover = useCallback(event => {
    const county = event.features && event.features[0];
    setHoverInfo({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
      countyName: county && county.properties.COUNTY
    });
  }, []);

  const selectedCounty = (hoverInfo && hoverInfo.countyName) || '';
  const filter = useMemo(() => ['in', 'COUNTY', selectedCounty], [selectedCounty]);

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="https://tiles.goong.io/assets/goong_map_web.json"
        goongApiAccessToken={GOONG_MAPTILES_KEY}
        onViewportChange={setViewport}
        onHover={onHover}
        interactiveLayerIds={['place-country-1']}
      >
        <Source
          type="vector"
          url={`https://tiles.goong.io/sources/base.json?api_key=${GOONG_MAPTILES_KEY}`}
        >
          <Layer beforeId="water" {...countiesLayer} />
          <Layer beforeId="water" {...highlightLayer} filter={filter} />
        </Source>
        {selectedCounty && (
          <Popup
            longitude={hoverInfo.longitude}
            latitude={hoverInfo.latitude}
            closeButton={false}
            className="county-info"
          >
            {selectedCounty}
          </Popup>
        )}
      </MapGL>
      <ControlPanel />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
