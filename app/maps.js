'use strict';

import React from "react";
import GoogleMap from 'google-map-react';

var radarSRC = 'http://api.wunderground.com/api/13d3adca9dd11d63/animatedradar/q/AR/Conway.png?width=500&height=250&newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50&smooth=1&noclutter=1&rainsnow=1';

// http://api.wunderground.com/api/13d3adca9dd11d63/animatedradar/animatedsatellite/image.gif?num=5&delay=50&rad.maxlat=47.709&rad.maxlon=-69.263&rad.minlat=31.596&rad.minlon=-97.388&rad.width=640&rad.height=480&rad.rainsnow=1&rad.reproj.automerc=1&rad.num=5&sat.maxlat=47.709&sat.maxlon=-69.263&sat.minlat=34.8415512&sat.minlon=-92.3331572&sat.width=500&sat.height=250&sat.key=sat_ir4_bottom&sat.gtt=107&sat.proj=me&sat.timelabel=0&sat.num=5
//
// lat: 34.8415512, lng: -92.3331572

export default React.createClass({
   /**
   * Sets up our variables.
   */
  getInitialState: function() {
    return {
      center: {lat: 34.8915512, lng: -92.3031572},
      zoom: 9
    }
  },
  render: function() {
    var radarIMG = React.createElement(
      'img',
      { src: radarSRC }
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
      </div>
    );
  }
});
