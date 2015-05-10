function updateButtons()
{
    setTimeout(RunjQueryInButtons, 1000);
}


function RunjQueryInButtons(){

        $("#submitName").keyup(function(){
            if($("#submitName").val()!=""){
                $('#Send').removeAttr('disabled');
            }
            else{
                $('#Send').attr('disabled', 'disabled');
            }
        })

		$("#Retry").click(function(){

			 G.LoadTitle();       
			}
			);

        $("#Start").click(function(){
             G.StartGame();    
            }
            );

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
        	console.log(data,status)
            $("#Response").html("Data: " + data);
            updateHS();
        });
    });
}