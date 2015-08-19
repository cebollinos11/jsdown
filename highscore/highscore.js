function getGetOrdinal(n) {
   var s=["th","st","nd","rd"],
       v=n%100;
   return n+(s[(v-20)%10]||s[v]||s[0]);
}


_minimumHS = 99999;

function updateHS(){
    console.log("HYIT ME");
    $(".HighScoresPanel").html("Loading...");

    //weekly

   $.getJSON( "highscore/dbweek.json?"+roll(9999), function( data ) {
      var items = "";
      $.each( data["entries"], function( key, val ) {
        var n = key
        items+=( "<tr><td>"+getGetOrdinal(parseInt(key+1))+"</td><td> " + val["name"] + "</td> <td>"+ val["score"]+"</td></tr>" );
      });
    $("#tab1").html("<table class='hstable'>"+items+"</table>");
    var minimumHS = data["entries"];
    _minimumHS = parseInt(minimumHS[minimumHS.length-1]["score"]);
    
    
    });


    //all time

    $.getJSON( "highscore/db.json?"+roll(9999), function( data ) {
      var items = "";
      $.each( data["entries"], function( key, val ) {
        var n = key
        items+=( "<tr><td>"+getGetOrdinal(parseInt(key+1))+"</td><td> " + val["name"] + "</td> <td>"+ val["score"]+"</td></tr>" );
      });
    $("#tab2").html("<table class='hstable'>"+items+"</table>");
    
    });

    var placeholder = "<ul class='tabs'><li><a href='#tab1'>Weekly</a></li><li><a href='#tab2'>All time</a></li></ul><div id='tab1'><p>Hi, this is the first tab.</p>  </div>  <div id='tab2'>    <p>This is the 2nd tab.</p>  </div>";
 

    $(".HighScoresPanel").html("<div class='jsPanel'><h1>Online Leaderboard</h1>"+placeholder+"</div>");


    $('ul.tabs').each(function(){
    // For each set of tabs, we want to keep track of
    // which tab is active and it's associated content
    var $active, $content, $links = $(this).find('a');

    // If the location.hash matches one of the links, use that as the active tab.
    // If no match is found, use the first link as the initial active tab.
    $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
    $active.addClass('active');

    $content = $($active[0].hash);

    // Hide the remaining content
    $links.not($active).each(function () {
      $(this.hash).hide();
    });

    // Bind the click event handler
    $(this).on('click', 'a', function(e){
      // Make the old tab inactive.
      $active.removeClass('active');
      $content.hide();

      // Update the variables with the new link and content
      $active = $(this);
      $content = $(this.hash);

      // Make the tab active.
      $active.addClass('active');
      $content.show();

      // Prevent the anchor's default click action
      e.preventDefault();
    });
  });

    }