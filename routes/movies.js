const express = require("express");
const router = express.Router();
const db = require("../database");

// GET All Movies
router.get("/", (req, res, next) => {
  res.render("pages/movies", {
    title: "All Movies"
  });
});

// GET Single movie
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.any(
    "SELECT id, comment, movie_id, TO_CHAR(created_at, 'HH12:MI AM, DD Mon YYYY') created_at FROM comments WHERE movie_id = $1 ORDER BY created_at DESC",
    [id]
  )
    .then((comments) => {
      res.render("pages/movie", {
        pageTitle: "Single Movie",
        // movie_id: id,
        movie_id: req.params.id,
        comments: comments
      });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

router.post("/:id", (req, res) => {
  // Validate here
  const { id } = req.params;

  db.one(
    "INSERT INTO comments (comment, movie_id) VALUES ($1, $2) RETURNING id, comment, movie_id, TO_CHAR(created_at, 'HH12:MI AM, DD Mon YYYY') created_at",
    [req.body.comment, id]
  )
    .then((data) => {
      console.log(data);
      res.send({
        ...data,
        success: true
      });
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

module.exports = router;
