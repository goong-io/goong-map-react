import * as React from 'react';
import {useState, useCallback} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker, NavigationControl} from 'react-map-gl';

import ControlPanel from './control-panel';
import Pin from './pin';

const TOKEN = ''; // Set your goong maptiles key here

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 21.02727,
    longitude: 105.85119,
    zoom: 12,
    bearing: 0,
    pitch: 0
  });
  const [marker, setMarker] = useState({
    latitude: 21.02727,
    longitude: 105.85119,
  });
  const [events, logEvents] = useState({});

  const onMarkerDragStart = useCallback(event => {
    logEvents(_events => ({..._events, onDragStart: event.lngLat}));
  }, []);

  const onMarkerDrag = useCallback(event => {
    logEvents(_events => ({..._events, onDrag: event.lngLat}));
  }, []);

  const onMarkerDragEnd = useCallback(event => {
    logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1]
    });
  }, []);

  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="https://tiles.goong.io/assets/goong_map_dark.json"
        onViewportChange={setViewport}
        goongApiAccessToken={TOKEN}
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={20} />
        </Marker>

        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
      </MapGL>
      <ControlPanel events={events} />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
