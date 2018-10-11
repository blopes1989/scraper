function webScrape () {
// Grab the articles as a json
$.getJSON("/articles", function(data) {

    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#base").append(
        "<div class='card cardOuter'>" +
        "<div class='row'>" +
        "<div class='card-body col-8'>" +
        "<h5 class='card-title'> </h5>" + data[i].title +
        "<p class='card-text'>" + data[i].body + "<br>" + data[i].link +"</p>" +
        "</div>"+
        "<div class='card cardInner'>"+
        "<h5 class='card-header'id= 'bodyinput'>Leave a comment!</h5>"+
        "<div class='card-body col'>"+
        "<input type='text' class='form-control' id= 'notes' placeholder='Comment Here'>"+
        "<a href='#' class='btn btn-primary id= 'submit'>Post</a>"+
        "</div>"+
        "</div>"+
        "</div>"+
        "</div>"
      
      );
    }
  });
}
  
//   // When you click the submit button
   $(document).on("click", "#submit", function() {
       event.preventDefault();
//     // Grab the id associated with the article from the submit button
     var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
   });

   $(document).on("click", "#scrape", function() {

    $.get("/scrape", function(data) {
      console.log(data);
    }).then(function() {
     webScrape()
    }).catch(err => console.log(err));

  })
  