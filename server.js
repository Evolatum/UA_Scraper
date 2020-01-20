// NPM Packages
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require models
var db = require("./models");

var PORT = 8000;

// Initialize Express
var app = express();

// Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/UA_Scraper", { useNewUrlParser: true });

// Routes
require("./routes/apiRoutes")(app,db);
require("./routes/htmlRoutes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("Listening on http://localhost:" + PORT + "/");
});
