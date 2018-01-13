'use strict';

import React from "react";
import GoogleMap from 'google-map-react';

export default class Maps extends React.Component {
  constructor() {
    super();

    // Set defaults.
    this.state = {
      center: {lat: 34.8915512, lng: -92.3031572},
      zoom: 9,
      radar: 'http://api.wunderground.com/api/13d3adca9dd11d63/animatedradar/q/AR/Conway.png?width=500&height=250&newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50&smooth=1&noclutter=1&rainsnow=1'
    };
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
            height: 250px;
            margin: 0 20px; }
        `}</style>
      </div>
    );
  }
}
