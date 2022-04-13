let IMAGE_URL = "http://image.tmdb.org/t/p/w500";
// Movies -------------------------------
$("#movies").hide();
$.getJSON("/api/all-movies")
  .then((data) => {
    // console.log(data);
    // const results = data.results
    const { results } = data;
    const { page } = data;
    console.log(results);
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
    $("#movies").show();
  })

  .catch((err) => {
    console.log(err);
  });
