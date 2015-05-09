

function updateButton(){
	    $("#Send").click(function(){

        var ToSend = {};
        ToSend.name = $("#submitName").val();
        ToSend.score = G.score.score.toString();
        console.log("Sending")
        $.post("highscore/hs.php",
        {
          data: JSON.stringify(ToSend)
        },
        function(data,status){
        	console.log(data,status)
            $("#Response").html("Data: " + data);
            updateHS();
        });
    });
}
function endGameClass()

{
	this.endGame = function(who){
	console.log(who);
	//Crafty.stop();
	this.showEndGameMessage(who);	
	}


	this.showEndGameMessage = function(who){

		var title_text = "End of the game!"
		Crafty.e("2D, DOM, Text").text("<H1><br><br><br><br><br><br><br><br> </H1>").attr({ x: 50, y: 100 ,w:500,h:400,z:1 });
		Crafty.e("2D, DOM, Text")
		.attr({ x: 100, y: 150 ,w:400 }).text("<H1>"+title_text+"</H1><p>Your Score: "+G.score.score+"</p>")
		.attr({z:2})
		.bind("KeyDown",function(e)
	         {
	           if(e.key==32){ //check for SPACE KEY
	                G.LoadTitle();           
	           }           
	         });

		  Crafty.e("2D, DOM, Text, HighScoresPanel").attr({ x: 570, y: 50 , w:200 })
   			.text("<H1>Highest Record: "+999+"</H1>").attr({z:2})

		updateHS();
	   Crafty.e("2D, DOM, Text").attr({ x: 100, y: 450, w:600 })
	    .text("<H1>Press SPACE to try AGAIN!!</H1>").attr({z:2});  

	    //submitbutton
	    Crafty.e("2D, DOM, Text").attr({ x: 100, y: 350, w:600 })
	    .text("Your name <input id='submitName' ></input> <button id='Send'>Submit score</button><div id='Response'>Response</div>").attr({z:2});  

	    setTimeout(updateButton, 1000);
	    
	}

}




