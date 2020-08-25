var date= " ("+(moment().format('L'))+")";
        
$("#date").text(date);

//function to get data
function getData(cityName) {


var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=imperial&appid=95b7e9201f1d49a90a14127d57818b01"

var cityLat;
var cityLon;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
       
          var temp= response.main.temp + " °F";
          var humidity= response.main.humidity + " %";
          var windSpeed= response.wind.speed + " MPH";
          var icon= response.weather[0].icon;
          var city= response.name;

         $(".cityName").text(city)
         $(".weatherIcon").attr("src", "http://openweathermap.org/img/wn/"+icon+"@2x.png");
         $("#temp").text(temp);
         $("#humidity").text(humidity);
         $("#windSpeed").text(windSpeed);
         cityLat = response.coord.lat;
         cityLon = response.coord.lon;

         var uviURL= "http://api.openweathermap.org/data/2.5/uvi?appid=95b7e9201f1d49a90a14127d57818b01&lat="+ cityLat+ "&lon="+ cityLon
        
         
    $.ajax({
        url: uviURL,
        method: "GET"
      }).then(function(response) {

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

      var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&units=imperial&appid=95b7e9201f1d49a90a14127d57818b01"

    $.ajax({
        url: fiveDayURL,
        method: "GET"
      }).then(function(response) {
          
        var i =1;
        response.list.forEach(element => {
            var date = element.dt_txt.split(" ")[0];
            var time = element.dt_txt.split(" ")[1];
            var icon = element.weather[0].icon;
            var temp = element.main.temp;
            var humidity = element.main.humidity;
            
        
              if(time === "12:00:00") {
                
                
                $("#day"+i+"date").text(date);
                $("#day"+i+"icon").attr("src","http://openweathermap.org/img/wn/"+icon+"@2x.png");
                $("#day"+i+"temp").text(temp+"°F");
                $("#day"+i+"humidity").text(humidity+"%");
                console.log(i);
                i++;
                
                }
                
            });
        
      });

    }

    $(".cityBtn").on("click", function () {
        var cityName = $("#city").val();
       

        getData(cityName);
    })




 

      


   

