// DOM References
const $ref = {
  comments:$("#commentsSection"),
}

$(document).ready(function(){
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  .then(function(data) {
    console.log(data);
  });
});

// On comments button click
$(document).on("click", ".commentsBtn", function() {
  populateComments($(this).parent().attr("id"));
});

// Add new comment
$(document).on("click", ".addCommentBtn", function(event) {
  event.preventDefault()
  var thisId = $(this).attr("id").replace("comment-","");
  var data= {
    title: $("#commentTitle").val(),
    text: $("#commentText").val()
  }

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: data
  })
    .then(function(data) {
      console.log(data);
      $("#commentTitle").val();
      $("#commentText").val();
      populateComments(thisId);
    });
});

// Delete comment
$(document).on("click", ".delComment", function() {
  var data = {
    comment_id : $(this).data("comment"),
    article_id : $(this).data("article")
  }

  $.ajax({
    method: "DELETE",
    url: "/articles/",
    data: data
  })
  .then(function(res) {
    console.log(res);
    populateComments(data.article_id);
  })
  .catch(function(error){
    console.log(error);
    populateComments(data.article_id);
  });
});

// Function to papulate comments of an article
function populateComments(thisId){
  $ref.comments.empty();

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
  .then(function(data) {
    console.log(data.comments);
    if(data.comments){
      for(let comment of data.comments){
        $ref.comments.append(`<div class="comment"><h4>${comment.title}</h4><span class="delComment" data-article="${thisId}" data-comment="${comment._id}" aria-hidden="true">&times;</span><p>${comment.text}</p></div>`);
      }
    }

    $ref.comments.append(`<form>
      <div class="form-group">
        <label for="commentTitle">Title:</label>
        <input class="form-control" id="commentTitle" aria-describedby="newCommentTitle">
      </div>
      <div class="form-group">
        <label for="commentText">Comment:</label>
        <input class="form-control" id="commentText" aria-describedby="newCommentText">
      </div>
      <button type="submit" class="btn btn-primary addCommentBtn" id="comment-${thisId}">Submit</button>
    </form>`);
  });
}