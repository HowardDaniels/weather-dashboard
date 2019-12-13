var city = $("#search-input").val();

$("#search-button").on("click", function() {
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city;

});