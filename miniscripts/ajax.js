function RequestHighscore(){
	console.log("Requesting highscore");


	$.getJSON( "highscore/dbweek.json", function( data ) {
      	
    }).always(function(data){//assign data into variable
    	console.log("success");
    	//console.log(data["entries"]);      	
    	G.HighscoreData = data["entries"];
    });
}