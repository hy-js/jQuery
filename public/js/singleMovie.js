// Spider-man
// const movie_id = "634649";
console.log(id);

// https://api.themoviedb.org/3/movie/634649?api_key=12890aac4bd3d481725b4e373193a5bf&language=en-US
// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
// https://image.tmdb.org/t/p/w300/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg

$.getJSON(BASE_URL + `/movie/${id}`, apiOptions)
  .then((movie) => {
    console.log(IMAGE_URL + movie.poster_path);
    $("#title").text(movie.title);
    $("#poster").append(
      `<img src="${IMAGE_URL}${movie.poster_path}" alt="${movie.title}" />`
    );
    $("#year").text(movie.release_date);
    $("#synopsis").text(movie.overview);
  })

  .catch((err) => {
    console.log(err);
  });
