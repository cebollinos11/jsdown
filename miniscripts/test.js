_test = 0;
function RunTest(){

	//Place static Platform
	var newplat = Crafty.e('2D, DOM, Color,Platform')
  	.attr({x: 0, y: _h-100, w: _w, h: 30,z:0,hitplayer:do_nothing}).color("#FFF");


  	//SpawnUmbrella(_w/2,_h/2);

  	to = Crafty.e("2D,DOM,Color,Tween").color("green").attr({x:50,y:50,h:50,w:50,z:4});

  	to.bump = function(){
  		to.tween({h:this.h-10},200);
  		to.bind("TweenEnd",function(){
  			to.tween({h:this.h+10},200);
  			to.unbind("TweenEnd");

  		});
  	}

  	
}

// function bump1(sprite){
// 	console.log("start bump");	
// 	console.log(sprite);
// 	sprite.tween({h:sprite.h-10},200);
//   		console.log("lets see: ",sprite.h)
//   		sprite.bind("TweenEnd",function(){
//   			sprite.tween({h:sprite.h+10},200);
//   			sprite.unbind("TweenEnd");

//   		});

// }


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