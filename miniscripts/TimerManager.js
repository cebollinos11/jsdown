function TimerManager(){
	this.name = "counter";
	
	this.count=0;
	this.id = [];
	var self = this; //trick so iteration method can access "this"
	self.iteration = function(){
		this.count++;
		//console.log(this.count,this.id);



	//timer generates stuff
		(this.count%5) ? {} : GenBird();
		(this.count%20) ? {} : MultiBird();
		(this.count%7) ? {} :GenFish();
      if(this.count%15===1){_difficulty[1]+=1;}
      G.score.add(1);


		
	}
	self.start = function(){
		var new_id=setInterval(function() { 
						self.iteration(); }	
			,1000);
		this.id.push(new_id);
	};
	this.stop = function(){
		
		this.id.forEach(
			function(ele){
			//console.log("stopping",ele);
			clearInterval(ele);
		}
		);

		this.id = [];		
	};
	this.reset = function(){
		this.count = 0;
	}
}

