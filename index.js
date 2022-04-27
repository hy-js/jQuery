require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
const morgan = require("morgan");
app.use(morgan("dev"));

const path = require("path");

// Axios
const axios = require("axios");
axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.params = {
  api_key: process.env.TMDB_API_KEY,
  include_adult: false
};

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS - views by default
app.set("view engine", "ejs");

// Static files
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
const homeRouter = require("./routes/home");
app.use("/", homeRouter);
const movieRouter = require("./routes/movies");
app.use("/movies", movieRouter);
const searchRouter = require("./routes/search");
app.use("/search", searchRouter);

// API routes
app.use("/api/weather", require("./routes/api/weatherAPI"));
app.use("/api/all-movies", require("./routes/api/allMoviesAPI"));
app.use("/api/single-movie", require("./routes/api/singleMovieAPI"));
app.use("/api/search", require("./routes/api/searchAPI"));
app.use("/api/genre", require("./routes/api/genreAPI"));
app.use("/api/display", require("./routes/api/displayAPI"));

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`);
});