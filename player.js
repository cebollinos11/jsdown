var _playerList = [
  {name : "Player 1", controls:["LEFT_ARROW","RIGHT_ARROW"],color:"pink",generate_player: GenPlayer1},
  {name : "Player 2", controls:["Q","W"],color:"blue",generate_player: GenPlayer1},
  {name : "Player 3", controls:["O","P"],color:"green",generate_player: GenPlayer1},
  {name : "Player 3", controls:["V","B"],color:"red",generate_player: GenPlayer1}
];

function ControlsForDisplay(i){
  if(i==0){
    return "&larr; , &rarr;";
  }

  return _playerList[i].controls[0]+","+_playerList[i].controls[1]
}
//_playerList[0].generate_player(3);
//functions
function GenPlayer1(order){
  var original = this;
  var Player = Crafty.e('Player_element, 2D, Color, DOM, tupiwalk, Twoway, Gravity, Collision, spawnable')
  .attr({x: _w/2+_pw*order, y: 100, w: _pw, h: _ph, name: original.name,burned:0,killed:0,player_color:original.color})  
  .color(original.color)
  //.twoway(6,0)  
  //.collision([0,0], [0,50])
  .bind("EnterFrame", function (){    
    //check keyboard input
    if (this.isDown(original.controls[0]) && !this.burned) {      
      this.x-=_ps; 
      try{
        this.grabbing.grabbingPoints-=1;
        
        if(this.grabbing.grabbingPoints==0){
          playsound("blip");
          this.grabbing.destroy();}
        }
      catch(err) {}
        
      
   } 
    if (this.isDown(original.controls[1])&& !this.burned) {
       this.x+=_ps;
      try{
        this.grabbing.grabbingPoints-=1;
        if(this.grabbing.grabbingPoints<0){this.grabbing.destroy();}
        }
      catch(err) {}
    }
     
    //Apply gravity
    this.y+=_g;
    //this.animate("jump",-1)
    this.removeComponent("tupiwalk");
    this.addComponent("tupifly");
  //prevent out of bounds
    if(this.x<0){this.x=1;}
    if(this.x>_w-_pw){
      this.x=_w-_pw-1;
    }  
  })
  .onHit('DeathFloorBottom',function () { Kill(this);})
  .onHit('DeathFloorTop',function () { Kill(this);})
  .onHit('Platform',function(who){
    var p = who[0].obj.y;
    var x = this.y+this.h; 
    
    //this.animate("walk",-1);
    this.removeComponent("tupifly");
    this.addComponent("tupiwalk");
    
    
    //apply effect of platform on player
    who[0].obj.hitplayer(this);
    
    if(who[0].obj.y>this.y+this.h-15){       
    this.y = this.y-_pspeed-_g;
    }
      
    
  }); //end of player
  
}