//gobals
var _h = 600; //height
var _w = 800; //width
var _g = 4;//gravity

//platforms
var _size = _w/2.8; //platform size
var _pspeed = 4; //platform speed
var _np = 4;// number of platforms
var _frequency = 20; //frequency of platforms


var _pw = 50;//player width
var _ph = 50;//player height
var _ps = 6;//player speed
var _points = 0; //current points
var _pointsCounter = 0;

var _nplayers = 2;
var _AlivePlayers = 0;
var _playercontrols = [["A","D"],["N","M"]];

//functions

function roll(max) //dice roll to simplify randomized calculations
{
  return Math.floor((Math.random() * max) + 1);
}

function Kill() //destroy a player, if its the last one, go to title screen
{
  
  _AlivePlayers--;
  if(_AlivePlayers<1)
    Crafty.scene("title");
}

function CreateRandomPlatform(height)
{
  
  var newplat = Crafty.e('Platform, 2D, Canvas, Color')
  .attr({x: roll(_w-_size), y: height, w: roll(_size)+20, h: 30})
  
  
  .bind("EnterFrame",function()
       {
         this.y-=_pspeed;
         if(this.y<0){
           
         this.destroy();}
       });
  
  var platform_type = roll(100);
  if(platform_type>90)
    {newplat.color('blue').attr({glass:1})}
  else if(platform_type>50)
    {newplat.color('red').attr({ is_mover:roll(10)-5})}
  else if(platform_type>0)
  {newplat.color('green')}
  
  
  
}

//create div
$("body").append('<div id="game"></div>');
                 




//start game

Crafty.init(_w,_h, document.getElementById('game'));
//fix fps
Crafty.timer.FPS(50);

Crafty.background('white');

//initialize sprites
Crafty.load(["sprites/platforms.png"]);
 Crafty.sprite(32, "sprites/platforms.png", {
    GreenP: [0,0,4,1],
    RedP: [0,1,4,2],
     SpikeDown: [0,2,4,3],
     SpikeUp: [0,3,4,4]
 });

Crafty.load(["sprites/fabri.png"]);
 Crafty.sprite(266, "sprites/fabri.png", {
    Fabri: [0,0,1,1]
    
 });


Crafty.scene("title", function() {
  
  
    Crafty.sprite("sprites/portada.jpg", {
        title: [0,0, 600, 400]
    })
    Crafty.e("2D, DOM, title").attr({w:_w,h:_h,alpha:0.5});
    Crafty.e("2D, DOM, Text").attr({ x: 100, y: 100 })
    .text("Press SPACE TO BEGIN")
    .textColor('#FF0000')
    
    .textFont({ size: '30px', weight: 'bold' })
    .bind("KeyDown",function(e)
         {
           if(e.key==32){ //check for SPACE KEY
             Crafty.scene("playgame");             
           }           
         });  
  
   Crafty.e("2D, DOM, Text").attr({ x: 100, y: 300 })
   .text("Highest Record: "+Math.floor(_points/10))
    .textColor('#FF0000')    
    .textFont({ size: '30px', weight: 'bold' })
});

Crafty.scene("playgame", function() {  
  
  //reset points
  _points = 0;
  //reset alive players;
  _AlivePlayers = _nplayers;
  
  var _pointsCounter = Crafty.e("2D, DOM, Text")
    //.text(Math.floor(_points/10))
    //.textColor('#FF0000')    
    //.textFont({ size: '30px', weight: 'bold' })
    .bind("EnterFrame", function (){
    _points++;
    //_pointsCounter.text(Math.floor(_points/10));
      (_points%20) ? {} : CreateRandomPlatform(_h);
   
     
    
    });//.attr({ plat_frequency: _frequency });
  
    
  Crafty.e('DeathFloorBottom, 2D, Canvas, Color')
  .attr({x: 0, y: _h-10, w: _w, h: 10})
  .color('red');

  Crafty.e('DeathFloorTop, 2D, Canvas, SpikeUp')
  .attr({x: 0, y: 0, w: _w, h: 30});
  //.color('red');
  
  //STARTing Platforms
  for(i=0;i<_np;i++)
    {
      //CreateRandomPlatform(_h*i/_np);
    }
  for(i=0;i<_nplayers;i++)
    {GenPlayer(_playercontrols[i],"blue");}
});

function GenPlayer(controls,color){
  
  var Player = Crafty.e('2D, Color, Canvas, Fabri, Twoway, Gravity, Collision')
  .attr({x: _w/2, y: 100, w: _pw, h: _ph})  
   .color(color)
  //.twoway(6,0)  
  //.collision([0,0], [0,50])
  .bind("EnterFrame", function (){    
    //check keyboard input
    if (this.isDown(controls[0])) {      
      this.x-=_ps;    } 
    if (this.isDown(controls[1])) 
      this.x+=_ps; 
    //Apply gravity
    this.y+=_g;
  //prevent out of bounds
    if(this.x<0){this.x=1;}
    if(this.x>_w-_pw){
      this.x=_w-_pw-1;
    }  
  })

  .onHit('DeathFloorBottom',function () { Kill();this.destroy();})
  .onHit('DeathFloorTop',function () { Kill();this.destroy();})
  .onHit('Platform',function(who){
    var p = who[0].obj.y;
    var x = this.y+this.h; 
    
    if(who[0].obj.y>this.y+this.h-10){       
    this.y = this.y-_pspeed-_g;
    }
    if(who[0].obj.is_mover){ //apply mover left right 
      this.x+=who[0].obj.is_mover;
    }
    
    if(who[0].obj.glass){ //apply destruction in case
      who[0].obj.y=0;
      
    }
    
  }) //end of player

}
Crafty.scene("title"); //play title screen





