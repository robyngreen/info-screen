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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/robyngreen/Sites/info-screen/components/Time.js';


var Time = function (_React$Component) {
  (0, _inherits3.default)(Time, _React$Component);

  function Time() {
    (0, _classCallCheck3.default)(this, Time);

    return (0, _possibleConstructorReturn3.default)(this, (Time.__proto__ || (0, _getPrototypeOf2.default)(Time)).call(this));
  }

  /**
   * Sets all the time variables.
   */

  (0, _createClass3.default)(Time, [{
    key: 'setTime',
    value: function setTime() {

      var currentdate = new Date();
      var hours = currentdate.getHours();
      var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var day = currentdate.getDay();

      var ampm = 'a.m.';
      // Correct for number over 24, and negatives.
      if (hours > 12) {
        hours -= 12;
        ampm = 'p.m.';
      }

      // minutes are the same on every time zone
      var minutes = currentdate.getUTCMinutes();

      // add leading zero, first convert hours to string
      minutes = minutes + "";
      if (minutes.length == 1) {
        minutes = "0" + minutes;
      }

      this.setState({
        dow: week[day],
        month: month[currentdate.getMonth()],
        day: currentdate.getDate(),
        hours: hours,
        minutes: minutes,
        ampm: ampm
      });
    }

    /**
     * Right before it's set, process some items.
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setTime();
    }

    /**
     * Called whenever the component is mounted.
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.setInterval(function () {
        this.setTime();
      }.bind(this), 1000);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', {
        className: 'jsx-233036096' + ' ' + 'time',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-233036096' + ' ' + 'dow-month-day',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      }, this.state.dow, ', ', this.state.month, ' ', this.state.day), _react2.default.createElement('div', {
        className: 'jsx-233036096' + ' ' + 'current-time',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        }
      }, this.state.hours, ':', this.state.minutes, ' ', this.state.ampm), _react2.default.createElement(_style2.default, {
        styleId: '233036096',
        css: '.time.jsx-233036096{font-family:\'SST-light\';color:#fff;text-shadow:1px 1px rgba(0,0,0,0.25);margin-top:20px;padding-right:10px;}.dow-month-day.jsx-233036096{font-family:\'SST-condensed\';text-align:right;font-size:4rem;margin:-20px 0;}.current-time.jsx-233036096{text-align:right;font-size:7rem;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvVGltZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpRW9CLEFBR3FDLEFBT0ksQUFNWCxpQkFDRixPQWJKLElBT00sSUFNRCxHQVp3QixVQU96QixlQUNBLFlBUEMsR0FPQSxhQU5HLG1CQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvVGltZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9ieW5ncmVlbi9TaXRlcy9pbmZvLXNjcmVlbiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGFsbCB0aGUgdGltZSB2YXJpYWJsZXMuXG4gICAqL1xuICBzZXRUaW1lKCkge1xuXG4gICAgdmFyIGN1cnJlbnRkYXRlID0gbmV3IERhdGUoKTtcbiAgICB2YXIgaG91cnMgPSBjdXJyZW50ZGF0ZS5nZXRIb3VycygpO1xuICAgIHZhciB3ZWVrID0gWyAnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknIF07XG4gICAgdmFyIG1vbnRoID0gWyBcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCIgXTtcbiAgICB2YXIgZGF5ID0gY3VycmVudGRhdGUuZ2V0RGF5KCk7XG5cbiAgICB2YXIgYW1wbSA9ICdhLm0uJ1xuICAgIC8vIENvcnJlY3QgZm9yIG51bWJlciBvdmVyIDI0LCBhbmQgbmVnYXRpdmVzLlxuICAgIGlmICggaG91cnMgPiAxMiApIHtcbiAgICAgIGhvdXJzIC09IDEyO1xuICAgICAgYW1wbSA9ICdwLm0uJ1xuICAgIH1cblxuICAgIC8vIG1pbnV0ZXMgYXJlIHRoZSBzYW1lIG9uIGV2ZXJ5IHRpbWUgem9uZVxuICAgIHZhciBtaW51dGVzID0gY3VycmVudGRhdGUuZ2V0VVRDTWludXRlcygpO1xuXG4gICAgLy8gYWRkIGxlYWRpbmcgemVybywgZmlyc3QgY29udmVydCBob3VycyB0byBzdHJpbmdcbiAgICBtaW51dGVzID0gbWludXRlcyArIFwiXCI7XG4gICAgaWYoIG1pbnV0ZXMubGVuZ3RoID09IDEgKXsgbWludXRlcyA9IFwiMFwiICsgbWludXRlczsgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkb3c6IHdlZWtbZGF5XSxcbiAgICAgIG1vbnRoOiBtb250aFtjdXJyZW50ZGF0ZS5nZXRNb250aCgpXSxcbiAgICAgIGRheTogY3VycmVudGRhdGUuZ2V0RGF0ZSgpLFxuICAgICAgaG91cnM6IGhvdXJzLFxuICAgICAgbWludXRlczogbWludXRlcyxcbiAgICAgIGFtcG06IGFtcG1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSaWdodCBiZWZvcmUgaXQncyBzZXQsIHByb2Nlc3Mgc29tZSBpdGVtcy5cbiAgICovXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpe1xuICAgIHRoaXMuc2V0VGltZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuZXZlciB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqL1xuICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgIHdpbmRvdy5zZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNldFRpbWUoKTtcbiAgICB9LmJpbmQodGhpcyksIDEwMDApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkb3ctbW9udGgtZGF5XCI+eyB0aGlzLnN0YXRlLmRvdyB9LCB7IHRoaXMuc3RhdGUubW9udGggfSB7IHRoaXMuc3RhdGUuZGF5IH08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjdXJyZW50LXRpbWVcIj57IHRoaXMuc3RhdGUuaG91cnMgfTp7IHRoaXMuc3RhdGUubWludXRlcyB9IHsgdGhpcy5zdGF0ZS5hbXBtIH08L2Rpdj5cbiAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgIC50aW1lIHtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnU1NULWxpZ2h0JztcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICAgICAgdGV4dC1zaGFkb3c6IDFweCAxcHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDIwcHg7XG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4OyB9XG5cbiAgICAgICAgICAuZG93LW1vbnRoLWRheSB7XG4gICAgICAgICAgICBmb250LWZhbWlseTogJ1NTVC1jb25kZW5zZWQnO1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgICAgICBmb250LXNpemU6IDRyZW07XG4gICAgICAgICAgICBtYXJnaW46IC0yMHB4IDA7IH1cblxuICAgICAgICAgIC5jdXJyZW50LXRpbWUge1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgICAgICBmb250LXNpemU6IDdyZW07IH1cbiAgICAgICAgYH08L3N0eWxlPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19 */\n/*@ sourceURL=components/Time.js */'
      }));
    }
  }]);

  return Time;
}(_react2.default.Component);

exports.default = Time;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvVGltZS5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlRpbWUiLCJjdXJyZW50ZGF0ZSIsIkRhdGUiLCJob3VycyIsImdldEhvdXJzIiwid2VlayIsIm1vbnRoIiwiZGF5IiwiZ2V0RGF5IiwiYW1wbSIsIm1pbnV0ZXMiLCJnZXRVVENNaW51dGVzIiwibGVuZ3RoIiwic2V0U3RhdGUiLCJkb3ciLCJnZXRNb250aCIsImdldERhdGUiLCJzZXRUaW1lIiwid2luZG93Iiwic2V0SW50ZXJ2YWwiLCJiaW5kIiwic3RhdGUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxBQUFPOzs7Ozs7Ozs7SUFFYyxBO2dDQUNuQjs7a0JBQWM7d0NBQUE7O3VIQUViO0FBRUQ7Ozs7Ozs7OzhCQUdVLEFBRVI7O1VBQUksY0FBYyxJQUFsQixBQUFrQixBQUFJLEFBQ3RCO1VBQUksUUFBUSxZQUFaLEFBQVksQUFBWSxBQUN4QjtVQUFJLE9BQU8sQ0FBQSxBQUFFLFVBQUYsQUFBWSxVQUFaLEFBQXNCLFdBQXRCLEFBQWlDLGFBQWpDLEFBQThDLFlBQTlDLEFBQTBELFVBQXJFLEFBQVcsQUFBb0UsQUFDL0U7VUFBSSxRQUFRLENBQUEsQUFBRSxXQUFGLEFBQWEsWUFBYixBQUF5QixTQUF6QixBQUFrQyxTQUFsQyxBQUEyQyxPQUEzQyxBQUFrRCxRQUFsRCxBQUEwRCxRQUExRCxBQUFrRSxVQUFsRSxBQUE0RSxhQUE1RSxBQUF5RixXQUF6RixBQUFvRyxZQUFoSCxBQUFZLEFBQWdILEFBQzVIO1VBQUksTUFBTSxZQUFWLEFBQVUsQUFBWSxBQUV0Qjs7VUFBSSxPQUFKLEFBQVcsQUFDWDtBQUNBO1VBQUssUUFBTCxBQUFhLElBQUssQUFDaEI7aUJBQUEsQUFBUyxBQUNUO2VBQUEsQUFBTyxBQUNSO0FBRUQ7O0FBQ0E7VUFBSSxVQUFVLFlBQWQsQUFBYyxBQUFZLEFBRTFCOztBQUNBO2dCQUFVLFVBQVYsQUFBb0IsQUFDcEI7VUFBSSxRQUFBLEFBQVEsVUFBWixBQUFzQixHQUFHLEFBQUU7a0JBQVUsTUFBVixBQUFnQixBQUFVO0FBRXJEOztXQUFBLEFBQUs7YUFDRSxLQURPLEFBQ1AsQUFBSyxBQUNWO2VBQU8sTUFBTSxZQUZELEFBRUwsQUFBTSxBQUFZLEFBQ3pCO2FBQUssWUFITyxBQUdQLEFBQVksQUFDakI7ZUFKWSxBQUlMLEFBQ1A7aUJBTFksQUFLSCxBQUNUO2NBTkYsQUFBYyxBQU1OLEFBRVQ7QUFSZSxBQUNaO0FBU0o7Ozs7Ozs7O3lDQUdvQixBQUNsQjtXQUFBLEFBQUssQUFDTjtBQUVEOzs7Ozs7Ozt3Q0FHbUIsQUFDakI7YUFBQSxBQUFPLHdCQUF3QixBQUM3QjthQUFBLEFBQUssQUFDTjtBQUZrQixPQUFBLENBQUEsQUFFakIsS0FGRixBQUFtQixBQUVaLE9BRlAsQUFFYyxBQUNmOzs7OzZCQUVRLEFBQ1A7NkJBQ0UsY0FBQTsyQ0FBQSxBQUFlOztvQkFBZjtzQkFBQSxBQUNFO0FBREY7QUFBQSxPQUFBLGtCQUNFLGNBQUE7MkNBQUEsQUFBZTs7b0JBQWY7c0JBQUEsQUFBaUM7QUFBakM7QUFBQSxjQUFpQyxBQUFLLE1BQXRDLEFBQTRDLEtBQVMsV0FBQSxBQUFLLE1BQTFELEFBQWdFLE9BQVUsVUFBQSxBQUFLLE1BRGpGLEFBQ0UsQUFBcUYsQUFDckYsc0JBQUEsY0FBQTsyQ0FBQSxBQUFlOztvQkFBZjtzQkFBQSxBQUFnQztBQUFoQztBQUFBLGNBQWdDLEFBQUssTUFBckMsQUFBMkMsT0FBVSxVQUFBLEFBQUssTUFBMUQsQUFBZ0UsU0FBWSxVQUFBLEFBQUssTUFGbkYsQUFFRSxBQUF1RjtpQkFGekY7YUFERixBQUNFLEFBdUJIO0FBdkJHOzs7OztFQTFENEIsZ0JBQU0sQTs7a0JBQW5CLEEiLCJmaWxlIjoiVGltZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9ieW5ncmVlbi9TaXRlcy9pbmZvLXNjcmVlbiJ9