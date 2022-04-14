const express = require("express");
const router = express.Router();
const db = require("../database");

// GET Search Function
router.get("/", (req, res, next) => {
  res.render("pages/search", {
    title: "Search"
  });
});

module.exports = router;
