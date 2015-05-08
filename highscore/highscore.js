function updateHS(){
    $(".HighScoresPanel").html("Loading...");

    $.getJSON( "highscore/db.json", function( data ) {
      var items = "";
      $.each( data["entries"], function( key, val ) {
        var n = key
        items+=( "<tr><td>#"+parseInt(key+1)+"</td><td> " + val["name"] + "</td> <td>"+ val["score"]+"</td></tr>" );
      });
    $(".HighScoresPanel").html("<h1>Online Leaderboard</h1><table>"+items+"</table>");
    
      console.log(items);
    });

    }