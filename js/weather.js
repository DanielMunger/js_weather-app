var apiKey = require('./../.env').apiKey;

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

exports.weatherModule = Weather;
