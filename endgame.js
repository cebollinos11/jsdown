
function endGameClass()

{
	this.endGame = function(who){
	console.log(who);
	//Crafty.stop();
	this.showEndGameMessage(who);	
	}


	this.showEndGameMessage = function(who){

		var title_text = "End of the game!"
		Crafty.e("2D, DOM, Text").text("<H1><br><br><br><br><br><br><br><br> </H1>").attr({ x: 150, y: 100 ,w:500,h:400,z:1 });
		Crafty.e("2D, DOM, Text")
		.attr({ x: 200, y: 150 ,w:400 }).text("<H1>"+title_text+"</H1><p>Your Score: "+G.score.score+"</p><p>Highest Record: "+999+"</p>")
		.attr({z:2})
		.bind("KeyDown",function(e)
	         {
	           if(e.key==32){ //check for SPACE KEY
	                G.LoadTitle();           
	           }           
	         });



	   Crafty.e("2D, DOM, Text").attr({ x: 100, y: 450, w:600 })
	    .text("<H1>Press SPACE to try AGAIN!!</H1>").attr({z:2});  
	}

}




