# Viewport Transition

`@goongmaps/goong-map-react` does not expose the transition API from `goong-js` since it is designed to be a stateless component, and needs to synchronize with separate overlay systems such as deck.gl.

Instead, transitions can be defined using [InteractiveMap](/docs/api-reference/interactive-map.md)'s transition props.

## Example: Fly to a New Location

```jsx
import * as React from 'react';
import ReactMapGL, {FlyToInterpolator} from '@goongmaps/goong-map-react';
// 3rd-party easing functions
import d3 from 'd3-ease';

function App() {
  const [viewport, setViewport] = React.useState({
    width: 800,
    height: 600,
    latitude: 37.78,
    longitude: -122.45,
    zoom: 14
  });

  const goToNYC = () => {
    setViewport({
      ...viewport,
      longitude: -74.1,
      latitude: 40.7,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic
    });
  };

  return (
    <div>
      <ReactMapGL {...viewport} onViewportChange={setViewport} />
      <button onClick={goToNYC}>New York City</button>
    </div>
  );
}
```

See [viewport animation](http://visgl.github.io/react-map-gl/examples/viewport-animation) for a complete example.


## Example: Transition Viewport To A Bounding Box

You can use the `WebMercatorViewport` utility to find the target viewport that fits around a lngLat bounding box:

```js
import {WebMercatorViewport} from '@goongmaps/goong-map-react';
```

```js
  const goToSF = () => {
    const {longitude, latitude, zoom} = new WebMercatorViewport(viewport)
        .fitBounds([[-122.4, 37.7], [-122.5, 37.8]], {
          padding: 20,
          offset: [0, -100]
        });
    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic
    });
  };
```

[Documentation of WebMercatorViewport](https://visgl.github.io/react-map-gl/docs/api-reference/web-mercator-viewport)


## Controlling Map Transitions

### InteractiveMap's Transition Props

See properties of [InteractiveMap](/docs/api-reference/interactive-map.md#transitions).

- `transitionDuration` (Number)
- `transitionInterpolator` (Object)
- `transitionEasing` (Function)
- `transitionInterruption` (Number)
- `onTransitionStart` (Function)
- `onTransitionInterrupt` (Function)
- `onTransitionEnd` (Function)


### Transition and the onViewportChange Callback

`InteractiveMap` is designed to be a stateless component. For transitions to work, the application must update the viewport props returned by the `onViewportChange` callback:

```js
<ReactMapGL {...viewport} onViewportChange={setViewport} />
```

Remarks:
- The props returned by the callback may contain transition properties. For example, during panning and rotating, the callback is invoked with `transitionDuration: 0`, meaning that the map movement instantly matches the change of the pointer. When panning or zooming with keyboard, the callback is invoked with a 300ms linear transition.
- It is recommended that when programatically triggering a transition, always explicitly set the transition properties (interpolator, easing and duration).
- "Set and forget": the values of the following props at the start of a transition carry through the entire duration of the transition:
  + `transitionDuration`
  + `transitionInterpolator`
  + `transitionEasing`
  + `transitionInterruption`
- The default interaction/transition behavior can always be intercepted and overwritten in the handler for `onViewportChange`. However, if a transition is in progress, the properties that are being transitioned (e.g. longitude and latitude) should not be manipulated, otherwise the change will be interpreted as an interruption of the transition.
- When using `FlyToInterpolator` for `transitionInterpolator`, `transitionDuration` can be set to `'auto'` where actual duration is auto calculated based on start and end viewports and is linear to the distance between them. This duration can be further customized using `speed` parameter to `FlyToInterpolator` constructor.


### Transition Interpolators

A `TransitionInterpolator` instance must be supplied to the `transitionInterpolator` prop. It contains the following methods:

- `arePropsEqual(currentProps, nextProps)` - called to determine if transition should be triggered when viewport props update.
- `initiateProps(startProps, endProps)` - called before transition starts to pre-process the start and end viewport props.
- `interpolateProps(startProps, endProps, t)` - called to get viewport props in transition. `t` is a time factor between `[0, 1]`.

`@goongmaps/goong-map-react` offers two built-in interpolator classes:

- [LinearInterpolator](/docs/api-reference/linear-interpolator.md)
- [FlyToInterpolator](/docs/api-reference/fly-to-interpolator.md)
