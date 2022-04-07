const express = require("express");
const router = express.Router();
// const db = require("../database");

// GET home page
router.get("/", (req, res, next) => {
  res.render("pages/index", {
    title: "Dashboard"
  });
});

module.exports = router;
