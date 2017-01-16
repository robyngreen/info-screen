<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>GreenHome</title>

    <!-- Bootstrap -->
    <link href="css/all.css" rel="stylesheet">

    <!--// @todo: can this go away and/or upgrade? //-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

    <script src="/scripts/skycons.js"></script>

  </head>
  <body>

    <div class="weather">
      <div class="location">Conway</div>
      <div class="wrapper">
        <div class="current-temp">72&deg;</div>
        <div class="current-weather">
          <canvas id="weather-icon"></canvas>
        </div>
      </div>
    </div>

    <div class="time">
      <div class="dow-month-day">Monday, January 3</div>
      <div class="current-time">6:48 a.m.</div>
    </div>

    <div class="map-wrapper">
      <div class="weather-map map">
        <img src="http://api.wunderground.com/api/13d3adca9dd11d63/animatedradar/q/AR/Conway.png?width=500&height=250&newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50&smooth=1&noclutter=1&rainsnow=1">
      </div>
      <div id="trafficMap" class="traffic-map map"></div>
    </div>

    <script src="/scripts/main.js"></script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDOzStmGXlCBYxgCKLPruGgqQGGxIfnIaI&callback=initTrafficMap">
    </script>

  </body>
</html>
