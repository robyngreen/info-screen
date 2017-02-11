'use strict';

import React from "react";

export default React.createClass({
  /**
   * Sets all the time variables.
   */
  setTime: function(){

    var currentdate = new Date();
    var hours = currentdate.getHours();
    var week = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    var month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var day = currentdate.getDay();

    var ampm = 'a.m.'
    // Correct for number over 24, and negatives.
    if ( hours > 12 ) {
      hours -= 12;
      ampm = 'p.m.'
    }

    // minutes are the same on every time zone
    var minutes = currentdate.getUTCMinutes();

    // add leading zero, first convert hours to string
    minutes = minutes + "";
    if( minutes.length == 1 ){ minutes = "0" + minutes; }

    this.setState({
      dow: week[day],
      month: month[currentdate.getMonth()],
      day: currentdate.getDate(),
      hours: hours,
      minutes: minutes,
      ampm: ampm
    });
  },
  /**
   * Right before it's set, process some items.
   */
  componentWillMount: function(){
    this.setTime();
  },
  /**
   * Called whenever the component is mounted.
   */
  componentDidMount: function(){
    window.setInterval(function () {
      this.setTime();
    }.bind(this), 1000);
  },
  render: function() {
    return (
      <div className="time">
        <div className="dow-month-day">{ this.state.dow }, { this.state.month } { this.state.day }</div>
        <div className="current-time">{ this.state.hours }:{ this.state.minutes } { this.state.ampm }</div>
      </div>
    );
  }
});
