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

var dev = process.env.NODE_ENV !== 'prod';

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

        var splicedhourlyTemps = hourlyTemps;
        splicedhourlyTemps.splice(30);

        // Find the max temperature.
        var max = Math.max.apply(null, (0, _keys2.default)(weather.data.hourly_forecast).map(function (e) {
          return weather.data.hourly_forecast[e].temp.english;
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
        window.setInterval(function () {
          self.getWeatherData();
        }.bind(this), refreshTime);
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
        className: 'jsx-3118224844' + ' ' + 'weather',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 183
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-3118224844' + ' ' + 'location',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 184
        }
      }, 'Conway'), _react2.default.createElement('div', {
        className: 'jsx-3118224844' + ' ' + 'wrapper',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 185
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-3118224844' + ' ' + 'current-temp',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 186
        }
      }, this.state.currentTemp, '\xB0'), _react2.default.createElement('div', {
        className: 'jsx-3118224844' + ' ' + 'current-weather',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 187
        }
      }, _react2.default.createElement('canvas', { id: 'weather-icon', className: 'jsx-3118224844',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 188
        }
      })), _react2.default.createElement('div', {
        className: 'jsx-3118224844' + ' ' + 'current-conditions',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 190
        }
      }, _react2.default.createElement('p', {
        className: 'jsx-3118224844',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 191
        }
      }, this.state.currentConditions))), _react2.default.createElement('div', {
        className: 'jsx-3118224844' + ' ' + 'tempsForecastWrapper',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 195
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-3118224844' + ' ' + 'temps',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 196
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
        return _react2.default.createElement('div', { key: temp.FCTTIME.epoch, className: 'jsx-3118224844' + ' ' + 'tempContainer',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 210
          }
        }, _react2.default.createElement('div', {
          className: 'jsx-3118224844' + ' ' + 'hourlyTemp',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 211
          }
        }, ' ', newTemp, ' '), _react2.default.createElement('div', { style: { height: thisHeight + 'px' }, className: 'jsx-3118224844' + ' ' + ("hourlyGraph " + daytime || ''),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 212
          }
        }), _react2.default.createElement('div', {
          className: 'jsx-3118224844' + ' ' + 'hourlyTime',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 213
          }
        }, ' ', time, ' '));
      })), _react2.default.createElement('div', {
        className: 'jsx-3118224844' + ' ' + 'forecast',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 219
        }
      }, this.state.splicedForecast.map(function (forecast) {
        var hiWidth = Math.round(forecast.high.fahrenheit / 125 * 225);
        var loWidth = Math.round(forecast.low.fahrenheit / 125 * 225);
        return _react2.default.createElement('div', { key: forecast.date.epoch, className: 'jsx-3118224844' + ' ' + 'forecastDay',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 224
          }
        }, _react2.default.createElement('div', {
          className: 'jsx-3118224844' + ' ' + 'forecastDOW',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 225
          }
        }, forecast.date.weekday), _react2.default.createElement('div', {
          className: 'jsx-3118224844' + ' ' + 'forecastCondition',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 226
          }
        }, _react2.default.createElement('canvas', { id: "weather-icon-" + forecast.date.epoch, className: 'jsx-3118224844',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 226
          }
        })), _react2.default.createElement('div', {
          className: 'jsx-3118224844' + ' ' + 'hiLo',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 227
          }
        }, _react2.default.createElement('span', {
          className: 'jsx-3118224844' + ' ' + 'hiLo-hi',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 227
          }
        }, forecast.high.fahrenheit), ' / ', _react2.default.createElement('span', {
          className: 'jsx-3118224844' + ' ' + 'hiLo-lo',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 227
          }
        }, forecast.low.fahrenheit)));
      }))), _react2.default.createElement(_style2.default, {
        styleId: '3118224844',
        css: '.weather.jsx-3118224844{font-family:\'SST-light\';color:#fff;text-shadow:1px 1px rgba(0,0,0,0.25);}.weather.jsx-3118224844 .wrapper.jsx-3118224844{margin-top:15px;}.location.jsx-3118224844{font-family:\'SST-condensed\';font-size:3rem;border-bottom:1px solid #fff;padding-bottom:3px;}.current-temp.jsx-3118224844{font-size:10rem;float:left;width:25%;margin-top:-40px;text-align:right;}.current-weather.jsx-3118224844{float:left;width:25%;}.current-weather.jsx-3118224844 canvas.jsx-3118224844{width:175px;}.current-conditions.jsx-3118224844{float:left;width:50%;font-family:\'SST-condensed\';font-size:2.5em;}.tempsForecastWrapper.jsx-3118224844{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;clear:both;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-align-items:flex-start;-webkit-box-align:flex-start;-ms-flex-align:flex-start;align-items:flex-start;margin-top:135px;}.temps.jsx-3118224844{width:75%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;font-family:\'SST-condensed\';}.tempContainer.jsx-3118224844{float:left;width:12px;margin-right:10px;-webkit-align-self:flex-end;-ms-flex-item-align:end;align-self:flex-end;}.hourlyGraph.jsx-3118224844{background:white;}.hourlyTime.jsx-3118224844{text-align:center;}.daytime.jsx-3118224844{background:rgba(244,247,45,0.5);border:1px solid rgba(255,255,255,0.5);}.nighttime.jsx-3118224844{background:rgba(0,100,255,0.5);border:1px solid rgba(255,255,255,0.5);}.forecast.jsx-3118224844{width:25%;margin-top:-2.5em;}.forecastDay.jsx-3118224844{font-family:\'SST-condensed\';display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end;margin-bottom:10px;}.forecastHiLo-Hi.jsx-3118224844{margin-right:10px;background:rgba(244,247,45,0.5);border:1px solid rgba(255,255,255,0.5);height:10px;}.forecastDOW.jsx-3118224844{font-size:2em;text-align:center;text-shadow:1px 1px 2px rgba(0,0,0,0.75);}.forecastHiLo-Lo.jsx-3118224844{background:rgba(0,100,255,0.5);border:1px solid rgba(255,255,255,0.5);height:10px;margin-right:10px;}.forecastCondition.jsx-3118224844{text-align:center;}.forecastCondition.jsx-3118224844 canvas.jsx-3118224844{width:75px;}.hiLo.jsx-3118224844{font-size:1.25em;}.hiLo-hi.jsx-3118224844{color:#e4c21a;font-size:1.5em;}.hiLo-lo.jsx-3118224844{color:rgba(85,151,255,0.76);font-size:1.25em;}'
      }));
    }
  }]);

  return Weather;
}(_react2.default.Component);

exports.default = Weather;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiX2pzeEZpbGVOYW1lIiwiZGV2IiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiV2VhdGhlciIsIl9SZWFjdCRDb21wb25lbnQiLCJfdGhpcyIsIl9fcHJvdG9fXyIsImNhbGwiLCJzdGF0ZSIsImN1cnJlbnRUZW1wIiwiY3VycmVudENvbmRpdGlvbnMiLCJmb3JlY2FzdCIsImhvdXJseVRlbXBzIiwibWF4IiwibWluIiwibWF4SGVpZ2h0IiwibnVtRm9yZWNhc3QiLCJzcGxpY2VkRm9yZWNhc3QiLCJ3ZWF0aGVyRGF0YVVSTCIsIndlYXRoZXJEYXRhVVJMRGV2Iiwia2V5IiwidmFsdWUiLCJnZXRXZWF0aGVyRGF0YSIsInNlbGYiLCJzZXJ2ZXJSZXF1ZXN0IiwiYWxsIiwiZ2V0IiwidGhlbiIsInNwcmVhZCIsIndlYXRoZXIiLCJkYXRhIiwidHh0X2ZvcmVjYXN0IiwiZm9yZWNhc3RkYXkiLCJmY3R0ZXh0IiwiTWF0aCIsInJvdW5kIiwiY3VycmVudF9vYnNlcnZhdGlvbiIsInRlbXBfZiIsImhvdXJseV9mb3JlY2FzdCIsInNpbXBsZWZvcmVjYXN0IiwiaWNvbiIsInNwbGljZSIsInNwbGljZWRob3VybHlUZW1wcyIsImFwcGx5IiwibWFwIiwiZSIsInRlbXAiLCJlbmdsaXNoIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsTW91bnQiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImFib3J0IiwiY29tcG9uZW50RGlkTW91bnQiLCJyZWZyZXNoVGltZSIsIndpbmRvdyIsInNldEludGVydmFsIiwiYmluZCIsImNvbXBvbmVudERpZFVwZGF0ZSIsInNreWNvbnMiLCJTa3ljb25zIiwiY29udmVydEljb24iLCJzZXQiLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uIiwiX2RpZEl0ZXJhdG9yRXJyb3IiLCJfaXRlcmF0b3JFcnJvciIsInVuZGVmaW5lZCIsIl9pdGVyYXRvciIsIl9zdGVwIiwibmV4dCIsImRvbmUiLCJkYXRlIiwiZXBvY2giLCJlcnIiLCJyZXR1cm4iLCJwbGF5IiwiZGF5dGltZSIsImxpc3QiLCJjb25zb2xlIiwiaW5mbyIsImN1cnJlbnRkYXRlIiwiRGF0ZSIsImhvdXJzIiwiZ2V0SG91cnMiLCJyZW5kZXIiLCJjb3VudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJfX3NvdXJjZSIsImZpbGVOYW1lIiwibGluZU51bWJlciIsImlkIiwibmV3VGVtcCIsInRoaXNIZWlnaHQiLCJ0aW1lIiwiRkNUVElNRSIsImhvdXIiLCJzdHlsZSIsImhlaWdodCIsImhpV2lkdGgiLCJoaWdoIiwiZmFocmVuaGVpdCIsImxvV2lkdGgiLCJsb3ciLCJ3ZWVrZGF5Iiwic3R5bGVJZCIsImNzcyIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFIQSxJQUFJQSxlQUFlLDJEQUFuQjs7QUFJQSxJQUFJQyxNQUFNQyxRQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsTUFBbkM7O0FBRUEsSUFBSUMsVUFBVSxVQUFVQyxnQkFBVixFQUE0QjtBQUN4QywwQkFBVUQsT0FBVixFQUFtQkMsZ0JBQW5COztBQUVBLFdBQVNELE9BQVQsR0FBbUI7QUFDakIsa0NBQWdCLElBQWhCLEVBQXNCQSxPQUF0Qjs7QUFFQTtBQUNBLFFBQUlFLFFBQVEseUNBQTJCLElBQTNCLEVBQWlDLENBQUNGLFFBQVFHLFNBQVIsSUFBcUIsOEJBQXVCSCxPQUF2QixDQUF0QixFQUF1REksSUFBdkQsQ0FBNEQsSUFBNUQsQ0FBakMsQ0FBWjs7QUFFQUYsVUFBTUcsS0FBTixHQUFjO0FBQ1pDLG1CQUFhLEVBREQ7QUFFWkMseUJBQW1CLEVBRlA7QUFHWkMsZ0JBQVUsRUFIRTtBQUlaQyxtQkFBYSxFQUpEO0FBS1pDLFdBQUssR0FMTztBQU1aQyxXQUFLLENBQUMsR0FOTTtBQU9aQyxp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WixnQkFBTXVHLFNBbmNNLENBQWQ7O2tCQXFjZXZHLE8iLCJmaWxlIjoidW5rbm93biIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IF9nZXRJdGVyYXRvciBmcm9tICdiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yJztcbmltcG9ydCBfT2JqZWN0JGtleXMgZnJvbSAnYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzJztcbmltcG9ydCBfT2JqZWN0JGdldFByb3RvdHlwZU9mIGZyb20gJ2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZic7XG5pbXBvcnQgX2NsYXNzQ2FsbENoZWNrIGZyb20gJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjayc7XG5pbXBvcnQgX2NyZWF0ZUNsYXNzIGZyb20gJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcyc7XG5pbXBvcnQgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4gZnJvbSAnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nO1xuaW1wb3J0IF9pbmhlcml0cyBmcm9tICdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnO1xudmFyIF9qc3hGaWxlTmFtZSA9ICcvVXNlcnMvcm9ieW5ncmVlbi9TaXRlcy9pbmZvLXNjcmVlbi9jb21wb25lbnRzL1dlYXRoZXIuanMnO1xuaW1wb3J0IF9KU1hTdHlsZSBmcm9tICdzdHlsZWQtanN4L3N0eWxlJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xudmFyIGRldiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZCc7XG5cbnZhciBXZWF0aGVyID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFdlYXRoZXIsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIFdlYXRoZXIoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFdlYXRoZXIpO1xuXG4gICAgLy8gU2V0IGRlZmF1bHRzLlxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChXZWF0aGVyLl9fcHJvdG9fXyB8fCBfT2JqZWN0JGdldFByb3RvdHlwZU9mKFdlYXRoZXIpKS5jYWxsKHRoaXMpKTtcblxuICAgIF90aGlzLnN0YXRlID0ge1xuICAgICAgY3VycmVudFRlbXA6ICcnLFxuICAgICAgY3VycmVudENvbmRpdGlvbnM6ICcnLFxuICAgICAgZm9yZWNhc3Q6IFtdLFxuICAgICAgaG91cmx5VGVtcHM6IFtdLFxuICAgICAgbWF4OiA1MDAsXG4gICAgICBtaW46IC01MDAsXG4gICAgICBtYXhIZWlnaHQ6IDc1LFxuICAgICAgbnVtRm9yZWNhc3Q6IDMsXG4gICAgICBzcGxpY2VkRm9yZWNhc3Q6IFtdLFxuICAgICAgd2VhdGhlckRhdGFVUkw6ICdodHRwOi8vYXBpLnd1bmRlcmdyb3VuZC5jb20vYXBpLzEzZDNhZGNhOWRkMTFkNjMvaG91cmx5L2NvbmRpdGlvbnMvZm9yZWNhc3QxMGRheS9xL0FSL0NvbndheS5qc29uJyxcbiAgICAgIHdlYXRoZXJEYXRhVVJMRGV2OiAnL3NjcmlwdHMvQ29ud2F5Lmpzb24nXG4gICAgfTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoV2VhdGhlciwgW3tcbiAgICBrZXk6ICdnZXRXZWF0aGVyRGF0YScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldFdlYXRoZXJEYXRhKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdGhpcy5zZXJ2ZXJSZXF1ZXN0ID0gYXhpb3MuYWxsKFtheGlvcy5nZXQodGhpcy5zdGF0ZS53ZWF0aGVyRGF0YVVSTCldKS50aGVuKGF4aW9zLnNwcmVhZChmdW5jdGlvbiAod2VhdGhlcikge1xuICAgICAgICB2YXIgY3VycmVudENvbmRpdGlvbnMgPSB3ZWF0aGVyLmRhdGEuZm9yZWNhc3QudHh0X2ZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmZjdHRleHQ7XG4gICAgICAgIHZhciBjdXJyZW50VGVtcCA9IE1hdGgucm91bmQod2VhdGhlci5kYXRhLmN1cnJlbnRfb2JzZXJ2YXRpb24udGVtcF9mKTtcbiAgICAgICAgdmFyIGhvdXJseVRlbXBzID0gd2VhdGhlci5kYXRhLmhvdXJseV9mb3JlY2FzdDtcbiAgICAgICAgdmFyIGZvcmVjYXN0ID0gd2VhdGhlci5kYXRhLmZvcmVjYXN0LnNpbXBsZWZvcmVjYXN0LmZvcmVjYXN0ZGF5O1xuICAgICAgICB2YXIgaWNvbiA9IHdlYXRoZXIuZGF0YS5mb3JlY2FzdC50eHRfZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaWNvbjtcblxuICAgICAgICAvLyBTcGxpY2UgdGhlIGZvcmVjYXN0LlxuICAgICAgICB2YXIgc3BsaWNlZEZvcmVjYXN0ID0gZm9yZWNhc3Q7XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgZmlyc3Qgb25lICh0b2RheSkuXG4gICAgICAgIHNwbGljZWRGb3JlY2FzdC5zcGxpY2UoMCwgMSk7XG4gICAgICAgIC8vIE9ubHkgc2hvdyBmaXZlIGl0ZW1zLlxuICAgICAgICBzcGxpY2VkRm9yZWNhc3Quc3BsaWNlKHNlbGYuc3RhdGUubnVtRm9yZWNhc3QpO1xuXG4gICAgICAgIHZhciBzcGxpY2VkaG91cmx5VGVtcHMgPSBob3VybHlUZW1wcztcbiAgICAgICAgc3BsaWNlZGhvdXJseVRlbXBzLnNwbGljZSgzMCk7XG5cbiAgICAgICAgLy8gRmluZCB0aGUgbWF4IHRlbXBlcmF0dXJlLlxuICAgICAgICB2YXIgbWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgX09iamVjdCRrZXlzKHdlYXRoZXIuZGF0YS5ob3VybHlfZm9yZWNhc3QpLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHJldHVybiB3ZWF0aGVyLmRhdGEuaG91cmx5X2ZvcmVjYXN0W2VdLnRlbXAuZW5nbGlzaDtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHNlbGYuc2V0U3RhdGUoe1xuICAgICAgICAgIGN1cnJlbnRDb25kaXRpb25zOiBjdXJyZW50Q29uZGl0aW9ucyxcbiAgICAgICAgICBjdXJyZW50VGVtcDogY3VycmVudFRlbXAsXG4gICAgICAgICAgaG91cmx5VGVtcHM6IHNwbGljZWRob3VybHlUZW1wcyxcbiAgICAgICAgICBpY29uOiBpY29uLFxuICAgICAgICAgIG1heDogbWF4LFxuICAgICAgICAgIGZvcmVjYXN0OiBmb3JlY2FzdCxcbiAgICAgICAgICBzcGxpY2VkRm9yZWNhc3Q6IHNwbGljZWRGb3JlY2FzdFxuICAgICAgICB9KTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcmVjYWxsIGJlZm9yZSByZW5kZXIuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudFdpbGxNb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIHRoaXMuZ2V0V2VhdGhlckRhdGEoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGl0ZW1zIHdoZW4gdW5tb3VudGVkLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjb21wb25lbnRXaWxsVW5tb3VudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgdGhpcy5zZXJ2ZXJSZXF1ZXN0LmFib3J0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW5ldmVyIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY29tcG9uZW50RGlkTW91bnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIC8vIE9ubHkgcmVmcmVzaCBvbiBwcm9kLlxuICAgICAgaWYgKCFkZXYpIHtcbiAgICAgICAgLy8gSW4gbWlsbGlzZWNvbmRzLCBzbyAqIDEwMDAgdG8gZW5kLlxuICAgICAgICAvLyA2MCBtaW51dGVzICogNjAgc2Vjb25kcyAqIDEwMDAgbWlsbGlzZWNvbmRzLlxuICAgICAgICB2YXIgcmVmcmVzaFRpbWUgPSAxNSAqIDYwICogMTAwMDtcbiAgICAgICAgd2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzZWxmLmdldFdlYXRoZXJEYXRhKCk7XG4gICAgICAgIH0uYmluZCh0aGlzKSwgcmVmcmVzaFRpbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuZXZlciB0aGUgZG9tIGlzIHVwZGF0ZWQuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NvbXBvbmVudERpZFVwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgIHZhciBza3ljb25zID0gbmV3IFNreWNvbnMoeyAnY29sb3InOiAnd2hpdGUnIH0pO1xuICAgICAgdmFyIGljb24gPSB0aGlzLmNvbnZlcnRJY29uKHRoaXMuc3RhdGUuaWNvbiwgdHJ1ZSk7XG4gICAgICBza3ljb25zLnNldCgnd2VhdGhlci1pY29uJywgaWNvbik7XG5cbiAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBfZ2V0SXRlcmF0b3IodGhpcy5zdGF0ZS5zcGxpY2VkRm9yZWNhc3QpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgdmFyIGZvcmVjYXN0ID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICB2YXIgaWNvbiA9IHRoaXMuY29udmVydEljb24oZm9yZWNhc3QuaWNvbiwgZmFsc2UpO1xuXG4gICAgICAgICAgc2t5Y29ucy5zZXQoJ3dlYXRoZXItaWNvbi0nICsgZm9yZWNhc3QuZGF0ZS5lcG9jaCwgaWNvbik7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBza3ljb25zLnBsYXkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBXVW5kZXJncm91bmQgaWNvbnMgdG8gc2t5Y29ucy5cbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9IG9yaWdpbmFsXG4gICAgICogICBJY29uIHN0cmluZyB0byBjb252ZXJ0LlxuICAgICAqIEBwYXJhbSAge2Jvb2x9IGRheXRpbWVcbiAgICAgKiAgIFNob3VsZCB1c2UgZGF5dGltZSB2cyBuaWdodHRpbWUgY29udmVyc2lvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKiAgIENvbnZlcnRlZCBpY29uIHN0cmluZy5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY29udmVydEljb24nLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb252ZXJ0SWNvbihpY29uLCBkYXl0aW1lKSB7XG4gICAgICAvLyBUaGUgc2t5Y29ucyBsaXN0LlxuICAgICAgdmFyIGxpc3QgPSBbXCJjbGVhci1kYXlcIiwgXCJjbGVhci1uaWdodFwiLCBcInBhcnRseS1jbG91ZHktZGF5XCIsIFwicGFydGx5LWNsb3VkeS1uaWdodFwiLCBcImNsb3VkeVwiLCBcInJhaW5cIiwgXCJzbGVldFwiLCBcInNub3dcIiwgXCJ3aW5kXCIsIFwiZm9nXCJdO1xuICAgICAgY29uc29sZS5pbmZvKGljb24pO1xuICAgICAgaWYgKGljb24gPT09ICdjbGVhcicpIHtcbiAgICAgICAgaWNvbiA9ICdjbGVhci1kYXknO1xuICAgICAgfSBlbHNlIGlmIChpY29uID09PSAncGFydGx5Y2xvdWR5Jykge1xuICAgICAgICBpY29uID0gJ3BhcnRseS1jbG91ZHktZGF5JztcbiAgICAgIH0gZWxzZSBpZiAoaWNvbiA9PT0gJ2NoYW5jZXJhaW4nKSB7XG4gICAgICAgIGljb24gPSAncmFpbic7XG4gICAgICB9IGVsc2UgaWYgKGljb24gPT09ICdtb3N0bHljbG91ZHknKSB7XG4gICAgICAgIGljb24gPSAnY2xvdWR5JztcbiAgICAgIH0gZWxzZSBpZiAoaWNvbiA9PT0gJ2NoYW5jZXRzdG9ybXMnKSB7XG4gICAgICAgIGljb24gPSAncmFpbic7XG4gICAgICB9IGVsc2UgaWYgKGljb24gPT09ICd0c3Rvcm1zJykge1xuICAgICAgICBpY29uID0gJ3JhaW4nO1xuICAgICAgfVxuXG4gICAgICAvLyBDb252ZXJ0IGZvciBkYXl0aW1lIHZzIG5pZ2h0dGltZS5cbiAgICAgIGlmIChkYXl0aW1lID09PSB0cnVlKSB7XG4gICAgICAgIHZhciBjdXJyZW50ZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciBob3VycyA9IGN1cnJlbnRkYXRlLmdldEhvdXJzKCk7XG4gICAgICAgIGlmIChob3VycyA+PSA2ICYmIGhvdXJzIDw9IDE5KSB7XG4gICAgICAgICAgaWYgKGljb24gPT09ICdwYXJ0bHljbG91ZHknKSB7XG4gICAgICAgICAgICBpY29uID0gJ3BhcnRseS1jbG91ZHktZGF5JztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGljb24gPT09ICdudF9jbGVhcicgfHwgaWNvbiA9PT0gJ2NsZWFyLWRheScpIHtcbiAgICAgICAgICAgIGljb24gPSAnY2xlYXItbmlnaHQnO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaWNvbiA9PT0gJ3BhcnRseWNsb3VkeScpIHtcbiAgICAgICAgICAgIGljb24gPSAncGFydGx5LWNsb3VkeS1uaWdodCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpY29uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbmRlcnMgbWFya3VwXG4gICAgICogQHJldHVybiBzdHJpbmcgQW55IGh0bWxcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgdmFyIG1heCA9IHRoaXMuc3RhdGUubWF4O1xuICAgICAgdmFyIG1heEhlaWdodCA9IHRoaXMuc3RhdGUubWF4SGVpZ2h0O1xuICAgICAgdmFyIGNvdW50ID0gMDtcblxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7XG4gICAgICAgICAgY2xhc3NOYW1lOiAnanN4LTMxMTgyMjQ4NDQnICsgJyAnICsgJ3dlYXRoZXInLFxuICAgICAgICAgIF9fc291cmNlOiB7XG4gICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgICAgbGluZU51bWJlcjogMTgzXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICdkaXYnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2pzeC0zMTE4MjI0ODQ0JyArICcgJyArICdsb2NhdGlvbicsXG4gICAgICAgICAgICBfX3NvdXJjZToge1xuICAgICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgICAgICBsaW5lTnVtYmVyOiAxODRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgICdDb253YXknXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgJ2RpdicsXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiAnanN4LTMxMTgyMjQ4NDQnICsgJyAnICsgJ3dyYXBwZXInLFxuICAgICAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgICAgICAgbGluZU51bWJlcjogMTg1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2pzeC0zMTE4MjI0ODQ0JyArICcgJyArICdjdXJyZW50LXRlbXAnLFxuICAgICAgICAgICAgICBfX3NvdXJjZToge1xuICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBfanN4RmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgbGluZU51bWJlcjogMTg2XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRUZW1wLFxuICAgICAgICAgICAgJ1xceEIwJ1xuICAgICAgICAgICksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjbGFzc05hbWU6ICdqc3gtMzExODIyNDg0NCcgKyAnICcgKyAnY3VycmVudC13ZWF0aGVyJyxcbiAgICAgICAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IDE4N1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnY2FudmFzJywgeyBpZDogJ3dlYXRoZXItaWNvbicsIGNsYXNzTmFtZTogJ2pzeC0zMTE4MjI0ODQ0JyxcbiAgICAgICAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IDE4OFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICksXG4gICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjbGFzc05hbWU6ICdqc3gtMzExODIyNDg0NCcgKyAnICcgKyAnY3VycmVudC1jb25kaXRpb25zJyxcbiAgICAgICAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IDE5MFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgJ3AnLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnanN4LTMxMTgyMjQ4NDQnLFxuICAgICAgICAgICAgICAgIF9fc291cmNlOiB7XG4gICAgICAgICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgICAgICAgICAgbGluZU51bWJlcjogMTkxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB0aGlzLnN0YXRlLmN1cnJlbnRDb25kaXRpb25zXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICdkaXYnLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2pzeC0zMTE4MjI0ODQ0JyArICcgJyArICd0ZW1wc0ZvcmVjYXN0V3JhcHBlcicsXG4gICAgICAgICAgICBfX3NvdXJjZToge1xuICAgICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgICAgICBsaW5lTnVtYmVyOiAxOTVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnanN4LTMxMTgyMjQ4NDQnICsgJyAnICsgJ3RlbXBzJyxcbiAgICAgICAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IDE5NlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5ob3VybHlUZW1wcy5tYXAoZnVuY3Rpb24gKHRlbXApIHtcbiAgICAgICAgICAgICAgdmFyIG5ld1RlbXAgPSB0ZW1wLnRlbXAuZW5nbGlzaDtcbiAgICAgICAgICAgICAgdmFyIHRoaXNIZWlnaHQgPSBNYXRoLnJvdW5kKG5ld1RlbXAgLyBtYXggKiBtYXhIZWlnaHQpO1xuXG4gICAgICAgICAgICAgIHZhciB0aW1lID0gdGVtcC5GQ1RUSU1FLmhvdXI7XG4gICAgICAgICAgICAgIHZhciBkYXl0aW1lID0gJ25pZ2h0dGltZSc7XG4gICAgICAgICAgICAgIGlmICh0aW1lID49IDYgJiYgdGltZSA8PSAxOSkge1xuICAgICAgICAgICAgICAgIGRheXRpbWUgPSAnZGF5dGltZSc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHRpbWUgPiAxMikge1xuICAgICAgICAgICAgICAgIHRpbWUgPSB0aW1lIC0gMTI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgeyBrZXk6IHRlbXAuRkNUVElNRS5lcG9jaCwgY2xhc3NOYW1lOiAnanN4LTMxMTgyMjQ4NDQnICsgJyAnICsgJ3RlbXBDb250YWluZXInLFxuICAgICAgICAgICAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGluZU51bWJlcjogMjEwXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2pzeC0zMTE4MjI0ODQ0JyArICcgJyArICdob3VybHlUZW1wJyxcbiAgICAgICAgICAgICAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IDIxMVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgICAgbmV3VGVtcCxcbiAgICAgICAgICAgICAgICAgICcgJ1xuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnZGl2JywgeyBzdHlsZTogeyBoZWlnaHQ6IHRoaXNIZWlnaHQgKyAncHgnIH0sIGNsYXNzTmFtZTogJ2pzeC0zMTE4MjI0ODQ0JyArICcgJyArIChcImhvdXJseUdyYXBoIFwiICsgZGF5dGltZSB8fCAnJyksXG4gICAgICAgICAgICAgICAgICBfX3NvdXJjZToge1xuICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiAyMTJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2pzeC0zMTE4MjI0ODQ0JyArICcgJyArICdob3VybHlUaW1lJyxcbiAgICAgICAgICAgICAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IDIxM1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgICAgdGltZSxcbiAgICAgICAgICAgICAgICAgICcgJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSxcbiAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2pzeC0zMTE4MjI0ODQ0JyArICcgJyArICdmb3JlY2FzdCcsXG4gICAgICAgICAgICAgIF9fc291cmNlOiB7XG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiAyMTlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuc3BsaWNlZEZvcmVjYXN0Lm1hcChmdW5jdGlvbiAoZm9yZWNhc3QpIHtcbiAgICAgICAgICAgICAgdmFyIGhpV2lkdGggPSBNYXRoLnJvdW5kKGZvcmVjYXN0LmhpZ2guZmFocmVuaGVpdCAvIDEyNSAqIDIyNSk7XG4gICAgICAgICAgICAgIHZhciBsb1dpZHRoID0gTWF0aC5yb3VuZChmb3JlY2FzdC5sb3cuZmFocmVuaGVpdCAvIDEyNSAqIDIyNSk7XG4gICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHsga2V5OiBmb3JlY2FzdC5kYXRlLmVwb2NoLCBjbGFzc05hbWU6ICdqc3gtMzExODIyNDg0NCcgKyAnICcgKyAnZm9yZWNhc3REYXknLFxuICAgICAgICAgICAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbGluZU51bWJlcjogMjI0XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2pzeC0zMTE4MjI0ODQ0JyArICcgJyArICdmb3JlY2FzdERPVycsXG4gICAgICAgICAgICAgICAgICAgIF9fc291cmNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiAyMjVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGZvcmVjYXN0LmRhdGUud2Vla2RheVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdqc3gtMzExODIyNDg0NCcgKyAnICcgKyAnZm9yZWNhc3RDb25kaXRpb24nLFxuICAgICAgICAgICAgICAgICAgICBfX3NvdXJjZToge1xuICAgICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBfanN4RmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgbGluZU51bWJlcjogMjI2XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdjYW52YXMnLCB7IGlkOiBcIndlYXRoZXItaWNvbi1cIiArIGZvcmVjYXN0LmRhdGUuZXBvY2gsIGNsYXNzTmFtZTogJ2pzeC0zMTE4MjI0ODQ0JyxcbiAgICAgICAgICAgICAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogX2pzeEZpbGVOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IDIyNlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdqc3gtMzExODIyNDg0NCcgKyAnICcgKyAnaGlMbycsXG4gICAgICAgICAgICAgICAgICAgIF9fc291cmNlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiAyMjdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2pzeC0zMTE4MjI0ODQ0JyArICcgJyArICdoaUxvLWhpJyxcbiAgICAgICAgICAgICAgICAgICAgICBfX3NvdXJjZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IF9qc3hGaWxlTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVOdW1iZXI6IDIyN1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3QuaGlnaC5mYWhyZW5oZWl0XG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgJyAvICcsXG4gICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdqc3gtMzExODIyNDg0NCcgKyAnICcgKyAnaGlMby1sbycsXG4gICAgICAgICAgICAgICAgICAgICAgX19zb3VyY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBfanN4RmlsZU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lTnVtYmVyOiAyMjdcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZvcmVjYXN0Lmxvdy5mYWhyZW5oZWl0XG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoX0pTWFN0eWxlLCB7XG4gICAgICAgICAgc3R5bGVJZDogJzMxMTgyMjQ4NDQnLFxuICAgICAgICAgIGNzczogJy53ZWF0aGVyLmpzeC0zMTE4MjI0ODQ0e2ZvbnQtZmFtaWx5OlxcJ1NTVC1saWdodFxcJztjb2xvcjojZmZmO3RleHQtc2hhZG93OjFweCAxcHggcmdiYSgwLDAsMCwwLjI1KTt9LndlYXRoZXIuanN4LTMxMTgyMjQ4NDQgLndyYXBwZXIuanN4LTMxMTgyMjQ4NDR7bWFyZ2luLXRvcDoxNXB4O30ubG9jYXRpb24uanN4LTMxMTgyMjQ4NDR7Zm9udC1mYW1pbHk6XFwnU1NULWNvbmRlbnNlZFxcJztmb250LXNpemU6M3JlbTtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZmZmO3BhZGRpbmctYm90dG9tOjNweDt9LmN1cnJlbnQtdGVtcC5qc3gtMzExODIyNDg0NHtmb250LXNpemU6MTByZW07ZmxvYXQ6bGVmdDt3aWR0aDoyNSU7bWFyZ2luLXRvcDotNDBweDt0ZXh0LWFsaWduOnJpZ2h0O30uY3VycmVudC13ZWF0aGVyLmpzeC0zMTE4MjI0ODQ0e2Zsb2F0OmxlZnQ7d2lkdGg6MjUlO30uY3VycmVudC13ZWF0aGVyLmpzeC0zMTE4MjI0ODQ0IGNhbnZhcy5qc3gtMzExODIyNDg0NHt3aWR0aDoxNzVweDt9LmN1cnJlbnQtY29uZGl0aW9ucy5qc3gtMzExODIyNDg0NHtmbG9hdDpsZWZ0O3dpZHRoOjUwJTtmb250LWZhbWlseTpcXCdTU1QtY29uZGVuc2VkXFwnO2ZvbnQtc2l6ZToyLjVlbTt9LnRlbXBzRm9yZWNhc3RXcmFwcGVyLmpzeC0zMTE4MjI0ODQ0e2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTotd2Via2l0LWZsZXg7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7Y2xlYXI6Ym90aDstd2Via2l0LWZsZXgtZGlyZWN0aW9uOnJvdzstbXMtZmxleC1kaXJlY3Rpb246cm93O2ZsZXgtZGlyZWN0aW9uOnJvdzstd2Via2l0LWFsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7LXdlYmtpdC1ib3gtYWxpZ246ZmxleC1zdGFydDstbXMtZmxleC1hbGlnbjpmbGV4LXN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7bWFyZ2luLXRvcDoxMzVweDt9LnRlbXBzLmpzeC0zMTE4MjI0ODQ0e3dpZHRoOjc1JTtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6LXdlYmtpdC1mbGV4O2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O2ZvbnQtZmFtaWx5OlxcJ1NTVC1jb25kZW5zZWRcXCc7fS50ZW1wQ29udGFpbmVyLmpzeC0zMTE4MjI0ODQ0e2Zsb2F0OmxlZnQ7d2lkdGg6MTJweDttYXJnaW4tcmlnaHQ6MTBweDstd2Via2l0LWFsaWduLXNlbGY6ZmxleC1lbmQ7LW1zLWZsZXgtaXRlbS1hbGlnbjplbmQ7YWxpZ24tc2VsZjpmbGV4LWVuZDt9LmhvdXJseUdyYXBoLmpzeC0zMTE4MjI0ODQ0e2JhY2tncm91bmQ6d2hpdGU7fS5ob3VybHlUaW1lLmpzeC0zMTE4MjI0ODQ0e3RleHQtYWxpZ246Y2VudGVyO30uZGF5dGltZS5qc3gtMzExODIyNDg0NHtiYWNrZ3JvdW5kOnJnYmEoMjQ0LDI0Nyw0NSwwLjUpO2JvcmRlcjoxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjUpO30ubmlnaHR0aW1lLmpzeC0zMTE4MjI0ODQ0e2JhY2tncm91bmQ6cmdiYSgwLDEwMCwyNTUsMC41KTtib3JkZXI6MXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC41KTt9LmZvcmVjYXN0LmpzeC0zMTE4MjI0ODQ0e3dpZHRoOjI1JTttYXJnaW4tdG9wOi0yLjVlbTt9LmZvcmVjYXN0RGF5LmpzeC0zMTE4MjI0ODQ0e2ZvbnQtZmFtaWx5OlxcJ1NTVC1jb25kZW5zZWRcXCc7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5Oi13ZWJraXQtZmxleDtkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWZsZXgtZGlyZWN0aW9uOnJvdzstbXMtZmxleC1kaXJlY3Rpb246cm93O2ZsZXgtZGlyZWN0aW9uOnJvdzstd2Via2l0LWJveC1wYWNrOmVuZDstd2Via2l0LWp1c3RpZnktY29udGVudDpmbGV4LWVuZDstbXMtZmxleC1wYWNrOmVuZDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7bWFyZ2luLWJvdHRvbToxMHB4O30uZm9yZWNhc3RIaUxvLUhpLmpzeC0zMTE4MjI0ODQ0e21hcmdpbi1yaWdodDoxMHB4O2JhY2tncm91bmQ6cmdiYSgyNDQsMjQ3LDQ1LDAuNSk7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuNSk7aGVpZ2h0OjEwcHg7fS5mb3JlY2FzdERPVy5qc3gtMzExODIyNDg0NHtmb250LXNpemU6MmVtO3RleHQtYWxpZ246Y2VudGVyO3RleHQtc2hhZG93OjFweCAxcHggMnB4IHJnYmEoMCwwLDAsMC43NSk7fS5mb3JlY2FzdEhpTG8tTG8uanN4LTMxMTgyMjQ4NDR7YmFja2dyb3VuZDpyZ2JhKDAsMTAwLDI1NSwwLjUpO2JvcmRlcjoxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjUpO2hlaWdodDoxMHB4O21hcmdpbi1yaWdodDoxMHB4O30uZm9yZWNhc3RDb25kaXRpb24uanN4LTMxMTgyMjQ4NDR7dGV4dC1hbGlnbjpjZW50ZXI7fS5mb3JlY2FzdENvbmRpdGlvbi5qc3gtMzExODIyNDg0NCBjYW52YXMuanN4LTMxMTgyMjQ4NDR7d2lkdGg6NzVweDt9LmhpTG8uanN4LTMxMTgyMjQ4NDR7Zm9udC1zaXplOjEuMjVlbTt9LmhpTG8taGkuanN4LTMxMTgyMjQ4NDR7Y29sb3I6I2U0YzIxYTtmb250LXNpemU6MS41ZW07fS5oaUxvLWxvLmpzeC0zMTE4MjI0ODQ0e2NvbG9yOnJnYmEoODUsMTUxLDI1NSwwLjc2KTtmb250LXNpemU6MS4yNWVtO30nXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBXZWF0aGVyO1xufShSZWFjdC5Db21wb25lbnQpO1xuXG5leHBvcnQgZGVmYXVsdCBXZWF0aGVyOyJdfQ==
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsiX2pzeEZpbGVOYW1lIiwiZGV2IiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiV2VhdGhlciIsIl9SZWFjdCRDb21wb25lbnQiLCJfdGhpcyIsIl9fcHJvdG9fXyIsImNhbGwiLCJzdGF0ZSIsImN1cnJlbnRUZW1wIiwiY3VycmVudENvbmRpdGlvbnMiLCJmb3JlY2FzdCIsImhvdXJseVRlbXBzIiwibWF4IiwibWluIiwibWF4SGVpZ2h0IiwibnVtRm9yZWNhc3QiLCJzcGxpY2VkRm9yZWNhc3QiLCJ3ZWF0aGVyRGF0YVVSTCIsIndlYXRoZXJEYXRhVVJMRGV2Iiwia2V5IiwidmFsdWUiLCJnZXRXZWF0aGVyRGF0YSIsInNlbGYiLCJzZXJ2ZXJSZXF1ZXN0IiwiYWxsIiwiZ2V0IiwidGhlbiIsInNwcmVhZCIsIndlYXRoZXIiLCJkYXRhIiwidHh0X2ZvcmVjYXN0IiwiZm9yZWNhc3RkYXkiLCJmY3R0ZXh0IiwiTWF0aCIsInJvdW5kIiwiY3VycmVudF9vYnNlcnZhdGlvbiIsInRlbXBfZiIsImhvdXJseV9mb3JlY2FzdCIsInNpbXBsZWZvcmVjYXN0IiwiaWNvbiIsInNwbGljZSIsInNwbGljZWRob3VybHlUZW1wcyIsImFwcGx5IiwibWFwIiwiZSIsInRlbXAiLCJlbmdsaXNoIiwic2V0U3RhdGUiLCJjb21wb25lbnRXaWxsTW91bnQiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsImFib3J0IiwiY29tcG9uZW50RGlkTW91bnQiLCJyZWZyZXNoVGltZSIsIndpbmRvdyIsInNldEludGVydmFsIiwiYmluZCIsImNvbXBvbmVudERpZFVwZGF0ZSIsInNreWNvbnMiLCJTa3ljb25zIiwiY29udmVydEljb24iLCJzZXQiLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uIiwiX2RpZEl0ZXJhdG9yRXJyb3IiLCJfaXRlcmF0b3JFcnJvciIsInVuZGVmaW5lZCIsIl9pdGVyYXRvciIsIl9zdGVwIiwibmV4dCIsImRvbmUiLCJkYXRlIiwiZXBvY2giLCJlcnIiLCJyZXR1cm4iLCJwbGF5IiwiZGF5dGltZSIsImxpc3QiLCJjb25zb2xlIiwiaW5mbyIsImN1cnJlbnRkYXRlIiwiRGF0ZSIsImhvdXJzIiwiZ2V0SG91cnMiLCJyZW5kZXIiLCJjb3VudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJfX3NvdXJjZSIsImZpbGVOYW1lIiwibGluZU51bWJlciIsImlkIiwibmV3VGVtcCIsInRoaXNIZWlnaHQiLCJ0aW1lIiwiRkNUVElNRSIsImhvdXIiLCJzdHlsZSIsImhlaWdodCIsImhpV2lkdGgiLCJoaWdoIiwiZmFocmVuaGVpdCIsImxvV2lkdGgiLCJsb3ciLCJ3ZWVrZGF5Iiwic3R5bGVJZCIsImNzcyIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFIQSxJQUFJQSxlQUFlLDJEQUFuQjs7QUFJQSxJQUFJQyxNQUFNQyxRQUFRQyxHQUFSLENBQVlDLFFBQVosS0FBeUIsTUFBbkM7O0FBRUEsSUFBSUMsVUFBVSxVQUFVQyxnQkFBVixFQUE0QjtBQUN4QywwQkFBVUQsT0FBVixFQUFtQkMsZ0JBQW5COztBQUVBLFdBQVNELE9BQVQsR0FBbUI7QUFDakIsa0NBQWdCLElBQWhCLEVBQXNCQSxPQUF0Qjs7QUFFQTtBQUNBLFFBQUlFLFFBQVEseUNBQTJCLElBQTNCLEVBQWlDLENBQUNGLFFBQVFHLFNBQVIsSUFBcUIsOEJBQXVCSCxPQUF2QixDQUF0QixFQUF1REksSUFBdkQsQ0FBNEQsSUFBNUQsQ0FBakMsQ0FBWjs7QUFFQUYsVUFBTUcsS0FBTixHQUFjO0FBQ1pDLG1CQUFhLEVBREQ7QUFFWkMseUJBQW1CLEVBRlA7QUFHWkMsZ0JBQVUsRUFIRTtBQUlaQyxtQkFBYSxFQUpEO0FBS1pDLFdBQUssR0FMTztBQU1aQyxXQUFLLENBQUMsR0FOTTtBQU9aQyxp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