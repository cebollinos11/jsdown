function InitLevels()
{
	var g = G.platformsDB;

	this.levelDB = ["level 0",
		{name:"Level 1",points:200,mix:[g.bricks]},
		{name:"Level 2",points:400,mix:[g.bricks,
										g.bricks,	
										g.rleft,
										g.rright]},
		{name:"Level 3",points:400,mix:[g.bricks,
										g.rleft,
										g.rright,
										g.glass]},
		{name:"Level 4",points:600,maxsize:1,mix:[g.bricks]},
		{name:"Level 5",points:700,mix:[g.rright,
										g.rleft,
										g.fire]},
		{name:"Level 6",points:600,maxsize:1,mix:[g.bricks,
										g.rright,
										g.rleft,
										g.fire]},
	];

	this.pointsPool = 0;
	
	this.reset = function(){
	this.currentLeveln = 1;
	this.currentLevel = this.levelDB[this.currentLeveln];
	console.log("Reset levels");
	this.pointsPool = this.currentLevel.points;
	};

	this.reset();

	this.checkLevelUp=function(score){
		if (this.currentLeveln==this.levelDB.length-1) return;

		if(score>this.pointsPool){
			this.levelup();
		}

	};

	this.levelup = function(){	
		
		var current_class = "background_component"+this.currentLeveln
		this.currentLeveln++;
		var new_class = "background_component"+this.currentLeveln
		
		$("."+current_class).addClass(new_class);
		$("."+current_class).removeClass(current_class);		
		this.currentLevel = this.levelDB[this.currentLeveln];
		this.pointsPool+=this.currentLevel.points;
		console.log("level up to", this.currentLevel.name, "points poll set to",this.pointsPool);
		this.LevelParticle();
		playsound("highscore",1);

	};

	this.LevelParticle=function()
	{
		var n = this.currentLevel.name;
		var x = _w/3;
		var y = _h/3;
		var L = Crafty.e('2D, DOM, Text')
		.bind("EnterFrame", function (){			
	  	this.y+=3;
	  	this.TTL--;
	  	if(this.TTL<0){this.destroy();}	    
	    })
		.text('<div class="LevelParticle">+'+n+'</div>')
		.attr({x:x,y:y,TTL:50,z:-1});
	};
}


