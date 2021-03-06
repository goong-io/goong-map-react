// Copyright (c) 2015 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
import * as React from 'react';
import {useCallback} from 'react';
import PropTypes from 'prop-types';
import {extent} from 'd3-array';
import {scaleLinear} from 'd3-scale';
import {geoPath, geoTransform} from 'd3-geo';

import {CanvasOverlay} from '@goongmaps/goong-map-react';

const propTypes = {
  globalOpacity: PropTypes.number.isRequired,
  /**
   * An Immutable List of feature objects.
   */
  features: PropTypes.array.isRequired,
  /* eslint-disable react/forbid-prop-types */
  colorDomain: PropTypes.array,
  colorRange: PropTypes.array.isRequired,
  valueAccessor: PropTypes.func.isRequired
};

const defaultProps = {
  globalOpacity: 1,
  colorDomain: null,
  colorRange: ['#FFFFFF', '#1FBAD6'],
  valueAccessor: feature => feature.properties.value
};

function drawFeatures(ctx, path, props) {
  const {features} = props;
  const colorDomain = props.colorDomain || extent(features, props.valueAccessor);

  const colorScale = scaleLinear().domain(colorDomain).range(props.colorRange).clamp(true);

  for (const feature of features) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = '1';
    ctx.fillStyle = colorScale(props.valueAccessor(feature));
    const geometry = feature.geometry;
    path(geometry);
    ctx.fill();
    ctx.stroke();
  }
}

export default function ChoroplethOverlay(props) {
  const redraw = useCallback(({width, height, ctx, project, unproject}) => {
    ctx.clearRect(0, 0, width, height);

    function projectPoint(lon, lat) {
      const point = project([lon, lat]);
      /* eslint-disable no-invalid-this */
      this.stream.point(point[0], point[1]);
      /* eslint-enable no-invalid-this */
    }

    const transform = geoTransform({point: projectPoint});
    const path = geoPath().projection(transform).context(ctx);
    drawFeatures(ctx, path, props);
  }, []);

  return <CanvasOverlay redraw={redraw} />;
}

ChoroplethOverlay.propTypes = propTypes;
ChoroplethOverlay.defaultProps = defaultProps;
