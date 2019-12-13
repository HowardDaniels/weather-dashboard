var city = document.getElementById("search-input").value;

$("#search-button").on("click", function() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=5f20ec22761478f699827153c2dae50d";

    console.log(city);
    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function(response) {
          console.log(response);
      });

});