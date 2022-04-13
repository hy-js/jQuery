const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
// enable CORS without external module
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/");

  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};

app.use(allowCrossDomain);

const morgan = require("morgan");
app.use(morgan("dev"));

const path = require("path");

// cors
// const cors = require('cors')
// app.use(cors())

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

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`);
});
