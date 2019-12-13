var city = $("#search-input").val();

$("#search-button").on("click", function() {
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city;

    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function(response) {
          console.log(response);
      });

});