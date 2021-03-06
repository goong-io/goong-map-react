import * as React from 'react';
import {Home} from 'gatsby-theme-ocular/components';
import styled from 'styled-components';

if (typeof window !== 'undefined') {
  window.website = true;
}

const Icon = styled.img`
  vertical-align: middle;
  width: 36px;
  margin-right: 8px;
`;

const HeroExample = styled.div`
  background-image: url(images/hero.png);
  background-size: cover;
  background-position: center;
  height: 100%;
`;

const ContentContainer = styled.div`
  padding: 64px;

  @media screen and (max-width: 768px) {
    padding: 48px;
  }
`;

export default class IndexPage extends React.Component {
  render() {
    return (
      <Home HeroExample={HeroExample}>
        <ContentContainer>
          <h2>
            goong-map-react makes using Goong GL JS in React applications easy.
          </h2>

          <h3>
            <Icon src="images/icon-react.svg" />
            React Integration
          </h3>
          <p>
          Integration on browser and Node.js, exposing the full power of goong-js.
          </p>

          <h3>
            <Icon src="images/icon-layers.svg" />
            Component Library
          </h3>
          <p>
          goong-map-react comes with additional React components that
          synchronize with the map camera system. Use one of the supported
          overlays to visualize data, or build your own.
          </p>

          <h3>
            <Icon src="images/icon-high-precision.svg" />
            Part of vis.gl's Framework Suite
          </h3>
          <p>
          Use together with e.g. <a
            href="https://deck.gl/"
            target="_blank"
            rel="noopener noreferrer">
            deck.gl</a> to render performant and compelling 2D and 3D
            WebGL visualizations on top of your Goong JS based maps.
          </p>

        </ContentContainer>
      </Home>
    );
  }
}
