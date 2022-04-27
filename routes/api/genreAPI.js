const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET home page
// @path /api/genre:
// @desc access TMDB server
// @acces public
// Our api
// TODO:
router.get("/", (req, res) => {
  // TMDB api: https://api.themoviedb.org/3/genre/movie/list
  console.log(req.params);
  axios
    .get("/genre/movie/list")
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
