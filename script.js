var cityName = $(".city").val();
var queryURL = "api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=95b7e9201f1d49a90a14127d57818b01"

$(".cityBtn").on("click", function(cityName) {
    
    localStorage.setItem(1,cityName);

})