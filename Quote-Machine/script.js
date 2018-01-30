$(document).ready(function(){
  var $quoteText = $('#quoteText');
  var tweetr;
  $('.btn').click(function(e){
    e.preventDefault();
   $.ajax("https://api.icndb.com/jokes/random?exclude=[explicit]", {
     success:function(responses){
       $quoteText.empty();
      $quoteText.append(responses.value.joke);
      $('#twitterShare').click(function(e){
        e.preventDefault();
        var url = "https://twitter.com/intent/tweet?text=" + encodeURI(responses.value.joke);
        window.location.href=url;
      });
     }
   });
  });
});
