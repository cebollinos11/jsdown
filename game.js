

function roll(max) //dice roll to simplify randomized calculations
{
  return Math.floor((Math.random() * max) + 1);
}




//create div
$("body").append('<div id="game"></div>');
                 




//start game

Crafty.init(_w,_h, document.getElementById('game'));
//fix fps
Crafty.timer.FPS(50);

//Crafty.background('url(sprites/sky.png)');

//initialize sprites
Crafty.load(["sprites/platforms.png"]);
 Crafty.sprite(32, "sprites/platforms.png", {
    GreenP: [0,0,4,1],
    RedP: [0,1,4,2],
     SpikeDown: [0,2,4,3],
     SpikeUp: [0,3,4,4]
 });

//Crafty.load(["sprites/pabloanim2.png"]);
 Crafty.sprite(50, "sprites/tupi.png", {
    s_Pablo: [0,0]
    
 });




Crafty.scene("playgame", function() {  
  
 
  
  //reset points
  _points = 0;
  //reset alive players;
  _AlivePlayers = _nplayers;
  
  //reset globals
   _currPspeed = _pspeed;//
  _difficulty[1]=_difficulty[0];

  _currFrequency = _frequency;
  //set background
  //put background componente
  StartBackground(0);
  //Crafty.e("2D, DOM, background_component").attr({x: 0, y: 0, w: _w, h: _h,z:0})
  //.bind("EnterFrame", function (){this.y--;});

  
  //put one plat
  CreateRandomPlatform(_h);
  
  var _pointsCounter = Crafty.e("2D, DOM, Text")
    .attr({x: _w*0.95, y: _h*0.1, w: _w, h: 10})
    .text(Math.floor(_points/10))
    
    .textFont({ size: '30px', weight: 'bold' })
    .bind("EnterFrame", function (){
    _points++;
    _pointsCounter.text(Math.floor(_points/10));
      //(_points%_currFrequency) ? {} : CreateRandomPlatform(_h);
      //(_points%500) ? {} : _frequency = roll(40)+40;
      (_points%300) ? {} : GenBird();
      if(_points%150===1){_difficulty[1]+=1;
                         }
      
      
   
     
    
    });//.attr({ plat_frequency: _frequency });
  
    
  Crafty.e('DeathFloorBottom, 2D, DOM ')
  .attr({x: 0, y: _h+10, w: _w, h: 10});

  Crafty.e('DeathFloorTop, 2D, DOM, Color')
  .attr({x: 0, y: 0, w: _w, h: 64,z:100});
  //.color('red');
  Crafty.e()
       
    .bind("KeyDown",function(e)
         {
           if(e.key=="p"){ //check for SPACE KEY
             //IncreaseDifficulty();             
           }           
         }); 
  //STARTing Platforms
  for(i=0;i<_np;i++)
    {
      //CreateRandomPlatform(_h*i/_np);
    }
  for(i=0;i<_nplayers;i++)
    {_playerList[i].generate_player(i);}
  
});

function StartBackground(where){
  var initial_height = 0;
  background_id = _currBG; //get random background
  background_string = "background_component"+String(background_id)
  if(where===0) initial_height = _h;
  Crafty.e('2D, DOM , '+background_string).attr({x: 0, y: where, w: _w, h: initial_height,z:-1})
  .bind("EnterFrame", function (){
    if(this.y === 0){ StartBackground(_h-2);}    
    this.y-=1;
    this.h++;
    if(this.y===-_h) {this.destroy();}
  });
}


//start music
//Crafty.audio.add("bgmusic", "audio/music.mp3");
//Crafty.audio.play("bgmusic", -1);
Crafty.scene("title"); //play title screen




