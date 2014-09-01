var _platformList = [
  {name:"bricks",css_sprite:"pgreen",hitplayer:do_nothing,freq:100},
  {name:"fire",css_sprite:"pfire",hitplayer:kill_player,freq:50},
  {name:"railright",css_sprite:"railright",hitplayer:move_right,freq:90},
  {name:"railleft",css_sprite:"railleft",hitplayer:move_left,freq:90},
  {name:"glass",css_sprite:"pgreen",hitplayer:activate_glass,freq:30}
  
];

function activate_glass(who)
{

 this.removeComponent("Platform");
 this.removeComponent("pgreen");
 this.addComponent("pblue");
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
  var typeplat = roll(5)-1;
  
  var tilesize = 32;
  var psize = roll(_size/32)*32;
  
  var px =  roll(_w-_pw-psize)+_pw;
  
  var newplat = Crafty.e('Platform, 2D, DOM, Text, Color,Collision')
  .attr({x: px, y: height, w: psize, h: 30, speed : _currPspeed, spawned:0, hitplayer:do_nothing})
  
    .bind("EnterFrame",function() //normal platform movement
       {
         this.y-=this.speed;
         if(this.y<0){
           
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
function CreateRandomPlatform_old(height,canbeinvisible)
{
  var tilesize = 32;
  var psize = roll(_size/32)*32;
  console.log(psize/32);
  var px =  roll(_w-_pw-psize)+_pw;
  var newplat = Crafty.e('Platform, 2D, DOM, Text, Color')
  .attr({x: px, y: height, w: psize, h: 30, speed : _currPspeed, spawned:0})
  
  
  .bind("EnterFrame",function()
       {
         this.y-=this.speed;
         if(this.y<0){
           
         this.destroy();}
         
         //generate new platform
         if(this.y<_platSpawnTrigger && this.spawned===0){
           this.spawned=1;
           CreateRandomPlatform(_h,1);}
       });
  
  var platform_type = roll(100);
  
  
  //newplat.addComponent("pred");
  //fix first platform to be easy
  if(canbeinvisible!=1){newplat.addComponent("pgreen");
                       newplat.x=_w/2;
                       newplat.w=_w/3;
                       }
  else if(platform_type>95)
    {newplat.addComponent("pgreen").attr({glass:1})}
  else if(platform_type>90)
    {newplat.addComponent("pfire").attr({fireKill:1})}
  else if(platform_type>70)
    {
      var rails = [['right',3],['left',-3]];
      var dice = roll(2)-1;
      
      newplat.addComponent("rail"+rails[dice][0]).attr({ is_mover:rails[dice][1]})
    }
  else if(platform_type>0)
  {newplat.addComponent("pgreen")}
  
  //make out of bounds in case (skip a platform)
  if(canbeinvisible && roll(15)===1){newplat.x=_w}
  
  

  
   
}
