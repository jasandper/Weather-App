var date= " ("+(moment().format('L'))+")";
        
$("#date").text(date);
// console.log(date);


function getData(cityName) {


var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&appid=95b7e9201f1d49a90a14127d57818b01"

var cityLat;
var cityLon;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        //   console.log(response);
       
          var temp= response.main.temp + " °F";
          var humidity= response.main.humidity + " %";
          var windSpeed= response.wind.speed + " MPH";
          var icon= response.weather[0].icon;
          var city= response.name;
          

        //   console.log("The temperature is: "+temp);
        //   console.log("The humidity is: "+humidity);
        //   console.log("the wind speed is: "+windSpeed);
        //   console.log("Weather icon: "+icon);

         $(".cityName").text(city)
         $(".weatherIcon").attr("src", "http://openweathermap.org/img/wn/"+icon+"@2x.png");
         $("#temp").text(temp);
         $("#humidity").text(humidity);
         $("#windSpeed").text(windSpeed);
         cityLat = response.coord.lat;
         cityLon = response.coord.lon;

        

        //  console.log("lat: "+cityLat);
        //  console.log("lon: "+cityLon);
        //  console.log(uviURL);
        //  console.log("City Name is: "+city);

         var uviURL= "http://api.openweathermap.org/data/2.5/uvi?appid=95b7e9201f1d49a90a14127d57818b01&lat="+ cityLat+ "&lon="+ cityLon
        
         
      $.ajax({
        url: uviURL,
        method: "GET"
      }).then(function(response) {
        //   console.log(response);
          var uvi = response.value;
          $("#uvi").text(uvi);

          if (uvi < 3 ) {
              $("#uvi").addClass("uviFavorable")
          } else if(uvi >=3 && uvi <= 5) {
              $("#uvi").addClass("uviModerate")
          } else {
              $("#uvi").addClass("uviSevere")
          }

      });

      });

    }

    $(".cityBtn").on("click", function () {
        var cityName = $("#city").val();
       

        getData(cityName);
    })




 

      


   

