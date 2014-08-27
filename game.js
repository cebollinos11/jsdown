

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

//Crafty.load(["sprites/pabloanim2.png"]);
 Crafty.sprite(50, "sprites/pabloanim2.png", {
    s_Pablo: [0,0]
    
 });


Crafty.scene("title", function() {
  
  
    Crafty.sprite("sprites/portada.jpg", {
        title: [0,0, 600, 400]
    })
    //Crafty.e("2D, DOM, title").attr({w:_w,h:_h});
    Crafty.e("2D, DOM, Text").attr({ x: 100, y: 500, w:800 })
    .text("Press SPACE to START!!")
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
   
   Crafty.e("2D, DOM, Text").attr({ x: 450, y: 50, w:200 })
   .text("Number of Players:<br> - "+_nplayers+" +")
    .textColor('#FF0000')    
    .textFont({ size: '30px', weight: 'bold' })
   .bind("KeyDown",function(e)
         {
             
           if(e.key==107){ //check for +
             _nplayers++;
            (_nplayers>_maxplayers) ? _nplayers=_maxplayers : {}
           UpdatePlayerList();}
           if(e.key==109){ //check for +
             _nplayers--;
             (_nplayers<1) ? _nplayers=1 : {}
           UpdatePlayerList();}         
                              
              this.text("Number of Players:<br> - "+_nplayers+" +")        
         })
   
   UpdatePlayerList();
  
   function UpdatePlayerList(){
     var TextString = "";
     if(playerlister != 0) {playerlister.destroy();}
     for(i=0;i<_nplayers;i++)
       {
         TextString+="<p>"+_playerList[i].name+": "+_playerList[i].color+"<br>"+_playerList[i].controls+"</p>";
       }
     playerlister = Crafty.e("2D, DOM, Text").attr({ x: 450,y: 200,w:300})
   //.color("black")
   //.textColor("#FF0000") 
   //.color("white")
   //.textFont({ size: '30px', weight: 'bold' })
   .text(TextString);
   }
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





