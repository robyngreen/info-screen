'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Weather = require('../components/Weather');

var _Weather2 = _interopRequireDefault(_Weather);

var _Time = require('../components/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Calendar = require('../components/Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Maps = require('../components/Maps');

var _Maps2 = _interopRequireDefault(_Maps);

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/robyngreen/Sites/info-screen/pages/index.js?entry';

exports.default = function () {
  return _react2.default.createElement('div', {
    className: 'jsx-3514956252',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, _react2.default.createElement(_head2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _react2.default.createElement('title', {
    className: 'jsx-3514956252',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, 'GreenHome'), _react2.default.createElement('meta', { charSet: 'utf-8', className: 'jsx-3514956252',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }), _react2.default.createElement('meta', { name: 'viewport', content: 'initial-scale=1.0, width=device-width', className: 'jsx-3514956252',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  })), _react2.default.createElement('script', { src: '/static/js/skycons.js', className: 'jsx-3514956252',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }), _react2.default.createElement(_style2.default, {
    styleId: '3514956252',
    css: '@font-face{font-family:\'SST\';src:url("/static/fonts/SST/Regular.ttf") format("truetype");}@font-face{font-family:\'SST-light\';src:url("/static/fonts/SST/Regular.ttf") format("truetype");}@font-face{font-family:\'SST-condensed\';src:url("/static/fonts/SST/Condensed.ttf") format("truetype");}html{font-family:\'Gotham SSm A\',\'Gotham SSm B\',\'Gotham\',Sans-Serif;box-sizing:border-box;line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;font-size:100%;}*{box-sizing:inherit;}*::before,*::after{box-sizing:inherit;}body{margin:0;font-size:0.875rem;line-height:1.785;-webkit-letter-spacing:-0.04rem;-moz-letter-spacing:-0.04rem;-ms-letter-spacing:-0.04rem;letter-spacing:-0.04rem;color:#000;}body{margin:1em 3em;}html{position:absolute;z-index:1;height:100%;width:100%;overflow:hidden;}html:before{content:\'\';display:block;position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;z-index:-1;background:#fff url(/static/images/background/milky-way-mountains.jpg) center center fixed no-repeat;background-size:cover;-webkit-filter:blur(7px);filter:blur(7px);-webkit-transform:scale(1.1);-ms-transform:scale(1.1);transform:scale(1.1);}.info-container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}.left{width:66%;}.right{margin-left:auto;}.page{background-color:#fff;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzP2VudHJ5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdCdUIsQUFHMEUsQUFTOUMsQUFLQSxBQUlWLEFBUVMsQUFJTSxBQUlJLEFBSWIsQUFHRyxBQU1MLEFBaUJFLEFBR0gsQUFHTyxBQUdLLFNBdERMLENBZ0ROLENBbkJHLElBVkEsRUFnQ0ksQ0EzQ3dDLEFBZWxELENBaENaLEFBS0EsR0EwRDJCLEVBMUNtQyxDQWtCeEMsR0E3QkYsQUFlNEMsQUFRbEQsWUFDRCxHQU1ILEdBN0JnQixHQThCYixFQU5LLE9BT1AsSUFuRGEsR0FvRFosRUFSTyxNQVNKLENBVUcsSUFyQzZDLE1BekI1QyxBQTZCNEMsQUF3Qi9DLE1BcEJpRCxNQXFCbEQsS0FyRGEsTUF1RDZFLG9CQXREekUsOEJBQ2YsRUFpQkosV0FDYixFQWpCQSxvQ0FxRDBCLHNCQUNMLDBDQUNJLDJFQUFDIiwiZmlsZSI6InBhZ2VzL2luZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2J5bmdyZWVuL1NpdGVzL2luZm8tc2NyZWVuIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgV2VhdGhlciBmcm9tICcuLi9jb21wb25lbnRzL1dlYXRoZXInO1xuaW1wb3J0IFRpbWUgZnJvbSAnLi4vY29tcG9uZW50cy9UaW1lJztcbmltcG9ydCBDYWxlbmRhciBmcm9tIFwiLi4vY29tcG9uZW50cy9DYWxlbmRhclwiO1xuaW1wb3J0IE1hcHMgZnJvbSAnLi4vY29tcG9uZW50cy9NYXBzJztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IChcbiAgPGRpdj5cbiAgICA8SGVhZD5cbiAgICAgIDx0aXRsZT5HcmVlbkhvbWU8L3RpdGxlPlxuICAgICAgPG1ldGEgY2hhclNldD0ndXRmLTgnIC8+XG4gICAgICA8bWV0YSBuYW1lPSd2aWV3cG9ydCcgY29udGVudD0naW5pdGlhbC1zY2FsZT0xLjAsIHdpZHRoPWRldmljZS13aWR0aCcgLz5cbiAgICA8L0hlYWQ+XG4gICAgPHNjcmlwdCBzcmM9XCIvc3RhdGljL2pzL3NreWNvbnMuanNcIj48L3NjcmlwdD5cbiAgICA8c3R5bGUganN4IGdsb2JhbD57YFxuICAgICAgaHRtbCB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnR290aGFtIFNTbSBBJywgJ0dvdGhhbSBTU20gQicsICdHb3RoYW0nLCBTYW5zLVNlcmlmO1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBsaW5lLWhlaWdodDogMS4xNTtcbiAgICAgICAgLW1zLXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7XG4gICAgICAgIC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogMTAwJTtcbiAgICAgICAgZm9udC1zaXplOiAxMDAlO1xuICAgICAgfVxuXG4gICAgICAqIHtcbiAgICAgICAgYm94LXNpemluZzogaW5oZXJpdDtcbiAgICAgIH1cblxuICAgICAgKjo6YmVmb3JlLFxuICAgICAgKjo6YWZ0ZXIge1xuICAgICAgICBib3gtc2l6aW5nOiBpbmhlcml0O1xuICAgICAgfVxuXG4gICAgICBib2R5IHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICBmb250LXNpemU6IDAuODc1cmVtO1xuICAgICAgICBsaW5lLWhlaWdodDogMS43ODU7XG4gICAgICAgIGxldHRlci1zcGFjaW5nOiAtMC4wNHJlbTtcbiAgICAgICAgY29sb3I6ICMwMDA7XG4gICAgICB9XG5cbiAgICAgIEBmb250LWZhY2Uge1xuICAgICAgICBmb250LWZhbWlseTogJ1NTVCc7XG4gICAgICAgIHNyYzogdXJsKFwiL3N0YXRpYy9mb250cy9TU1QvUmVndWxhci50dGZcIikgZm9ybWF0KFwidHJ1ZXR5cGVcIik7IH1cblxuICAgICAgQGZvbnQtZmFjZSB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiAnU1NULWxpZ2h0JztcbiAgICAgICAgc3JjOiB1cmwoXCIvc3RhdGljL2ZvbnRzL1NTVC9SZWd1bGFyLnR0ZlwiKSBmb3JtYXQoXCJ0cnVldHlwZVwiKTsgfVxuXG4gICAgICBAZm9udC1mYWNlIHtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdTU1QtY29uZGVuc2VkJztcbiAgICAgICAgc3JjOiB1cmwoXCIvc3RhdGljL2ZvbnRzL1NTVC9Db25kZW5zZWQudHRmXCIpIGZvcm1hdChcInRydWV0eXBlXCIpOyB9XG5cbiAgICAgIGJvZHkge1xuICAgICAgICBtYXJnaW46IDFlbSAzZW07IH1cblxuICAgICAgaHRtbCB7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgei1pbmRleDogMTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuICAgICAgICBodG1sOmJlZm9yZSB7XG4gICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICBib3R0b206IDA7XG4gICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICByaWdodDogMDtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgei1pbmRleDogLTE7XG4gICAgICAgICAgLypiYWNrZ3JvdW5kOiAjZmZmIHVybCgvc3RhdGljL2ltYWdlcy9iYWNrZ3JvdW5kL2l0YWx5LmpwZykgY2VudGVyIGNlbnRlciBmaXhlZCBuby1yZXBlYXQ7Ki9cbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmIHVybCgvc3RhdGljL2ltYWdlcy9iYWNrZ3JvdW5kL21pbGt5LXdheS1tb3VudGFpbnMuanBnKSBjZW50ZXIgY2VudGVyIGZpeGVkIG5vLXJlcGVhdDtcbiAgICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgICAgICAgIGZpbHRlcjogYmx1cig3cHgpO1xuICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTsgfVxuXG4gICAgICAgIC5pbmZvLWNvbnRhaW5lciB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDsgfVxuXG4gICAgICAgIC5sZWZ0IHtcbiAgICAgICAgICB3aWR0aDogNjYlOyB9XG5cbiAgICAgICAgLnJpZ2h0IHtcbiAgICAgICAgICBtYXJnaW4tbGVmdDogYXV0bzsgfVxuXG4gICAgICAgIC5wYWdlIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyB9XG5cbiAgICBgfTwvc3R5bGU+XG4gICAgPGRpdiBjbGFzc05hbWU9J2luZm8tY29udGFpbmVyJz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdsZWZ0Jz5cbiAgICAgICAgPFdlYXRoZXIgLz5cbiAgICAgICAgPE1hcHMgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9J3JpZ2h0Jz5cbiAgICAgICAgPFRpbWUgLz5cbiAgICAgICAgPENhbGVuZGFyIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pO1xuIl19 */\n/*@ sourceURL=pages/index.js?entry */'
  }), _react2.default.createElement('div', {
    className: 'jsx-3514956252' + ' ' + 'info-container',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95
    }
  }, _react2.default.createElement('div', {
    className: 'jsx-3514956252' + ' ' + 'left',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96
    }
  }, _react2.default.createElement(_Weather2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 97
    }
  }), _react2.default.createElement(_Maps2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98
    }
  })), _react2.default.createElement('div', {
    className: 'jsx-3514956252' + ' ' + 'right',
    __source: {
      fileName: _jsxFileName,
      lineNumber: 100
    }
  }, _react2.default.createElement(_Time2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 101
    }
  }), _react2.default.createElement(_Calendar2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102
    }
  }))));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIldlYXRoZXIiLCJUaW1lIiwiQ2FsZW5kYXIiLCJNYXBzIiwiSGVhZCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0FBRUEsQUFBTyxBQUFhOzs7O0FBQ3BCLEFBQU8sQUFBVTs7OztBQUNqQixBQUFPLEFBQWM7Ozs7QUFDckIsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQU8sQUFFUDs7Ozs7Ozs7a0JBQWUsWUFBQTt5QkFDYixjQUFBO2VBQUE7O2dCQUFBO2tCQUFBLEFBQ0U7QUFERjtBQUFBLEdBQUEsa0JBQ0UsQUFBQzs7Z0JBQUQ7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0UsY0FBQTtlQUFBOztnQkFBQTtrQkFBQTtBQUFBO0FBQUEsS0FERixBQUNFLEFBQ0Esc0RBQU0sU0FBTixBQUFjLG9CQUFkOztnQkFBQTtrQkFGRixBQUVFLEFBQ0E7QUFEQTs4Q0FDTSxNQUFOLEFBQVcsWUFBVyxTQUF0QixBQUE4QixvREFBOUI7O2dCQUFBO2tCQUpKLEFBQ0UsQUFHRSxBQUVGO0FBRkU7aURBRU0sS0FBUixBQUFZLG9DQUFaOztnQkFBQTtrQkFORixBQU1FO0FBQUE7O2FBTkY7U0FBQSxBQXFGRTtBQXJGRixzQkFxRkUsY0FBQTt3Q0FBQSxBQUFlOztnQkFBZjtrQkFBQSxBQUNFO0FBREY7QUFBQSxxQkFDRSxjQUFBO3dDQUFBLEFBQWU7O2dCQUFmO2tCQUFBLEFBQ0U7QUFERjtBQUFBLHFCQUNFLEFBQUM7O2dCQUFEO2tCQURGLEFBQ0UsQUFDQTtBQURBO0FBQUEsc0JBQ0EsQUFBQzs7Z0JBQUQ7a0JBSEosQUFDRSxBQUVFLEFBRUY7QUFGRTtBQUFBLHVCQUVGLGNBQUE7d0NBQUEsQUFBZTs7Z0JBQWY7a0JBQUEsQUFDRTtBQURGO0FBQUEscUJBQ0UsQUFBQzs7Z0JBQUQ7a0JBREYsQUFDRSxBQUNBO0FBREE7QUFBQSxzQkFDQSxBQUFDOztnQkFBRDtrQkE3Rk8sQUFDYixBQXFGRSxBQUtFLEFBRUU7QUFBQTtBQUFBO0FBN0ZSIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2J5bmdyZWVuL1NpdGVzL2luZm8tc2NyZWVuIn0=