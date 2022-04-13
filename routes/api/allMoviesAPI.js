const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET home page
// @path /api/all-movies
// @desc access TMDB server
// @acces public
// Our api
router.get("/", (req, res) => {
  // TMDB api: https://api.themoviedb.org/3/discover/movie
  axios
    .get("discover/movie")
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

// @path /api/all-movies/:page
router.get("/:page", (req, res) => {
  // TMDB api: https://api.themoviedb.org/3/discover/movie?page={page}
  axios
    .get("discover/movie", { params: { page: req.params.page } })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
