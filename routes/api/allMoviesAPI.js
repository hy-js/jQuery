const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET home page
// @path /api/all-movies
// @desc access TMDB server
// @acces public
// Our api
router.get("/", (req, res, next) => {
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

module.exports = router;
