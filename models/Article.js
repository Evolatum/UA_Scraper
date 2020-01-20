// Dependencies
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Schema declaration
var ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

// Export the model
module.exports = mongoose.model("Article", ArticleSchema);
