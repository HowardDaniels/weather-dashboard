

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
          $("#date").text(cut);
          $("#temperature").text(Math.round(response.main.temp - 273.15) + " " + "\xB0" + "C/" + Math.round(((response.main.temp - 273.15)* 9/5) + 32) + " " + "\xB0" + "F");
          $("#humidity").text(response.main.humidity + "%");
          $("#wind-speed").text(Math.round(response.wind.speed * 1.609) + " kph/" + Math.round(response.wind.speed) + " mph");
          $("#icon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
          var lat = response.coord.lat;
          var lon = response.coord.lon;

      var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=5f20ec22761478f699827153c2dae50d&lat=" + lat + "&lon=" + lon;

      $.ajax({
        url: queryURL2,
        method: "GET"
      })

      .then(function(response) {
        console.log(response);
        $("#uv-index").text(response.value);
    });

  });

  var queryURL3 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=5f20ec22761478f699827153c2dae50d";

  $.ajax({
    url: queryURL3,
    method: "GET"
  })

  .then(function(response) {
    console.log(response);
 
    var local = moment.tz("Atlantic/Reykjavik").add(response.city.timezone, 'seconds');
    var localdate1 = (moment(local, "DD-MM-YYYY").add(1, "days")).format('L');
    var localdate2 = (moment(local, "DD-MM-YYYY").add(2, "days")).format('L');
    var localdate3 = (moment(local, "DD-MM-YYYY").add(3, "days")).format('L');
    var localdate4 = (moment(local, "DD-MM-YYYY").add(4, "days")).format('L');
    var localdate5 = (moment(local, "DD-MM-YYYY").add(5, "days")).format('L');

    $("#date1").text(localdate1);
    $("#date2").text(localdate2);
    $("#date3").text(localdate3);
    $("#date4").text(localdate4);
    $("#date5").text(localdate5);

    $("#icon1").attr("src", "http://openweathermap.org/img/wn/" + response.list[8].weather[0].icon + "@2x.png");
    $("#icon2").attr("src", "http://openweathermap.org/img/wn/" + response.list[16].weather[0].icon + "@2x.png");
    $("#icon3").attr("src", "http://openweathermap.org/img/wn/" + response.list[24].weather[0].icon + "@2x.png");
    $("#icon4").attr("src", "http://openweathermap.org/img/wn/" + response.list[32].weather[0].icon + "@2x.png");
    $("#icon5").attr("src", "http://openweathermap.org/img/wn/" + response.list[39].weather[0].icon + "@2x.png");
  });

});