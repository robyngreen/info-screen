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
      this.buildWeatherTemps();
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
    },
    buildWeatherTemps: function() {
      // http://api.wunderground.com/api/13d3adca9dd11d63/hourly/q/AR/Conway.json
      // http://api.wunderground.com/api/13d3adca9dd11d63/forecast/q/AR/Conway.json
      // http://api.wunderground.com/api/13d3adca9dd11d63/conditions/q/AR/Conway.json
      var $temps = $('.temps');
      var maxHeight = 75;

      //$.getJSON('http://api.wunderground.com/api/13d3adca9dd11d63/hourly/q/AR/Conway.json', function (data) {
      $.getJSON('/scripts/hourly.json', function (data) {
        //console.dir(data);
        var temps = data.hourly_forecast;
        var min = 500;
        var max = -500;
        //console.dir(temps);
        var i = 0;
        var l = temps.length;
        for (; i < l; i++) {
          //console.log(temps[i]);
          var t = temps[i].temp.english;
          if (t > max) {
            max = t;
          }
          if (t < min) {
            min = t;
          }
        }

        // Loop again.
        i = 0;
        for (; i < l; i++) {
          var newTemp = temps[i].temp.english;
          var thisHeight = Math.round(newTemp / max * maxHeight);
          var time = temps[i].FCTTIME.hour;
          var daytime = 'nighttime';
          if (time >= 6 && time <= 19) {
            daytime = 'daytime';
          }
          if (time > 12) {
            time = time - 12;
          }

          var $tempGraph = $('<div/>')
            .addClass('hourlyGraph')
            .addClass(daytime)
            .css('height', thisHeight + 'px');
          var $temp = $('<div/>')
            .addClass('hourlyTemp')
            .text(newTemp);
          var $time = $('<div/>')
            .addClass('hourlyTime')
            .text(time);
          var $tempContainer = $('<div/>')
            .addClass('tempContainer')
            .append($temp)
            .append($tempGraph)
            .append($time);
          $temps.append($tempContainer);
        }
      });
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
