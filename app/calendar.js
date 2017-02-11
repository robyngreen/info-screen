'use strict';

import React from 'react';
import axios from 'axios';

export default React.createClass({
  /**
   * Sets up our variables.
   * @return null nothing.
   */
  getInitialState: function() {
    // @todo: google key needs to be a react const.
    return {
      key: 'AIzaSyDOzStmGXlCBYxgCKLPruGgqQGGxIfnIaI',
      numEvents: 5,
      calendarAPI: 'https://www.googleapis.com/calendar/v3/calendars/e12nasfpqrj49m0qjdqug5u05o%40group.calendar.google.com/events?orderBy=startTime&singleEvents=true',
      events: [],
      week: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
      month: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    }
  },
  buildCalendar: function() {
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
  },
  /**
   * Precall before render.
   */
  componentWillMount: function() {
    this.buildCalendar();
  },

  /**
   * Called whenever the component is mounted.
   */
  componentDidMount: function() {
    // Refresh weather data every 10 minutes
    /*window.setInterval(function () {
      this.getWeatherData();
    }.bind(this), 600000);*/
  },
  /**
   * Renders markup
   * @return string Any html
   */
  render: function() {
    var self = this;
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
        { this.state.events.map(function(event) {
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
      </div>
    );
  }
});
