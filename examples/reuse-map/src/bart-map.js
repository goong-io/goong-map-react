import * as React from 'react';
import {useState} from 'react';
import MapGL, {Marker} from '@goongmaps/goong-map-react';

import bartStations from '../../.data/bart-station.json';

const GOONG_MAPTILES_KEY = ''; // Set your goong maptiles key here

export default function BartMap(props) {
  const [viewport, setViewport] = useState({
    latitude: 37.73,
    longitude: -122.36,
    zoom: 11,
    bearing: 0,
    pitch: 50
  });

  // eslint-disable-next-line
  const onMapLoad = event => console.log(event);

  return (
    <MapGL
      {...viewport}
      goongApiAccessToken={GOONG_MAPTILES_KEY}
      mapStyle={props.mapStyle}
      width="100%"
      height="100%"
      onViewportChange={setViewport}
      onLoad={onMapLoad}
      reuseMaps
    >
      {bartStations.map(({name, coordinates}, i) => (
        <Marker key={i} longitude={coordinates[0]} latitude={coordinates[1]}>
          <div className="station">
            <span>{name}</span>
          </div>
        </Marker>
      ))}
    </MapGL>
  );
}
