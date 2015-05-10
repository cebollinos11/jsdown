function getGetOrdinal(n) {
   var s=["th","st","nd","rd"],
       v=n%100;
   return n+(s[(v-20)%10]||s[v]||s[0]);
}

function updateHS(){
    $(".HighScoresPanel").html("Loading...");

    $.getJSON( "highscore/db.json", function( data ) {
      var items = "";
      $.each( data["entries"], function( key, val ) {
        var n = key
        items+=( "<tr><td>"+getGetOrdinal(parseInt(key+1))+"</td><td> " + val["name"] + "</td> <td>"+ val["score"]+"</td></tr>" );
      });
    $(".HighScoresPanel").html("<h1>Online Leaderboard</h1><table class='hstable'>"+items+"</table>");
    
      console.log(items);
    });

    }