$(document).ready(function(){
  $('#weather_div').hide();
  $("#button1").click(function(e){
    e.preventDefault();
    //posiiton received function
    function onPositionReceived(position){
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      var str =  'https://fcc-weather-api.glitch.me/api/current?lat='+lat+'&lon='+long;
      var myRequest = new XMLHttpRequest();
      myRequest.open('GET',str);
      myRequest.onload = function(){
        var obj = JSON.parse(myRequest.responseText);
        //changes html when weather data is received
        var $temp = obj.main.temp;
        var $summary = obj.weather[0].description;
        var $wind_speed = obj.wind.speed + " MPH";
        //request for city name
        var city = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true';
        console.log(city);
        var nameRequest = new XMLHttpRequest();
        nameRequest.open('GET',city);
        nameRequest.onload = function(){
          var obj2 = JSON.parse(nameRequest.responseText);
          var $cityName = obj2.results[1].formatted_address;
          $('#name1').html($cityName);
        };
        nameRequest.send();
        //changing page to display data
        $('#temperature').html($temp);
        $('#wind_speed').html($wind_speed);
        $('#summary').html($summary);
        $('#weather_div').fadeIn();
        $('#button1').hide();
        //change body background based on weather
        var $img = $('#card3');
        console.log(obj.weather[0].main);
        switch(obj.weather[0].main){
          case 'Rain':
            $img.attr('src','https://www.iconarchive.com/download/i89288/icons8/ios7/Weather-Rain.ico');
            break;
          case 'Snow':
              $img.attr('src','https://cdn3.iconfinder.com/data/icons/weather-icons-8/512/weather-snowy-h-512.png');
            break;
          case 'Mist':
              $img.attr('src','https://cdn0.iconfinder.com/data/icons/weather-bold/142/mist-512.png');
            break;
          case 'Clouds':
              $img.attr('src','https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?dpr=1&auto=format&fit=crop&w=376&h=251&q=60&cs=tinysrgb');
            break;
          case 'Clear':
              $img.attr('src','https://www.freeiconspng.com/uploads/sunny-icon-8.png');
            break;
          case 'Thunderstorm':
              $img.attr('src', 'https://d30y9cdsu7xlg0.cloudfront.net/png/5065-200.png');
          default://includes partly cloudy results
              $img.attr('src','https://icons.iconarchive.com/icons/icons8/ios7/96/Weather-Partly-Cloudy-Day-icon.png');
        }
        //this button changes temperature value from fahreinheit to celcius
        $('#temp_button').click(function(e){
          e.preventDefault();
          var buttonDeg = document.getElementById('temp_button');
          var txt = buttonDeg.textContent || buttonDeg.innerText;
          var tempElem = document.getElementById('temperature');
          var value = tempElem.textContent || tempElem.innerText;
          if(txt=="°C"){
            var num = (value*(9/5))+32.0;
            $('#temperature').html(Math.round(num));
            $('#temp_button').html("°F");
          }else{
            var num2 = (value-32)*(5/9.0);
            $('#temperature').html(Math.round(num2));
            $('#temp_button').html("°C");
          }
        });
      };
      myRequest.send();
    }

   if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(onPositionReceived);
   }
  });
});
