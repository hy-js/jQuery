const express = require("express");
const router = express.Router();
const axios = require("axios");

// Display routes
router.get("/now/:page", (req, res) => {
  // their API
  axios
    .get("/movie/now_playing", {
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
  // their API
  axios
    .get("/movie/top_rated", {
      params: { page: req.params.page }
    })
    .then((response) => {
      console.log("/movie/top_rated");
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.get("/upcoming/:page", (req, res) => {
  // their API
  axios
    .get("/movie/upcoming")
    .then((response) => {
      console.log("/movie/upcoming");
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
