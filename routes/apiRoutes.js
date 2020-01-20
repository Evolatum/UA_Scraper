// Dependencies
var axios = require("axios");
var cheerio = require("cheerio");

// Routes
// =============================================================
module.exports = function(app,db) {

    // A GET route for scraping
    app.get("/scrape", function(req, res) {
        axios.get("https://dnd.wizards.com/articles/unearthed-arcana/").then(function(response) {
        var $ = cheerio.load(response.data);

        // Grab every text class within an article tag
        $("article .text").each(function(i, element) {

            // Empty object and properties to add from each element
            var result = {};
            result.headline = $(this).children("h4").children("a").text();
            result.summary = $(this).children(".summary").children("p").text();

            var articleUrl = "https://dnd.wizards.com" + $(this).children("h4").children("a").attr("href");
            if(!/^.+\.(wallpaper)$/.test(articleUrl)){
                // Check link of article
                axios.get(articleUrl).then(function(response) {
                    var $ = cheerio.load(response.data);
            
                    $(".cta-button").each(function(i, element) {
                        var url = $(this).attr("href");

                        // Check if link is pdf
                        if (/^.+\.([pP][dD][fF])$/.test(url)) {
                            result.url = articleUrl;
                            result.pdf = url;

                            // Create a new Article with created object
                            db.Article.create(result)
                            .then(function(dbArticle) {
                                console.log(dbArticle);
                            })
                            .catch(function(err) {
                                console.log(err);
                            });
                        }
                    });
                });
            }
        });

        res.send("Scrape Complete.");
        });
    });

    // Route for getting all Articles from the db
    app.get("/articles", function(req, res) {
        db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // Route for grabbing a specific Article by id, and populated with its Comments
    app.get("/articles/:id", function(req, res) {
        db.Article.findOne({ _id: req.params.id })
        .populate("Comments")
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    // Route for adding a Comment to an Article
    app.post("/articles/:id", function(req, res) {
        db.Comment.create(req.body)
        .then(function(dbComment) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push:{comments: dbComment._id }}, { new: true });
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.send(err);
        });
    });

    // Route for deleting a Comment
    app.delete("/comments/:id", function(req, res) {
        db.Comment.delete({_id:req.params.id})
        .then(function(dbComment) {
            res.send("Comment deleted.");
        })
        .catch(function(err) {
            res.send(err);
        });
    });
};