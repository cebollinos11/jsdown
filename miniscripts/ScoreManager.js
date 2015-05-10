function ScoreManager(){
	this.score = 0;
	this.frozen = 0;
	this.add = function(n){
		if(this.frozen){return}
		this.score+=n;
	}
	this.reset = function(){
		this.score = 0;
		this.frozen = 0;
	}
	this.freeze = function(){this.frozen=1;}
}

