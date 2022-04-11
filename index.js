const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
const morgan = require("morgan");
app.use(morgan("dev"));

const path = require("path");

// Axios
const axios = require('axios');

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// EJS - views by default
app.set("view engine", "ejs");

// Static files
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
const homeRouter = require("./routes/home");
app.use("/", homeRouter);
const movieRouter = require("./routes/movies");
app.use("/movies", movieRouter);

// API routes
const weatherAPI = require("./routes/api/weatherAPI");
app.use("/api/weather", weatherAPI);


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`);
});
