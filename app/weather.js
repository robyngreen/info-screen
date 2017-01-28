'use strict';

import React from 'react';
import axios from 'axios';

export default React.createClass({
  /**
   * Sets up our variables.
   * @return null nothing.
   */
  getInitialState: function() {
    return {
      currentTemp: '',
      currentConditions: '',
      hourlyTemps: [],
      max: 500,
      min: -500,
      maxHeight: 75
    }
  },
  getWeatherData: function() {
    var self = this;
    this.serverRequest =
      axios.all([
        axios.get('http://api.wunderground.com/api/13d3adca9dd11d63/forecast/q/AR/Conway.json'),
        axios.get('http://api.wunderground.com/api/13d3adca9dd11d63/conditions/q/AR/Conway.json'),
        axios.get('http://api.wunderground.com/api/13d3adca9dd11d63/hourly/q/AR/Conway.json')
      ])
      .then(axios.spread(function (forecast, conditions, hourly) {
        self.setState({
          currentConditions: forecast.data.forecast.txt_forecast.forecastday[0].fcttext
        });
        self.setState({
          currentTemp: Math.round(conditions.data.current_observation.temp_f)
        });
        self.setState({
          hourlyTemps: hourly.data.hourly_forecast
        });
        var max = Math.max.apply(null,
          Object.keys(hourly.data.hourly_forecast).map(function(e) {
            return hourly.data.hourly_forecast[e].temp.english;
        }));
        self.setState({
          max: max
        });
      }));
  },
  /**
   * Precall before render.
   */
  componentWillMount: function() {
    this.getWeatherData();
  },
  /**
   * Called whenever the component is mounted.
   */
  componentDidMount: function() {
    // Refresh weather data every 10 minutes
    window.setInterval(function () {
      this.getWeatherData();
    }.bind(this), 600000);
  },
  /**
   * Removes items when unmounted.
   */
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  /**
   * Renders markup
   * @return string Any html
   */
  render: function() {

    const max = this.state.max;
    const maxHeight = this.state.maxHeight;

    return (
      <div className="weather">
        <div className="location">Conway</div>
        <div className="wrapper">
          <div className="current-temp">{ this.state.currentTemp }&deg;</div>
          <div className="current-weather">
            <canvas id="weather-icon"></canvas>
          </div>
          <div className="current-conditions">
            <p>{ this.state.currentConditions }</p>
          </div>
        </div>

        <div className="temps">
          { this.state.hourlyTemps.map(function(temp) {
            const newTemp = temp.temp.english;
            const thisHeight = Math.round(newTemp / max * maxHeight);

            var time = temp.FCTTIME.hour;
            var daytime = 'nighttime';
            if (time >= 6 && time <= 19) {
              daytime = 'daytime';
            }
            if (time > 12) {
              time = time - 12;
            }
            return (
              <div key={ temp.FCTTIME.epoch } className="tempContainer">
                <div className="hourlyTemp"> { newTemp } </div>
                <div className={"hourlyGraph " + daytime} style={{height: thisHeight + 'px'}}></div>
                <div className="hourlyTime"> { time } </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
});
