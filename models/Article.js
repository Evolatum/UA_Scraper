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
    required: true,
    trim:true
  },
  url: {
    type: String,
    required: true
  },
  pdf: {
    type: String,
    required: true,
    index:true,
    unique: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "comment"
  }]
});

// Export the model
module.exports = mongoose.model("article", ArticleSchema);
