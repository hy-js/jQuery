let GET_URL;
let IMAGE_URL = "http://image.tmdb.org/t/p/w300";
let sort = "most-popular";
let page = 1;
let query = "";
let display = "now";

// On load
$(document).ready(function () {
  $("select").formSelect();
  $(".progress").hide();
});

// SEARCH FUNCTIONALITY ---------------------------
$("#search").change((e) => {
  display = null;
  console.log(e.target.value);
  query = e.target.value;
  searchMovie(query, page);
});

// ADD BUTTONS TO DISPLAY DIFFERENET OPTIONS
$("#now-playing").click(() => {
  display = "now";
  searchMovie(query, page, display);
});

$("#upcoming").click(() => {
  display = "upcoming";
  searchMovie(query, page, display);
});

$("#top-rated").click(() => {
  display = "top";
  searchMovie(query, page, display);
});

// PAGINATION -----------------------------------------
$("#nextPage").click(() => {
  console.log("next");
  page++;
  searchMovie(query, page, display);
});

// SEARCH MOVIE -----------------------------------------
const searchMovie = (query, page, display) => {
  if (display) {
    GET_URL = `api/all-movies/${display}/${page}`;
    console.log(GET_URL);
  } else {
    GET_URL = `/api/search/${query}/${page}`;
  }
  $.getJSON(GET_URL)
    .then((data) => {
      $(".progress").show();
      // $("#movies").empty();
      const { results } = data;
      console.log(data);
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
        <h4 id="rating">${movie.vote_average}</h4>
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
