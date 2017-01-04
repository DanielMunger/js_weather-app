
var Weather = require('./../js/weather.js').weatherModule;

var displayTemp = function(city, tempData)
{
  $('.showWeather').append("<h4>The temperature in " + city + " is " + ((tempData * (9/5)) - 459) + " degrees Farenheit</h4>");
};

var displayWind = function(city, windData)
{
  $('.showWeather').append("<h4>The wind speed is " + windData + " mph.</h4>");
};

var displayForecast = function(temps, descriptions)
{
  temps.forEach(function(temp) {
    $('.showTemps').append("<p>Temperature: " + temp + ".");
  });
  descriptions.forEach(function(description) {
    $('.showDescriptions').append("The conditions will be: " + description + ".");
  });
};

$(document).ready(function() {
  var currentWeatherObject = new Weather();
  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    $('.showWeather').text("");
    currentWeatherObject.getTemperature(city, displayTemp);
    currentWeatherObject.getWind(city, displayWind);
    currentWeatherObject.getFiveDayForecast(city, displayForecast);
    currentWeatherObject.makeMap();
  });
});
