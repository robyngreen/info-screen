'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _googleMapReact = require('google-map-react');

var _googleMapReact2 = _interopRequireDefault(_googleMapReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/robyngreen/Sites/info-screen/components/Maps.js';

var dev = process.env.NODE_ENV !== 'production';

var Maps = function (_React$Component) {
  (0, _inherits3.default)(Maps, _React$Component);

  function Maps() {
    (0, _classCallCheck3.default)(this, Maps);

    // Set defaults.
    var _this = (0, _possibleConstructorReturn3.default)(this, (Maps.__proto__ || (0, _getPrototypeOf2.default)(Maps)).call(this));

    _this.state = {
      center: { lat: 34.8915512, lng: -92.3031572 },
      zoom: 10,
      radar: 'http://api.wunderground.com/api/13d3adca9dd11d63/animatedradar/q/AR/Conway.png?width=500&height=400&newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50&smooth=1&noclutter=1&rainsnow=1'
    };
    return _this;
  }

  /**
   * Called whenever the component is mounted.
   */

  (0, _createClass3.default)(Maps, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      // Only refresh on prod.
      if (!dev) {
        // In milliseconds, so * 1000 to end.
        // 60 minutes * 60 seconds * 1000 milliseconds.
        var refreshTime = 15 * 60 * 1000;
        window.setInterval(function () {
          self.setState({
            radar: self.state.radar + '&time=' + new Date()
          });
        }.bind(this), refreshTime);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var radarIMG = _react2.default.createElement('img', { src: this.state.radar });
      return _react2.default.createElement('div', {
        className: 'jsx-3694016239' + ' ' + 'map-wrapper',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-3694016239' + ' ' + 'weather-map map',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        }
      }, radarIMG), _react2.default.createElement('div', {
        className: 'jsx-3694016239' + ' ' + 'traffic-map map',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        }
      }, _react2.default.createElement(_googleMapReact2.default, {
        bootstrapURLKeys: { key: "AIzaSyDOzStmGXlCBYxgCKLPruGgqQGGxIfnIaI" },
        className: 'traffic-map map',
        defaultCenter: this.state.center,
        defaultZoom: this.state.zoom,
        layerTypes: ['TrafficLayer'], __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        }
      })), _react2.default.createElement(_style2.default, {
        styleId: '3694016239',
        css: '.map-wrapper.jsx-3694016239{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;position:absolute;bottom:25px;}.map.jsx-3694016239{width:500px;border:1px solid white;height:400px;margin:0 20px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWFwcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3RG9CLEFBRzBCLEFBTUQsWUFDVyx1QkFDVixhQUNDLGNBQUMsWUFSUSxtR0FDTCxrQkFDTixZQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvTWFwcy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9ieW5ncmVlbi9TaXRlcy9pbmZvLXNjcmVlbiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEdvb2dsZU1hcCBmcm9tICdnb29nbGUtbWFwLXJlYWN0JztcbmNvbnN0IGRldiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8gU2V0IGRlZmF1bHRzLlxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjZW50ZXI6IHtsYXQ6IDM0Ljg5MTU1MTIsIGxuZzogLTkyLjMwMzE1NzJ9LFxuICAgICAgem9vbTogMTAsXG4gICAgICByYWRhcjogJ2h0dHA6Ly9hcGkud3VuZGVyZ3JvdW5kLmNvbS9hcGkvMTNkM2FkY2E5ZGQxMWQ2My9hbmltYXRlZHJhZGFyL3EvQVIvQ29ud2F5LnBuZz93aWR0aD01MDAmaGVpZ2h0PTQwMCZuZXdtYXBzPTEmdGltZWxhYmVsPTEmdGltZWxhYmVsLnk9MTAmbnVtPTUmZGVsYXk9NTAmc21vb3RoPTEmbm9jbHV0dGVyPTEmcmFpbnNub3c9MSdcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuZXZlciB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqL1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAvLyBPbmx5IHJlZnJlc2ggb24gcHJvZC5cbiAgICBpZiAoIWRldikge1xuICAgICAgLy8gSW4gbWlsbGlzZWNvbmRzLCBzbyAqIDEwMDAgdG8gZW5kLlxuICAgICAgLy8gNjAgbWludXRlcyAqIDYwIHNlY29uZHMgKiAxMDAwIG1pbGxpc2Vjb25kcy5cbiAgICAgIHZhciByZWZyZXNoVGltZSA9IDE1ICogNjAgKiAxMDAwO1xuICAgICAgd2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5zZXRTdGF0ZSh7XG4gICAgICAgICAgcmFkYXI6IHNlbGYuc3RhdGUucmFkYXIgKyAnJnRpbWU9JyArIG5ldyBEYXRlKCksXG4gICAgICAgIH0pO1xuICAgICAgfS5iaW5kKHRoaXMpLCByZWZyZXNoVGltZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxldCByYWRhcklNRyA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAnaW1nJyxcbiAgICAgIHsgc3JjOiB0aGlzLnN0YXRlLnJhZGFyIH1cbiAgICApO1xuICAgIHJldHVybiAoXG4gICAgIDxkaXYgY2xhc3NOYW1lPVwibWFwLXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3ZWF0aGVyLW1hcCBtYXBcIj5cbiAgICAgICAgICB7IHJhZGFySU1HIH1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0cmFmZmljLW1hcCBtYXBcIj5cbiAgICAgICAgICA8R29vZ2xlTWFwXG4gICAgICAgICAgICBib290c3RyYXBVUkxLZXlzPXt7IGtleTogXCJBSXphU3lET3pTdG1HWGxDQll4Z0NLTFBydUdncVFHR3hJZm5JYUlcIiB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidHJhZmZpYy1tYXAgbWFwXCJcbiAgICAgICAgICAgIGRlZmF1bHRDZW50ZXI9e3RoaXMuc3RhdGUuY2VudGVyfVxuICAgICAgICAgICAgZGVmYXVsdFpvb209e3RoaXMuc3RhdGUuem9vbX1cbiAgICAgICAgICAgIGxheWVyVHlwZXM9e1snVHJhZmZpY0xheWVyJ119PlxuICAgICAgICAgIDwvR29vZ2xlTWFwPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgIC5tYXAtd3JhcHBlciB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICBib3R0b206IDI1cHg7IH1cblxuICAgICAgICAgIC5tYXAge1xuICAgICAgICAgICAgd2lkdGg6IDUwMHB4O1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XG4gICAgICAgICAgICBoZWlnaHQ6IDQwMHB4O1xuICAgICAgICAgICAgbWFyZ2luOiAwIDIwcHg7IH1cbiAgICAgICAgYH08L3N0eWxlPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19 */\n/*@ sourceURL=components/Maps.js */'
      }));
    }
  }]);

  return Maps;
}(_react2.default.Component);

exports.default = Maps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWFwcy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkdvb2dsZU1hcCIsImRldiIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIk1hcHMiLCJzdGF0ZSIsImNlbnRlciIsImxhdCIsImxuZyIsInpvb20iLCJyYWRhciIsInNlbGYiLCJyZWZyZXNoVGltZSIsIndpbmRvdyIsInNldEludGVydmFsIiwic2V0U3RhdGUiLCJEYXRlIiwiYmluZCIsInJhZGFySU1HIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsImtleSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLEFBQU87Ozs7QUFDUCxBQUFPOzs7Ozs7OztBQUNQLElBQU0sTUFBTSxRQUFBLEFBQVEsSUFBUixBQUFZLGFBQXhCLEFBQXFDOztJQUVoQixBO2dDQUNuQjs7a0JBQWM7d0NBR1o7O0FBSFk7NEhBSVo7O1VBQUEsQUFBSztjQUNLLEVBQUMsS0FBRCxBQUFNLFlBQVksS0FBSyxDQURwQixBQUNILEFBQXdCLEFBQ2hDO1lBRlcsQUFFTCxBQUNOO2FBUFUsQUFJWixBQUFhLEFBR0o7QUFISSxBQUNYO1dBSUg7QUFFRDs7Ozs7Ozs7d0NBR29CLEFBQ2xCO1VBQU0sT0FBTixBQUFhLEFBQ2I7QUFDQTtVQUFJLENBQUosQUFBSyxLQUFLLEFBQ1I7QUFDQTtBQUNBO1lBQUksY0FBYyxLQUFBLEFBQUssS0FBdkIsQUFBNEIsQUFDNUI7ZUFBQSxBQUFPLHdCQUF3QixBQUM3QjtlQUFBLEFBQUs7bUJBQ0ksS0FBQSxBQUFLLE1BQUwsQUFBVyxRQUFYLEFBQW1CLFdBQVcsSUFEdkMsQUFBYyxBQUN5QixBQUFJLEFBRTVDO0FBSGUsQUFDWjtBQUZlLFNBQUEsQ0FBQSxBQUlqQixLQUpGLEFBQW1CLEFBSVosT0FKUCxBQUljLEFBQ2Y7QUFDRjs7Ozs2QkFFUSxBQUNQO1VBQUksV0FBVyxnQkFBQSxBQUFNLGNBQU4sQUFDYixPQUNBLEVBQUUsS0FBSyxLQUFBLEFBQUssTUFGZCxBQUFlLEFBRWIsQUFBa0IsQUFFcEI7NkJBQ0MsY0FBQTs0Q0FBQSxBQUFlOztvQkFBZjtzQkFBQSxBQUNHO0FBREg7QUFBQSxPQUFBLGtCQUNHLGNBQUE7NENBQUEsQUFBZTs7b0JBQWY7c0JBQUEsQUFDSTtBQURKO0FBQUEsU0FESCxBQUNHLEFBSUEsMkJBQUEsY0FBQTs0Q0FBQSxBQUFlOztvQkFBZjtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxBQUFDOzBCQUNtQixFQUFFLEtBRHRCLEFBQ29CLEFBQU8sQUFDekI7bUJBRkYsQUFFWSxBQUNWO3VCQUFlLEtBQUEsQUFBSyxNQUh0QixBQUc0QixBQUMxQjtxQkFBYSxLQUFBLEFBQUssTUFKcEIsQUFJMEIsQUFDeEI7b0JBQVksQ0FMZCxBQUtjLEFBQUM7b0JBTGY7c0JBTkwsQUFLRyxBQUNFO0FBQUE7QUFDRTtpQkFQUDthQURELEFBQ0MsQUE2QkY7QUE3QkU7Ozs7O0VBcEM2QixnQkFBTSxBOztrQkFBbkIsQSIsImZpbGUiOiJNYXBzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2J5bmdyZWVuL1NpdGVzL2luZm8tc2NyZWVuIn0=