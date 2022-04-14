let IMAGE_URL = "http://image.tmdb.org/t/p/w500";
let page = 1;
let sort = "popularity.desc";

// On load
$(document).ready(function () {
  $("select").formSelect();
  getMovies(page);
});

// Sorting
$("#sort").change(function () {
  sort = $("#sort").val();
  console.log(sort);
  getMovies(page);
});

// Pagination
$("#nextPage").click(() => {
  page++;
  getMovies(page);
});
$("#prevPage").click(() => {
  page--;
  getMovies(page);
});

// KEYPRESS PAGINATION - TODO:
// next page
$(document).keydown(function (e) {
  if (e.which == "39") {
    console.log("right");
    page++;
    getMovies(page);
  }
});
// prev page
$(document).keydown(function (e) {
  if (e.which == "37") {
    console.log("left");
    page--;
    getMovies(page);
  }
});

// Random button - select random page out of 100
$("#random").click(() => {
  page = Math.floor(Math.random() * (500 - 1)) + 1;
  getMovies(page);
});

// Movies ------------------------------------------------
function getMovies(page) {
  $("#movies").empty();
  $("#movies").hide();
  // QUery our backend server
  $.getJSON("/api/all-movies/" + `${sort}/` + page)
    .then((data) => {
      const { results } = data;
      console.log(data);
      $("#page-number").html(data.page);
      renderPages(results);
    })
    .catch((err) => {
      console.log(err);
      $("#movies").append(
        `
      <div class="col s12 m4 l3 movie-container">
      <h3> There was an error<h3>
      <a href="/movies">Go Back</a>
      </div>
      `
      );
      $(".preloader-wrapper").hide();
      $("#movies").fadeIn();
    });
}

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
  $(".preloader-wrapper").hide();
  $("#movies").fadeIn();
}


