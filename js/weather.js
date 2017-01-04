var apiKey = require('./../.env').apiKey;
var L = require('./../bower_components/leaflet/dist/leaflet-src.js');
var OWM = require('./../bower_components/leaflet-openweathermap/leaflet-openweathermap.js');

function Weather()
{

}

Weather.prototype.getTemperature = function(city, displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response)
  {
    displayFunction(city, response.main.temp);
  }).fail(function(error) {
    $('.showWeather').text(error.responseJSON.message);
  });
};

Weather.prototype.getWind = function (city, displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response)
  {
    displayFunction(city, response.wind.speed);
  }).fail(function(error) {
  $('showWeather').text(error.responseJSON.message);
  });
};

Weather.prototype.getFiveDayTemps = function(fiveDayForcast){
  var temps = [];
  fiveDayForcast.forEach(function(day) {
    temps.push(day.main.temp);
  });
  return temps;
};

Weather.prototype.getWeatherDescriptions = function(fiveDayForcast)
{
  var descriptions = [];
  fiveDayForcast.forEach(function(day) {
      descriptions.push(day.weather[0].description);
  });
  return descriptions;
};

Weather.prototype.getFiveDayForecast = function(city, displayFunction){
  var instance = this;
  $.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey).then(function(response)
  {
    var fiveDayForcast = [];
    for(var i = 0; i < 5; i++)
    {
      fiveDayForcast.push(response.list[i]);
    }
    var temps = instance.getFiveDayTemps(fiveDayForcast);
    var descriptions = instance.getWeatherDescriptions(fiveDayForcast);
    console.log(descriptions);
    displayFunction(temps, descriptions);
  });
};

Weather.prototype.makeMap = function()
{
  var map = L.map('map').setView([45.47, -122.69], 13);

  var tiles = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
  	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  	ext: 'png'
  }).addTo(map);
};

exports.weatherModule = Weather;
