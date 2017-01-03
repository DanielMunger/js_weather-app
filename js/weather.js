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

  console.log(fiveDayForcast);
  fiveDayForcast.forEach(function(day) {
    temps.push(day.main.temp);
    console.log(day.main.temp);
  });
};

Weather.prototype.getFiveDayForecast = function(city){
  var instance = this;
  $.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey).then(function(response)
  {
    var fiveDayForcast = [];
    for(var i = 0; i < 5; i++)
    {
      fiveDayForcast.push(response.list[i]);
      //console.log(response.list[i]);
      //console.log(fiveDayForcast);
    }
     console.log(fiveDayForcast);
     instance.getFiveDayTemps(fiveDayForcast);
  });
};

exports.weatherModule = Weather;
