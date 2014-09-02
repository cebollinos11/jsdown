var _platformList = [
  {name:"bricks",css_sprite:"pgreen",hitplayer:do_nothing,freq:100},
  {name:"fire",css_sprite:"pfire",hitplayer:kill_player,freq:50},
  {name:"railright",css_sprite:"railright",hitplayer:move_right,freq:90},
  {name:"railleft",css_sprite:"railleft",hitplayer:move_left,freq:90},
  {name:"glass",css_sprite:"pgreen",hitplayer:push_glass,freq:30}
  
];
function push_glass(who)
{
  this.removeComponent("pgreen");
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
function kill_player(who){Kill(who);}

function CreateRandomPlatform(height,canbeinvisible)
{
  var typeplat = 4;//roll(5)-1;
  
  var tilesize = 32;
  var psize = roll(_size/32)*32;
  
  var px =  roll(_w-_pw-psize)+_pw;
  
  var newplat = Crafty.e('Platform, 2D, DOM, Text, Color,Collision')
  .attr({x: px, y: height, w: psize, h: 30,z:0, speed : _currPspeed, spawned:0, hitplayer:do_nothing})
  
    .bind("EnterFrame",function() //normal platform movement
       {
         this.y-=this.speed;
         if(this.y<0 || this.y>_h+this.h+1){
           
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
  
  
}
