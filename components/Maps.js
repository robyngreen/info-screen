'use strict';

import React from "react";
import GoogleMap from 'google-map-react';
const dev = process.env.NODE_ENV !== 'prod';

export default class Maps extends React.Component {
  constructor() {
    super();

    // Set defaults.
    this.state = {
      center: {lat: 34.8915512, lng: -92.3031572},
      zoom: 10,
      radar: 'http://api.wunderground.com/api/13d3adca9dd11d63/animatedradar/q/AR/Conway.png?width=500&height=400&newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50&smooth=1&noclutter=1&rainsnow=1'
    };
  }

  /**
   * Called whenever the component is mounted.
   */
  componentDidMount() {
    const self = this;
    // Only refresh on prod.
    if (!dev) {
      // In milliseconds, so * 1000 to end.
      // 60 minutes * 60 seconds * 1000 milliseconds.
      var refreshTime = 15 * 60 * 1000;
      window.setInterval(function () {
        self.setState({
          radar: self.state.radar,
        });
      }.bind(this), refreshTime);
    }
  }

  render() {
    let radarIMG = React.createElement(
      'img',
      { src: this.state.radar }
    );
    return (
     <div className="map-wrapper">
        <div className="weather-map map">
          { radarIMG }
        </div>

        <div className="traffic-map map">
          <GoogleMap
            bootstrapURLKeys={{ key: "AIzaSyDOzStmGXlCBYxgCKLPruGgqQGGxIfnIaI" }}
            className="traffic-map map"
            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
            layerTypes={['TrafficLayer']}>
          </GoogleMap>
        </div>
        <style jsx>{`
          .map-wrapper {
            display: flex;
            justify-content: center;
            position: absolute;
            bottom: 25px; }

          .map {
            width: 500px;
            border: 1px solid white;
            height: 400px;
            margin: 0 20px; }
        `}</style>
      </div>
    );
  }
}
