var _platformList = [
  {name:"bricks",css_sprite:"pgreen",hitplayer:do_nothing,freq:999},
  {name:"fire",css_sprite:"pfire",hitplayer:burn_player,freq:50}, //50
  {name:"railright",css_sprite:"railright",hitplayer:move_right,freq:90},
  {name:"railleft",css_sprite:"railleft",hitplayer:move_left,freq:90},
  {name:"glass",css_sprite:"brokenbrick",hitplayer:push_glass,freq:50}
  
];
function push_glass(who)
{
  this.removeComponent("brokenbrick");
  this.addComponent("pblue");
  this.attr({count_down:20});
  this.bind("EnterFrame", function (){ this.count_down--;
                                     if (this.count_down===0)
                                       {
                                         this.hitplayer=activate_glass;
                                         this.hitplayer();
                                        
                                       }});
  
}
function activate_glass(who)
{
 this.removeComponent("Platform"); 
 
 this.bind("EnterFrame", function (){ this.y+=_pspeed*3;});
}
function move_right(who)
{
  who.x+=4;
}

function move_left(who)
{
  who.x-=4;
}
function do_nothing()
{}
function burn_player(who){
  if(who.burned == 0)
  {

  who.burned=1;
  console.log("burning",who);
  who.addComponent("tupiburned");
  setTimeout(function(){Kill(who)},2000);
  
  }
  
  
}

function CreateRandomPlatform(height,canbeinvisible)
{
  var typeplat = roll(5)-1;
  
  
  var psize = roll(_size/32)*32;
  
  var px =  roll(_w-_pw-psize)+_pw;
  
  var newplat = Crafty.e('Platform, 2D, DOM, Text, Color,Collision')
  .attr({x: px, y: height, w: psize, h: 30,z:0, speed : _currPspeed, spawned:0, hitplayer:do_nothing})
  
    .bind("EnterFrame",function() //normal platform movement
       {
         this.y-=this.speed;
         if(this.y<-this.h || this.y>_h+this.h+1){
         this.destroy();}
       })
      .bind("EnterFrame",function() //generate platform 
       { 
         //generate new platform
         if(this.y<_platSpawnTrigger && this.spawned===0){
           this.spawned=1;
           CreateRandomPlatform(_h,1);}
       });
  
  //check frequencies
  if(roll(100)>_platformList[typeplat].freq+_difficulty[1])typeplat=0;
  if(canbeinvisible!=1){
                       typeplat = 0;//fix brick platform
                       newplat.x=_w/2;
                       newplat.w=_w/3;
                       }
  //set the sprite
  newplat.addComponent(_platformList[typeplat].css_sprite);
  
  //set what happens when touching the player
  newplat.hitplayer=_platformList[typeplat].hitplayer;
//   newplat.onHit('Player_element', function (who){    
//     _platformList[typeplat].hitplayer(who);
//   });

  //for testing burning

    console.log();
    //set Fruits on top of platforms
    if(1 || roll(100)<Fr.Frequency && _platformList[typeplat].name != "fire"){GenFruit(newplat.x+newplat.w/2,newplat.y);}
    
  
  
}
