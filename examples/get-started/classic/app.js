/* global document */
import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import MapGL from '@goongmaps/goong-map-react';

const GOONG_MAPTILES_KEY = ''; // Set your goong maptiles key here

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14,
        bearing: 0,
        pitch: 0
      }
    };
  }

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        width="100vw"
        height="100vh"
        mapStyle="https://tiles.goong.io/assets/goong_map_dark.json"
        onViewportChange={viewport => this.setState({viewport})}
        goongApiAccessToken={GOONG_MAPTILES_KEY}
      />
    );
  }
}

document.body.style.margin = 0;
render(<Root />, document.body.appendChild(document.createElement('div')));
