console.log("Connected");

$("h1").css("color", "teal");



// Weather -------------------------------
$("#weather").css("border", "1px solid black");

// Hide weather
// Show Progress
$("#weather").hide();
$.ajax({
  url: "https://www.metaweather.com/api/location/1103816/",
  success: (data) => {
    const { consolidated_weather } = data;
    $("#weather").append(
      `
      <div id="icon">
      <img src="https://www.metaweather.com/static/img/weather/${consolidated_weather[0].weather_state_abbr}.svg"/>
      </div>
      <h3>Weather in <strong>${data.title}</strong></h3>
      `
    );
    $("#weather").append(
      "<p><strong>" +
        parseInt(consolidated_weather[0].the_temp) +
        " degrees </strong> today</p>"
    );
    //  TODO: add icons
    // https://www.metaweather.com/api/#location
    $("#weather").append(
      "<p><strong>" +
        consolidated_weather[0].weather_state_name +
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

// Movies -------------------------------
let BASE_URL = "https://api.themoviedb.org/3/discover/movie";
let IMAGE_URL = "https://image.tmdb.org/t/p/w300/";
let API_KEY = "?api_key=12890aac4bd3d481725b4e373193a5bf&";

$.getJSON(`${BASE_URL}${API_KEY}`)
  .then((data) => {
    // console.log(data);
    // const results = data.results
    const { results } = data;
    const { page } = data;
    console.log(results);
    results.forEach((movie) => {
      $("#movies").append(
        `
        <h1>${movie.title}</h1>
        <img src="${IMAGE_URL}${movie.poster_path}" />
        `
      );
    });
  })

  .catch((err) => {
    console.log(err);
  });
