

function updateButtons(){

		$("#Retry").click(function(){
			 G.LoadTitle();       
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