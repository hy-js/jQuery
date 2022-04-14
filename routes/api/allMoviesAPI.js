const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET home page
// @path /api/all-movies
// @desc access TMDB server
// @access public
router.get("/:sort/:page", (req, res) => {
  // TMDB api: https://api.themoviedb.org/3/discover/movie?sort_by={sort}
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

module.exports = router;
