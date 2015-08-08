Um = {size:50,
		relposition:20,
		Frequency:4
		};

function SpawnUmbrella(x,y){
	var x = x-Um.size/2;
	var y = y-Um.size;

	var effect = function(who){
		who.y-=3;
		this.usageleft--;
		//console.log(this.usageleft);
		if(this.usageleft<0){
			this.destroy();
			who.umbrella=undefined;
			G.score.add(50,who);
		}
	}
	var u = Crafty.e('spawnable, Umbrella, 2D, DOM, Collision').attr({x:x,y:y,w:Um.size,h:Um.size,z:1,effect:effect,usageleft:250});
	u.onHit('Player_element',function(who) {

		var p = who[0].obj;

		if(p.umbrella!=this){
			console.log(p.name+ " took umbrella");

			if(this.owner != p && this.owner != undefined){
				console.log("stolen from", this.owner);
				//console.log(this.owner.name +" had "+this.owner.umbrella);
				this.owner.umbrella = undefined;
				ScoreParticle(p.x,p.y,"Steal!")
			}
			this.owner = p;
		}

			
		p.umbrella = this;
		
	});


	u.bind("EnterFrame", function (){
		if(this.owner==undefined){
		this.y-=_currPspeed;
			
		}
		else{
			var p =this.owner;
			this.x = p.x;
			this.y = p.y-this.h;	
		}
         if(this.y<-this.h){           
         this.destroy();     	
     }

     
	});

}