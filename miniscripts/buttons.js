function updateButtons()
{
    setTimeout(RunjQueryInButtons, 1000);
}


function RunjQueryInButtons(){


    $(".playercontrols").click(function(){


        playsound("blip");

        var n = parseInt($(this).attr("id").slice(-1))+1;

      console.log(n," clicked");
      _nplayers = n;
        UpdatePlayerList();

    });

        $("#submitName").keyup(function(){
            console.log("GO",$("#submitName").val());
            if($("#submitName").val()!=""){
                $('#Send').removeAttr('disabled');
            }
            else{
                $('#Send').attr('disabled', 'disabled');
            }
        })


            $("#GoToMainMenu").click(function(){

             G.LoadTitle();       
            }
            );


		$("#Retry").click(function(){

			 G.StartGame();       
			}
			);

        $("#Start").click(function(){


             StartGameFromMainMenu();
             


            }
            );

        console.log("Start SET");

	    $("#Send").click(function(){

        $(this).hide();

        var ToSend = {};
        ToSend.name = $("#submitName").val();
        ToSend.score = G.score.score.toString();
        console.log("Sending")
        $.post("highscore/hs.php",
        {
          data: JSON.stringify(ToSend)
        },
        function(data,status){
        	
            $("#Response").html("Data: " + data);
            $(".HighScoresPanel").html("<H1>Updating Leaderboard...</H1>");
            setTimeout(updateHS, 1000);
            Blink(Crafty("HighScoresPanel"));
            _sendhighscore.destroy();
        });

        $.post("highscore/hsweek.php",
        {
          data: JSON.stringify(ToSend)
        },
        function(data,status){
            console.log(data,status)
            
            $(".HighScoresPanel").html("<H1>Updating Leaderboard...</H1>");
            updateHS();
        });
    });
}