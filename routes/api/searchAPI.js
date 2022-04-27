const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET home page
// @path /api/search/{query}
// @desc access TMDB server
// @acces public
// Our api
// TODO:
router.get("/:q/:page", (req, res) => {
  // TMDB api: https://api.themoviedb.org/3/search/movie?query={q}
  console.log(req.params);
  axios
    .get("/search/movie", {
      params: { query: req.params.q, page: req.params.page }
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
