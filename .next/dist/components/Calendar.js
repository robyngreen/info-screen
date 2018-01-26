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

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/robyngreen/Sites/info-screen/components/Calendar.js';

var dev = process.env.NODE_ENV !== 'production';

var Calendar = function (_React$Component) {
  (0, _inherits3.default)(Calendar, _React$Component);

  function Calendar() {
    (0, _classCallCheck3.default)(this, Calendar);

    // Bind class to non-react class. See
    // https://github.com/goatslacker/alt/issues/283
    // Otherwise `this.{reactMethod}` will fail.
    var _this = (0, _possibleConstructorReturn3.default)(this, (Calendar.__proto__ || (0, _getPrototypeOf2.default)(Calendar)).call(this));

    _this.buildCalendar = _this.buildCalendar.bind(_this);

    // Set defaults.
    _this.state = {
      key: 'AIzaSyDOzStmGXlCBYxgCKLPruGgqQGGxIfnIaI',
      numEvents: 5,
      calendarAPI: 'https://www.googleapis.com/calendar/v3/calendars/e12nasfpqrj49m0qjdqug5u05o%40group.calendar.google.com/events?orderBy=startTime&singleEvents=true',
      events: [],
      week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };
    return _this;
  }

  (0, _createClass3.default)(Calendar, [{
    key: 'buildCalendar',
    value: function buildCalendar() {
      var self = this;
      var timeMin = new Date(Date.now()).toISOString();
      var gcalURL = this.state.calendarAPI + '&maxResults=' + this.state.numEvents + '&timeMin=' + timeMin + '&key=' + this.state.key;

      this.serverRequest = _axios2.default.all([_axios2.default.get(gcalURL)]).then(_axios2.default.spread(function (calendar) {
        self.setState({
          events: calendar.data.items
        });
      }));
    }

    /**
     * Precall before render.
     */

  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.buildCalendar();
    }

    /**
     * Called whenever the component is mounted.
     */

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Only refresh on prod.
      if (!dev) {
        // In milliseconds, so * 1000 to end.
        // 60 minutes * 60 seconds * 1000 milliseconds.
        var refreshTime = 60 * 60 * 1000;
        setInterval(this.buildCalendar, refreshTime);
      }
    }

    /**
     * Renders markup
     * @return string Any html
     */

  }, {
    key: 'render',
    value: function render() {
      // @TODO: this logic should be somewhere else.
      var self = this;
      var today = new Date();
      var todayMonth = today.getMonth() + 1;
      if (todayMonth < 10) {
        todayMonth = '0' + todayMonth;
      }
      var todayDay = today.getDate();
      if (todayDay < 10) {
        todayDay = '0' + todayDay;
      }
      var todayDate = today.getFullYear() + '-' + todayMonth + '-' + todayDay;
      return _react2.default.createElement('div', {
        className: 'jsx-1050363683' + ' ' + 'calendar',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 81
        }
      }, self.state.events.map(function (event) {
        var date = new Date(event.start.date + 'T12:00:00Z');
        var dow = date.getDay();
        var day = date.getDate();
        var month = date.getMonth();
        var todayClass = '';
        if (event.start.date === todayDate) {
          todayClass = 'today';
        }
        return _react2.default.createElement('div', { key: event.id, className: 'jsx-1050363683' + ' ' + (todayClass + ' eventItem' || ''),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 92
          }
        }, _react2.default.createElement('div', {
          className: 'jsx-1050363683' + ' ' + 'eventDate',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 93
          }
        }, self.state.week[dow], ', ', self.state.month[month], ' ', day), _react2.default.createElement('div', {
          className: 'jsx-1050363683' + ' ' + 'eventTitle',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 94
          }
        }, event.summary));
      }), _react2.default.createElement(_style2.default, {
        styleId: '1050363683',
        css: '.calendar.jsx-1050363683{font-family:\'SST-condensed\';color:#fff;margin-top:3em;text-align:right;margin-left:auto;width:95%;}.eventItem.jsx-1050363683{margin-bottom:1.75em;padding:5px 10px 0 0;}.eventDate.jsx-1050363683{font-size:2.25rem;}.eventTitle.jsx-1050363683{font-size:1.5rem;}.today.jsx-1050363683{background:rgba(0,208,255,0.19);border-radius:5px;border:1px solid rgba(255,255,255,0.1);}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2FsZW5kYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0dvQixBQUd5QyxBQVFQLEFBSUgsQUFHRCxBQUdrQixpQkFIakIsQ0FIQyxHQUhFLE9BUlYsSUFrQk8sT0FqQkgsR0FPTyxRQVdvQixJQWpCekIsaUJBQ0EsaUJBQ1AsQ0FlaUMsU0FmaEMiLCJmaWxlIjoiY29tcG9uZW50cy9DYWxlbmRhci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9ieW5ncmVlbi9TaXRlcy9pbmZvLXNjcmVlbiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5jb25zdCBkZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgLy8gQmluZCBjbGFzcyB0byBub24tcmVhY3QgY2xhc3MuIFNlZVxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9nb2F0c2xhY2tlci9hbHQvaXNzdWVzLzI4M1xuICAgIC8vIE90aGVyd2lzZSBgdGhpcy57cmVhY3RNZXRob2R9YCB3aWxsIGZhaWwuXG4gICAgdGhpcy5idWlsZENhbGVuZGFyID0gdGhpcy5idWlsZENhbGVuZGFyLmJpbmQodGhpcyk7XG5cbiAgICAvLyBTZXQgZGVmYXVsdHMuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGtleTogJ0FJemFTeURPelN0bUdYbENCWXhnQ0tMUHJ1R2dxUUdHeElmbklhSScsXG4gICAgICBudW1FdmVudHM6IDUsXG4gICAgICBjYWxlbmRhckFQSTogJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2NhbGVuZGFyL3YzL2NhbGVuZGFycy9lMTJuYXNmcHFyajQ5bTBxamRxdWc1dTA1byU0MGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20vZXZlbnRzP29yZGVyQnk9c3RhcnRUaW1lJnNpbmdsZUV2ZW50cz10cnVlJyxcbiAgICAgIGV2ZW50czogW10sXG4gICAgICB3ZWVrOiBbICdTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheScgXSxcbiAgICAgIG1vbnRoOiBbIFwiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyY2hcIiwgXCJBcHJpbFwiLCBcIk1heVwiLCBcIkp1bmVcIiwgXCJKdWx5XCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIiBdXG4gICAgfTtcbiAgfVxuXG4gIGJ1aWxkQ2FsZW5kYXIoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciB0aW1lTWluID0gbmV3IERhdGUoRGF0ZS5ub3coKSkudG9JU09TdHJpbmcoKTtcbiAgICB2YXIgZ2NhbFVSTCA9IHRoaXMuc3RhdGUuY2FsZW5kYXJBUEkgKyAnJm1heFJlc3VsdHM9JyArIHRoaXMuc3RhdGUubnVtRXZlbnRzICsgJyZ0aW1lTWluPScgKyB0aW1lTWluICsgJyZrZXk9JyArIHRoaXMuc3RhdGUua2V5O1xuXG4gICAgdGhpcy5zZXJ2ZXJSZXF1ZXN0ID1cbiAgICAgIGF4aW9zLmFsbChbXG4gICAgICAgIGF4aW9zLmdldChnY2FsVVJMKVxuICAgICAgXSlcbiAgICAgIC50aGVuKGF4aW9zLnNwcmVhZChmdW5jdGlvbiAoY2FsZW5kYXIpIHtcbiAgICAgICAgc2VsZi5zZXRTdGF0ZSh7XG4gICAgICAgICAgZXZlbnRzOiBjYWxlbmRhci5kYXRhLml0ZW1zLFxuICAgICAgICB9KTtcbiAgICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmVjYWxsIGJlZm9yZSByZW5kZXIuXG4gICAqL1xuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW5ldmVyIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICovXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIE9ubHkgcmVmcmVzaCBvbiBwcm9kLlxuICAgIGlmICghZGV2KSB7XG4gICAgICAvLyBJbiBtaWxsaXNlY29uZHMsIHNvICogMTAwMCB0byBlbmQuXG4gICAgICAvLyA2MCBtaW51dGVzICogNjAgc2Vjb25kcyAqIDEwMDAgbWlsbGlzZWNvbmRzLlxuICAgICAgdmFyIHJlZnJlc2hUaW1lID0gNjAgKiA2MCAqIDEwMDA7XG4gICAgICBzZXRJbnRlcnZhbCh0aGlzLmJ1aWxkQ2FsZW5kYXIsIHJlZnJlc2hUaW1lKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVycyBtYXJrdXBcbiAgICogQHJldHVybiBzdHJpbmcgQW55IGh0bWxcbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICAvLyBAVE9ETzogdGhpcyBsb2dpYyBzaG91bGQgYmUgc29tZXdoZXJlIGVsc2UuXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgIHZhciB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIHRvZGF5TW9udGggPSAodG9kYXkuZ2V0TW9udGgoKSArIDEpO1xuICAgIGlmICh0b2RheU1vbnRoIDwgMTApIHtcbiAgICAgIHRvZGF5TW9udGggPSAnMCcgKyB0b2RheU1vbnRoO1xuICAgIH1cbiAgICB2YXIgdG9kYXlEYXkgPSB0b2RheS5nZXREYXRlKCk7XG4gICAgaWYgKHRvZGF5RGF5IDwgMTApIHtcbiAgICAgIHRvZGF5RGF5ID0gJzAnICsgdG9kYXlEYXk7XG4gICAgfVxuICAgIHZhciB0b2RheURhdGUgPSB0b2RheS5nZXRGdWxsWWVhcigpICsgJy0nICsgdG9kYXlNb250aCArICctJyArIHRvZGF5RGF5O1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhbGVuZGFyXCI+XG4gICAgICAgIHsgc2VsZi5zdGF0ZS5ldmVudHMubWFwKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGV2ZW50LnN0YXJ0LmRhdGUgKyAnVDEyOjAwOjAwWicpO1xuICAgICAgICAgICAgdmFyIGRvdyA9IGRhdGUuZ2V0RGF5KCk7XG4gICAgICAgICAgICB2YXIgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICAgICAgICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCk7XG4gICAgICAgICAgICB2YXIgdG9kYXlDbGFzcyA9ICcnO1xuICAgICAgICAgICAgaWYgKGV2ZW50LnN0YXJ0LmRhdGUgPT09IHRvZGF5RGF0ZSkge1xuICAgICAgICAgICAgICB0b2RheUNsYXNzID0gJ3RvZGF5JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybihcbiAgICAgICAgICAgICAgPGRpdiBrZXk9eyBldmVudC5pZCB9IGNsYXNzTmFtZT17IHRvZGF5Q2xhc3MgKyAnIGV2ZW50SXRlbSd9PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZXZlbnREYXRlXCI+eyBzZWxmLnN0YXRlLndlZWtbZG93XSB9LCB7IHNlbGYuc3RhdGUubW9udGhbbW9udGhdfSB7IGRheSB9PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJldmVudFRpdGxlXCI+eyBldmVudC5zdW1tYXJ5IH08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICA8c3R5bGUganN4PntgXG4gICAgICAgICAgLmNhbGVuZGFyIHtcbiAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnU1NULWNvbmRlbnNlZCc7XG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDNlbTtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgICAgICAgICB3aWR0aDogOTUlOyB9XG5cbiAgICAgICAgICAuZXZlbnRJdGVtIHtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEuNzVlbTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDVweCAxMHB4IDAgMDsgfVxuXG4gICAgICAgICAgLmV2ZW50RGF0ZSB7XG4gICAgICAgICAgICBmb250LXNpemU6IDIuMjVyZW07IH1cblxuICAgICAgICAgIC5ldmVudFRpdGxlIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMS41cmVtOyB9XG5cbiAgICAgICAgICAudG9kYXkge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLCAyMDgsIDI1NSwgMC4xOSk7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7IH1cblxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0= */\n/*@ sourceURL=components/Calendar.js */'
      }));
    }
  }]);

  return Calendar;
}(_react2.default.Component);

exports.default = Calendar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2FsZW5kYXIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJheGlvcyIsImRldiIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIkNhbGVuZGFyIiwiYnVpbGRDYWxlbmRhciIsImJpbmQiLCJzdGF0ZSIsImtleSIsIm51bUV2ZW50cyIsImNhbGVuZGFyQVBJIiwiZXZlbnRzIiwid2VlayIsIm1vbnRoIiwic2VsZiIsInRpbWVNaW4iLCJEYXRlIiwibm93IiwidG9JU09TdHJpbmciLCJnY2FsVVJMIiwic2VydmVyUmVxdWVzdCIsImFsbCIsImdldCIsInRoZW4iLCJzcHJlYWQiLCJjYWxlbmRhciIsInNldFN0YXRlIiwiZGF0YSIsIml0ZW1zIiwicmVmcmVzaFRpbWUiLCJzZXRJbnRlcnZhbCIsInRvZGF5IiwidG9kYXlNb250aCIsImdldE1vbnRoIiwidG9kYXlEYXkiLCJnZXREYXRlIiwidG9kYXlEYXRlIiwiZ2V0RnVsbFllYXIiLCJtYXAiLCJldmVudCIsImRhdGUiLCJzdGFydCIsImRvdyIsImdldERheSIsImRheSIsInRvZGF5Q2xhc3MiLCJpZCIsInN1bW1hcnkiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxBQUFPOzs7O0FBQ1AsQUFBTzs7Ozs7Ozs7QUFDUCxJQUFNLE1BQU0sUUFBQSxBQUFRLElBQVIsQUFBWSxhQUF4QixBQUFxQzs7SSxBQUVoQjtvQ0FDbkI7O3NCQUFlO3dDQUdiOztBQUNBO0FBQ0E7QUFMYTtvSUFNYjs7VUFBQSxBQUFLLGdCQUFnQixNQUFBLEFBQUssY0FBTCxBQUFtQixLQUF4QyxBQUVBOztBQUNBO1VBQUEsQUFBSztXQUFRLEFBQ04sQUFDTDtpQkFGVyxBQUVBLEFBQ1g7bUJBSFcsQUFHRSxBQUNiO2NBSlcsQUFJSCxBQUNSO1lBQU0sQ0FBQSxBQUFFLFVBQUYsQUFBWSxVQUFaLEFBQXNCLFdBQXRCLEFBQWlDLGFBQWpDLEFBQThDLFlBQTlDLEFBQTBELFVBTHJELEFBS0wsQUFBb0UsQUFDMUU7YUFBTyxDQUFBLEFBQUUsV0FBRixBQUFhLFlBQWIsQUFBeUIsU0FBekIsQUFBa0MsU0FBbEMsQUFBMkMsT0FBM0MsQUFBa0QsUUFBbEQsQUFBMEQsUUFBMUQsQUFBa0UsVUFBbEUsQUFBNEUsYUFBNUUsQUFBeUYsV0FBekYsQUFBb0csWUFmaEcsQUFTYixBQUFhLEFBTUosQUFBZ0g7QUFONUcsQUFDWDtXQU9IOzs7OztvQ0FFZSxBQUNkO1VBQUksT0FBSixBQUFXLEFBQ1g7VUFBSSxVQUFVLElBQUEsQUFBSSxLQUFLLEtBQVQsQUFBUyxBQUFLLE9BQTVCLEFBQWMsQUFBcUIsQUFDbkM7VUFBSSxVQUFVLEtBQUEsQUFBSyxNQUFMLEFBQVcsY0FBWCxBQUF5QixpQkFBaUIsS0FBQSxBQUFLLE1BQS9DLEFBQXFELFlBQXJELEFBQWlFLGNBQWpFLEFBQStFLFVBQS9FLEFBQXlGLFVBQVUsS0FBQSxBQUFLLE1BQXRILEFBQTRILEFBRTVIOztXQUFBLEFBQUssZ0NBQ0gsQUFBTSxJQUFJLENBQ1IsZ0JBQUEsQUFBTSxJQURSLEFBQVUsQUFDUixBQUFVLFdBRFosQUFHQyxxQkFBSyxBQUFNLE9BQU8sVUFBQSxBQUFVLFVBQVUsQUFDckM7YUFBQSxBQUFLO2tCQUNLLFNBQUEsQUFBUyxLQURuQixBQUFjLEFBQ1UsQUFFekI7QUFIZSxBQUNaO0FBTk4sQUFDRSxBQUdNLEFBS1QsT0FMUyxDQUhOO0FBVUo7Ozs7Ozs7O3lDQUdxQixBQUNuQjtXQUFBLEFBQUssQUFDTjtBQUVEOzs7Ozs7Ozt3Q0FHb0IsQUFDbEI7QUFDQTtVQUFJLENBQUosQUFBSyxLQUFLLEFBQ1I7QUFDQTtBQUNBO1lBQUksY0FBYyxLQUFBLEFBQUssS0FBdkIsQUFBNEIsQUFDNUI7b0JBQVksS0FBWixBQUFpQixlQUFqQixBQUFnQyxBQUNqQztBQUNGO0FBRUQ7Ozs7Ozs7Ozs2QkFJUyxBQUNQO0FBQ0E7VUFBSSxPQUFKLEFBQVcsQUFDWDtVQUFJLFFBQVEsSUFBWixBQUFZLEFBQUksQUFDaEI7VUFBSSxhQUFjLE1BQUEsQUFBTSxhQUF4QixBQUFxQyxBQUNyQztVQUFJLGFBQUosQUFBaUIsSUFBSSxBQUNuQjtxQkFBYSxNQUFiLEFBQW1CLEFBQ3BCO0FBQ0Q7VUFBSSxXQUFXLE1BQWYsQUFBZSxBQUFNLEFBQ3JCO1VBQUksV0FBSixBQUFlLElBQUksQUFDakI7bUJBQVcsTUFBWCxBQUFpQixBQUNsQjtBQUNEO1VBQUksWUFBWSxNQUFBLEFBQU0sZ0JBQU4sQUFBc0IsTUFBdEIsQUFBNEIsYUFBNUIsQUFBeUMsTUFBekQsQUFBK0QsQUFDL0Q7NkJBQ0UsY0FBQTs0Q0FBQSxBQUFlOztvQkFBZjtzQkFBQSxBQUNJO0FBREo7QUFBQSxPQUFBLE9BQ0ksQUFBSyxNQUFMLEFBQVcsT0FBWCxBQUFrQixJQUFJLFVBQUEsQUFBUyxPQUFPLEFBQ3BDO1lBQUksT0FBTyxJQUFBLEFBQUksS0FBSyxNQUFBLEFBQU0sTUFBTixBQUFZLE9BQWhDLEFBQVcsQUFBNEIsQUFDdkM7WUFBSSxNQUFNLEtBQVYsQUFBVSxBQUFLLEFBQ2Y7WUFBSSxNQUFNLEtBQVYsQUFBVSxBQUFLLEFBQ2Y7WUFBSSxRQUFRLEtBQVosQUFBWSxBQUFLLEFBQ2pCO1lBQUksYUFBSixBQUFpQixBQUNqQjtZQUFJLE1BQUEsQUFBTSxNQUFOLEFBQVksU0FBaEIsQUFBeUIsV0FBVyxBQUNsQzt1QkFBQSxBQUFhLEFBQ2Q7QUFDRDsrQkFDRSxjQUFBLFNBQUssS0FBTSxNQUFYLEFBQWlCLHlDQUFpQixhQUFsQyxBQUErQyxnQkFBL0M7O3NCQUFBO3dCQUFBLEFBQ0U7QUFERjtTQUFBLGtCQUNFLGNBQUE7OENBQUEsQUFBZTs7c0JBQWY7d0JBQUEsQUFBNkI7QUFBN0I7QUFBQSxnQkFBNkIsQUFBSyxNQUFMLEFBQVcsS0FBeEMsQUFBNkIsQUFBZ0IsTUFBVSxXQUFBLEFBQUssTUFBTCxBQUFXLE1BQWxFLEFBQXVELEFBQWlCLFFBQVUsS0FEcEYsQUFDRSxBQUNBLHNCQUFBLGNBQUE7OENBQUEsQUFBZTs7c0JBQWY7d0JBQUEsQUFBOEI7QUFBOUI7QUFBQSxpQkFISixBQUNFLEFBRUUsQUFBb0MsQUFHekM7QUFoQkwsQUFDSTtpQkFESjthQURGLEFBQ0UsQUE2Q0g7QUE3Q0c7Ozs7O0VBMUVnQyxnQkFBTSxBOztrQkFBdkIsQSIsImZpbGUiOiJDYWxlbmRhci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9ieW5ncmVlbi9TaXRlcy9pbmZvLXNjcmVlbiJ9