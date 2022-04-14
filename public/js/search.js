let IMAGE_URL = "http://image.tmdb.org/t/p/w500";
let page = 1;
let sort = "most-popular";

// On load
$(document).ready(function () {
  $("select").formSelect();
  $(".progress").hide();
  // getMovies(page);
});

// SEARCH FUNCTIONALITY ---------------------------
$("#search").change((e) => {
  console.log(e.target.value);
  searchMovie(e.target.value);
  $("#movies").empty();
  $(".progress").show();
});

const searchMovie = (query) => {
  $.getJSON(`/api/search/${query}`)
    .then((data) => {
      const { results } = data;
      renderPages(results);
    })
    .catch((err) => {
      console.log(err);
      $("#movies").append(
        `
    <div class="col s12 m4 l3 movie-container">
    <h3> There was an error<h3>
    <a href="/search">Go Back</a>
    </div>
    `
      );
      $(".progress").hide();
      $("#movies").fadeIn();
    });
};

function renderPages(results) {
  results.forEach((movie) => {
    const html = `
  <div class="col s12 m4 l3 movie-container">
  <a href="/movies/${movie.id}">
  <img src="${IMAGE_URL}${movie.poster_path}" class="responsive-img" alt="${movie.title}"/>
  </a>
  </div>
    `;
    $("#movies").append(html);
  });
  // Show movies
  // Progress Progress
  $(".progress").hide();
  $("#movies").fadeIn();
}
