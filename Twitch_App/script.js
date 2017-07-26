$(document).ready(function(){
  var array = ['joshOG','TimTheTatman','LealeRyan','h3h3productions','CaptainSpiking','purgegamers','Draskyl'];
  var newArray = [];
  var $table = $('.table');
  for(var i = 0;i<array.length;i++){
    $.ajax({//ajax function finding data
      url:"https://wind-bow.glitch.me/twitch-api/streams/"+array[i]+"?callback=?",
      success:function(data){//when the ajax is succesful
        var num = data.indexOf('&')+2;
        var str = data.substring(num);
        var result = str.substring(2,str.length-2);
        var obj = JSON.parse(result);
        if(obj.stream !== null){//execute when stream is available
          $table.find('tbody')
            .append($('<tr>')
              .addClass('online')
              .append($('<td>')
                .append($('<img>')
                  .attr('src',obj.stream.channel.logo)
                  .attr('height',100)
                )
              )
            .append($('<td>')
              .append($('<p>')
                .text(obj.stream.channel.display_name)
              )
            )
            .append($('<td>')
              .append($('<p>')
                .text(obj.stream.channel.game)
              )
            )
            .append($('<td>')
              .append($('<p>')
                .text(obj.stream.viewers)
              )
            )
          );
        }else{//execute when stream is offline
          var twitchURL= obj._links.channel;
          var num1 = twitchURL.indexOf('s/');
          var twitchName = twitchURL.substring(num1+2);
          var URL = 'https://wind-bow.glitch.me/twitch-api/channels/' + twitchName;
          var xhr = new XMLHttpRequest();
          xhr.open('GET',URL);
          xhr.onload = function(){//when ajax call is successful
            var offlineObj = JSON.parse(xhr.responseText);
            $table.find('tbody')
            .append($('<tr>')
            .addClass('offline')
              .append($('<td>')
                .append($('<img>')
                  .attr('src',offlineObj.logo)
                  .attr('height',100)
                )
              )
            .append($('<td>')
              .append($('<p>')
                .text(offlineObj.display_name)
              )
            )
            .append($('<td>')
              .append($('<p>')
                .text('Offline')
              )
            )
          );
          };
          xhr.send();
        }
      },
      error:function(data){//when ajax is an error
        arr.push(blank);
      },
      complete:function(){//extracting the data and appending
      }
    });
  }
  $('#online').click(function(e){//show online channels
    e.preventDefault();
    $('.offline').hide();
    $('.online').show();
    $(this).addClass('active');
    $('#all').removeClass('active');
    $('#offline').removeClass('active');
  });
  $('#offline').click(function(e){//show offline channels
    e.preventDefault();
    $('.online').hide();
    $('.offline').show();
    $(this).addClass('active');
    $('#all').removeClass('active');
    $('#online').removeClass('active');
  });
  $('#all').click(function(e){//show all channels
    e.preventDefault();
    $('.online').show();
    $('.offline').show();
    $(this).addClass('active');
    $('#online').removeClass('active');
    $('#offline').removeClass('active');
  });
});
