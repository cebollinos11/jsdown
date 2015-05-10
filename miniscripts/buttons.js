function updateButtons()
{
    setTimeout(RunjQueryInButtons, 1000);
}


function RunjQueryInButtons(){

		$("#Retry").click(function(){

			 G.LoadTitle();       
			}
			);

        $("#Start").click(function(){
             G.StartGame();    
            }
            );

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