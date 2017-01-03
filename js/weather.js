var apiKey = require('./../.env').apiKey;
function Weather(){
}

Weather.prototype.getWeather = function(city)
{
  console.log("hi");
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
    $('.showWeather').text("The temperature in " + city + " is " + ((response.main.temp * (9/5)) - 459) + " degrees Farenheit");
  }).fail(function(error) {
    $('.showWeather').text(error.responseJSON.message);
  });
}

exports.weatherModule = Weather;
