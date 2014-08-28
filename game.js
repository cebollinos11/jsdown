

function roll(max) //dice roll to simplify randomized calculations
{
  return Math.floor((Math.random() * max) + 1);
}

function Kill() //destroy a player, if its the last one, go to title screen
{
  
  
  _AlivePlayers--;
  //console.log(Crafty("Player_element")[0].player_name);
  
  if(_AlivePlayers<1)
    Crafty.scene("title");
  
  
  if(_AlivePlayers==1)
    {
      alert(Crafty("Player_element").player_name+" wins!");
    Crafty.scene("title");
    }
  
}

function CreateRandomPlatform(height)
{
  
  var newplat = Crafty.e('Platform, 2D, DOM, Text, Color')
  .attr({x: roll(_w-_size-20), y: height, w: roll(_size)+40, h: 30})
  
  
  .bind("EnterFrame",function()
       {
         this.y-=_pspeed;
         if(this.y<0){
           
         this.destroy();}
       });
  
  var platform_type = roll(100);
  //newplat.addComponent("pred");

  if(platform_type>95)
    {newplat.addComponent("pgreen").attr({glass:1})}
  else if(platform_type>90)
    {newplat.addComponent("pfire").attr({fireKill:1})}
  else if(platform_type>70)
    {newplat.addComponent("pred").attr({ is_mover:roll(10)-5})}
  else if(platform_type>0)
  {newplat.addComponent("pgreen")} 
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

//Crafty.load(["sprites/pabloanim2.png"]);
 Crafty.sprite(50, "sprites/pabloanim2.png", {
    s_Pablo: [0,0]
    
 });




Crafty.scene("playgame", function() {  
  
  //reset points
  _points = 0;
  //reset alive players;
  _AlivePlayers = _nplayers;
  //put one plat
  CreateRandomPlatform(_h);
  
  var _pointsCounter = Crafty.e("2D, DOM, Text")
    //.text(Math.floor(_points/10))
    //.textColor('#FF0000')    
    //.textFont({ size: '30px', weight: 'bold' })
    .bind("EnterFrame", function (){
    _points++;
    //_pointsCounter.text(Math.floor(_points/10));
      (_points%_frequency) ? {} : CreateRandomPlatform(_h);
      (_points%500) ? {} : _frequency = roll(2)*20;
   
     
    
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
    {_playerList[i].generate_player(i);}
  
});

function GenPlayer(controls,color,order){
  
  

}
//start music
//Crafty.audio.add("bgmusic", "audio/music.mp3");
//Crafty.audio.play("bgmusic", -1);
Crafty.scene("title"); //play title screen





