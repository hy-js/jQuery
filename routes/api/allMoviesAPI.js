const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET home page
// @path /api/all-movies
// @desc access TMDB server
// @acces public
// Our api
router.get("/:sort/:page", (req, res) => {
  // TMDB api: https://api.themoviedb.org/3/discover/movie?sort_by="popularity.desc"
  axios
    .get("discover/movie", {
      params: { page: req.params.page, sort_by: req.params.sort }
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});
// NEW ROUTES TODO:
router.get("/now/:page", (req, res) => {
  // TMDB api: https://api.themoviedb.org/3/discover/movie?sort_by="popularity.desc"
  axios
    .get("/movie/now_playing", {
      params: { page: req.params.page }
    })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.get("/upcoming/:page", (req, res) => {
  // TMDB api: https://api.themoviedb.org/3/discover/movie?sort_by="popularity.desc"
  axios
    .get("/movie/upcoming", {
      params: { page: req.params.page }
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.get("/top/:page", (req, res) => {
  // TMDB api: https://api.themoviedb.org/3/discover/movie?sort_by="popularity.desc"
  axios
    .get("/movie/top_rated", {
      params: { page: req.params.page }
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
