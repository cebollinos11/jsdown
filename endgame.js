
function endGameClass()
{
	this.gameEnded = 0;	
	this.endGame = function(who){
	if(this.gameEnded){console.log("game already ended");return}
	this.gameEnded = 1;

	if(G.score.score>1000){playsound("highscore",1)}
		else{playsound("gameover",1,0.5);}
	
	//console.log(who);
	//Crafty.stop();
	this.showEndGameMessage(who);	
	}


	this.showEndGameMessage = function(who){
		console.log("winner",who.name,who.player_color);

		Crafty.e('2D,  DOM, tupiwalk'+who.index+', spawnable,Color')
		  .attr({x: 400, y: 125, w: _pw, h: _ph,z:4});
		  //.color(who.player_color);  
		  
		
		//Crafty.e("2D, DOM, Text").text("<H1><br><br><br><br><br><br><br><br> </H1>").attr({ x: 50, y: 100 ,w:500,h:400,z:1 });
		Crafty.e("2D, DOM, Text")
		.attr({ x: 100, y: 100 ,w:400 }).text("<div class='jsPanel'><div class='HSinfo'><p>Final Score: <span>"+G.score.score+
			"</span></p><div id='Retry' class='jsButton'>Try AGAIN!</div><div id='GoToMainMenu' class='jsButton'>Main menu</div></div>")

			// "</span></p><p>Name: <input id='submitName' ></input></p></div><button id='Send' disabled='disabled'>Submit score</button><div id='Retry' class='jsButton'>Try AGAIN!</div><div id='GoToMainMenu' class='jsButton'>Main menu</div></div>")
			.attr({z:2});

		  Crafty.e("2D, DOM, Text, HighScoresPanel").attr({ x: 520, y: 50 , w:250  })
   			.text("<H1>Loading Leaderboard...</H1>").attr({z:2})

	    setTimeout(updateHS,1000);
	   Crafty.e("2D, DOM, Text").attr({ x: 100, y: 450, w:600 })
	    .text("").attr({z:2});  
	    AudioControllerListener();
	    updateButtons();	

	    if(G.score.score>_minimumHS ){AllowSubmitHighScore();}    
	}
}


_sendhighscore = 0;
function AllowSubmitHighScore(){
	_sendhighscore = Crafty.e("2D, DOM, Text,Color")
		.attr({ x: 200, y: 200 ,w:400 }).text("<div class='jsPanel' style='background-color:rgba(255,25,123,1);'><h1 class='eff_bold'>You got a new Highscore!!</h2><div class='HSinfo'><p><span>"+G.score.score+
			"</span></p><p>Name: <input id='submitName'  ></input></p></div><button id='Send' disabled='disabled'>Submit score</button><button style='margin-top:10px' id='NoSend' onclick='_sendhighscore.destroy()'>No thanks!</button></div>")
		.attr({z:3});
	Blink(_sendhighscore);
	updateButtons();	 
}

