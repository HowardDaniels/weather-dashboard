

$("#search-button").on("click", function() {
  var city = document.getElementById("search-input").value;
  console.log(city);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5f20ec22761478f699827153c2dae50d";

    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function(response) {
          console.log(response);
          $("#chosen-city").text(response.name + " ");
          var utc = moment.tz("Atlantic/Reykjavik");
          var d = utc.add(response.timezone, 'seconds');
          d = d.toString();
          var cut = jQuery.trim(d).substring(0, 25)
          .split(" ").slice(0, -1).join(" ");
          $("#date").text(" " + cut);
      });

});