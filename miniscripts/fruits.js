
Fr = {fruitsize:32,
	db:["banana","cherry","pineapple","beer","burger","hotdog","lollipop"],
	Frequency:70//in percentage
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
	var FruitType = Fr.db[roll(Fr.db.length) - 1];
	// FruitType = Fr.db[Fr.db.length - 1];
	var Fruit = Crafty.e('spawnable, '+FruitType+', 2D, Color, DOM, Collision').attr({x:x,y:h,w:fsize,h:fsize,points:points});
	 
	Fruit.bind("EnterFrame", function (){
		this.y-=_currPspeed;
         if(this.y<-this.h || this.y>_h+this.h+1){           
         this.destroy();
         

     	}
	});

	Fruit.onHit('Player_element',function(who) {
		playsound("bite");
		this.destroy();
		if(this.has("hotdog") || this.has("burger") || this.has("lollipop")){
			who[0].obj.fat_component.getFat();
			G.score.add(this.points*5,who[0].obj);    

		}
		else{
			
      	G.score.add(this.points,who[0].obj);   
      	if (roll(3)<4) {
				who[0].obj.fat_component.removeFat();
			} 	
		}
		
	});
}

