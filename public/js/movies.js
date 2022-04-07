// On load
$(document).ready(function () {
  $("select").formSelect();
  getMovies();
});

// Access sort values
$("#sort").change(function () {
  console.log($("#sort").val());
  apiOptions["sort_by"] = $("#sort").val();
  console.log(apiOptions);
  getMovies();
});

//
//

// Movies -------------------------------
function getMovies() {
  $("#movies").empty();
  $("#movies").hide();
  $.getJSON(BASE_URL + "/discover/movie", apiOptions)
    .then((data) => {
      const { results } = data;
      renderPages(results);
    })

    .catch((err) => {
      console.log(err);
    });
}

function renderPages(results) {
  results.forEach((movie) => {
    console.log(movie);
    $("#movies").append(
      `
      <div class="col s12 m4 l3 movie-container">
      <a href="/movies/${movie.id}">
      <img src="${IMAGE_URL}${movie.poster_path}" class="responsive-img" alt="${movie.title}"/>
      </a>
      </div>
      `
    );
  });
  // Show movies
  // Progress Progress
  $(".preloader-wrapper").hide();
  $("#movies").fadeIn();
}
