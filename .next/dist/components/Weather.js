'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _style = require('styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/robyngreen/Sites/info-screen/components/Weather.js';

var dev = process.env.NODE_ENV !== 'production';

var Weather = function (_React$Component) {
  (0, _inherits3.default)(Weather, _React$Component);

  function Weather() {
    (0, _classCallCheck3.default)(this, Weather);

    // Bind class to non-react class. See
    // https://github.com/goatslacker/alt/issues/283
    // Otherwise `this.{reactMethod}` will fail.
    var _this = (0, _possibleConstructorReturn3.default)(this, (Weather.__proto__ || (0, _getPrototypeOf2.default)(Weather)).call(this));

    _this.getWeatherData = _this.getWeatherData.bind(_this);

    // Set defaults.
    _this.state = {
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
    return _this;
  }

  (0, _createClass3.default)(Weather, [{
    key: 'getWeatherData',
    value: function getWeatherData() {
      var self = this;
      this.serverRequest = _axios2.default.all([_axios2.default.get(this.state.weatherDataURL)]).then(_axios2.default.spread(function (weather) {
        var currentConditions = weather.data.forecast.txt_forecast.forecastday[0].fcttext;
        var currentTemp = Math.round(weather.data.current_observation.temp_f);
        var hourlyTemps = weather.data.hourly_forecast;
        var forecast = weather.data.forecast.simpleforecast.forecastday;
        var icon = weather.data.forecast.txt_forecast.forecastday[0].icon;

        // Splice the forecast.
        var splicedForecast = forecast;
        // Remove the first one (today).
        splicedForecast.splice(0, 1);
        // Only show five items.
        splicedForecast.splice(self.state.numForecast);
        var splicedhourlyTemps = hourlyTemps;
        splicedhourlyTemps.splice(30);

        // Find the max temperature.
        var max = Math.max.apply(null, (0, _keys2.default)(splicedhourlyTemps).map(function (e) {
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

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getWeatherData();
    }

    /**
     * Removes items when unmounted.
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.serverRequest.abort();
    }

    /**
     * Called whenever the component is mounted.
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
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

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var skycons = new Skycons({ 'color': 'white' });
      var icon = this.convertIcon(this.state.icon, true);
      skycons.set('weather-icon', icon);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this.state.splicedForecast), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var forecast = _step.value;

          var icon = this.convertIcon(forecast.icon, false);

          skycons.set('weather-icon-' + forecast.date.epoch, icon);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
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

  }, {
    key: 'convertIcon',
    value: function convertIcon(icon, daytime) {
      // The skycons list.
      var list = ["clear-day", "clear-night", "partly-cloudy-day", "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind", "fog"];
      if (icon === 'clear') {
        icon = 'clear-day';
      } else if (icon === 'partlycloudy') {
        icon = 'partly-cloudy-day';
      } else if (icon === 'chancerain') {
        icon = 'rain';
      } else if (icon === 'mostlycloudy') {
        icon = 'cloudy';
      } else if (icon === 'chancetstorms') {
        icon = 'rain';
      } else if (icon === 'tstorms') {
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
        } else {
          if (icon === 'nt_clear' || icon === 'clear-day') {
            icon = 'clear-night';
          } else if (icon === 'partlycloudy') {
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

  }, {
    key: 'render',
    value: function render() {
      var max = this.state.max;
      var maxHeight = this.state.maxHeight;
      var count = 0;

      return _react2.default.createElement('div', {
        className: 'jsx-1845596943' + ' ' + 'weather',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 185
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-1845596943' + ' ' + 'location',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 186
        }
      }, 'Conway'), _react2.default.createElement('div', {
        className: 'jsx-1845596943' + ' ' + 'wrapper',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 187
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-1845596943' + ' ' + 'current-temp',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 188
        }
      }, this.state.currentTemp, '\xB0'), _react2.default.createElement('div', {
        className: 'jsx-1845596943' + ' ' + 'current-weather',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 189
        }
      }, _react2.default.createElement('canvas', { id: 'weather-icon', className: 'jsx-1845596943',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 190
        }
      })), _react2.default.createElement('div', {
        className: 'jsx-1845596943' + ' ' + 'current-conditions',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 192
        }
      }, _react2.default.createElement('p', {
        className: 'jsx-1845596943',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 193
        }
      }, this.state.currentConditions))), _react2.default.createElement('div', {
        className: 'jsx-1845596943' + ' ' + 'tempsForecastWrapper',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 197
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-1845596943' + ' ' + 'temps',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 198
        }
      }, this.state.hourlyTemps.map(function (temp) {
        var newTemp = temp.temp.english;
        var tempHeight = Math.round(newTemp / max * maxHeight);
        // Set the percipitation chance to be the % of the height.
        var precipChance = Math.round(temp.pop / 100 * maxHeight);
        var containerHeight = precipChance > tempHeight ? precipChance : tempHeight;

        var time = temp.FCTTIME.hour;
        var daytime = 'nighttime';
        if (time >= 6 && time <= 19) {
          daytime = 'daytime';
        }
        if (time > 12) {
          time = time - 12;
        }
        return _react2.default.createElement('div', { key: temp.FCTTIME.epoch, className: 'jsx-1845596943' + ' ' + 'tempContainer',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 215
          }
        }, _react2.default.createElement('div', {
          className: 'jsx-1845596943' + ' ' + 'hourlyTemp',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 216
          }
        }, ' ', newTemp, ' '), _react2.default.createElement('div', { style: { height: containerHeight + 'px' }, className: 'jsx-1845596943' + ' ' + 'hourlyContainer',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 217
          }
        }, _react2.default.createElement('div', { style: { height: tempHeight + 'px' }, className: 'jsx-1845596943' + ' ' + ("hourlyGraph " + daytime || ''),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 218
          }
        }), _react2.default.createElement('div', { style: { height: precipChance + 'px' }, className: 'jsx-1845596943' + ' ' + 'hourlyGraphPop',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 219
          }
        })), _react2.default.createElement('div', {
          className: 'jsx-1845596943' + ' ' + 'hourlyTime',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 221
          }
        }, ' ', time, ' '));
      })), _react2.default.createElement('div', {
        className: 'jsx-1845596943' + ' ' + 'forecast',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 227
        }
      }, this.state.splicedForecast.map(function (forecast) {
        var hiWidth = Math.round(forecast.high.fahrenheit / 125 * 225);
        var loWidth = Math.round(forecast.low.fahrenheit / 125 * 225);
        return _react2.default.createElement('div', { key: forecast.date.epoch, className: 'jsx-1845596943' + ' ' + 'forecastDay',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 232
          }
        }, _react2.default.createElement('div', {
          className: 'jsx-1845596943' + ' ' + 'forecastDOW',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 233
          }
        }, forecast.date.weekday), _react2.default.createElement('div', {
          className: 'jsx-1845596943' + ' ' + 'forecastCondition',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 234
          }
        }, _react2.default.createElement('canvas', { id: "weather-icon-" + forecast.date.epoch, className: 'jsx-1845596943',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 234
          }
        })), _react2.default.createElement('div', {
          className: 'jsx-1845596943' + ' ' + 'hiLo',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 235
          }
        }, _react2.default.createElement('span', {
          className: 'jsx-1845596943' + ' ' + 'hiLo-hi',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 235
          }
        }, forecast.high.fahrenheit), ' / ', _react2.default.createElement('span', {
          className: 'jsx-1845596943' + ' ' + 'hiLo-lo',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 235
          }
        }, forecast.low.fahrenheit)));
      }))), _react2.default.createElement(_style2.default, {
        styleId: '1845596943',
        css: '.weather.jsx-1845596943{font-family:\'SST-light\';color:#fff;text-shadow:1px 1px rgba(0,0,0,0.25);}.weather.jsx-1845596943 .wrapper.jsx-1845596943{margin-top:15px;}.location.jsx-1845596943{font-family:\'SST-condensed\';font-size:3rem;border-bottom:1px solid #fff;padding-bottom:3px;}.current-temp.jsx-1845596943{font-size:10rem;float:left;width:25%;margin-top:-40px;text-align:right;}.current-weather.jsx-1845596943{float:left;width:25%;}.current-weather.jsx-1845596943 canvas.jsx-1845596943{width:175px;}.current-conditions.jsx-1845596943{float:left;width:50%;font-family:\'SST-condensed\';font-size:2.5em;}.tempsForecastWrapper.jsx-1845596943{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;clear:both;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;margin-top:135px;}.temps.jsx-1845596943{width:75%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;font-family:\'SST-condensed\';}.tempContainer.jsx-1845596943{width:12px;margin-right:10px;-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end;}.hourlyContainer.jsx-1845596943{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}.hourlyGraph.jsx-1845596943{background:white;width:12px;-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end;margin-right:2px;}.hourlyGraphPop.jsx-1845596943{background:rgba(218,228,230,.88);width:5px;-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end;position:absolute;margin-left:8px;border-left:1px solid rgba(255,255,255,.5);}.hourlyTime.jsx-1845596943{text-align:center;}.daytime.jsx-1845596943{background:rgba(244,247,45,0.5);border:1px solid rgba(255,255,255,0.5);}.nighttime.jsx-1845596943{background:rgba(0,100,255,0.5);border:1px solid rgba(255,255,255,0.5);}.forecast.jsx-1845596943{width:25%;margin-top:-2.5em;}.forecastDay.jsx-1845596943{font-family:\'SST-condensed\';display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;margin-bottom:10px;}.forecastHiLo-Hi.jsx-1845596943{margin-right:10px;background:rgba(244,247,45,0.5);border:1px solid rgba(255,255,255,0.5);height:10px;}.forecastDOW.jsx-1845596943{font-size:2em;text-align:center;text-shadow:1px 1px 2px rgba(0,0,0,0.75);}.forecastHiLo-Lo.jsx-1845596943{background:rgba(0,100,255,0.5);border:1px solid rgba(255,255,255,0.5);height:10px;margin-right:10px;}.forecastCondition.jsx-1845596943{text-align:center;}.forecastCondition.jsx-1845596943 canvas.jsx-1845596943{width:75px;}.hiLo.jsx-1845596943{font-size:1.25em;}.hiLo-hi.jsx-1845596943{color:#e4c21a;font-size:1.5em;}.hiLo-lo.jsx-1845596943{color:rgba(85,151,255,0.76);font-size:1.25em;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvV2VhdGhlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrUG9CLEFBSXFDLEFBSU4sQUFHVSxBQU1aLEFBT0wsQUFHRyxBQUdILEFBTUUsQUFPSCxBQUtDLEFBS0UsQUFHSSxBQU1tQixBQVFsQixBQUdpQixBQUlELEFBSXhCLEFBSWtCLEFBT1YsQUFNSixBQUtvQixBQU1oQixBQUVMLEFBR0ksQUFHSCxBQUlpQixVQTdFbEIsQUFzQ0ssQ0F6RFIsQUFNQSxBQWtCUSxBQThESixDQXBGQyxFQXdFRyxBQW1CRixFQTlHRyxBQVVSLENBdUNBLEFBeURPLENBNUNDLEFBdUJnQixBQWdCaEIsR0FwRlIsQUFPaUIsR0EzQmpCLEdBY0QsQ0FQSyxBQThDSyxBQXdCRCxBQUlOLEFBb0NJLENBeEVHLENBb0VILENBeEN5QixBQTBCQSxDQTlCQSxBQTBCRSxDQXJDbEMsRUF6RDhCLEVBY3ZCLE1BUFksQUFtRFQsRUEwREYsSUF6RkYsQ0E2RDBCLElBekV6QixXQVlBLEtBNkMwQixBQTJCL0IsQ0FwRk0sQUFxRHlCLENBcEVGLEFBUXRCLENBc0YwQixDQS9EbEMsQUFnQkcsUUFxREksRUE3RFUsQ0FQVCxJQXlEUCxFQWpGUSxTQTZDSCxBQStDRSxDQXhERSxBQTZDUixDQVJNLFVBMUNVLEdBb0JYLEVBTkEsZ0JBT0YsZ0JBQzhCLEtBNUJ2QixpQkFpREUscUJBckJzQix1RUEzQjlCLEtBaURFLFlBakRELE9BaURFIiwiZmlsZSI6ImNvbXBvbmVudHMvV2VhdGhlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9ieW5ncmVlbi9TaXRlcy9pbmZvLXNjcmVlbiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5jb25zdCBkZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWF0aGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyBCaW5kIGNsYXNzIHRvIG5vbi1yZWFjdCBjbGFzcy4gU2VlXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2dvYXRzbGFja2VyL2FsdC9pc3N1ZXMvMjgzXG4gICAgLy8gT3RoZXJ3aXNlIGB0aGlzLntyZWFjdE1ldGhvZH1gIHdpbGwgZmFpbC5cbiAgICB0aGlzLmdldFdlYXRoZXJEYXRhID0gdGhpcy5nZXRXZWF0aGVyRGF0YS5iaW5kKHRoaXMpO1xuXG4gICAgLy8gU2V0IGRlZmF1bHRzLlxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjdXJyZW50VGVtcDogJycsXG4gICAgICBjdXJyZW50Q29uZGl0aW9uczogJycsXG4gICAgICBmb3JlY2FzdDogW10sXG4gICAgICBob3VybHlUZW1wczogW10sXG4gICAgICBtYXg6IDUwMCxcbiAgICAgIG1pbjogLTUwMCxcbiAgICAgIG1heEhlaWdodDogNzUsXG4gICAgICBudW1Gb3JlY2FzdDogMyxcbiAgICAgIHNwbGljZWRGb3JlY2FzdDogW10sXG4gICAgICB3ZWF0aGVyRGF0YVVSTDogJ2h0dHA6Ly9hcGkud3VuZGVyZ3JvdW5kLmNvbS9hcGkvMTNkM2FkY2E5ZGQxMWQ2My9ob3VybHkvY29uZGl0aW9ucy9mb3JlY2FzdDEwZGF5L3EvQVIvQ29ud2F5Lmpzb24nLFxuICAgICAgd2VhdGhlckRhdGFVUkxEZXY6ICcvc2NyaXB0cy9Db253YXkuanNvbicsXG4gICAgICBhbGVydERhdGFVUkw6ICdodHRwOi8vYXBpLnd1bmRlcmdyb3VuZC5jb20vYXBpLzEzZDNhZGNhOWRkMTFkNjMvYWxlcnRzL3EvQVIvQ29ud2F5Lmpzb24nXG4gICAgfTtcbiAgfVxuXG4gIGdldFdlYXRoZXJEYXRhKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLnNlcnZlclJlcXVlc3QgPVxuICAgICAgYXhpb3MuYWxsKFtcbiAgICAgICAgYXhpb3MuZ2V0KHRoaXMuc3RhdGUud2VhdGhlckRhdGFVUkwpXG4gICAgICBdKVxuICAgICAgLnRoZW4oYXhpb3Muc3ByZWFkKGZ1bmN0aW9uICh3ZWF0aGVyKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb25kaXRpb25zID0gd2VhdGhlci5kYXRhLmZvcmVjYXN0LnR4dF9mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5mY3R0ZXh0O1xuICAgICAgICBjb25zdCBjdXJyZW50VGVtcCA9IE1hdGgucm91bmQod2VhdGhlci5kYXRhLmN1cnJlbnRfb2JzZXJ2YXRpb24udGVtcF9mKTtcbiAgICAgICAgY29uc3QgaG91cmx5VGVtcHMgPSB3ZWF0aGVyLmRhdGEuaG91cmx5X2ZvcmVjYXN0O1xuICAgICAgICBjb25zdCBmb3JlY2FzdCA9IHdlYXRoZXIuZGF0YS5mb3JlY2FzdC5zaW1wbGVmb3JlY2FzdC5mb3JlY2FzdGRheTtcbiAgICAgICAgdmFyIGljb24gPSB3ZWF0aGVyLmRhdGEuZm9yZWNhc3QudHh0X2ZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmljb247XG5cbiAgICAgICAgLy8gU3BsaWNlIHRoZSBmb3JlY2FzdC5cbiAgICAgICAgbGV0IHNwbGljZWRGb3JlY2FzdCA9IGZvcmVjYXN0O1xuICAgICAgICAvLyBSZW1vdmUgdGhlIGZpcnN0IG9uZSAodG9kYXkpLlxuICAgICAgICBzcGxpY2VkRm9yZWNhc3Quc3BsaWNlKDAsIDEpO1xuICAgICAgICAvLyBPbmx5IHNob3cgZml2ZSBpdGVtcy5cbiAgICAgICAgc3BsaWNlZEZvcmVjYXN0LnNwbGljZShzZWxmLnN0YXRlLm51bUZvcmVjYXN0KTtcbiAgICAgICAgbGV0IHNwbGljZWRob3VybHlUZW1wcyA9IGhvdXJseVRlbXBzO1xuICAgICAgICBzcGxpY2VkaG91cmx5VGVtcHMuc3BsaWNlKDMwKTtcblxuICAgICAgICAvLyBGaW5kIHRoZSBtYXggdGVtcGVyYXR1cmUuXG4gICAgICAgIGxldCBtYXggPSBNYXRoLm1heC5hcHBseShudWxsLFxuICAgICAgICAgIE9iamVjdC5rZXlzKHNwbGljZWRob3VybHlUZW1wcykubWFwKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBzcGxpY2VkaG91cmx5VGVtcHNbZV0udGVtcC5lbmdsaXNoO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgc2VsZi5zZXRTdGF0ZSh7XG4gICAgICAgICAgY3VycmVudENvbmRpdGlvbnM6IGN1cnJlbnRDb25kaXRpb25zLFxuICAgICAgICAgIGN1cnJlbnRUZW1wOiBjdXJyZW50VGVtcCxcbiAgICAgICAgICBob3VybHlUZW1wczogc3BsaWNlZGhvdXJseVRlbXBzLFxuICAgICAgICAgIGljb246IGljb24sXG4gICAgICAgICAgbWF4OiBtYXgsXG4gICAgICAgICAgZm9yZWNhc3Q6IGZvcmVjYXN0LFxuICAgICAgICAgIHNwbGljZWRGb3JlY2FzdDogc3BsaWNlZEZvcmVjYXN0XG4gICAgICAgIH0pO1xuICAgICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZWNhbGwgYmVmb3JlIHJlbmRlci5cbiAgICovXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLmdldFdlYXRoZXJEYXRhKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBpdGVtcyB3aGVuIHVubW91bnRlZC5cbiAgICovXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuc2VydmVyUmVxdWVzdC5hYm9ydCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuZXZlciB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqL1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAvLyBPbmx5IHJlZnJlc2ggb24gcHJvZC5cbiAgICBpZiAoIWRldikge1xuICAgICAgLy8gSW4gbWlsbGlzZWNvbmRzLCBzbyAqIDEwMDAgdG8gZW5kLlxuICAgICAgLy8gNjAgbWludXRlcyAqIDYwIHNlY29uZHMgKiAxMDAwIG1pbGxpc2Vjb25kcy5cbiAgICAgIHZhciByZWZyZXNoVGltZSA9IDE1ICogNjAgKiAxMDAwO1xuICAgICAgc2V0SW50ZXJ2YWwodGhpcy5nZXRXZWF0aGVyRGF0YSwgcmVmcmVzaFRpbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbmV2ZXIgdGhlIGRvbSBpcyB1cGRhdGVkLlxuICAgKi9cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHZhciBza3ljb25zID0gbmV3IFNreWNvbnMoeydjb2xvcic6ICd3aGl0ZSd9KTtcbiAgICB2YXIgaWNvbiA9IHRoaXMuY29udmVydEljb24odGhpcy5zdGF0ZS5pY29uLCB0cnVlKTtcbiAgICBza3ljb25zLnNldCgnd2VhdGhlci1pY29uJywgaWNvbik7XG5cbiAgICBmb3IgKHZhciBmb3JlY2FzdCBvZiB0aGlzLnN0YXRlLnNwbGljZWRGb3JlY2FzdCkge1xuICAgICAgdmFyIGljb24gPSB0aGlzLmNvbnZlcnRJY29uKGZvcmVjYXN0Lmljb24sIGZhbHNlKTtcblxuICAgICAgc2t5Y29ucy5zZXQoJ3dlYXRoZXItaWNvbi0nICsgZm9yZWNhc3QuZGF0ZS5lcG9jaCwgaWNvbik7XG4gICAgfVxuICAgc2t5Y29ucy5wbGF5KCk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgV1VuZGVyZ3JvdW5kIGljb25zIHRvIHNreWNvbnMuXG4gICAqIEBwYXJhbSAge3N0cmluZ30gb3JpZ2luYWxcbiAgICogICBJY29uIHN0cmluZyB0byBjb252ZXJ0LlxuICAgKiBAcGFyYW0gIHtib29sfSBkYXl0aW1lXG4gICAqICAgU2hvdWxkIHVzZSBkYXl0aW1lIHZzIG5pZ2h0dGltZSBjb252ZXJzaW9uLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqICAgQ29udmVydGVkIGljb24gc3RyaW5nLlxuICAgKi9cbiAgY29udmVydEljb24oaWNvbiwgZGF5dGltZSkge1xuICAgIC8vIFRoZSBza3ljb25zIGxpc3QuXG4gICAgY29uc3QgbGlzdCA9IFtcbiAgICAgIFwiY2xlYXItZGF5XCIsIFwiY2xlYXItbmlnaHRcIiwgXCJwYXJ0bHktY2xvdWR5LWRheVwiLFxuICAgICAgXCJwYXJ0bHktY2xvdWR5LW5pZ2h0XCIsIFwiY2xvdWR5XCIsIFwicmFpblwiLCBcInNsZWV0XCIsIFwic25vd1wiLCBcIndpbmRcIixcbiAgICAgIFwiZm9nXCJcbiAgICBdO1xuICAgIGlmIChpY29uID09PSAnY2xlYXInKSB7XG4gICAgICBpY29uID0gJ2NsZWFyLWRheSc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGljb24gPT09ICdwYXJ0bHljbG91ZHknKSB7XG4gICAgICBpY29uID0gJ3BhcnRseS1jbG91ZHktZGF5JztcbiAgICB9XG4gICAgZWxzZSBpZiAoaWNvbiA9PT0gJ2NoYW5jZXJhaW4nKSB7XG4gICAgICBpY29uID0gJ3JhaW4nO1xuICAgIH1cbiAgICBlbHNlIGlmIChpY29uID09PSAnbW9zdGx5Y2xvdWR5Jykge1xuICAgICAgaWNvbiA9ICdjbG91ZHknO1xuICAgIH1cbiAgICBlbHNlIGlmIChpY29uID09PSAnY2hhbmNldHN0b3JtcycpIHtcbiAgICAgIGljb24gPSAncmFpbic7XG4gICAgfVxuICAgIGVsc2UgaWYgKGljb24gPT09ICd0c3Rvcm1zJykge1xuICAgICAgaWNvbiA9ICdyYWluJztcbiAgICB9XG5cbiAgICAvLyBDb252ZXJ0IGZvciBkYXl0aW1lIHZzIG5pZ2h0dGltZS5cbiAgICBpZiAoZGF5dGltZSA9PT0gdHJ1ZSkge1xuICAgICAgdmFyIGN1cnJlbnRkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgIHZhciBob3VycyA9IGN1cnJlbnRkYXRlLmdldEhvdXJzKCk7XG4gICAgICBpZiAoaG91cnMgPj0gNiAmJiBob3VycyA8PSAxOSkge1xuICAgICAgICBpZiAoaWNvbiA9PT0gJ3BhcnRseWNsb3VkeScpIHtcbiAgICAgICAgICBpY29uID0gJ3BhcnRseS1jbG91ZHktZGF5JztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChpY29uID09PSAnbnRfY2xlYXInIHx8IGljb24gPT09ICdjbGVhci1kYXknKSB7XG4gICAgICAgICAgaWNvbiA9ICdjbGVhci1uaWdodCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaWNvbiA9PT0gJ3BhcnRseWNsb3VkeScpIHtcbiAgICAgICAgICBpY29uID0gJ3BhcnRseS1jbG91ZHktbmlnaHQnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGljb247XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVycyBtYXJrdXBcbiAgICogQHJldHVybiBzdHJpbmcgQW55IGh0bWxcbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBtYXggPSB0aGlzLnN0YXRlLm1heDtcbiAgICBjb25zdCBtYXhIZWlnaHQgPSB0aGlzLnN0YXRlLm1heEhlaWdodDtcbiAgICB2YXIgY291bnQgPSAwO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2VhdGhlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxvY2F0aW9uXCI+Q29ud2F5PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid3JhcHBlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3VycmVudC10ZW1wXCI+eyB0aGlzLnN0YXRlLmN1cnJlbnRUZW1wIH0mZGVnOzwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3VycmVudC13ZWF0aGVyXCI+XG4gICAgICAgICAgICA8Y2FudmFzIGlkPVwid2VhdGhlci1pY29uXCI+PC9jYW52YXM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjdXJyZW50LWNvbmRpdGlvbnNcIj5cbiAgICAgICAgICAgIDxwPnsgdGhpcy5zdGF0ZS5jdXJyZW50Q29uZGl0aW9ucyB9PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRlbXBzRm9yZWNhc3RXcmFwcGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZW1wc1wiPlxuICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmhvdXJseVRlbXBzLm1hcChmdW5jdGlvbih0ZW1wKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld1RlbXAgPSB0ZW1wLnRlbXAuZW5nbGlzaDtcbiAgICAgICAgICAgICAgY29uc3QgdGVtcEhlaWdodCA9IE1hdGgucm91bmQobmV3VGVtcCAvIG1heCAqIG1heEhlaWdodCk7XG4gICAgICAgICAgICAgIC8vIFNldCB0aGUgcGVyY2lwaXRhdGlvbiBjaGFuY2UgdG8gYmUgdGhlICUgb2YgdGhlIGhlaWdodC5cbiAgICAgICAgICAgICAgY29uc3QgcHJlY2lwQ2hhbmNlID0gTWF0aC5yb3VuZCh0ZW1wLnBvcCAvIDEwMCAqIG1heEhlaWdodCk7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IChwcmVjaXBDaGFuY2UgPiB0ZW1wSGVpZ2h0KSA/IHByZWNpcENoYW5jZSA6IHRlbXBIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgdmFyIHRpbWUgPSB0ZW1wLkZDVFRJTUUuaG91cjtcbiAgICAgICAgICAgICAgdmFyIGRheXRpbWUgPSAnbmlnaHR0aW1lJztcbiAgICAgICAgICAgICAgaWYgKHRpbWUgPj0gNiAmJiB0aW1lIDw9IDE5KSB7XG4gICAgICAgICAgICAgICAgZGF5dGltZSA9ICdkYXl0aW1lJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodGltZSA+IDEyKSB7XG4gICAgICAgICAgICAgICAgdGltZSA9IHRpbWUgLSAxMjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXsgdGVtcC5GQ1RUSU1FLmVwb2NoIH0gY2xhc3NOYW1lPVwidGVtcENvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJob3VybHlUZW1wXCI+IHsgbmV3VGVtcCB9IDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJob3VybHlDb250YWluZXJcIiBzdHlsZT17e2hlaWdodDogY29udGFpbmVySGVpZ2h0ICsgJ3B4J319PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJob3VybHlHcmFwaCBcIiArIGRheXRpbWV9IHN0eWxlPXt7aGVpZ2h0OiB0ZW1wSGVpZ2h0ICsgJ3B4J319PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvdXJseUdyYXBoUG9wXCIgc3R5bGU9e3toZWlnaHQ6IHByZWNpcENoYW5jZSArICdweCd9fT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJob3VybHlUaW1lXCI+IHsgdGltZSB9IDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9yZWNhc3RcIj5cbiAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5zcGxpY2VkRm9yZWNhc3QubWFwKGZ1bmN0aW9uKGZvcmVjYXN0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGlXaWR0aCA9IE1hdGgucm91bmQoZm9yZWNhc3QuaGlnaC5mYWhyZW5oZWl0IC8gMTI1ICogMjI1KTtcbiAgICAgICAgICAgICAgICBjb25zdCBsb1dpZHRoID0gTWF0aC5yb3VuZChmb3JlY2FzdC5sb3cuZmFocmVuaGVpdCAvIDEyNSAqIDIyNSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9eyBmb3JlY2FzdC5kYXRlLmVwb2NoIH0gY2xhc3NOYW1lPVwiZm9yZWNhc3REYXlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JlY2FzdERPV1wiPnsgZm9yZWNhc3QuZGF0ZS53ZWVrZGF5IH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JlY2FzdENvbmRpdGlvblwiPjxjYW52YXMgaWQ9eyBcIndlYXRoZXItaWNvbi1cIiArIGZvcmVjYXN0LmRhdGUuZXBvY2ggfT48L2NhbnZhcz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaUxvXCI+PHNwYW4gY2xhc3NOYW1lPVwiaGlMby1oaVwiPnsgZm9yZWNhc3QuaGlnaC5mYWhyZW5oZWl0IH08L3NwYW4+IC8gPHNwYW4gY2xhc3NOYW1lPVwiaGlMby1sb1wiPnsgZm9yZWNhc3QubG93LmZhaHJlbmhlaXQgfTwvc3Bhbj48L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHN0eWxlIGpzeD57YFxuXG4gICAgICAgICAgLndlYXRoZXIge1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICdTU1QtbGlnaHQnO1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMjUpOyB9XG4gICAgICAgICAgICAud2VhdGhlciAud3JhcHBlciB7XG4gICAgICAgICAgICAgIG1hcmdpbi10b3A6IDE1cHg7IH1cblxuICAgICAgICAgIC5sb2NhdGlvbiB7XG4gICAgICAgICAgICBmb250LWZhbWlseTogJ1NTVC1jb25kZW5zZWQnO1xuICAgICAgICAgICAgZm9udC1zaXplOiAzcmVtO1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmZmY7XG4gICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogM3B4OyB9XG5cbiAgICAgICAgICAuY3VycmVudC10ZW1wIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTByZW07XG4gICAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgICAgIHdpZHRoOiAyNSU7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAtNDBweDtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0OyB9XG5cbiAgICAgICAgICAuY3VycmVudC13ZWF0aGVyIHtcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICAgICAgd2lkdGg6IDI1JTsgfVxuICAgICAgICAgICAgLmN1cnJlbnQtd2VhdGhlciBjYW52YXMge1xuICAgICAgICAgICAgICB3aWR0aDogMTc1cHg7IH1cblxuICAgICAgICAgIC5jdXJyZW50LWNvbmRpdGlvbnMge1xuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgICAgICB3aWR0aDogNTAlO1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICdTU1QtY29uZGVuc2VkJztcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMi41ZW07IH1cblxuICAgICAgICAgIC50ZW1wc0ZvcmVjYXN0V3JhcHBlciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgY2xlYXI6IGJvdGg7XG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMzVweDsgfVxuXG4gICAgICAgICAgLnRlbXBzIHtcbiAgICAgICAgICAgIHdpZHRoOiA3NSU7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICdTU1QtY29uZGVuc2VkJzsgfVxuXG4gICAgICAgICAgLnRlbXBDb250YWluZXIge1xuICAgICAgICAgICAgd2lkdGg6IDEycHg7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gICAgICAgICAgICBhbGlnbi1zZWxmOiBmbGV4LWVuZDsgfVxuXG4gICAgICAgICAgLmhvdXJseUNvbnRhaW5lciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4OyB9XG5cbiAgICAgICAgICAuaG91cmx5R3JhcGgge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICAgICAgICB3aWR0aDogMTJweDtcbiAgICAgICAgICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAycHg7IH1cblxuICAgICAgICAgIC5ob3VybHlHcmFwaFBvcCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDIxOCwgMjI4LCAyMzAsIC44OCk7XG4gICAgICAgICAgICB3aWR0aDogNXB4O1xuICAgICAgICAgICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogOHB4O1xuICAgICAgICAgICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIC41KTsgfVxuXG4gICAgICAgICAgLmhvdXJseVRpbWUge1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XG5cbiAgICAgICAgICAuZGF5dGltZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI0NCwgMjQ3LCA0NSwgMC41KTtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTsgfVxuXG4gICAgICAgICAgLm5pZ2h0dGltZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDEwMCwgMjU1LCAwLjUpO1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpOyB9XG5cbiAgICAgICAgICAuZm9yZWNhc3Qge1xuICAgICAgICAgICAgd2lkdGg6IDI1JTtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IC0yLjVlbTsgfVxuXG4gICAgICAgICAgLmZvcmVjYXN0RGF5IHtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnU1NULWNvbmRlbnNlZCc7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4OyB9XG5cbiAgICAgICAgICAuZm9yZWNhc3RIaUxvLUhpIHtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ0LCAyNDcsIDQ1LCAwLjUpO1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMHB4OyB9XG5cbiAgICAgICAgICAuZm9yZWNhc3RET1cge1xuICAgICAgICAgICAgZm9udC1zaXplOiAyZW07XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjc1KTsgfVxuXG4gICAgICAgICAgLmZvcmVjYXN0SGlMby1MbyB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDEwMCwgMjU1LCAwLjUpO1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4OyB9XG5cbiAgICAgICAgICAuZm9yZWNhc3RDb25kaXRpb24ge1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XG4gICAgICAgICAgICAuZm9yZWNhc3RDb25kaXRpb24gY2FudmFzIHtcbiAgICAgICAgICAgICAgd2lkdGg6IDc1cHg7IH1cblxuICAgICAgICAgIC5oaUxvIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMS4yNWVtOyB9XG5cbiAgICAgICAgICAuaGlMby1oaSB7XG4gICAgICAgICAgICBjb2xvcjogI2U0YzIxYTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMS41ZW07IH1cblxuICAgICAgICAgIC5oaUxvLWxvIHtcbiAgICAgICAgICAgIGNvbG9yOiByZ2JhKDg1LCAxNTEsIDI1NSwgMC43Nik7XG4gICAgICAgICAgICBmb250LXNpemU6IDEuMjVlbTsgfVxuXG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */\n/*@ sourceURL=components/Weather.js */'
      }));
    }
  }]);

  return Weather;
}(_react2.default.Component);

exports.default = Weather;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvV2VhdGhlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsImF4aW9zIiwiZGV2IiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiV2VhdGhlciIsImdldFdlYXRoZXJEYXRhIiwiYmluZCIsInN0YXRlIiwiY3VycmVudFRlbXAiLCJjdXJyZW50Q29uZGl0aW9ucyIsImZvcmVjYXN0IiwiaG91cmx5VGVtcHMiLCJtYXgiLCJtaW4iLCJtYXhIZWlnaHQiLCJudW1Gb3JlY2FzdCIsInNwbGljZWRGb3JlY2FzdCIsIndlYXRoZXJEYXRhVVJMIiwid2VhdGhlckRhdGFVUkxEZXYiLCJhbGVydERhdGFVUkwiLCJzZWxmIiwic2VydmVyUmVxdWVzdCIsImFsbCIsImdldCIsInRoZW4iLCJzcHJlYWQiLCJ3ZWF0aGVyIiwiZGF0YSIsInR4dF9mb3JlY2FzdCIsImZvcmVjYXN0ZGF5IiwiZmN0dGV4dCIsIk1hdGgiLCJyb3VuZCIsImN1cnJlbnRfb2JzZXJ2YXRpb24iLCJ0ZW1wX2YiLCJob3VybHlfZm9yZWNhc3QiLCJzaW1wbGVmb3JlY2FzdCIsImljb24iLCJzcGxpY2UiLCJzcGxpY2VkaG91cmx5VGVtcHMiLCJhcHBseSIsIm1hcCIsImUiLCJ0ZW1wIiwiZW5nbGlzaCIsInNldFN0YXRlIiwiYWJvcnQiLCJyZWZyZXNoVGltZSIsInNldEludGVydmFsIiwic2t5Y29ucyIsIlNreWNvbnMiLCJjb252ZXJ0SWNvbiIsInNldCIsImRhdGUiLCJlcG9jaCIsInBsYXkiLCJkYXl0aW1lIiwibGlzdCIsImN1cnJlbnRkYXRlIiwiRGF0ZSIsImhvdXJzIiwiZ2V0SG91cnMiLCJjb3VudCIsIm5ld1RlbXAiLCJ0ZW1wSGVpZ2h0IiwicHJlY2lwQ2hhbmNlIiwicG9wIiwiY29udGFpbmVySGVpZ2h0IiwidGltZSIsIkZDVFRJTUUiLCJob3VyIiwiaGVpZ2h0IiwiaGlXaWR0aCIsImhpZ2giLCJmYWhyZW5oZWl0IiwibG9XaWR0aCIsImxvdyIsIndlZWtkYXki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QUEsQUFDRTtBQURGO2tEQUM0QyxPQUFPLEVBQUMsUUFBUSxhQUExRCxBQUFpRCxBQUFzQiw2Q0FBdkQsaUJBQWhCLEFBQWlDLFdBQWpDOztzQkFBQTt3QkFERixBQUNFLEFBQ0E7QUFEQTttREFDZ0MsT0FBTyxFQUFDLFFBQVEsZUFBaEQsQUFBdUMsQUFBd0IsNENBQS9ELEFBQWU7O3NCQUFmO3dCQUpKLEFBRUUsQUFFRSxBQUVGO0FBRkU7NkJBRUYsY0FBQTs4Q0FBQSxBQUFlOztzQkFBZjt3QkFBQTtBQUFBO0FBQUEsV0FBK0IsS0FBL0IsTUFQSixBQUNFLEFBTUUsQUFHTDtBQTNCTCxBQUNFLEFBQ0ksQUE0QkosMkJBQUEsY0FBQTs0Q0FBQSxBQUFlOztvQkFBZjtzQkFBQSxBQUNJO0FBREo7QUFBQSxjQUNJLEFBQUssTUFBTCxBQUFXLGdCQUFYLEFBQTJCLElBQUksVUFBQSxBQUFTLFVBQVUsQUFDaEQ7WUFBTSxVQUFVLEtBQUEsQUFBSyxNQUFNLFNBQUEsQUFBUyxLQUFULEFBQWMsYUFBZCxBQUEyQixNQUF0RCxBQUFnQixBQUE0QyxBQUM1RDtZQUFNLFVBQVUsS0FBQSxBQUFLLE1BQU0sU0FBQSxBQUFTLElBQVQsQUFBYSxhQUFiLEFBQTBCLE1BQXJELEFBQWdCLEFBQTJDLEFBQzNEOytCQUNFLGNBQUEsU0FBSyxLQUFNLFNBQUEsQUFBUyxLQUFwQixBQUF5QiwyQ0FBekIsQUFBMkM7O3NCQUEzQzt3QkFBQSxBQUNFO0FBREY7U0FBQSxrQkFDRSxjQUFBOzhDQUFBLEFBQWU7O3NCQUFmO3dCQUFBLEFBQStCO0FBQS9CO0FBQUEsb0JBQStCLEFBQVMsS0FEMUMsQUFDRSxBQUE2QyxBQUM3QywwQkFBQSxjQUFBOzhDQUFBLEFBQWU7O3NCQUFmO3dCQUFBLEFBQW1DO0FBQW5DO0FBQUEscURBQTJDLElBQUssa0JBQWtCLFNBQUEsQUFBUyxLQUF4QyxBQUE2QyxrQkFBN0M7O3NCQUFBO3dCQUZyQyxBQUVFLEFBQW1DLEFBQ25DO0FBRG1DOzZCQUNuQyxjQUFBOzhDQUFBLEFBQWU7O3NCQUFmO3dCQUFBLEFBQXNCO0FBQXRCO0FBQUEsMkJBQXNCLGNBQUE7OENBQUEsQUFBZ0I7O3NCQUFoQjt3QkFBQSxBQUE0QjtBQUE1QjtBQUFBLG9CQUE0QixBQUFTLEtBQTNELEFBQXNCLEFBQTBDLGFBQXNCLHVCQUFBLGNBQUE7OENBQUEsQUFBZ0I7O3NCQUFoQjt3QkFBQSxBQUE0QjtBQUE1QjtBQUFBLG9CQUE0QixBQUFTLElBSi9ILEFBQ0UsQUFHRSxBQUFzRixBQUF5QyxBQUlwSTtBQXREVCxBQVlFLEFBOEJFLEFBQ0k7aUJBM0NSO2FBREYsQUFDRSxBQXdMSDtBQXhMRzs7Ozs7RUFsTCtCLGdCQUFNLEE7O2tCQUF0QixBIiwiZmlsZSI6IldlYXRoZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYnluZ3JlZW4vU2l0ZXMvaW5mby1zY3JlZW4ifQ==