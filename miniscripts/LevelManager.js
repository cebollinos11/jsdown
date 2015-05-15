function InitLevels()
{
	this.levelDB = ["level 0",
		{name:"Level 1",points:200,mix:[G.platformsDB.bricks]},
		{name:"Level 2",points:400,mix:[G.platformsDB.rleft]},
	];
	
	this.reset = function(){
	this.currentLeveln = 1;
	this.currentLevel = this.levelDB[this.currentLeveln];
	console.log("Reset levels");
	};

	this.reset();

	this.checkLevelUp=function(score){
		if (this.currentLeveln==this.levelDB.length-1) return;

		if(score>this.currentLevel.points){
			this.levelup();
		}

	};

	this.levelup = function(){	
		
		
		this.currentLeveln++;
		this.currentLevel = this.levelDB[this.currentLeveln];

		console.log("level up to", this.currentLevel.name);
	};
}