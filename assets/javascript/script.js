$(document).ready(function(){
var cityButtonsUnparsed = localStorage.getItem("cityArray");
var cityButtonsParsed = cityButtonsUnparsed ? cityButtonsUnparsed.split(',') : [];
console.log(cityButtonsParsed[1]);
console.log(cityButtonsParsed.length);
function generateButtons(){

for (i = 0; i< cityButtonsParsed.length; i++){
  $("#search-containers").append("<button class='citycontainer' id =" + i + "name:" + cityButtonsParsed[i] + ">" + cityButtonsParsed[i] + "</button>");
 /* if (document.getElementsByName(cityButtonsParsed[i]).textContent = "undefined"){
    document.getElementById(i).setAttribute("style", "visibility: hidden;");
  }
  else {
     document.getElementById(i).setAttribute("style", "visibility: visible;");
  }
} 
} */
}
}
generateButtons();


var startqueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityButtonsParsed[0] + "&appid=5f20ec22761478f699827153c2dae50d";

$.ajax({
  url: startqueryURL,
  method: "GET"
})

.then(function(response) {
  console.log(response);
          $("#forecasttext").attr("style", "visibility: visible;");
          $("ul").attr("style", "visibility: visible;");
          $(".col-md-2").attr("style", "visibility: visible;");
          $(".citycontainer").attr("style", "visibility: visible;");
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

      var startqueryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=5f20ec22761478f699827153c2dae50d&lat=" + lat + "&lon=" + lon;

      $.ajax({
        url: startqueryURL2,
        method: "GET"
      })

      .then(function(response) {
        console.log(response);
        $("#uv-index").text(response.value);
    });

  });

  var startqueryURL3 = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityButtonsParsed[0] + "&appid=5f20ec22761478f699827153c2dae50d";

  $.ajax({
    url: startqueryURL3,
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

    $("#temp1").text("Temp: " + Math.round(response.list[8].main.temp - 273.15) + " " + "\xB0" + "C/" + Math.round(((response.list[8].main.temp - 273.15)* 9/5) + 32) + " " + "\xB0" + "F");
    $("#temp2").text("Temp: " + Math.round(response.list[16].main.temp - 273.15) + " " + "\xB0" + "C/" + Math.round(((response.list[16].main.temp - 273.15)* 9/5) + 32) + " " + "\xB0" + "F");
    $("#temp3").text("Temp: " + Math.round(response.list[24].main.temp - 273.15) + " " + "\xB0" + "C/" + Math.round(((response.list[24].main.temp - 273.15)* 9/5) + 32) + " " + "\xB0" + "F");
    $("#temp4").text("Temp: " + Math.round(response.list[32].main.temp - 273.15) + " " + "\xB0" + "C/" + Math.round(((response.list[32].main.temp - 273.15)* 9/5) + 32) + " " + "\xB0" + "F");
    $("#temp5").text("Temp: " + Math.round(response.list[39].main.temp - 273.15) + " " + "\xB0" + "C/" + Math.round(((response.list[39].main.temp - 273.15)* 9/5) + 32) + " " + "\xB0" + "F");

    $("#humidity1").text(response.list[8].main.humidity + "%");
    $("#humidity2").text(response.list[16].main.humidity + "%");
    $("#humidity3").text(response.list[24].main.humidity + "%");
    $("#humidity4").text(response.list[32].main.humidity + "%");
    $("#humidity5").text(response.list[39].main.humidity + "%");
  });
/* var savedquery = localStorage.getItem("recent");
document.getElementById("search-input").value = savedquery;
var queryArray = localStorage.getItem("cityArray");
console.log(queryArray);

var savedqueryArray = localStorage.getItem("cityArray");
for (i = 0; i<savedqueryArray[i].length; i++){
  $("#search-containers").append("<button class='citycontainer' id =" + cityArray[i].replace(/\s/g, "") + "></button>");
          $("#" + cityArray[i].replace(/\s/g, "")).text(cityArray[i]);
}

var queryArray = [];
var savedquerylist = localStorage.getItem("savedArray");
savedquerylist = [];
savedquerylist.prepend(savedquery);
for (i=0; i<savedquerylist.length; i++){
  $("#search-containers").append("<button class='citycontainer' id =" + savedquerylist[i] + "></button>");
  $("#" + savedquerylist[i]).replace(/\s/g, "").text(savedquerylist[i]);
  
}
*/

$("#search-button").on("click", function() {
  var city = document.getElementById("search-input").value;
  var existingCities = localStorage.getItem("cityArray");
  existingCities = existingCities ? existingCities.split(',') : [];
  existingCities.unshift(city);
  localStorage.setItem("cityArray", existingCities.toString());
  /* savedquerylist.append(city); */
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5f20ec22761478f699827153c2dae50d";
/*
      var citystring = city.replace(/\s/g, ""); 
      var cityArray = document.getElementById("search-containers").children;
      var cities = cityArray.length; */
   //   localStorage.setItem("cityArray", cityArray);
    /*  for (i = 0; i < cities; i++){
        queryArray.push(cityArray[i].innerText);
      }
      console.log(queryArray);
      localStorage.setItem("cityArray", cityArray);
      var cities = cityArray.length;
    /*  for (i = 0; i < cities; i++){
        queryArray[i] = cityArray[i].textContent;
      }

      console.log(queryArray);
 */
function api(){
    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .then(function(response) {
        


     /*   if (cities < 12){
          $("#search-containers").prepend("<button class='citycontainer' id =" + citystring + "></button>");
          $("#" + citystring).text(city);
          }
    
          else{
           var last = cityArray[cityArray.length - 1];
           $(last).remove();
            $("#search-containers").prepend("<button class='citycontainer' id =" + citystring + "></button>");
          $("#" + citystring).text(city);
          }

      
        var recent = localStorage.getItem(name);
/*
          console.log(cityArray);
          var recent = cityArray[0].textContent.toString();
          localStorage.setItem("recent", recent);
          
          /*
          for (i = 0; i<cityArray.length; i++){
            var savedArray += cityArray[i];
          }
          localStorage.setItem("savedArray", savedArray);
          
    */
          console.log(response);
          $("#forecasttext").attr("style", "visibility: visible;");
          $("ul").attr("style", "visibility: visible;");
          $(".col-md-2").attr("style", "visibility: visible;");
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

    $("#temp1").text("Temp: " + Math.round(response.list[8].main.temp - 273.15) + " " + "\xB0" + "C/" + Math.round(((response.list[8].main.temp - 273.15)* 9/5) + 32) + " " + "\xB0" + "F");
    $("#temp2").text("Temp: " + Math.round(response.list[16].main.temp - 273.15) + " " + "\xB0" + "C/" + Math.round(((response.list[16].main.temp - 273.15)* 9/5) + 32) + " " + "\xB0" + "F");
    $("#temp3").text("Temp: " + Math.round(response.list[24].main.temp - 273.15) + " " + "\xB0" + "C/" + Math.round(((response.list[24].main.temp - 273.15)* 9/5) + 32) + " " + "\xB0" + "F");
    $("#temp4").text("Temp: " + Math.round(response.list[32].main.temp - 273.15) + " " + "\xB0" + "C/" + Math.round(((response.list[32].main.temp - 273.15)* 9/5) + 32) + " " + "\xB0" + "F");
    $("#temp5").text("Temp: " + Math.round(response.list[39].main.temp - 273.15) + " " + "\xB0" + "C/" + Math.round(((response.list[39].main.temp - 273.15)* 9/5) + 32) + " " + "\xB0" + "F");

    $("#humidity1").text(response.list[8].main.humidity + "%");
    $("#humidity2").text(response.list[16].main.humidity + "%");
    $("#humidity3").text(response.list[24].main.humidity + "%");
    $("#humidity4").text(response.list[32].main.humidity + "%");
    $("#humidity5").text(response.list[39].main.humidity + "%");
  });
};
api();
});

});
//api();
// });

/*
city = document.getElementById("search-input").value;
cityArray = document.getElementById("search-containers").children;
var recent = cityArray[0];
    localStorage.setItem("recent", recent);
    city = localStorage.getItem("recent"); */
/*
 document.getElementById("search-button").click();  */
