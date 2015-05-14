function ScoreManager(){
	this.score = 0;
	this.frozen = 0;
	this.add = function(n,who){
		if(this.frozen){return}
		this.score+=n;
		if(who != undefined){ScoreParticle(who.x,who.y,n);}
		

	}
	this.reset = function(){
		this.score = 0;
		this.frozen = 0;
	}
	this.freeze = function(){this.frozen=1;}
}

