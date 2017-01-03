
var Weather = require('./../js/weather.js').weatherModule;

var displayTemp = function(city, tempData)
{
  $('.showWeather').text("The temperature in " + city + " is " + ((tempData * (9/5)) - 459) + " degrees Farenheit");
};

$(document).ready(function() {
  var currentWeatherObject = new Weather();
  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    currentWeatherObject.getWeather(city, displayTemp);
  });
});
