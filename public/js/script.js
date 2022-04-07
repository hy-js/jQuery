console.log("Connected");

$("h1").css("color", "teal");

$("#weather").css("border", "1px solid black");

// Hide weather
// Show Progress
$("#weather").hide();

// Weather -----------------
$.ajax({
  url: "https://www.metaweather.com/api/location/1103816/",
  success: (data) => {
    const { consolidated_weather: weather } = data;
    console.log(weather);
    $("#weather").append(
      `
      <div id="icon">
      <img src="https://www.metaweather.com/static/img/weather/${weather[0].weather_state_abbr}.svg"/>
      </div>
      <h3>Weather in <strong>${data.title}</strong></h3>
      `
    );
    $("#weather").append(
      "<p><strong>" +
        parseInt(weather[0].the_temp) +
        " degrees </strong> today</p>"
    );
    //  TODO: add icons
    // https://www.metaweather.com/api/#location
    $("#weather").append(
      "<p><strong>" +
        weather[0].weather_state_name +
        `</strong> are forecast</p>
        `
    );
    //  consolidated_weather.forEach((day, index) => {
    //    $("#weather").append(
    //      `<p>
    //      Day ${index}: ${parseInt(day.the_temp)} degrees
    //       </p>`
    //    );
    //  });

    // Show weather
    // Progress Progress
    $(".progress").hide();
    $("#weather").show();
  }
});
