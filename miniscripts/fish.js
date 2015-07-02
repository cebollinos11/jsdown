_fishsize = 75;
function GenFish(){
	
	var x = roll(_w-_fishsize)
	var y = _h
	
	var Fish = Crafty.e('spawnable, fish, 2D, Color, DOM, Collision').attr({x:x,y:y,w:_fishsize,h:_fishsize,speed:_currPspeed+1,grabbingPoints:10});
	Fish.bind("EnterFrame", function (){
		this.y-=this.speed;
         if(this.y<-this.h){           
         this.destroy();}
	});

	Fish.onHit('Player_element',function(who) {
		if( who[0].obj.grabbing!=this){
      	G.score.add(75,who[0].obj);
      	playsound("blip");      
    	}
		who[0].obj.grabbing = this;
		who[0].obj.x = this.x+this.w/3;
    	who[0].obj.y = this.y+this.h/2;
    	//this.speed+=1;
	});

	

	Fish.onHit('DeathFloorTop',function () { playsound("pop");

		SetExplodingBalloon(this.x,this.y);
		this.destroy(); })
	Fish.onHit('bird',function () {SetExplodingBalloon(this.x,this.y); playsound("pop");this.destroy(); })

}



function SetExplodingBalloon(x,y){

	var explo = Crafty.e('2D, DOM,Color,ExplodingBalloon').attr({x:x,y:y,w:_fishsize,h:_fishsize});
	setTimeout(function(){ explo.destroy(); }, 400);


}