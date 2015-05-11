
Fr = {fruitsize:32,
	db:["banana","cherry"],
	Frequency:10//in percentage
	};
function GenFruit(x,y){
	
	var x = x-Fr.fruitsize/2;
	var h = y-Fr.fruitsize;
	var FruitType = Fr.db[roll(2)-1];
	var Fruit = Crafty.e('spawnable, '+FruitType+', 2D, Color, DOM, Collision').attr({x:x,y:h,w:Fr.fruitsize,h:Fr.fruitsize});
	 
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