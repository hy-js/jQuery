let GET_URL;
let IMAGE_URL = "http://image.tmdb.org/t/p/w300";
let sort = "most-popular";
// Paramaters
let page = 1;
let query = "";
let display = "";

// On load
$(document).ready(function () {
  $("select").formSelect();
  $(".progress").hide();
  $(".fixed-action-btn").floatingActionButton();
});

// PAGINATION-------------------------------------
// Pagination
$("#nextPage").click(() => {
  page++;
  searchMovie(query, page);
});

// SEARCH FUNCTIONALITY ---------------------------
$("#search").change((e) => {
  display = null;
  query = e.target.value;
  $("#movies").empty();
  searchMovie(query, page);
});

// ADD BUTTONS TO DISPLAY DIFFERENT VIEWS ---------------------------
$("#now-playing").click(() => {
  display = "now";
  $("#movies").empty();
  $("#head").text("Now Playing");
  searchMovie(page, display);
});

$("#upcoming").click(() => {
  display = "upcoming";
  $("#movies").empty();
  $("#head").text("Upcoming");
  searchMovie(page, display);
});

$("#top-rated").click(() => {
  display = "top";
  $("#movies").empty();
  $("#head").text("Top");
  searchMovie(page, display);
});

// MOVIE QUERIES -----------------------------------------
const searchMovie = (query, page) => {
  if (display) {
    GET_URL = `/api/display/${display}/${page}`;
  } else {
    GET_URL = `/api/search/${query}/${page}`;
  }
  $.getJSON(GET_URL)
    .then((data) => {
      $("#movies").hide();
      $(".progress").show();
      const { results } = data;
      console.log(results);
      $("#total-results").html("Search Results: " + data.total_results);
      $("#nextPage").removeClass("hide");
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

// RENDER MOVIES -----------------------------------------
function renderPages(results) {
  results.forEach((movie) => {
    const html = `
    <div class="row">
      <div class="col s3">
        <a href="/movies/${movie.id}">
          <img src="${IMAGE_URL}${movie.poster_path}" class="responsive-img" alt="${movie.title}"/>
        </a>
      </div>
      <div class="col s9">
      <a href="/movies/${movie.id}">
        <h3>${movie.title}</h3>
        </a>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
          <div class="chip">
          ${movie.vote_average}
          </div>
        </a>
        <h5>${movie.overview}</h5>
      </div>
  </div>
    `;
    $("#movies").append(html);
  });
  $(".progress").hide();
  $("#movies").fadeIn();
}

// GET GENRES-------------------------------------
$.getJSON("/api/genre")
  .then((data) => {
    let { genres } = data;
    console.log(genres);
    genres.forEach((genre) => {
      const html = `
      <li>
        <p>
        <label>
          <input type="checkbox" id="${genre.id}" />
          <span>${genre.name}</span>
        </label>
      </p>
    </li>
    `;
      $("#genres").append(html);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// TODO: add genre functionality
