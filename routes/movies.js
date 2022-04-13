const express = require("express");
const router = express.Router();
// const db = require("../database");

// GET All Movies
router.get("/", (req, res, next) => {
  res.render("pages/movies", {
    title: "All Movies"
  });
});

// GET All Movies
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  res.render("pages/movie", {
    title: "Movie",
    movie_id: id
  });
});

module.exports = router;
