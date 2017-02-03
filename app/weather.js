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
      forecast: [],
      hourlyTemps: [],
      max: 500,
      min: -500,
      maxHeight: 75,
      numForecast: 3,
      splicedForecast: [],
      weatherDataURL: 'http://api.wunderground.com/api/13d3adca9dd11d63/hourly/conditions/forecast10day/q/AR/Conway.json',
      weatherDataURLDev: '/scripts/Conway.json'
    }
  },
  getWeatherData: function() {
    var self = this;
    this.serverRequest =
      axios.all([
        axios.get(this.state.weatherDataURLDev)
      ])
      .then(axios.spread(function (weather) {
        const currentConditions = weather.data.forecast.txt_forecast.forecastday[0].fcttext;
        const currentTemp = Math.round(weather.data.current_observation.temp_f);
        const hourlyTemps = weather.data.hourly_forecast;
        const forecast = weather.data.forecast.simpleforecast.forecastday;
        var icon = weather.data.forecast.txt_forecast.forecastday[0].icon;

        // Splice the forecast.
        var splicedForecast = forecast;
        // Remove the first one (today).
        splicedForecast.splice(0, 1);
        // Only show five items.
        splicedForecast.splice(self.state.numForecast);

        // Find the max temperature.
        var max = Math.max.apply(null,
          Object.keys(weather.data.hourly_forecast).map(function(e) {
            return weather.data.hourly_forecast[e].temp.english;
        }));

        self.setState({
          currentConditions: currentConditions,
          currentTemp: currentTemp,
          hourlyTemps: hourlyTemps,
          icon: icon,
          max: max,
          forecast: forecast,
          splicedForecast: splicedForecast
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
   * Removes items when unmounted.
   */
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  /**
   * Called whenever the component is mounted.
   */
  componentDidMount: function() {
    // Refresh weather data every 10 minutes
    /*window.setInterval(function () {
      this.getWeatherData();
    }.bind(this), 600000);*/
  },
  /**
   * Called whenever the dom is updated.
   */
  componentDidUpdate: function() {
    // The skycons list.
    const list = [
      "clear-day", "clear-night", "partly-cloudy-day",
      "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
      "fog"
    ];

    var skycons = new Skycons({'color': 'white'});
    var icon = this.convertIcon(this.state.icon, true);
    skycons.set('weather-icon', icon);

    for (var forecast of this.state.splicedForecast) {
      var icon = this.convertIcon(forecast.icon, false);

      skycons.set('weather-icon-' + forecast.date.epoch, icon);
    }
   skycons.play();
  },
  /**
   * Converts WUnderground icons to skycons.
   * @param  {string} original
   *   Icon string to convert.
   * @param  {bool} daytime
   *   Should use daytime vs nighttime conversion.
   *
   * @return {string}
   *   Converted icon string.
   */
  convertIcon: function(icon, daytime) {
    console.info(icon);
    if (icon === 'clear') {
      icon = 'clear-day';
    }
    else if (icon === 'partlycloudy') {
      icon = 'partly-cloudy-day';
    }
    else if (icon === 'chancerain') {
      icon = 'rain';
    }
    else if (icon === 'mostlycloudy') {
      icon = 'cloudy';
    }
    else if (icon === 'chancetstorms') {
      icon = 'rain';
    }

    // Convert for daytime vs nighttime.
    if (daytime === true) {
      var currentdate = new Date();
      var hours = currentdate.getHours();
      if (hours >= 6 && hours <= 19) {
        if (icon === 'partlycloudy') {
          icon = 'partly-cloudy-day';
        }
      }
      else {
        if (icon === 'nt_clear' || icon === 'clear-day') {
          icon = 'clear-night';
        }
        else if (icon === 'partlycloudy') {
          icon = 'partly-cloudy-night';
        }
      }
    }

    return icon;
  },
  /**
   * Renders markup
   * @return string Any html
   */
  render: function() {
    const max = this.state.max;
    const maxHeight = this.state.maxHeight;
    var count = 0;

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

        <div className="tempsForecastWrapper">
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
              )
            })}
          </div>

          <div className="forecast">
            { this.state.splicedForecast.map(function(forecast) {
                const hiWidth = Math.round(forecast.high.fahrenheit / 125 * 225);
                const loWidth = Math.round(forecast.low.fahrenheit / 125 * 225);
                return(
                  <div key={ forecast.date.epoch } className="forecastDay">
                    <div className="forecastDOW">{ forecast.date.weekday }</div>
                    <div className="forecastCondition"><canvas id={ "weather-icon-" + forecast.date.epoch }></canvas></div>
                    <div className="hiLo"><span className="hiLo-hi">{ forecast.high.fahrenheit }</span> / <span className="hiLo-lo">{ forecast.low.fahrenheit }</span></div>

                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }
});
