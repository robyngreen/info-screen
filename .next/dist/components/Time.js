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

    // Bind class to non-react class. See
    // https://github.com/goatslacker/alt/issues/283
    // Otherwise `this.{reactMethod}` will fail.
    var _this = (0, _possibleConstructorReturn3.default)(this, (Time.__proto__ || (0, _getPrototypeOf2.default)(Time)).call(this));

    _this.setTime = _this.setTime.bind(_this);
    return _this;
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

      // Minutes are the same on every time zone.
      var minutes = currentdate.getUTCMinutes();

      // Add leading zero, first convert hours to string.
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
      setInterval(this.setTime, 1000);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', {
        className: 'jsx-1010494720' + ' ' + 'time',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        }
      }, _react2.default.createElement('div', {
        className: 'jsx-1010494720' + ' ' + 'dow-month-day',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, this.state.dow, ', ', this.state.month, ' ', this.state.day), _react2.default.createElement('div', {
        className: 'jsx-1010494720' + ' ' + 'current-time',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        }
      }, this.state.hours, ':', this.state.minutes, ' ', this.state.ampm), _react2.default.createElement(_style2.default, {
        styleId: '1010494720',
        css: '.time.jsx-1010494720{font-family:\'SST-light\';color:#fff;text-shadow:1px 1px rgba(0,0,0,0.25);margin-top:20px;padding-right:10px;}.dow-month-day.jsx-1010494720{font-family:\'SST-condensed\';text-align:right;font-size:3rem;margin:-20px 0;}.current-time.jsx-1010494720{text-align:right;font-size:5rem;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvVGltZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtRW9CLEFBR3FDLEFBT0ksQUFNWCxpQkFDRixPQWJKLElBT00sSUFNRCxHQVp3QixVQU96QixlQUNBLFlBUEMsR0FPQSxhQU5HLG1CQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvVGltZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9ieW5ncmVlbi9TaXRlcy9pbmZvLXNjcmVlbiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIEJpbmQgY2xhc3MgdG8gbm9uLXJlYWN0IGNsYXNzLiBTZWVcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZ29hdHNsYWNrZXIvYWx0L2lzc3Vlcy8yODNcbiAgICAvLyBPdGhlcndpc2UgYHRoaXMue3JlYWN0TWV0aG9kfWAgd2lsbCBmYWlsLlxuICAgIHRoaXMuc2V0VGltZSA9IHRoaXMuc2V0VGltZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYWxsIHRoZSB0aW1lIHZhcmlhYmxlcy5cbiAgICovXG4gIHNldFRpbWUoKSB7XG4gICAgdmFyIGN1cnJlbnRkYXRlID0gbmV3IERhdGUoKTtcbiAgICB2YXIgaG91cnMgPSBjdXJyZW50ZGF0ZS5nZXRIb3VycygpO1xuICAgIHZhciB3ZWVrID0gWyAnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknIF07XG4gICAgdmFyIG1vbnRoID0gWyBcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCIgXTtcbiAgICB2YXIgZGF5ID0gY3VycmVudGRhdGUuZ2V0RGF5KCk7XG5cbiAgICB2YXIgYW1wbSA9ICdhLm0uJ1xuICAgIC8vIENvcnJlY3QgZm9yIG51bWJlciBvdmVyIDI0LCBhbmQgbmVnYXRpdmVzLlxuICAgIGlmICggaG91cnMgPiAxMiApIHtcbiAgICAgIGhvdXJzIC09IDEyO1xuICAgICAgYW1wbSA9ICdwLm0uJ1xuICAgIH1cblxuICAgIC8vIE1pbnV0ZXMgYXJlIHRoZSBzYW1lIG9uIGV2ZXJ5IHRpbWUgem9uZS5cbiAgICB2YXIgbWludXRlcyA9IGN1cnJlbnRkYXRlLmdldFVUQ01pbnV0ZXMoKTtcblxuICAgIC8vIEFkZCBsZWFkaW5nIHplcm8sIGZpcnN0IGNvbnZlcnQgaG91cnMgdG8gc3RyaW5nLlxuICAgIG1pbnV0ZXMgPSBtaW51dGVzICsgXCJcIjtcbiAgICBpZiggbWludXRlcy5sZW5ndGggPT0gMSApeyBtaW51dGVzID0gXCIwXCIgKyBtaW51dGVzOyB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRvdzogd2Vla1tkYXldLFxuICAgICAgbW9udGg6IG1vbnRoW2N1cnJlbnRkYXRlLmdldE1vbnRoKCldLFxuICAgICAgZGF5OiBjdXJyZW50ZGF0ZS5nZXREYXRlKCksXG4gICAgICBob3VyczogaG91cnMsXG4gICAgICBtaW51dGVzOiBtaW51dGVzLFxuICAgICAgYW1wbTogYW1wbVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJpZ2h0IGJlZm9yZSBpdCdzIHNldCwgcHJvY2VzcyBzb21lIGl0ZW1zLlxuICAgKi9cbiAgY29tcG9uZW50V2lsbE1vdW50KCl7XG4gICAgdGhpcy5zZXRUaW1lKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW5ldmVyIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICovXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHNldEludGVydmFsKHRoaXMuc2V0VGltZSwgMTAwMCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRvdy1tb250aC1kYXlcIj57IHRoaXMuc3RhdGUuZG93IH0sIHsgdGhpcy5zdGF0ZS5tb250aCB9IHsgdGhpcy5zdGF0ZS5kYXkgfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImN1cnJlbnQtdGltZVwiPnsgdGhpcy5zdGF0ZS5ob3VycyB9OnsgdGhpcy5zdGF0ZS5taW51dGVzIH0geyB0aGlzLnN0YXRlLmFtcG0gfTwvZGl2PlxuICAgICAgICA8c3R5bGUganN4PntgXG4gICAgICAgICAgLnRpbWUge1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICdTU1QtbGlnaHQnO1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7IH1cblxuICAgICAgICAgIC5kb3ctbW9udGgtZGF5IHtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnU1NULWNvbmRlbnNlZCc7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogM3JlbTtcbiAgICAgICAgICAgIG1hcmdpbjogLTIwcHggMDsgfVxuXG4gICAgICAgICAgLmN1cnJlbnQtdGltZSB7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNXJlbTsgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0= */\n/*@ sourceURL=components/Time.js */'
      }));
    }
  }]);

  return Time;
}(_react2.default.Component);

exports.default = Time;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvVGltZS5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlRpbWUiLCJzZXRUaW1lIiwiYmluZCIsImN1cnJlbnRkYXRlIiwiRGF0ZSIsImhvdXJzIiwiZ2V0SG91cnMiLCJ3ZWVrIiwibW9udGgiLCJkYXkiLCJnZXREYXkiLCJhbXBtIiwibWludXRlcyIsImdldFVUQ01pbnV0ZXMiLCJsZW5ndGgiLCJzZXRTdGF0ZSIsImRvdyIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsInNldEludGVydmFsIiwic3RhdGUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxBQUFPOzs7Ozs7Ozs7SSxBQUVjO2dDQUNuQjs7a0JBQWM7d0NBR1o7O0FBQ0E7QUFDQTtBQUxZOzRIQU1aOztVQUFBLEFBQUssVUFBVSxNQUFBLEFBQUssUUFBTCxBQUFhLEtBTmhCLEFBTVo7V0FDRDtBQUVEOzs7Ozs7Ozs4QkFHVSxBQUNSO1VBQUksY0FBYyxJQUFsQixBQUFrQixBQUFJLEFBQ3RCO1VBQUksUUFBUSxZQUFaLEFBQVksQUFBWSxBQUN4QjtVQUFJLE9BQU8sQ0FBQSxBQUFFLFVBQUYsQUFBWSxVQUFaLEFBQXNCLFdBQXRCLEFBQWlDLGFBQWpDLEFBQThDLFlBQTlDLEFBQTBELFVBQXJFLEFBQVcsQUFBb0UsQUFDL0U7VUFBSSxRQUFRLENBQUEsQUFBRSxXQUFGLEFBQWEsWUFBYixBQUF5QixTQUF6QixBQUFrQyxTQUFsQyxBQUEyQyxPQUEzQyxBQUFrRCxRQUFsRCxBQUEwRCxRQUExRCxBQUFrRSxVQUFsRSxBQUE0RSxhQUE1RSxBQUF5RixXQUF6RixBQUFvRyxZQUFoSCxBQUFZLEFBQWdILEFBQzVIO1VBQUksTUFBTSxZQUFWLEFBQVUsQUFBWSxBQUV0Qjs7VUFBSSxPQUFKLEFBQVcsQUFDWDtBQUNBO1VBQUssUUFBTCxBQUFhLElBQUssQUFDaEI7aUJBQUEsQUFBUyxBQUNUO2VBQUEsQUFBTyxBQUNSO0FBRUQ7O0FBQ0E7VUFBSSxVQUFVLFlBQWQsQUFBYyxBQUFZLEFBRTFCOztBQUNBO2dCQUFVLFVBQVYsQUFBb0IsQUFDcEI7VUFBSSxRQUFBLEFBQVEsVUFBWixBQUFzQixHQUFHLEFBQUU7a0JBQVUsTUFBVixBQUFnQixBQUFVO0FBRXJEOztXQUFBLEFBQUs7YUFDRSxLQURPLEFBQ1AsQUFBSyxBQUNWO2VBQU8sTUFBTSxZQUZELEFBRUwsQUFBTSxBQUFZLEFBQ3pCO2FBQUssWUFITyxBQUdQLEFBQVksQUFDakI7ZUFKWSxBQUlMLEFBQ1A7aUJBTFksQUFLSCxBQUNUO2NBTkYsQUFBYyxBQU1OLEFBRVQ7QUFSZSxBQUNaO0FBU0o7Ozs7Ozs7O3lDQUdvQixBQUNsQjtXQUFBLEFBQUssQUFDTjtBQUVEOzs7Ozs7Ozt3Q0FHb0IsQUFDbEI7a0JBQVksS0FBWixBQUFpQixTQUFqQixBQUEwQixBQUMzQjs7Ozs2QkFFUSxBQUNQOzZCQUNFLGNBQUE7NENBQUEsQUFBZTs7b0JBQWY7c0JBQUEsQUFDRTtBQURGO0FBQUEsT0FBQSxrQkFDRSxjQUFBOzRDQUFBLEFBQWU7O29CQUFmO3NCQUFBLEFBQWlDO0FBQWpDO0FBQUEsY0FBaUMsQUFBSyxNQUF0QyxBQUE0QyxLQUFTLFdBQUEsQUFBSyxNQUExRCxBQUFnRSxPQUFVLFVBQUEsQUFBSyxNQURqRixBQUNFLEFBQXFGLEFBQ3JGLHNCQUFBLGNBQUE7NENBQUEsQUFBZTs7b0JBQWY7c0JBQUEsQUFBZ0M7QUFBaEM7QUFBQSxjQUFnQyxBQUFLLE1BQXJDLEFBQTJDLE9BQVUsVUFBQSxBQUFLLE1BQTFELEFBQWdFLFNBQVksVUFBQSxBQUFLLE1BRm5GLEFBRUUsQUFBdUY7aUJBRnpGO2FBREYsQUFDRSxBQXVCSDtBQXZCRzs7Ozs7RUE1RDRCLGdCQUFNLEE7O2tCQUFuQixBIiwiZmlsZSI6IlRpbWUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYnluZ3JlZW4vU2l0ZXMvaW5mby1zY3JlZW4ifQ==