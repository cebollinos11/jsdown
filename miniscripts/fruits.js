
Fr = {fruitsize:32,
	Frequency:10//in percentage
	};
function GenFruit(x,y){
	
	var x = x-Fr.fruitsize/2;
	var h = y-Fr.fruitsize;
	
	var Fruit = Crafty.e('spawnable,banana, 2D, Color, DOM, Collision').attr({x:x,y:h,w:Fr.fruitsize,h:Fr.fruitsize});
	Fruit.TTL = Fr.TTL; 
	Fruit.bind("EnterFrame", function (){
		this.y-=_currPspeed;
         if(this.y<-this.h || this.y>_h+this.h+1){           
         this.destroy();}
	});

	Fruit.onHit('Player_element',function(who) {
		this.destroy();
		G.score.add(50);
	});
}