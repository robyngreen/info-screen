'use strict';

import React from 'react';
import axios from 'axios';
const dev = process.env.NODE_ENV !== 'production';

export default class Weather extends React.Component {
  constructor () {
    super();

    // Bind class to non-react class. See
    // https://github.com/goatslacker/alt/issues/283
    // Otherwise `this.{reactMethod}` will fail.
    this.getWeatherData = this.getWeatherData.bind(this);

    // Set defaults.
    this.state = {
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
      weatherDataURLDev: '/scripts/Conway.json',
      alertDataURL: 'http://api.wunderground.com/api/13d3adca9dd11d63/alerts/q/AR/Conway.json'
    };
  }

  getWeatherData() {
    var self = this;
    this.serverRequest =
      axios.all([
        axios.get(this.state.weatherDataURL)
      ])
      .then(axios.spread(function (weather) {
        const currentConditions = weather.data.forecast.txt_forecast.forecastday[0].fcttext;
        const currentTemp = Math.round(weather.data.current_observation.temp_f);
        const hourlyTemps = weather.data.hourly_forecast;
        const forecast = weather.data.forecast.simpleforecast.forecastday;
        var icon = weather.data.forecast.txt_forecast.forecastday[0].icon;

        // Splice the forecast.
        let splicedForecast = forecast;
        // Remove the first one (today).
        splicedForecast.splice(0, 1);
        // Only show five items.
        splicedForecast.splice(self.state.numForecast);
        let splicedhourlyTemps = hourlyTemps;
        splicedhourlyTemps.splice(30);

        // Find the max temperature.
        let max = Math.max.apply(null,
          Object.keys(splicedhourlyTemps).map(function(e) {
            return splicedhourlyTemps[e].temp.english;
        }));

        self.setState({
          currentConditions: currentConditions,
          currentTemp: currentTemp,
          hourlyTemps: splicedhourlyTemps,
          icon: icon,
          max: max,
          forecast: forecast,
          splicedForecast: splicedForecast
        });
      }));
  }

  /**
   * Precall before render.
   */
  componentWillMount() {
    this.getWeatherData();
  }

  /**
   * Removes items when unmounted.
   */
  componentWillUnmount() {
    this.serverRequest.abort();
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
      setInterval(this.getWeatherData, refreshTime);
    }
  }

  /**
   * Called whenever the dom is updated.
   */
  componentDidUpdate() {
    var skycons = new Skycons({'color': 'white'});
    var icon = this.convertIcon(this.state.icon, true);
    skycons.set('weather-icon', icon);

    for (var forecast of this.state.splicedForecast) {
      var icon = this.convertIcon(forecast.icon, false);

      skycons.set('weather-icon-' + forecast.date.epoch, icon);
    }
   skycons.play();
  }

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
  convertIcon(icon, daytime) {
    // The skycons list.
    const list = [
      "clear-day", "clear-night", "partly-cloudy-day",
      "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
      "fog"
    ];
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
    else if (icon === 'tstorms') {
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
  }

  /**
   * Renders markup
   * @return string Any html
   */
  render() {
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
              const tempHeight = Math.round(newTemp / max * maxHeight);
              // Set the percipitation chance to be the % of the height.
              const precipChance = Math.round(temp.pop / 100 * maxHeight);
              const containerHeight = (precipChance > tempHeight) ? precipChance : tempHeight;

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
                  <div className="hourlyContainer" style={{height: containerHeight + 'px'}}>
                    <div className={"hourlyGraph " + daytime} style={{height: tempHeight + 'px'}}></div>
                    <div className="hourlyGraphPop" style={{height: precipChance + 'px'}}></div>
                  </div>
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
        <style jsx>{`

          .weather {
            font-family: 'SST-light';
            color: #fff;
            text-shadow: 1px 1px rgba(0, 0, 0, 0.25); }
            .weather .wrapper {
              margin-top: 15px; }

          .location {
            font-family: 'SST-condensed';
            font-size: 3rem;
            border-bottom: 1px solid #fff;
            padding-bottom: 3px; }

          .current-temp {
            font-size: 10rem;
            float: left;
            width: 25%;
            margin-top: -40px;
            text-align: right; }

          .current-weather {
            float: left;
            width: 25%; }
            .current-weather canvas {
              width: 175px; }

          .current-conditions {
            float: left;
            width: 50%;
            font-family: 'SST-condensed';
            font-size: 2.5em; }

          .tempsForecastWrapper {
            display: flex;
            clear: both;
            flex-direction: row;
            align-items: flex-start;
            margin-top: 135px; }

          .temps {
            width: 75%;
            display: flex;
            font-family: 'SST-condensed'; }

          .tempContainer {
            width: 12px;
            margin-right: 10px;
            align-self: flex-end; }

          .hourlyContainer {
            display: flex; }

          .hourlyGraph {
            background: white;
            width: 12px;
            align-self: flex-end;
            margin-right: 2px; }

          .hourlyGraphPop {
            background: rgba(218, 228, 230, .88);
            width: 5px;
            align-self: flex-end;
            position: absolute;
            margin-left: 8px;
            border-left: 1px solid rgba(255, 255, 255, .5); }

          .hourlyTime {
            text-align: center; }

          .daytime {
            background: rgba(244, 247, 45, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.5); }

          .nighttime {
            background: rgba(0, 100, 255, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.5); }

          .forecast {
            width: 25%;
            margin-top: -2.5em; }

          .forecastDay {
            font-family: 'SST-condensed';
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            margin-bottom: 10px; }

          .forecastHiLo-Hi {
            margin-right: 10px;
            background: rgba(244, 247, 45, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.5);
            height: 10px; }

          .forecastDOW {
            font-size: 2em;
            text-align: center;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.75); }

          .forecastHiLo-Lo {
            background: rgba(0, 100, 255, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.5);
            height: 10px;
            margin-right: 10px; }

          .forecastCondition {
            text-align: center; }
            .forecastCondition canvas {
              width: 75px; }

          .hiLo {
            font-size: 1.25em; }

          .hiLo-hi {
            color: #e4c21a;
            font-size: 1.5em; }

          .hiLo-lo {
            color: rgba(85, 151, 255, 0.76);
            font-size: 1.25em; }

        `}</style>
      </div>
    );
  }
}
