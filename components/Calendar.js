'use strict';

import React from 'react';
import axios from 'axios';

export default class Calendar extends React.Component {
  constructor () {
    super();

    // Set defaults.
    this.state = {
      key: 'AIzaSyDOzStmGXlCBYxgCKLPruGgqQGGxIfnIaI',
      numEvents: 5,
      calendarAPI: 'https://www.googleapis.com/calendar/v3/calendars/e12nasfpqrj49m0qjdqug5u05o%40group.calendar.google.com/events?orderBy=startTime&singleEvents=true',
      events: [],
      week: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
      month: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    };
  }

  buildCalendar() {
    var self = this;
    var timeMin = new Date(Date.now()).toISOString();
    var gcalURL = this.state.calendarAPI + '&maxResults=' + this.state.numEvents + '&timeMin=' + timeMin + '&key=' + this.state.key;

    this.serverRequest =
      axios.all([
        axios.get(gcalURL)
      ])
      .then(axios.spread(function (calendar) {
        self.setState({
          events: calendar.data.items,
        });
      }));
  }

  /**
   * Precall before render.
   */
  componentWillMount() {
    this.buildCalendar();
  }

  /**
   * Called whenever the component is mounted.
   */
  componentDidMount() {
    // In milliseconds, so * 1000 to end.
    // 60 minutes * 60 seconds * 1000 milliseconds.
    /*var refreshTime = 60 * 60 * 1000;
    window.setInterval(function () {
      this.getWeatherData();
    }.bind(this), refreshTime);*/
  }

  /**
   * Renders markup
   * @return string Any html
   */
  render() {
    let self = this;
    var today = new Date();
    var todayMonth = (today.getMonth() + 1);
    if (todayMonth < 10) {
      todayMonth = '0' + todayMonth;
    }
    var todayDay = today.getDate();
    if (todayDay < 10) {
      todayDay = '0' + todayDay;
    }
    var todayDate = today.getFullYear() + '-' + todayMonth + '-' + todayDay;
    return (
      <div className="calendar">
        { self.state.events.map(function(event) {
            var date = new Date(event.start.date + 'T12:00:00Z');
            var dow = date.getDay();
            var day = date.getDate();
            var month = date.getMonth();
            var todayClass = '';
            if (event.start.date === todayDate) {
              todayClass = 'today';
            }
            return(
              <div key={ event.id } className={ todayClass + ' eventItem'}>
                <div className="eventDate">{ self.state.week[dow] }, { self.state.month[month]} { day }</div>
                <div className="eventTitle">{ event.summary }</div>
              </div>
            )
          })
        }
        <style jsx>{`
          .calendar {
            font-family: 'SST-condensed';
            color: #fff;
            margin-top: 3em;
            text-align: right;
            margin-left: auto;
            width: 95%; }

          .eventItem {
            margin-bottom: 1.75em;
            padding: 5px 10px 0 0; }

          .eventDate {
            font-size: 2.25rem; }

          .eventTitle {
            font-size: 3rem; }

          .today {
            background: rgba(0, 208, 255, 0.19);
            border-radius: 5px;
            border: 1px solid rgba(255, 255, 255, 0.1); }

        `}</style>
      </div>
    );
  }
}
