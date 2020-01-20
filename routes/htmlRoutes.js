// Dependencies
var axios = require("axios");

// Routes
// =============================================================
module.exports = function(app) {
    app.get("/", function(req, res) {
        axios.get("http://localhost:8000/articles").then(function(data) {
            var hbsObject = {
                articles: data.data
              };
            console.log(hbsObject);
            res.render("index", hbsObject);
        });
    });
};