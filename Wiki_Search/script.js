$(document).ready(function(){
  //XMLRequest function
  var getText = function(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
      if(xhr.readyState==4 && xhr.status==200){
          callback(xhr.responseText);
      }
    };
    xhr.open('GET',url);
    xhr.send();
  };
  //callback function
  function callSaul(data){
    var obj = JSON.parse(data);
    var $hello = 'hello';
    for(var i=0;i<obj[1].length;i++){
        var $title = '<h1>'+obj[1][i]+'</h1><br>';
        var $bio = '<p>'+obj[2][i]+'</p><br>';
        var $link = '<a href="'+obj[3][i]+'" >Link To Wiki</a>';
        $('<div>'+$title+$bio+$link+'</div>').attr('class','container result').appendTo('body');
    }
  }
  //clicking search button expands search bar
  $('#search-trigger').on('click',function(e){
    e.preventDefault();
    if(!$('#search-input').hasClass("search-input-open")){
      $('#search-input').addClass('search-input-open');
    }else{
      var searchTerm = document.getElementById('search-input').value;
      var string = "http://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=" + searchTerm + "&formatversion=2&format=json";
        $('.result').remove();
     getText(string,callSaul);
    }
  });

  $("#search-input").keyup(function (e) {
          if(e.keyCode==13){
            e.preventDefault();
            var searchTerm = document.getElementById('search-input').value;
            var string = "http://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=" + searchTerm + "&formatversion=2&format=json";
            $('.result').remove();
           getText(string,callSaul);
          }
         });
         $("form").submit(function(e){
         e.preventDefault();
     });
//click away from search form causes search bar to close
  $(document).on('click', function(e) {
    
    if(!$(e.target).is('#search-trigger')&&!$(e.target).is('#search-input')) {
      $('#search-input').removeClass('search-input-open');
    }
  });
});
