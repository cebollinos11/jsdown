_test = 0;
function RunTest(){

	//Place static Platform
	var newplat = Crafty.e('2D, DOM, Color,Platform')
  	.attr({x: 0, y: _h-100, w: _w, h: 30,z:0,hitplayer:do_nothing}).color("#FFF");


  	SpawnUmbrella(_w/2,_h/2);
  	setTimeout(function(){ RunSpikes();
  		
  	}, 1000);
}

function floate(){
	//find player 1
	var player1 = Crafty("Player_element");

	console.log(player1);
	
	player1.bind("EnterFrame", function (){ 
		//remove gravity
		this.y-=_g;


		//add up/ down controls
		if (this.isDown(38)) {      
      		this.y-=_ps; }

      		if (this.isDown(40)) {      
      		this.y+=_ps; }	


	 });

	



	
}