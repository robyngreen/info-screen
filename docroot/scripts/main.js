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
     * Constructor
     * @return {null} Returns nothing.
     */
    init: function() {
      this.initSkyIcons();
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

  // Initialize Javascript.
  greenHome.init();

})(jQuery);

// @todo: How can we do this async?
/**
 * Traffic map non-async
 * @return {null} Returns nothing.
 */
function initTrafficMap() {
  var map = new google.maps.Map(document.getElementById('trafficMap'), {
    zoom: 9,
    center: {lat: 34.8415512, lng: -92.3331572}
  });

  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
}
