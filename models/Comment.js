// Dependencies
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Schema declaration
var CommentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

// Export the model
module.exports = mongoose.model("comment", CommentSchema);
