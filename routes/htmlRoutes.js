// Dependencies
var axios = require("axios");

// Routes
// =============================================================
module.exports = function(app) {
    app.get("/", function(req, res) {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log(fullUrl);
        axios.get(fullUrl+"articles").then(function(data) {
            var hbsObject = {
                articles: data.data
              };
            console.log(hbsObject);
            res.render("index", hbsObject);
        });
    });
};