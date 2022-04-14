const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET home page
// @path /api/all-movies
// @desc access TMDB server
// @acces public
// Our api
router.get("/most-popular/:page", (req, res) => {
  // TMDB api: https://api.themoviedb.org/3/discover/movie?sort_by="popularity.desc"
  axios
    .get("discover/movie", {
      params: { page: req.params.page, sort_by: "popularity.desc" }
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

// GET home page
// @path /api/all-movies
// @desc access TMDB server
// @acces public
// Our api
router.get("/most-revenue/:page", (req, res) => {
  // TMDB api: https://api.themoviedb.org/3/discover/movie?sort_by="revenue.desc"
  axios
    .get("discover/movie", {
      params: { page: req.params.page, sort_by: "revenue.desc" }
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
