
Fr = {fruitsize:32,
	db:["banana","cherry","pineapple","beer"],
	Frequency:45//in percentage
	};
function GenFruit(x,y){

	var fsize = Fr.fruitsize;
	var points = 25;
	if(roll(50)==1){
		fsize *=3;
		points = 100;
	}
	
	var x = x-fsize/2;
	var h = y-fsize;
	var FruitType = Fr.db[roll(4)-1];
	var Fruit = Crafty.e('spawnable, '+FruitType+', 2D, Color, DOM, Collision').attr({x:x,y:h,w:fsize,h:fsize,points:points});
	 
	Fruit.bind("EnterFrame", function (){
		this.y-=_currPspeed;
         if(this.y<-this.h || this.y>_h+this.h+1){           
         this.destroy();
         

     	}
	});

	Fruit.onHit('Player_element',function(who) {
		playsound("bite");
      	G.score.add(this.points,who[0].obj);    	
		this.destroy();
		
	});
}

