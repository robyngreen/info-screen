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


var Calendar = function (_React$Component) {
  (0, _inherits3.default)(Calendar, _React$Component);

  function Calendar() {
    (0, _classCallCheck3.default)(this, Calendar);

    // Set defaults.
    var _this = (0, _possibleConstructorReturn3.default)(this, (Calendar.__proto__ || (0, _getPrototypeOf2.default)(Calendar)).call(this));

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
    value: function componentDidMount() {}
    // In milliseconds, so * 1000 to end.
    // 60 minutes * 60 seconds * 1000 milliseconds.
    /*var refreshTime = 60 * 60 * 1000;
    window.setInterval(function () {
      this.getWeatherData();
    }.bind(this), refreshTime);*/

    /**
     * Renders markup
     * @return string Any html
     */

  }, {
    key: 'render',
    value: function render() {
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
        className: 'jsx-1370469477' + ' ' + 'calendar',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
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
        return _react2.default.createElement('div', { key: event.id, className: 'jsx-1370469477' + ' ' + (todayClass + ' eventItem' || ''),
          __source: {
            fileName: _jsxFileName,
            lineNumber: 84
          }
        }, _react2.default.createElement('div', {
          className: 'jsx-1370469477' + ' ' + 'eventDate',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 85
          }
        }, self.state.week[dow], ', ', self.state.month[month], ' ', day), _react2.default.createElement('div', {
          className: 'jsx-1370469477' + ' ' + 'eventTitle',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 86
          }
        }, event.summary));
      }), _react2.default.createElement(_style2.default, {
        styleId: '1370469477',
        css: '.calendar.jsx-1370469477{font-family:\'SST-condensed\';color:#fff;margin-top:3em;text-align:right;margin-left:auto;width:95%;}.eventItem.jsx-1370469477{margin-bottom:1.75em;padding:5px 10px 0 0;}.eventDate.jsx-1370469477{font-size:2.25rem;}.eventTitle.jsx-1370469477{font-size:3rem;}.today.jsx-1370469477{background:rgba(0,208,255,0.19);border-radius:5px;border:1px solid rgba(255,255,255,0.1);}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2FsZW5kYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMEZvQixBQUd5QyxBQVFQLEFBSUgsQUFHSCxBQUdvQixlQUhuQixHQUhHLEdBSEUsT0FSVixJQWtCTyxPQWpCSCxHQU9PLFFBV29CLElBakJ6QixpQkFDQSxpQkFDUCxDQWVpQyxTQWZoQyIsImZpbGUiOiJjb21wb25lbnRzL0NhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2J5bmdyZWVuL1NpdGVzL2luZm8tc2NyZWVuIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8vIFNldCBkZWZhdWx0cy5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAga2V5OiAnQUl6YVN5RE96U3RtR1hsQ0JZeGdDS0xQcnVHZ3FRR0d4SWZuSWFJJyxcbiAgICAgIG51bUV2ZW50czogNSxcbiAgICAgIGNhbGVuZGFyQVBJOiAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vY2FsZW5kYXIvdjMvY2FsZW5kYXJzL2UxMm5hc2ZwcXJqNDltMHFqZHF1ZzV1MDVvJTQwZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbS9ldmVudHM/b3JkZXJCeT1zdGFydFRpbWUmc2luZ2xlRXZlbnRzPXRydWUnLFxuICAgICAgZXZlbnRzOiBbXSxcbiAgICAgIHdlZWs6IFsgJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5JyBdLFxuICAgICAgbW9udGg6IFsgXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiIF1cbiAgICB9O1xuICB9XG5cbiAgYnVpbGRDYWxlbmRhcigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHRpbWVNaW4gPSBuZXcgRGF0ZShEYXRlLm5vdygpKS50b0lTT1N0cmluZygpO1xuICAgIHZhciBnY2FsVVJMID0gdGhpcy5zdGF0ZS5jYWxlbmRhckFQSSArICcmbWF4UmVzdWx0cz0nICsgdGhpcy5zdGF0ZS5udW1FdmVudHMgKyAnJnRpbWVNaW49JyArIHRpbWVNaW4gKyAnJmtleT0nICsgdGhpcy5zdGF0ZS5rZXk7XG5cbiAgICB0aGlzLnNlcnZlclJlcXVlc3QgPVxuICAgICAgYXhpb3MuYWxsKFtcbiAgICAgICAgYXhpb3MuZ2V0KGdjYWxVUkwpXG4gICAgICBdKVxuICAgICAgLnRoZW4oYXhpb3Muc3ByZWFkKGZ1bmN0aW9uIChjYWxlbmRhcikge1xuICAgICAgICBzZWxmLnNldFN0YXRlKHtcbiAgICAgICAgICBldmVudHM6IGNhbGVuZGFyLmRhdGEuaXRlbXMsXG4gICAgICAgIH0pO1xuICAgICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZWNhbGwgYmVmb3JlIHJlbmRlci5cbiAgICovXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLmJ1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKi9cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gSW4gbWlsbGlzZWNvbmRzLCBzbyAqIDEwMDAgdG8gZW5kLlxuICAgIC8vIDYwIG1pbnV0ZXMgKiA2MCBzZWNvbmRzICogMTAwMCBtaWxsaXNlY29uZHMuXG4gICAgLyp2YXIgcmVmcmVzaFRpbWUgPSA2MCAqIDYwICogMTAwMDtcbiAgICB3aW5kb3cuc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5nZXRXZWF0aGVyRGF0YSgpO1xuICAgIH0uYmluZCh0aGlzKSwgcmVmcmVzaFRpbWUpOyovXG4gIH1cblxuICAvKipcbiAgICogUmVuZGVycyBtYXJrdXBcbiAgICogQHJldHVybiBzdHJpbmcgQW55IGh0bWxcbiAgICovXG4gIHJlbmRlcigpIHtcbiAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICB2YXIgdG9kYXlNb250aCA9ICh0b2RheS5nZXRNb250aCgpICsgMSk7XG4gICAgaWYgKHRvZGF5TW9udGggPCAxMCkge1xuICAgICAgdG9kYXlNb250aCA9ICcwJyArIHRvZGF5TW9udGg7XG4gICAgfVxuICAgIHZhciB0b2RheURheSA9IHRvZGF5LmdldERhdGUoKTtcbiAgICBpZiAodG9kYXlEYXkgPCAxMCkge1xuICAgICAgdG9kYXlEYXkgPSAnMCcgKyB0b2RheURheTtcbiAgICB9XG4gICAgdmFyIHRvZGF5RGF0ZSA9IHRvZGF5LmdldEZ1bGxZZWFyKCkgKyAnLScgKyB0b2RheU1vbnRoICsgJy0nICsgdG9kYXlEYXk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FsZW5kYXJcIj5cbiAgICAgICAgeyBzZWxmLnN0YXRlLmV2ZW50cy5tYXAoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoZXZlbnQuc3RhcnQuZGF0ZSArICdUMTI6MDA6MDBaJyk7XG4gICAgICAgICAgICB2YXIgZG93ID0gZGF0ZS5nZXREYXkoKTtcbiAgICAgICAgICAgIHZhciBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgICAgIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgICAgIHZhciB0b2RheUNsYXNzID0gJyc7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc3RhcnQuZGF0ZSA9PT0gdG9kYXlEYXRlKSB7XG4gICAgICAgICAgICAgIHRvZGF5Q2xhc3MgPSAndG9kYXknO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17IGV2ZW50LmlkIH0gY2xhc3NOYW1lPXsgdG9kYXlDbGFzcyArICcgZXZlbnRJdGVtJ30+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJldmVudERhdGVcIj57IHNlbGYuc3RhdGUud2Vla1tkb3ddIH0sIHsgc2VsZi5zdGF0ZS5tb250aFttb250aF19IHsgZGF5IH08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImV2ZW50VGl0bGVcIj57IGV2ZW50LnN1bW1hcnkgfTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIDxzdHlsZSBqc3g+e2BcbiAgICAgICAgICAuY2FsZW5kYXIge1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6ICdTU1QtY29uZGVuc2VkJztcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogM2VtO1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgICAgICAgIHdpZHRoOiA5NSU7IH1cblxuICAgICAgICAgIC5ldmVudEl0ZW0ge1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMS43NWVtO1xuICAgICAgICAgICAgcGFkZGluZzogNXB4IDEwcHggMCAwOyB9XG5cbiAgICAgICAgICAuZXZlbnREYXRlIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMi4yNXJlbTsgfVxuXG4gICAgICAgICAgLmV2ZW50VGl0bGUge1xuICAgICAgICAgICAgZm9udC1zaXplOiAzcmVtOyB9XG5cbiAgICAgICAgICAudG9kYXkge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLCAyMDgsIDI1NSwgMC4xOSk7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7IH1cblxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0= */\n/*@ sourceURL=components/Calendar.js */'
      }));
    }
  }]);

  return Calendar;
}(_react2.default.Component);

exports.default = Calendar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ2FsZW5kYXIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJheGlvcyIsIkNhbGVuZGFyIiwic3RhdGUiLCJrZXkiLCJudW1FdmVudHMiLCJjYWxlbmRhckFQSSIsImV2ZW50cyIsIndlZWsiLCJtb250aCIsInNlbGYiLCJ0aW1lTWluIiwiRGF0ZSIsIm5vdyIsInRvSVNPU3RyaW5nIiwiZ2NhbFVSTCIsInNlcnZlclJlcXVlc3QiLCJhbGwiLCJnZXQiLCJ0aGVuIiwic3ByZWFkIiwiY2FsZW5kYXIiLCJzZXRTdGF0ZSIsImRhdGEiLCJpdGVtcyIsImJ1aWxkQ2FsZW5kYXIiLCJ0b2RheSIsInRvZGF5TW9udGgiLCJnZXRNb250aCIsInRvZGF5RGF5IiwiZ2V0RGF0ZSIsInRvZGF5RGF0ZSIsImdldEZ1bGxZZWFyIiwibWFwIiwiZXZlbnQiLCJkYXRlIiwic3RhcnQiLCJkb3ciLCJnZXREYXkiLCJkYXkiLCJ0b2RheUNsYXNzIiwiaWQiLCJzdW1tYXJ5IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsQUFBTzs7OztBQUNQLEFBQU87Ozs7Ozs7OztJLEFBRWM7b0NBQ25COztzQkFBZTt3Q0FHYjs7QUFIYTtvSUFJYjs7VUFBQSxBQUFLO1dBQVEsQUFDTixBQUNMO2lCQUZXLEFBRUEsQUFDWDttQkFIVyxBQUdFLEFBQ2I7Y0FKVyxBQUlILEFBQ1I7WUFBTSxDQUFBLEFBQUUsVUFBRixBQUFZLFVBQVosQUFBc0IsV0FBdEIsQUFBaUMsYUFBakMsQUFBOEMsWUFBOUMsQUFBMEQsVUFMckQsQUFLTCxBQUFvRSxBQUMxRTthQUFPLENBQUEsQUFBRSxXQUFGLEFBQWEsWUFBYixBQUF5QixTQUF6QixBQUFrQyxTQUFsQyxBQUEyQyxPQUEzQyxBQUFrRCxRQUFsRCxBQUEwRCxRQUExRCxBQUFrRSxVQUFsRSxBQUE0RSxhQUE1RSxBQUF5RixXQUF6RixBQUFvRyxZQVZoRyxBQUliLEFBQWEsQUFNSixBQUFnSDtBQU41RyxBQUNYO1dBT0g7Ozs7O29DQUVlLEFBQ2Q7VUFBSSxPQUFKLEFBQVcsQUFDWDtVQUFJLFVBQVUsSUFBQSxBQUFJLEtBQUssS0FBVCxBQUFTLEFBQUssT0FBNUIsQUFBYyxBQUFxQixBQUNuQztVQUFJLFVBQVUsS0FBQSxBQUFLLE1BQUwsQUFBVyxjQUFYLEFBQXlCLGlCQUFpQixLQUFBLEFBQUssTUFBL0MsQUFBcUQsWUFBckQsQUFBaUUsY0FBakUsQUFBK0UsVUFBL0UsQUFBeUYsVUFBVSxLQUFBLEFBQUssTUFBdEgsQUFBNEgsQUFFNUg7O1dBQUEsQUFBSyxnQ0FDSCxBQUFNLElBQUksQ0FDUixnQkFBQSxBQUFNLElBRFIsQUFBVSxBQUNSLEFBQVUsV0FEWixBQUdDLHFCQUFLLEFBQU0sT0FBTyxVQUFBLEFBQVUsVUFBVSxBQUNyQzthQUFBLEFBQUs7a0JBQ0ssU0FBQSxBQUFTLEtBRG5CLEFBQWMsQUFDVSxBQUV6QjtBQUhlLEFBQ1o7QUFOTixBQUNFLEFBR00sQUFLVCxPQUxTLENBSE47QUFVSjs7Ozs7Ozs7eUNBR3FCLEFBQ25CO1dBQUEsQUFBSyxBQUNOO0FBRUQ7Ozs7Ozs7O3dDQUdvQixBQU9uQixDQU5DO0FBQ0E7QUFDQTtBQU1GOzs7Ozs7Ozs7Ozs7NkJBSVMsQUFDUDtVQUFJLE9BQUosQUFBVyxBQUNYO1VBQUksUUFBUSxJQUFaLEFBQVksQUFBSSxBQUNoQjtVQUFJLGFBQWMsTUFBQSxBQUFNLGFBQXhCLEFBQXFDLEFBQ3JDO1VBQUksYUFBSixBQUFpQixJQUFJLEFBQ25CO3FCQUFhLE1BQWIsQUFBbUIsQUFDcEI7QUFDRDtVQUFJLFdBQVcsTUFBZixBQUFlLEFBQU0sQUFDckI7VUFBSSxXQUFKLEFBQWUsSUFBSSxBQUNqQjttQkFBVyxNQUFYLEFBQWlCLEFBQ2xCO0FBQ0Q7VUFBSSxZQUFZLE1BQUEsQUFBTSxnQkFBTixBQUFzQixNQUF0QixBQUE0QixhQUE1QixBQUF5QyxNQUF6RCxBQUErRCxBQUMvRDs2QkFDRSxjQUFBOzRDQUFBLEFBQWU7O29CQUFmO3NCQUFBLEFBQ0k7QUFESjtBQUFBLE9BQUEsT0FDSSxBQUFLLE1BQUwsQUFBVyxPQUFYLEFBQWtCLElBQUksVUFBQSxBQUFTLE9BQU8sQUFDcEM7WUFBSSxPQUFPLElBQUEsQUFBSSxLQUFLLE1BQUEsQUFBTSxNQUFOLEFBQVksT0FBaEMsQUFBVyxBQUE0QixBQUN2QztZQUFJLE1BQU0sS0FBVixBQUFVLEFBQUssQUFDZjtZQUFJLE1BQU0sS0FBVixBQUFVLEFBQUssQUFDZjtZQUFJLFFBQVEsS0FBWixBQUFZLEFBQUssQUFDakI7WUFBSSxhQUFKLEFBQWlCLEFBQ2pCO1lBQUksTUFBQSxBQUFNLE1BQU4sQUFBWSxTQUFoQixBQUF5QixXQUFXLEFBQ2xDO3VCQUFBLEFBQWEsQUFDZDtBQUNEOytCQUNFLGNBQUEsU0FBSyxLQUFNLE1BQVgsQUFBaUIseUNBQWlCLGFBQWxDLEFBQStDLGdCQUEvQzs7c0JBQUE7d0JBQUEsQUFDRTtBQURGO1NBQUEsa0JBQ0UsY0FBQTs4Q0FBQSxBQUFlOztzQkFBZjt3QkFBQSxBQUE2QjtBQUE3QjtBQUFBLGdCQUE2QixBQUFLLE1BQUwsQUFBVyxLQUF4QyxBQUE2QixBQUFnQixNQUFVLFdBQUEsQUFBSyxNQUFMLEFBQVcsTUFBbEUsQUFBdUQsQUFBaUIsUUFBVSxLQURwRixBQUNFLEFBQ0Esc0JBQUEsY0FBQTs4Q0FBQSxBQUFlOztzQkFBZjt3QkFBQSxBQUE4QjtBQUE5QjtBQUFBLGlCQUhKLEFBQ0UsQUFFRSxBQUFvQyxBQUd6QztBQWhCTCxBQUNJO2lCQURKO2FBREYsQUFDRSxBQTZDSDtBQTdDRzs7Ozs7RUFuRWdDLGdCQUFNLEE7O2tCQUF2QixBIiwiZmlsZSI6IkNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2J5bmdyZWVuL1NpdGVzL2luZm8tc2NyZWVuIn0=