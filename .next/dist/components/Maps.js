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


var Maps = function (_React$Component) {
  (0, _inherits3.default)(Maps, _React$Component);

  function Maps() {
    (0, _classCallCheck3.default)(this, Maps);

    // Set defaults.
    var _this = (0, _possibleConstructorReturn3.default)(this, (Maps.__proto__ || (0, _getPrototypeOf2.default)(Maps)).call(this));

    _this.state = {
      center: { lat: 34.8915512, lng: -92.3031572 },
      zoom: 9,
      radar: 'http://api.wunderground.com/api/13d3adca9dd11d63/animatedradar/q/AR/Conway.png?width=500&height=250&newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50&smooth=1&noclutter=1&rainsnow=1'
    };
    return _this;
  }

  (0, _createClass3.default)(Maps, [{
    key: 'render',
    value: function render() {
      var radarIMG = _react2.default.createElement('img', { src: this.state.radar });
      return _react2.default.createElement('div', {
        className: 'jsx-1584397802' + ' ' + 'map-wrapper',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-1584397802' + ' ' + 'weather-map map',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }, radarIMG), _react2.default.createElement('div', {
        className: 'jsx-1584397802' + ' ' + 'traffic-map map',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }, _react2.default.createElement(_googleMapReact2.default, {
        bootstrapURLKeys: { key: "AIzaSyDOzStmGXlCBYxgCKLPruGgqQGGxIfnIaI" },
        className: 'traffic-map map',
        defaultCenter: this.state.center,
        defaultZoom: this.state.zoom,
        layerTypes: ['TrafficLayer'], __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      })), _react2.default.createElement(_style2.default, {
        styleId: '1584397802',
        css: '.map-wrapper.jsx-1584397802{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;position:absolute;bottom:25px;}.map.jsx-1584397802{width:500px;border:1px solid white;height:250px;margin:0 20px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWFwcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxQ29CLEFBRzBCLEFBTUQsWUFDVyx1QkFDVixhQUNDLGNBQUMsWUFSUSxtR0FDTCxrQkFDTixZQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvTWFwcy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9ieW5ncmVlbi9TaXRlcy9pbmZvLXNjcmVlbiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEdvb2dsZU1hcCBmcm9tICdnb29nbGUtbWFwLXJlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvLyBTZXQgZGVmYXVsdHMuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGNlbnRlcjoge2xhdDogMzQuODkxNTUxMiwgbG5nOiAtOTIuMzAzMTU3Mn0sXG4gICAgICB6b29tOiA5LFxuICAgICAgcmFkYXI6ICdodHRwOi8vYXBpLnd1bmRlcmdyb3VuZC5jb20vYXBpLzEzZDNhZGNhOWRkMTFkNjMvYW5pbWF0ZWRyYWRhci9xL0FSL0NvbndheS5wbmc/d2lkdGg9NTAwJmhlaWdodD0yNTAmbmV3bWFwcz0xJnRpbWVsYWJlbD0xJnRpbWVsYWJlbC55PTEwJm51bT01JmRlbGF5PTUwJnNtb290aD0xJm5vY2x1dHRlcj0xJnJhaW5zbm93PTEnXG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgcmFkYXJJTUcgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgJ2ltZycsXG4gICAgICB7IHNyYzogdGhpcy5zdGF0ZS5yYWRhciB9XG4gICAgKTtcbiAgICByZXR1cm4gKFxuICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hcC13cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2VhdGhlci1tYXAgbWFwXCI+XG4gICAgICAgICAgeyByYWRhcklNRyB9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHJhZmZpYy1tYXAgbWFwXCI+XG4gICAgICAgICAgPEdvb2dsZU1hcFxuICAgICAgICAgICAgYm9vdHN0cmFwVVJMS2V5cz17eyBrZXk6IFwiQUl6YVN5RE96U3RtR1hsQ0JZeGdDS0xQcnVHZ3FRR0d4SWZuSWFJXCIgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInRyYWZmaWMtbWFwIG1hcFwiXG4gICAgICAgICAgICBkZWZhdWx0Q2VudGVyPXt0aGlzLnN0YXRlLmNlbnRlcn1cbiAgICAgICAgICAgIGRlZmF1bHRab29tPXt0aGlzLnN0YXRlLnpvb219XG4gICAgICAgICAgICBsYXllclR5cGVzPXtbJ1RyYWZmaWNMYXllciddfT5cbiAgICAgICAgICA8L0dvb2dsZU1hcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgICAubWFwLXdyYXBwZXIge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgYm90dG9tOiAyNXB4OyB9XG5cbiAgICAgICAgICAubWFwIHtcbiAgICAgICAgICAgIHdpZHRoOiA1MDBweDtcbiAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xuICAgICAgICAgICAgaGVpZ2h0OiAyNTBweDtcbiAgICAgICAgICAgIG1hcmdpbjogMCAyMHB4OyB9XG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */\n/*@ sourceURL=components/Maps.js */'
      }));
    }
  }]);

  return Maps;
}(_react2.default.Component);

exports.default = Maps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvTWFwcy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkdvb2dsZU1hcCIsIk1hcHMiLCJzdGF0ZSIsImNlbnRlciIsImxhdCIsImxuZyIsInpvb20iLCJyYWRhciIsInJhZGFySU1HIiwiY3JlYXRlRWxlbWVudCIsInNyYyIsImtleSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLEFBQU87Ozs7QUFDUCxBQUFPOzs7Ozs7Ozs7SSxBQUVjO2dDQUNuQjs7a0JBQWM7d0NBR1o7O0FBSFk7NEhBSVo7O1VBQUEsQUFBSztjQUNLLEVBQUMsS0FBRCxBQUFNLFlBQVksS0FBSyxDQURwQixBQUNILEFBQXdCLEFBQ2hDO1lBRlcsQUFFTCxBQUNOO2FBUFUsQUFJWixBQUFhLEFBR0o7QUFISSxBQUNYO1dBSUg7Ozs7OzZCQUVRLEFBQ1A7VUFBSSxXQUFXLGdCQUFBLEFBQU0sY0FBTixBQUNiLE9BQ0EsRUFBRSxLQUFLLEtBQUEsQUFBSyxNQUZkLEFBQWUsQUFFYixBQUFrQixBQUVwQjs2QkFDQyxjQUFBOzRDQUFBLEFBQWU7O29CQUFmO3NCQUFBLEFBQ0c7QUFESDtBQUFBLE9BQUEsa0JBQ0csY0FBQTs0Q0FBQSxBQUFlOztvQkFBZjtzQkFBQSxBQUNJO0FBREo7QUFBQSxTQURILEFBQ0csQUFJQSwyQkFBQSxjQUFBOzRDQUFBLEFBQWU7O29CQUFmO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLEFBQUM7MEJBQ21CLEVBQUUsS0FEdEIsQUFDb0IsQUFBTyxBQUN6QjttQkFGRixBQUVZLEFBQ1Y7dUJBQWUsS0FBQSxBQUFLLE1BSHRCLEFBRzRCLEFBQzFCO3FCQUFhLEtBQUEsQUFBSyxNQUpwQixBQUkwQixBQUN4QjtvQkFBWSxDQUxkLEFBS2MsQUFBQztvQkFMZjtzQkFOTCxBQUtHLEFBQ0U7QUFBQTtBQUNFO2lCQVBQO2FBREQsQUFDQyxBQTZCRjtBQTdCRTs7Ozs7RUFsQjZCLGdCQUFNLEE7O2tCQUFuQixBIiwiZmlsZSI6Ik1hcHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYnluZ3JlZW4vU2l0ZXMvaW5mby1zY3JlZW4ifQ==