
function endGameClass()

{
	this.endGame = function(who){
	//console.log(who);
	//Crafty.stop();
	this.showEndGameMessage(who);	
	}


	this.showEndGameMessage = function(who){
		var title_text = "End of the game!"
		//Crafty.e("2D, DOM, Text").text("<H1><br><br><br><br><br><br><br><br> </H1>").attr({ x: 50, y: 100 ,w:500,h:400,z:1 });
		Crafty.e("2D, DOM, Text")
		.attr({ x: 100, y: 100 ,w:400 }).text("<p style='text-align:center'>"+
			title_text+"</p><div class='submitHSpanel'><p>Final Score: <span>"+G.score.score+
			"</span></p><p>Name:<input id='submitName' ></input></p><button id='Send' class='jsButton' disabled='disabled'>Submit score</button><H1 id='Retry' class='jsButton'>Try AGAIN!</H1></div>")
		.attr({z:2});

		  Crafty.e("2D, DOM, Text, HighScoresPanel").attr({ x: 570, y: 50 , w:200 })
   			.text("<H1>Highest Record: "+999+"</H1>").attr({z:2})

		updateHS();
	   Crafty.e("2D, DOM, Text").attr({ x: 100, y: 450, w:600 })
	    .text("").attr({z:2});  

	    updateButtons();	    
	}
}




