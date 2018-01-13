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


var Weather = function (_React$Component) {
  (0, _inherits3.default)(Weather, _React$Component);

  function Weather() {
    (0, _classCallCheck3.default)(this, Weather);

    // Set defaults.
    var _this = (0, _possibleConstructorReturn3.default)(this, (Weather.__proto__ || (0, _getPrototypeOf2.default)(Weather)).call(this));

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
      weatherDataURLDev: '/scripts/Conway.json'
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

        // Find the max temperature.
        var max = Math.max.apply(null, (0, _keys2.default)(weather.data.hourly_forecast).map(function (e) {
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
      // In milliseconds, so * 1000 to end.
      // 60 minutes * 60 seconds * 1000 milliseconds.
      var refreshTime = 60 * 60 * 1000;
      window.setInterval(function () {
        this.getWeatherData();
      }.bind(this), refreshTime);
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
      console.info(icon);
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
        className: 'jsx-2442309317' + ' ' + 'weather',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 175
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-2442309317' + ' ' + 'location',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 176
        }
      }, 'Conway'), _react2.default.createElement('div', {
        className: 'jsx-2442309317' + ' ' + 'wrapper',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 177
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-2442309317' + ' ' + 'current-temp',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 178
        }
      }, this.state.currentTemp, '\xB0'), _react2.default.createElement('div', {
        className: 'jsx-2442309317' + ' ' + 'current-weather',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 179
        }
      }, _react2.default.createElement('canvas', { id: 'weather-icon', className: 'jsx-2442309317',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 180
        }
      })), _react2.default.createElement('div', {
        className: 'jsx-2442309317' + ' ' + 'current-conditions',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 182
        }
      }, _react2.default.createElement('p', {
        className: 'jsx-2442309317',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 183
        }
      }, this.state.currentConditions))), _react2.default.createElement('div', {
        className: 'jsx-2442309317' + ' ' + 'tempsForecastWrapper',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 187
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-2442309317' + ' ' + 'temps',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 188
        }
      }, this.state.hourlyTemps.map(function (temp) {
        var newTemp = temp.temp.english;
        var thisHeight = Math.round(newTemp / max * maxHeight);

        var time = temp.FCTTIME.hour;
        var daytime = 'nighttime';
        if (time >= 6 && time <= 19) {
          daytime = 'daytime';
        }
        if (time > 12) {
          time = time - 12;
        }
        return _react2.default.createElement('div', { key: temp.FCTTIME.epoch, className: 'jsx-2442309317' + ' ' + 'tempContainer',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 202
          }
        }, _react2.default.createElement('div', {
          className: 'jsx-2442309317' + ' ' + 'hourlyTemp',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 203
          }
        }, ' ', newTemp, ' '), _react2.default.createElement('div', { style: { height: thisHeight + 'px' }, className: 'jsx-2442309317' + ' ' + ("hourlyGraph " + daytime || ''),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 204
          }
        }), _react2.default.createElement('div', {
          className: 'jsx-2442309317' + ' ' + 'hourlyTime',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 205
          }
        }, ' ', time, ' '));
      })), _react2.default.createElement('div', {
        className: 'jsx-2442309317' + ' ' + 'forecast',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 211
        }
      }, this.state.splicedForecast.map(function (forecast) {
        var hiWidth = Math.round(forecast.high.fahrenheit / 125 * 225);
        var loWidth = Math.round(forecast.low.fahrenheit / 125 * 225);
        return _react2.default.createElement('div', { key: forecast.date.epoch, className: 'jsx-2442309317' + ' ' + 'forecastDay',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 216
          }
        }, _react2.default.createElement('div', {
          className: 'jsx-2442309317' + ' ' + 'forecastDOW',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 217
          }
        }, forecast.date.weekday), _react2.default.createElement('div', {
          className: 'jsx-2442309317' + ' ' + 'forecastCondition',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 218
          }
        }, _react2.default.createElement('canvas', { id: "weather-icon-" + forecast.date.epoch, className: 'jsx-2442309317',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 218
          }
        })), _react2.default.createElement('div', {
          className: 'jsx-2442309317' + ' ' + 'hiLo',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 219
          }
        }, _react2.default.createElement('span', {
          className: 'jsx-2442309317' + ' ' + 'hiLo-hi',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 219
          }
        }, forecast.high.fahrenheit), ' / ', _react2.default.createElement('span', {
          className: 'jsx-2442309317' + ' ' + 'hiLo-lo',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 219
          }
        }, forecast.low.fahrenheit)));
      }))), _react2.default.createElement(_style2.default, {
        styleId: '2442309317',
        css: '.weather.jsx-2442309317{font-family:\'SST-light\';color:#fff;text-shadow:1px 1px rgba(0,0,0,0.25);}.weather.jsx-2442309317 .wrapper.jsx-2442309317{margin-top:15px;}.location.jsx-2442309317{font-family:\'SST-condensed\';font-size:3rem;border-bottom:1px solid #fff;padding-bottom:3px;}.current-temp.jsx-2442309317{font-size:10rem;float:left;width:25%;margin-top:-40px;text-align:right;}.current-weather.jsx-2442309317{float:left;width:25%;}.current-weather.jsx-2442309317 canvas.jsx-2442309317{width:175px;}.current-conditions.jsx-2442309317{float:left;width:50%;font-family:\'SST-condensed\';font-size:1.5em;}.tempsForecastWrapper.jsx-2442309317{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;clear:both;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;margin-top:135px;}.temps.jsx-2442309317{width:75%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;font-family:\'SST-condensed\';}.tempContainer.jsx-2442309317{float:left;width:10px;margin-right:10px;-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end;}.hourlyGraph.jsx-2442309317{background:white;}.hourlyTime.jsx-2442309317{text-align:center;}.daytime.jsx-2442309317{background:rgba(244,247,45,0.5);border:1px solid rgba(255,255,255,0.5);}.nighttime.jsx-2442309317{background:rgba(0,100,255,0.5);border:1px solid rgba(255,255,255,0.5);}.forecast.jsx-2442309317{width:25%;margin-top:-2.5em;}.forecastDay.jsx-2442309317{font-family:\'SST-condensed\';display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;margin-bottom:10px;}.forecastHiLo-Hi.jsx-2442309317{margin-right:10px;background:rgba(244,247,45,0.5);border:1px solid rgba(255,255,255,0.5);height:10px;}.forecastDOW.jsx-2442309317{font-size:2em;text-align:center;text-shadow:1px 1px 2px rgba(0,0,0,0.75);}.forecastHiLo-Lo.jsx-2442309317{background:rgba(0,100,255,0.5);border:1px solid rgba(255,255,255,0.5);height:10px;margin-right:10px;}.forecastCondition.jsx-2442309317{text-align:center;}.forecastCondition.jsx-2442309317 canvas.jsx-2442309317{width:75px;}.hiLo.jsx-2442309317{font-size:1.25em;}.hiLo-hi.jsx-2442309317{color:#e4c21a;font-size:1.5em;}.hiLo-lo.jsx-2442309317{color:rgba(85,151,255,0.76);font-size:1.25em;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvV2VhdGhlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrT29CLEFBSXFDLEFBSU4sQUFHVSxBQU1aLEFBT0wsQUFHRyxBQUdILEFBTUUsQUFPSCxBQUtDLEFBTU0sQUFHQyxBQUdpQixBQUlELEFBSXhCLEFBSWtCLEFBT1YsQUFNSixBQUtvQixBQU1oQixBQUVMLEFBR0ksQUFHSCxBQUlpQixVQWhFbEIsQUF5QkssQ0E1Q1IsQUFNQSxBQWtCQyxBQWlERyxDQXZFQyxFQTJERyxBQW1CRixFQWpHRyxBQVVSLENBb0NPLEFBK0NBLENBNUNDLEFBdUJnQixBQWdCaEIsR0F2RVIsQUFPaUIsQ0FrQlYsRUE3Q1AsR0FjRCxDQVBLLEFBeURJLEFBSU4sQUFvQ0ksRUFKQSxDQXhDeUIsQUEwQkEsQ0E5QkEsQUEwQkUsR0FqRkosRUFjdkIsR0ErQkcsR0F0Q1MsRUFnR1gsSUE1RUYsQ0FnRDBCLElBNUR6QixXQVlBLEtBZ0MwQixBQTJCL0IsQ0F2RU0sQUF3Q3lCLENBdkRGLEFBUXRCLENBeUUwQixDQWxEbEMsUUF3RE8sRUFoRFUsQ0FQVCxJQTRDUCxFQXBFUSxTQStFRCxDQVhOLENBUk0sVUE3QlUsQUFNUiwwQ0FaRSxpQkFvQ0UsNEZBbkNSLEtBb0NFLFlBcENELE9Bb0NFIiwiZmlsZSI6ImNvbXBvbmVudHMvV2VhdGhlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9ieW5ncmVlbi9TaXRlcy9pbmZvLXNjcmVlbiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYXRoZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIFNldCBkZWZhdWx0cy5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFRlbXA6ICcnLFxuICAgICAgY3VycmVudENvbmRpdGlvbnM6ICcnLFxuICAgICAgZm9yZWNhc3Q6IFtdLFxuICAgICAgaG91cmx5VGVtcHM6IFtdLFxuICAgICAgbWF4OiA1MDAsXG4gICAgICBtaW46IC01MDAsXG4gICAgICBtYXhIZWlnaHQ6IDc1LFxuICAgICAgbnVtRm9yZWNhc3Q6IDMsXG4gICAgICBzcGxpY2VkRm9yZWNhc3Q6IFtdLFxuICAgICAgd2VhdGhlckRhdGFVUkw6ICdodHRwOi8vYXBpLnd1bmRlcmdyb3VuZC5jb20vYXBpLzEzZDNhZGNhOWRkMTFkNjMvaG91cmx5L2NvbmRpdGlvbnMvZm9yZWNhc3QxMGRheS9xL0FSL0NvbndheS5qc29uJyxcbiAgICAgIHdlYXRoZXJEYXRhVVJMRGV2OiAnL3NjcmlwdHMvQ29ud2F5Lmpzb24nXG4gICAgfTtcbiAgfVxuXG4gIGdldFdlYXRoZXJEYXRhKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLnNlcnZlclJlcXVlc3QgPVxuICAgICAgYXhpb3MuYWxsKFtcbiAgICAgICAgYXhpb3MuZ2V0KHRoaXMuc3RhdGUud2VhdGhlckRhdGFVUkwpXG4gICAgICBdKVxuICAgICAgLnRoZW4oYXhpb3Muc3ByZWFkKGZ1bmN0aW9uICh3ZWF0aGVyKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb25kaXRpb25zID0gd2VhdGhlci5kYXRhLmZvcmVjYXN0LnR4dF9mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5mY3R0ZXh0O1xuICAgICAgICBjb25zdCBjdXJyZW50VGVtcCA9IE1hdGgucm91bmQod2VhdGhlci5kYXRhLmN1cnJlbnRfb2JzZXJ2YXRpb24udGVtcF9mKTtcbiAgICAgICAgY29uc3QgaG91cmx5VGVtcHMgPSB3ZWF0aGVyLmRhdGEuaG91cmx5X2ZvcmVjYXN0O1xuICAgICAgICBjb25zdCBmb3JlY2FzdCA9IHdlYXRoZXIuZGF0YS5mb3JlY2FzdC5zaW1wbGVmb3JlY2FzdC5mb3JlY2FzdGRheTtcbiAgICAgICAgdmFyIGljb24gPSB3ZWF0aGVyLmRhdGEuZm9yZWNhc3QudHh0X2ZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmljb247XG5cbiAgICAgICAgLy8gU3BsaWNlIHRoZSBmb3JlY2FzdC5cbiAgICAgICAgdmFyIHNwbGljZWRGb3JlY2FzdCA9IGZvcmVjYXN0O1xuICAgICAgICAvLyBSZW1vdmUgdGhlIGZpcnN0IG9uZSAodG9kYXkpLlxuICAgICAgICBzcGxpY2VkRm9yZWNhc3Quc3BsaWNlKDAsIDEpO1xuICAgICAgICAvLyBPbmx5IHNob3cgZml2ZSBpdGVtcy5cbiAgICAgICAgc3BsaWNlZEZvcmVjYXN0LnNwbGljZShzZWxmLnN0YXRlLm51bUZvcmVjYXN0KTtcblxuICAgICAgICAvLyBGaW5kIHRoZSBtYXggdGVtcGVyYXR1cmUuXG4gICAgICAgIHZhciBtYXggPSBNYXRoLm1heC5hcHBseShudWxsLFxuICAgICAgICAgIE9iamVjdC5rZXlzKHdlYXRoZXIuZGF0YS5ob3VybHlfZm9yZWNhc3QpLm1hcChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICByZXR1cm4gd2VhdGhlci5kYXRhLmhvdXJseV9mb3JlY2FzdFtlXS50ZW1wLmVuZ2xpc2g7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBzZWxmLnNldFN0YXRlKHtcbiAgICAgICAgICBjdXJyZW50Q29uZGl0aW9uczogY3VycmVudENvbmRpdGlvbnMsXG4gICAgICAgICAgY3VycmVudFRlbXA6IGN1cnJlbnRUZW1wLFxuICAgICAgICAgIGhvdXJseVRlbXBzOiBob3VybHlUZW1wcyxcbiAgICAgICAgICBpY29uOiBpY29uLFxuICAgICAgICAgIG1heDogbWF4LFxuICAgICAgICAgIGZvcmVjYXN0OiBmb3JlY2FzdCxcbiAgICAgICAgICBzcGxpY2VkRm9yZWNhc3Q6IHNwbGljZWRGb3JlY2FzdFxuICAgICAgICB9KTtcbiAgICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVjYWxsIGJlZm9yZSByZW5kZXIuXG4gICAqL1xuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5nZXRXZWF0aGVyRGF0YSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgaXRlbXMgd2hlbiB1bm1vdW50ZWQuXG4gICAqL1xuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnNlcnZlclJlcXVlc3QuYWJvcnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKi9cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gSW4gbWlsbGlzZWNvbmRzLCBzbyAqIDEwMDAgdG8gZW5kLlxuICAgIC8vIDYwIG1pbnV0ZXMgKiA2MCBzZWNvbmRzICogMTAwMCBtaWxsaXNlY29uZHMuXG4gICAgdmFyIHJlZnJlc2hUaW1lID0gNjAgKiA2MCAqIDEwMDA7XG4gICAgd2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuZ2V0V2VhdGhlckRhdGEoKTtcbiAgICB9LmJpbmQodGhpcyksIHJlZnJlc2hUaW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbmV2ZXIgdGhlIGRvbSBpcyB1cGRhdGVkLlxuICAgKi9cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHZhciBza3ljb25zID0gbmV3IFNreWNvbnMoeydjb2xvcic6ICd3aGl0ZSd9KTtcbiAgICB2YXIgaWNvbiA9IHRoaXMuY29udmVydEljb24odGhpcy5zdGF0ZS5pY29uLCB0cnVlKTtcbiAgICBza3ljb25zLnNldCgnd2VhdGhlci1pY29uJywgaWNvbik7XG5cbiAgICBmb3IgKHZhciBmb3JlY2FzdCBvZiB0aGlzLnN0YXRlLnNwbGljZWRGb3JlY2FzdCkge1xuICAgICAgdmFyIGljb24gPSB0aGlzLmNvbnZlcnRJY29uKGZvcmVjYXN0Lmljb24sIGZhbHNlKTtcblxuICAgICAgc2t5Y29ucy5zZXQoJ3dlYXRoZXItaWNvbi0nICsgZm9yZWNhc3QuZGF0ZS5lcG9jaCwgaWNvbik7XG4gICAgfVxuICAgc2t5Y29ucy5wbGF5KCk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgV1VuZGVyZ3JvdW5kIGljb25zIHRvIHNreWNvbnMuXG4gICAqIEBwYXJhbSAge3N0cmluZ30gb3JpZ2luYWxcbiAgICogICBJY29uIHN0cmluZyB0byBjb252ZXJ0LlxuICAgKiBAcGFyYW0gIHtib29sfSBkYXl0aW1lXG4gICAqICAgU2hvdWxkIHVzZSBkYXl0aW1lIHZzIG5pZ2h0dGltZSBjb252ZXJzaW9uLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqICAgQ29udmVydGVkIGljb24gc3RyaW5nLlxuICAgKi9cbiAgY29udmVydEljb24oaWNvbiwgZGF5dGltZSkge1xuICAgIC8vIFRoZSBza3ljb25zIGxpc3QuXG4gICAgY29uc3QgbGlzdCA9IFtcbiAgICAgIFwiY2xlYXItZGF5XCIsIFwiY2xlYXItbmlnaHRcIiwgXCJwYXJ0bHktY2xvdWR5LWRheVwiLFxuICAgICAgXCJwYXJ0bHktY2xvdWR5LW5pZ2h0XCIsIFwiY2xvdWR5XCIsIFwicmFpblwiLCBcInNsZWV0XCIsIFwic25vd1wiLCBcIndpbmRcIixcbiAgICAgIFwiZm9nXCJcbiAgICBdO1xuICAgIGNvbnNvbGUuaW5mbyhpY29uKTtcbiAgICBpZiAoaWNvbiA9PT0gJ2NsZWFyJykge1xuICAgICAgaWNvbiA9ICdjbGVhci1kYXknO1xuICAgIH1cbiAgICBlbHNlIGlmIChpY29uID09PSAncGFydGx5Y2xvdWR5Jykge1xuICAgICAgaWNvbiA9ICdwYXJ0bHktY2xvdWR5LWRheSc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGljb24gPT09ICdjaGFuY2VyYWluJykge1xuICAgICAgaWNvbiA9ICdyYWluJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaWNvbiA9PT0gJ21vc3RseWNsb3VkeScpIHtcbiAgICAgIGljb24gPSAnY2xvdWR5JztcbiAgICB9XG4gICAgZWxzZSBpZiAoaWNvbiA9PT0gJ2NoYW5jZXRzdG9ybXMnKSB7XG4gICAgICBpY29uID0gJ3JhaW4nO1xuICAgIH1cbiAgICBlbHNlIGlmIChpY29uID09PSAndHN0b3JtcycpIHtcbiAgICAgIGljb24gPSAncmFpbic7XG4gICAgfVxuXG4gICAgLy8gQ29udmVydCBmb3IgZGF5dGltZSB2cyBuaWdodHRpbWUuXG4gICAgaWYgKGRheXRpbWUgPT09IHRydWUpIHtcbiAgICAgIHZhciBjdXJyZW50ZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICB2YXIgaG91cnMgPSBjdXJyZW50ZGF0ZS5nZXRIb3VycygpO1xuICAgICAgaWYgKGhvdXJzID49IDYgJiYgaG91cnMgPD0gMTkpIHtcbiAgICAgICAgaWYgKGljb24gPT09ICdwYXJ0bHljbG91ZHknKSB7XG4gICAgICAgICAgaWNvbiA9ICdwYXJ0bHktY2xvdWR5LWRheSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoaWNvbiA9PT0gJ250X2NsZWFyJyB8fCBpY29uID09PSAnY2xlYXItZGF5Jykge1xuICAgICAgICAgIGljb24gPSAnY2xlYXItbmlnaHQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGljb24gPT09ICdwYXJ0bHljbG91ZHknKSB7XG4gICAgICAgICAgaWNvbiA9ICdwYXJ0bHktY2xvdWR5LW5pZ2h0JztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpY29uO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgbWFya3VwXG4gICAqIEByZXR1cm4gc3RyaW5nIEFueSBodG1sXG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgbWF4ID0gdGhpcy5zdGF0ZS5tYXg7XG4gICAgY29uc3QgbWF4SGVpZ2h0ID0gdGhpcy5zdGF0ZS5tYXhIZWlnaHQ7XG4gICAgdmFyIGNvdW50ID0gMDtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIndlYXRoZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2NhdGlvblwiPkNvbndheTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndyYXBwZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImN1cnJlbnQtdGVtcFwiPnsgdGhpcy5zdGF0ZS5jdXJyZW50VGVtcCB9JmRlZzs8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImN1cnJlbnQtd2VhdGhlclwiPlxuICAgICAgICAgICAgPGNhbnZhcyBpZD1cIndlYXRoZXItaWNvblwiPjwvY2FudmFzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3VycmVudC1jb25kaXRpb25zXCI+XG4gICAgICAgICAgICA8cD57IHRoaXMuc3RhdGUuY3VycmVudENvbmRpdGlvbnMgfTwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZW1wc0ZvcmVjYXN0V3JhcHBlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGVtcHNcIj5cbiAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5ob3VybHlUZW1wcy5tYXAoZnVuY3Rpb24odGVtcCkge1xuICAgICAgICAgICAgICBjb25zdCBuZXdUZW1wID0gdGVtcC50ZW1wLmVuZ2xpc2g7XG4gICAgICAgICAgICAgIGNvbnN0IHRoaXNIZWlnaHQgPSBNYXRoLnJvdW5kKG5ld1RlbXAgLyBtYXggKiBtYXhIZWlnaHQpO1xuXG4gICAgICAgICAgICAgIHZhciB0aW1lID0gdGVtcC5GQ1RUSU1FLmhvdXI7XG4gICAgICAgICAgICAgIHZhciBkYXl0aW1lID0gJ25pZ2h0dGltZSc7XG4gICAgICAgICAgICAgIGlmICh0aW1lID49IDYgJiYgdGltZSA8PSAxOSkge1xuICAgICAgICAgICAgICAgIGRheXRpbWUgPSAnZGF5dGltZSc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHRpbWUgPiAxMikge1xuICAgICAgICAgICAgICAgIHRpbWUgPSB0aW1lIC0gMTI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17IHRlbXAuRkNUVElNRS5lcG9jaCB9IGNsYXNzTmFtZT1cInRlbXBDb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaG91cmx5VGVtcFwiPiB7IG5ld1RlbXAgfSA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImhvdXJseUdyYXBoIFwiICsgZGF5dGltZX0gc3R5bGU9e3toZWlnaHQ6IHRoaXNIZWlnaHQgKyAncHgnfX0+PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvdXJseVRpbWVcIj4geyB0aW1lIH0gPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JlY2FzdFwiPlxuICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnNwbGljZWRGb3JlY2FzdC5tYXAoZnVuY3Rpb24oZm9yZWNhc3QpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBoaVdpZHRoID0gTWF0aC5yb3VuZChmb3JlY2FzdC5oaWdoLmZhaHJlbmhlaXQgLyAxMjUgKiAyMjUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvV2lkdGggPSBNYXRoLnJvdW5kKGZvcmVjYXN0Lmxvdy5mYWhyZW5oZWl0IC8gMTI1ICogMjI1KTtcbiAgICAgICAgICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17IGZvcmVjYXN0LmRhdGUuZXBvY2ggfSBjbGFzc05hbWU9XCJmb3JlY2FzdERheVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcmVjYXN0RE9XXCI+eyBmb3JlY2FzdC5kYXRlLndlZWtkYXkgfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcmVjYXN0Q29uZGl0aW9uXCI+PGNhbnZhcyBpZD17IFwid2VhdGhlci1pY29uLVwiICsgZm9yZWNhc3QuZGF0ZS5lcG9jaCB9PjwvY2FudmFzPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpTG9cIj48c3BhbiBjbGFzc05hbWU9XCJoaUxvLWhpXCI+eyBmb3JlY2FzdC5oaWdoLmZhaHJlbmhlaXQgfTwvc3Bhbj4gLyA8c3BhbiBjbGFzc05hbWU9XCJoaUxvLWxvXCI+eyBmb3JlY2FzdC5sb3cuZmFocmVuaGVpdCB9PC9zcGFuPjwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8c3R5bGUganN4PntgXG5cbiAgICAgICAgICAud2VhdGhlciB7XG4gICAgICAgICAgICBmb250LWZhbWlseTogJ1NTVC1saWdodCc7XG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICAgIHRleHQtc2hhZG93OiAxcHggMXB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7IH1cbiAgICAgICAgICAgIC53ZWF0aGVyIC53cmFwcGVyIHtcbiAgICAgICAgICAgICAgbWFyZ2luLXRvcDogMTVweDsgfVxuXG4gICAgICAgICAgLmxvY2F0aW9uIHtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnU1NULWNvbmRlbnNlZCc7XG4gICAgICAgICAgICBmb250LXNpemU6IDNyZW07XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ZmZjtcbiAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAzcHg7IH1cblxuICAgICAgICAgIC5jdXJyZW50LXRlbXAge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMHJlbTtcbiAgICAgICAgICAgIGZsb2F0OiBsZWZ0O1xuICAgICAgICAgICAgd2lkdGg6IDI1JTtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IC00MHB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7IH1cblxuICAgICAgICAgIC5jdXJyZW50LXdlYXRoZXIge1xuICAgICAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgICAgICB3aWR0aDogMjUlOyB9XG4gICAgICAgICAgICAuY3VycmVudC13ZWF0aGVyIGNhbnZhcyB7XG4gICAgICAgICAgICAgIHdpZHRoOiAxNzVweDsgfVxuXG4gICAgICAgICAgLmN1cnJlbnQtY29uZGl0aW9ucyB7XG4gICAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgICAgIHdpZHRoOiA1MCU7XG4gICAgICAgICAgICBmb250LWZhbWlseTogJ1NTVC1jb25kZW5zZWQnO1xuICAgICAgICAgICAgZm9udC1zaXplOiAxLjVlbTsgfVxuXG4gICAgICAgICAgLnRlbXBzRm9yZWNhc3RXcmFwcGVyIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBjbGVhcjogYm90aDtcbiAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEzNXB4OyB9XG5cbiAgICAgICAgICAudGVtcHMge1xuICAgICAgICAgICAgd2lkdGg6IDc1JTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmb250LWZhbWlseTogJ1NTVC1jb25kZW5zZWQnOyB9XG5cbiAgICAgICAgICAudGVtcENvbnRhaW5lciB7XG4gICAgICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgICAgIHdpZHRoOiAxMHB4O1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICAgICAgICAgICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7IH1cblxuICAgICAgICAgIC5ob3VybHlHcmFwaCB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsgfVxuXG4gICAgICAgICAgLmhvdXJseVRpbWUge1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XG5cbiAgICAgICAgICAuZGF5dGltZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI0NCwgMjQ3LCA0NSwgMC41KTtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTsgfVxuXG4gICAgICAgICAgLm5pZ2h0dGltZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDEwMCwgMjU1LCAwLjUpO1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpOyB9XG5cbiAgICAgICAgICAuZm9yZWNhc3Qge1xuICAgICAgICAgICAgd2lkdGg6IDI1JTtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IC0yLjVlbTsgfVxuXG4gICAgICAgICAgLmZvcmVjYXN0RGF5IHtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnU1NULWNvbmRlbnNlZCc7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4OyB9XG5cbiAgICAgICAgICAuZm9yZWNhc3RIaUxvLUhpIHtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ0LCAyNDcsIDQ1LCAwLjUpO1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMHB4OyB9XG5cbiAgICAgICAgICAuZm9yZWNhc3RET1cge1xuICAgICAgICAgICAgZm9udC1zaXplOiAyZW07XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjc1KTsgfVxuXG4gICAgICAgICAgLmZvcmVjYXN0SGlMby1MbyB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDEwMCwgMjU1LCAwLjUpO1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuICAgICAgICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4OyB9XG5cbiAgICAgICAgICAuZm9yZWNhc3RDb25kaXRpb24ge1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyB9XG4gICAgICAgICAgICAuZm9yZWNhc3RDb25kaXRpb24gY2FudmFzIHtcbiAgICAgICAgICAgICAgd2lkdGg6IDc1cHg7IH1cblxuICAgICAgICAgIC5oaUxvIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMS4yNWVtOyB9XG5cbiAgICAgICAgICAuaGlMby1oaSB7XG4gICAgICAgICAgICBjb2xvcjogI2U0YzIxYTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMS41ZW07IH1cblxuICAgICAgICAgIC5oaUxvLWxvIHtcbiAgICAgICAgICAgIGNvbG9yOiByZ2JhKDg1LCAxNTEsIDI1NSwgMC43Nik7XG4gICAgICAgICAgICBmb250LXNpemU6IDEuMjVlbTsgfVxuXG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */\n/*@ sourceURL=components/Weather.js */'
      }));
    }
  }]);

  return Weather;
}(_react2.default.Component);

exports.default = Weather;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvV2VhdGhlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsImF4aW9zIiwiV2VhdGhlciIsInN0YXRlIiwiY3VycmVudFRlbXAiLCJjdXJyZW50Q29uZGl0aW9ucyIsImZvcmVjYXN0IiwiaG91cmx5VGVtcHMiLCJtYXgiLCJtaW4iLCJtYXhIZWlnaHQiLCJudW1Gb3JlY2FzdCIsInNwbGljZWRGb3JlY2FzdCIsIndlYXRoZXJEYXRhVVJMIiwid2VhdGhlckRhdGFVUkxEZXYiLCJzZWxmIiwic2VydmVyUmVxdWVzdCIsImFsbCIsImdldCIsInRoZW4iLCJzcHJlYWQiLCJ3ZWF0aGVyIiwiZGF0YSIsInR4dF9mb3JlY2FzdCIsImZvcmVjYXN0ZGF5IiwiZmN0dGV4dCIsIk1hdGgiLCJyb3VuZCIsImN1cnJlbnRfb2JzZXJ2YXRpb24iLCJ0ZW1wX2YiLCJob3VybHlfZm9yZWNhc3QiLCJzaW1wbGVmb3JlY2FzdCIsImljb24iLCJzcGxpY2UiLCJhcHBseSIsIm1hcCIsImUiLCJ0ZW1wIiwiZW5nbGlzaCIsInNldFN0YXRlIiwiZ2V0V2VhdGhlckRhdGEiLCJhYm9ydCIsInJlZnJlc2hUaW1lIiwid2luZG93Iiwic2V0SW50ZXJ2YWwiLCJiaW5kIiwic2t5Y29ucyIsIlNreWNvbnMiLCJjb252ZXJ0SWNvbiIsInNldCIsImRhdGUiLCJlcG9jaCIsInBsYXkiLCJkYXl0aW1lIiwibGlzdCIsImNvbnNvbGUiLCJpbmZvIiwiY3VycmVudGRhdGUiLCJEYXRlIiwiaG91cnMiLCJnZXRIb3VycyIsImNvdW50IiwibmV3VGVtcCIsInRoaXNIZWlnaHQiLCJ0aW1lIiwiRkNUVElNRSIsImhvdXIiLCJoZWlnaHQiLCJoaVdpZHRoIiwiaGlnaCIsImZhaHJlbmhlaXQiLCJsb1dpZHRoIiwibG93Iiwid2Vla2RheSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsQUFBTzs7OztBQUNQLEFBQU87Ozs7Ozs7OztJLEFBRWM7bUNBQ25COztxQkFBZTt3Q0FHYjs7QUFIYTtrSUFJYjs7VUFBQSxBQUFLO21CQUFRLEFBQ0UsQUFDYjt5QkFGVyxBQUVRLEFBQ25CO2dCQUhXLEFBR0QsQUFDVjttQkFKVyxBQUlFLEFBQ2I7V0FMVyxBQUtOLEFBQ0w7V0FBSyxDQU5NLEFBTUwsQUFDTjtpQkFQVyxBQU9BLEFBQ1g7bUJBUlcsQUFRRSxBQUNiO3VCQVRXLEFBU00sQUFDakI7c0JBVlcsQUFVSyxBQUNoQjt5QkFmVyxBQUliLEFBQWEsQUFXUTtBQVhSLEFBQ1g7V0FZSDs7Ozs7cUNBRWdCLEFBQ2Y7VUFBSSxPQUFKLEFBQVcsQUFDWDtXQUFBLEFBQUssZ0NBQ0gsQUFBTSxJQUFJLENBQ1IsZ0JBQUEsQUFBTSxJQUFJLEtBQUEsQUFBSyxNQURqQixBQUFVLEFBQ1IsQUFBcUIsa0JBRHZCLEFBR0MscUJBQUssQUFBTSxPQUFPLFVBQUEsQUFBVSxTQUFTLEFBQ3BDO1lBQU0sb0JBQW9CLFFBQUEsQUFBUSxLQUFSLEFBQWEsU0FBYixBQUFzQixhQUF0QixBQUFtQyxZQUFuQyxBQUErQyxHQUF6RSxBQUE0RSxBQUM1RTtZQUFNLGNBQWMsS0FBQSxBQUFLLE1BQU0sUUFBQSxBQUFRLEtBQVIsQUFBYSxvQkFBNUMsQUFBb0IsQUFBNEMsQUFDaEU7WUFBTSxjQUFjLFFBQUEsQUFBUSxLQUE1QixBQUFpQyxBQUNqQztZQUFNLFdBQVcsUUFBQSxBQUFRLEtBQVIsQUFBYSxTQUFiLEFBQXNCLGVBQXZDLEFBQXNELEFBQ3REO1lBQUksT0FBTyxRQUFBLEFBQVEsS0FBUixBQUFhLFNBQWIsQUFBc0IsYUFBdEIsQUFBbUMsWUFBbkMsQUFBK0MsR0FBMUQsQUFBNkQsQUFFN0Q7O0FBQ0E7WUFBSSxrQkFBSixBQUFzQixBQUN0QjtBQUNBO3dCQUFBLEFBQWdCLE9BQWhCLEFBQXVCLEdBQXZCLEFBQTBCLEFBQzFCO0FBQ0E7d0JBQUEsQUFBZ0IsT0FBTyxLQUFBLEFBQUssTUFBNUIsQUFBa0MsQUFFbEM7O0FBQ0E7WUFBSSxXQUFNLEFBQUssSUFBTCxBQUFTLE1BQVQsQUFBZSwwQkFDWCxRQUFBLEFBQVEsS0FBcEIsQUFBeUIsaUJBQXpCLEFBQTBDLElBQUksVUFBQSxBQUFTLEdBQUcsQUFDeEQ7aUJBQU8sUUFBQSxBQUFRLEtBQVIsQUFBYSxnQkFBYixBQUE2QixHQUE3QixBQUFnQyxLQUF2QyxBQUE0QyxBQUMvQztBQUhELEFBQVUsQUFDUixBQUlGLFNBSkUsQ0FEUTs7YUFLVixBQUFLOzZCQUFTLEFBQ08sQUFDbkI7dUJBRlksQUFFQyxBQUNiO3VCQUhZLEFBR0MsQUFDYjtnQkFKWSxBQUlOLEFBQ047ZUFMWSxBQUtQLEFBQ0w7b0JBTlksQUFNRixBQUNWOzJCQVBGLEFBQWMsQUFPSyxBQUVwQjtBQVRlLEFBQ1o7QUF6Qk4sQUFDRSxBQUdNLEFBOEJULE9BOUJTLENBSE47QUFtQ0o7Ozs7Ozs7O3lDQUdxQixBQUNuQjtXQUFBLEFBQUssQUFDTjtBQUVEOzs7Ozs7OzsyQ0FHdUIsQUFDckI7V0FBQSxBQUFLLGNBQUwsQUFBbUIsQUFDcEI7QUFFRDs7Ozs7Ozs7d0NBR29CLEFBQ2xCO0FBQ0E7QUFDQTtVQUFJLGNBQWMsS0FBQSxBQUFLLEtBQXZCLEFBQTRCLEFBQzVCO2FBQUEsQUFBTyx3QkFBd0IsQUFDN0I7YUFBQSxBQUFLLEFBQ047QUFGa0IsT0FBQSxDQUFBLEFBRWpCLEtBRkYsQUFBbUIsQUFFWixPQUZQLEFBRWMsQUFDZjtBQUVEOzs7Ozs7Ozt5Q0FHcUIsQUFDbkI7VUFBSSxVQUFVLElBQUEsQUFBSSxRQUFRLEVBQUMsU0FBM0IsQUFBYyxBQUFZLEFBQVUsQUFDcEM7VUFBSSxPQUFPLEtBQUEsQUFBSyxZQUFZLEtBQUEsQUFBSyxNQUF0QixBQUE0QixNQUF2QyxBQUFXLEFBQWtDLEFBQzdDO2NBQUEsQUFBUSxJQUFSLEFBQVksZ0JBSE8sQUFHbkIsQUFBNEI7O3NDQUhUOzhCQUFBOzJCQUFBOztVQUtuQjt3REFBcUIsS0FBQSxBQUFLLE1BQTFCLEFBQWdDLDJIQUFpQjtjQUF4QyxBQUF3QyxpQkFDL0M7O2NBQUksT0FBTyxLQUFBLEFBQUssWUFBWSxTQUFqQixBQUEwQixNQUFyQyxBQUFXLEFBQWdDLEFBRTNDOztrQkFBQSxBQUFRLElBQUksa0JBQWtCLFNBQUEsQUFBUyxLQUF2QyxBQUE0QyxPQUE1QyxBQUFtRCxBQUNwRDtBQVRrQjtvQkFBQTs0QkFBQTt5QkFBQTtnQkFBQTtZQUFBOzhEQUFBO3NCQUFBO0FBQUE7a0JBQUE7aUNBQUE7a0JBQUE7QUFBQTtBQUFBO0FBVXBCOztjQUFBLEFBQVEsQUFDUjtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Z0NBVVksQSxNLEFBQU0sU0FBUyxBQUN6QjtBQUNBO1VBQU0sT0FBTyxDQUFBLEFBQ1gsYUFEVyxBQUNFLGVBREYsQUFDaUIscUJBRGpCLEFBRVgsdUJBRlcsQUFFWSxVQUZaLEFBRXNCLFFBRnRCLEFBRThCLFNBRjlCLEFBRXVDLFFBRnZDLEFBRStDLFFBRjVELEFBQWEsQUFHWCxBQUVGO2NBQUEsQUFBUSxLQUFSLEFBQWEsQUFDYjtVQUFJLFNBQUosQUFBYSxTQUFTLEFBQ3BCO2VBQUEsQUFBTyxBQUNSO0FBRkQsaUJBR1MsU0FBSixBQUFhLGdCQUFnQixBQUNoQztlQUFBLEFBQU8sQUFDUjtBQUZJLE9BQUEsVUFHSSxTQUFKLEFBQWEsY0FBYyxBQUM5QjtlQUFBLEFBQU8sQUFDUjtBQUZJLE9BQUEsVUFHSSxTQUFKLEFBQWEsZ0JBQWdCLEFBQ2hDO2VBQUEsQUFBTyxBQUNSO0FBRkksT0FBQSxVQUdJLFNBQUosQUFBYSxpQkFBaUIsQUFDakM7ZUFBQSxBQUFPLEFBQ1I7QUFGSSxPQUFBLE1BR0EsSUFBSSxTQUFKLEFBQWEsV0FBVyxBQUMzQjtlQUFBLEFBQU8sQUFDUjtBQUVEOztBQUNBO1VBQUksWUFBSixBQUFnQixNQUFNLEFBQ3BCO1lBQUksY0FBYyxJQUFsQixBQUFrQixBQUFJLEFBQ3RCO1lBQUksUUFBUSxZQUFaLEFBQVksQUFBWSxBQUN4QjtZQUFJLFNBQUEsQUFBUyxLQUFLLFNBQWxCLEFBQTJCLElBQUksQUFDN0I7Y0FBSSxTQUFKLEFBQWEsZ0JBQWdCLEFBQzNCO21CQUFBLEFBQU8sQUFDUjtBQUNGO0FBSkQsZUFLSyxBQUNIO2NBQUksU0FBQSxBQUFTLGNBQWMsU0FBM0IsQUFBb0MsYUFBYSxBQUMvQzttQkFBQSxBQUFPLEFBQ1I7QUFGRCxpQkFHSyxJQUFJLFNBQUosQUFBYSxnQkFBZ0IsQUFDaEM7bUJBQUEsQUFBTyxBQUNSO0FBQ0Y7QUFDRjtBQUVEOzthQUFBLEFBQU8sQUFDUjtBQUVEOzs7Ozs7Ozs7NkJBSVMsQUFDUDtVQUFNLE1BQU0sS0FBQSxBQUFLLE1BQWpCLEFBQXVCLEFBQ3ZCO1VBQU0sWUFBWSxLQUFBLEFBQUssTUFBdkIsQUFBNkIsQUFDN0I7VUFBSSxRQUFKLEFBQVksQUFFWjs7NkJBQ0UsY0FBQTs0Q0FBQSxBQUFlOztvQkFBZjtzQkFBQSxBQUNFO0FBREY7QUFBQSxPQUFBLGtCQUNFLGNBQUE7NENBQUEsQUFBZTs7b0JBQWY7c0JBQUE7QUFBQTtBQUFBLFNBREYsQUFDRSxBQUNBLDJCQUFBLGNBQUE7NENBQUEsQUFBZTs7b0JBQWY7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsY0FBQTs0Q0FBQSxBQUFlOztvQkFBZjtzQkFBQSxBQUFnQztBQUFoQztBQUFBLGNBQWdDLEFBQUssTUFBckMsQUFBMkMsYUFEN0MsQUFDRSxBQUNBLHlCQUFBLGNBQUE7NENBQUEsQUFBZTs7b0JBQWY7c0JBQUEsQUFDRTtBQURGO0FBQUEsbURBQ1UsSUFBUixBQUFXLDJCQUFYOztvQkFBQTtzQkFISixBQUVFLEFBQ0UsQUFFRjtBQUZFOzJCQUVGLGNBQUE7NENBQUEsQUFBZTs7b0JBQWY7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsY0FBQTttQkFBQTs7b0JBQUE7c0JBQUEsQUFBSztBQUFMO0FBQUEsY0FBSyxBQUFLLE1BUmhCLEFBRUUsQUFLRSxBQUNFLEFBQWdCLEFBSXBCLHNDQUFBLGNBQUE7NENBQUEsQUFBZTs7b0JBQWY7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsY0FBQTs0Q0FBQSxBQUFlOztvQkFBZjtzQkFBQSxBQUNJO0FBREo7QUFBQSxjQUNJLEFBQUssTUFBTCxBQUFXLFlBQVgsQUFBdUIsSUFBSSxVQUFBLEFBQVMsTUFBTSxBQUMxQztZQUFNLFVBQVUsS0FBQSxBQUFLLEtBQXJCLEFBQTBCLEFBQzFCO1lBQU0sYUFBYSxLQUFBLEFBQUssTUFBTSxVQUFBLEFBQVUsTUFBeEMsQUFBbUIsQUFBMkIsQUFFOUM7O1lBQUksT0FBTyxLQUFBLEFBQUssUUFBaEIsQUFBd0IsQUFDeEI7WUFBSSxVQUFKLEFBQWMsQUFDZDtZQUFJLFFBQUEsQUFBUSxLQUFLLFFBQWpCLEFBQXlCLElBQUksQUFDM0I7b0JBQUEsQUFBVSxBQUNYO0FBQ0Q7WUFBSSxPQUFKLEFBQVcsSUFBSSxBQUNiO2lCQUFPLE9BQVAsQUFBYyxBQUNmO0FBQ0Q7K0JBQ0UsY0FBQSxTQUFLLEtBQU0sS0FBQSxBQUFLLFFBQWhCLEFBQXdCLDJDQUF4QixBQUEwQzs7c0JBQTFDO3dCQUFBLEFBQ0U7QUFERjtTQUFBLGtCQUNFLGNBQUE7OENBQUEsQUFBZTs7c0JBQWY7d0JBQUE7QUFBQTtBQUFBLFdBQStCLEtBQS9CLFNBREYsQUFDRSxBQUNBLDZDQUEwQyxPQUFPLEVBQUMsUUFBUSxhQUExRCxBQUFpRCxBQUFzQiw2Q0FBdkQsaUJBQWhCLEFBQWlDLFdBQWpDOztzQkFBQTt3QkFGRixBQUVFLEFBQ0E7QUFEQTs0QkFDQSxjQUFBOzhDQUFBLEFBQWU7O3NCQUFmO3dCQUFBO0FBQUE7QUFBQSxXQUErQixLQUEvQixNQUpKLEFBQ0UsQUFHRSxBQUdMO0FBckJMLEFBQ0UsQUFDSSxBQXNCSiwyQkFBQSxjQUFBOzRDQUFBLEFBQWU7O29CQUFmO3NCQUFBLEFBQ0k7QUFESjtBQUFBLGNBQ0ksQUFBSyxNQUFMLEFBQVcsZ0JBQVgsQUFBMkIsSUFBSSxVQUFBLEFBQVMsVUFBVSxBQUNoRDtZQUFNLFVBQVUsS0FBQSxBQUFLLE1BQU0sU0FBQSxBQUFTLEtBQVQsQUFBYyxhQUFkLEFBQTJCLE1BQXRELEFBQWdCLEFBQTRDLEFBQzVEO1lBQU0sVUFBVSxLQUFBLEFBQUssTUFBTSxTQUFBLEFBQVMsSUFBVCxBQUFhLGFBQWIsQUFBMEIsTUFBckQsQUFBZ0IsQUFBMkMsQUFDM0Q7K0JBQ0UsY0FBQSxTQUFLLEtBQU0sU0FBQSxBQUFTLEtBQXBCLEFBQXlCLDJDQUF6QixBQUEyQzs7c0JBQTNDO3dCQUFBLEFBQ0U7QUFERjtTQUFBLGtCQUNFLGNBQUE7OENBQUEsQUFBZTs7c0JBQWY7d0JBQUEsQUFBK0I7QUFBL0I7QUFBQSxvQkFBK0IsQUFBUyxLQUQxQyxBQUNFLEFBQTZDLEFBQzdDLDBCQUFBLGNBQUE7OENBQUEsQUFBZTs7c0JBQWY7d0JBQUEsQUFBbUM7QUFBbkM7QUFBQSxxREFBMkMsSUFBSyxrQkFBa0IsU0FBQSxBQUFTLEtBQXhDLEFBQTZDLGtCQUE3Qzs7c0JBQUE7d0JBRnJDLEFBRUUsQUFBbUMsQUFDbkM7QUFEbUM7NkJBQ25DLGNBQUE7OENBQUEsQUFBZTs7c0JBQWY7d0JBQUEsQUFBc0I7QUFBdEI7QUFBQSwyQkFBc0IsY0FBQTs4Q0FBQSxBQUFnQjs7c0JBQWhCO3dCQUFBLEFBQTRCO0FBQTVCO0FBQUEsb0JBQTRCLEFBQVMsS0FBM0QsQUFBc0IsQUFBMEMsYUFBc0IsdUJBQUEsY0FBQTs4Q0FBQSxBQUFnQjs7c0JBQWhCO3dCQUFBLEFBQTRCO0FBQTVCO0FBQUEsb0JBQTRCLEFBQVMsSUFKL0gsQUFDRSxBQUdFLEFBQXNGLEFBQXlDLEFBSXBJO0FBaERULEFBWUUsQUF3QkUsQUFDSTtpQkFyQ1I7YUFERixBQUNFLEFBcUtIO0FBcktHOzs7OztFQXpLK0IsZ0JBQU0sQTs7a0JBQXRCLEEiLCJmaWxlIjoiV2VhdGhlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9ieW5ncmVlbi9TaXRlcy9pbmZvLXNjcmVlbiJ9