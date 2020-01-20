// NPM Packages
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

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

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/UA_Scraper", { useNewUrlParser: true });

// Routes
require("./routes/apiRoutes")(app,db);
require("./routes/htmlRoutes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("Listening on http://localhost:" + PORT + "/");
});
