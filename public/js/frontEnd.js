
// ADD DOCUMENT CLICK FUNCTION ////////////////////////////////////////

$(".createForm").on("click", function (event) {
  event.preventDefault();

  $.ajax("/add", {
      type: "GET"
    }).then(
      function() {
        console.log("updated quote");
        location.assign("/add");
      }
    );

});


$(document).ready(function(){
  $('.datepicker').datepicker({
    format: 'mmddyy'

  });
});