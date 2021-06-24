[![npm](https://img.shields.io/npm/v/@goongmaps/goong-map-react.svg)](https://npmjs.org/package/@goongmaps/goong-map-react)
## @goongmaps/goong-map-react | [Documentation](https://docs.goong.io/goong-map-react)

`@goongmaps/goong-map-react` is a fork of [react-map-gl](https://github.com/visgl/react-map-gl). It provides React components for [Goong GL JS](https://github.com/goong-io/goong-js). More information in the online documentation.

See our [Design Philosophy](docs/README.md#design-philosophy).

### Installation

Using `@goongmaps/goong-map-react` requires `react >= 16.3`.

```sh
npm install --save @goongmaps/goong-map-react
```

### Example

```js
import * as React from 'react';
import ReactMapGL from '@goongmaps/goong-map-react';

function Map() {
  const [viewport, setViewport] = React.useState({
    latitude: 21.03072,
    longitude: 105.85239,
    zoom: 12
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={(viewport) => setViewport(viewport)}
    />
  );
}
```

### Using Goong Maptiles key

To show maps from Goong you will need to [register](https://account.goong.io) on our website in order to retrieve a map tiles key required by the map component, which will be used to identify you and start serving up map tiles. The service will be free until a certain level of traffic is exceeded.

There are several ways to provide a token to your app, as showcased in some of the example folders:

* Provide a `goongApiAccessToken` prop to the map component
* Set the `GoongAccessToken` environment variable (or set `REACT_APP_GOONG_ACCESS_TOKEN` if you are using Create React App)

But we would recommend using something like [dotenv](https://github.com/motdotla/dotenv) and put your key in an untracked `.env` file, that will then expose it as a `process.env` variable, with much less leaking risks.


### Limitations

This library provides convenient wrappers around initializing and (to some degree) tracking the state of a Goong WebGL map. Because most of the functionality of Goong's JS API depends on the use of HTML5 canvases and WebGL, which React is not built to manipulate, the React component does not mirror all the functionality of Goong GL JS's Map class. You may access the native Goong API exposed by the `getMap()` function in this library. However, proceed with caution as calling the native APIs may break the connection between the React layer props and the underlying map state.

Examples of replacing common native API calls with their React equivalents can be found on the [FAQ](/docs/get-started/faq.md) page.


### Contribute

See [contribution guide](/CONTRIBUTING.md).
