/**
 * @file
 */
/* globals Skycons google */

!(function ($) {
  'use strict';

  /**
   * Base site JS object.
   * @type {Object}
   */
  var greenHome = {
    /**
     * Constructor.
     */
    init: function() {
      this.initSkyIcons();
    },
    initTraffic: function() {
      var map = new google.maps.Map(document.getElementById('trafficMap'), {
        zoom: 13,
        center: {lat: 34.04924594193164, lng: -118.24104309082031}
      });

      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
    },
    initSkyIcons: function() {
      var skycons = new Skycons({'color': 'white'});
      // on Android, a nasty hack is needed: {"resizeClear": true}

      // you can add a canvas by it's ID...
      skycons.set('weather-icon', 'rain');

      /*list  = [
            "clear-day", "clear-night", "partly-cloudy-day",
            "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
            "fog"
          ],*/

      skycons.play();
    }
  };

  // Initialize Javascript
  greenHome.init();

})(jQuery);
