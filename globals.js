//gobals
var _h = 600; //height
var _w = 800; //width
var _g = 3;//gravity

//platforms
var _size = _w/2.5; //platform size x 32px
var _pspeed = 2; //platform speed
var _currPspeed = _pspeed;//
var _np = 4; //number of platforms
var _frequency = 40; //frequency of platforms
var _currFrequency = _frequency;
var _platSpawnTrigger = 4*_h/5; //screen height that triggers the spawn of a new platform

var _pw = 50;//player width
var _ph = 50;//player height
var _ps = 6;//player speed

var _pointsCounter = 0;

var _nplayers = 1;
var _maxplayers = 4;
var _AlivePlayers = 0;
var playerlister = 0;


//background related
var _maxBG = 3;
var _currBG = 0;




function jsDown(){ //main class

  

  this.init = function(){
    //Init stuff
    console.log("init");
    
    this.timer = new TimerManager();
    this.score = new ScoreManager();

    //load platformsDB
    this.platformsDB = new InitPlatforms();
    //load level manager
    this.levelmgr = new InitLevels();
    console.log(this.levelmgr);


    //load audio
    loadAudio();
    
    

    //start game

    Crafty.init(_w,_h, document.getElementById('game'));
    //fix fps
    Crafty.timer.FPS(50);

        //initialize sprites
    Crafty.load(["sprites/platforms.png"]);
     Crafty.sprite(32, "sprites/platforms.png", {
        GreenP: [0,0,4,1],
        RedP: [0,1,4,2],
         SpikeDown: [0,2,4,3],
         SpikeUp: [0,3,4,4]
     });

    
  

    this.LoadTitle();
  }

  

  this.LoadTitle = function(){
    console.log("LoadingTitleScren");
    playsound("title",1);

    Crafty.scene("title"); //play title screen
  }

  this.StartGame = function(){
    this.levelmgr.reset();
    playsound("game",1);
    console.log("Starting Game");
    Crafty.scene("playgame");
    //restart timer
    this.timer.reset();
    this.timer.start();

    //restart score
    this.score.reset();

    //endgame reset
    this.endGame = new endGameClass();


    //fordebuggin endgame
    //G.EndGame(0);  
  }

  this.EndGame = function(who){ //who won
    console.log("Game Ended");

    //stop timer
    this.timer.stop();

    this.endGame.endGame(who);


  }
}




function Kill(who) //destroy a player, if its the last one, go to title screen
{
  if(who.killed){
    console.log("who.name","killed already");
    return
  }
  else{
    who.killed=1;

  }
  who.destroy();
  
  _AlivePlayers--;
  //console.log(Crafty("Player_element")[0].player_name);
  
  if(_AlivePlayers<1) //submit high score
    { 
    //Crafty.stop();
    G.EndGame(who);    
    }
  
  
  if(_AlivePlayers==1)
    {
    //alert(Crafty("Player_element").player_name+" wins!");   
    G.EndGame(Crafty("Player_element")); 
    Crafty("Player_element").destroy();    
    }
  
}