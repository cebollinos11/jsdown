
function endGameClass()
{
	this.gameEnded = 0;	
	this.endGame = function(who){
	if(this.gameEnded){console.log("game already ended");return}
	this.gameEnded = 1;

	playsound("gameover",1)
	//console.log(who);
	//Crafty.stop();
	this.showEndGameMessage(who);	
	}


	this.showEndGameMessage = function(who){
		
		//Crafty.e("2D, DOM, Text").text("<H1><br><br><br><br><br><br><br><br> </H1>").attr({ x: 50, y: 100 ,w:500,h:400,z:1 });
		Crafty.e("2D, DOM, Text")
		.attr({ x: 100, y: 100 ,w:400 }).text("<div class='jsPanel'><div class='HSinfo'><p>Final Score: <span>"+G.score.score+
			"</span></p><p>Name: <input id='submitName' ></input></p></div><button id='Send' disabled='disabled'>Submit score</button><div id='Retry' class='jsButton'>Try AGAIN!</div><div id='GoToMainMenu' class='jsButton'>Main menu</div></div>")
		.attr({z:2});

		  Crafty.e("2D, DOM, Text, HighScoresPanel").attr({ x: 520, y: 50 , w:250  })
   			.text("<H1>Loading Leaderboard...</H1>").attr({z:2})

	    updateHS(); 
	   Crafty.e("2D, DOM, Text").attr({ x: 100, y: 450, w:600 })
	    .text("").attr({z:2});  

	    updateButtons();	    
	}
}




