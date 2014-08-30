var _playerList = [
  {name : "Player 1", controls:["LEFT_ARROW","RIGHT_ARROW"],color:"pink",generate_player: GenPlayer1},
  {name : "Player 2", controls:["Q","W"],color:"blue",generate_player: GenPlayer1},
  {name : "Player 3", controls:["N","M"],color:"green",generate_player: GenPlayer1}
];

//_playerList[0].generate_player(3);
//functions
function GenPlayer1(order){
  var original = this;
  var Player = Crafty.e('Player_element, 2D, Color, DOM,s_Pablo, SpriteAnimation, Twoway, Gravity, Collision')
  .attr({x: _w/2+_pw*order, y: 100, w: _pw, h: _ph, player_name: original.name})  
  .reel("walk",1000, 0, 0, 1)
  .reel("jump",1000, 2, 0, 1)
  
  .animate("walk",-1)
   .color(original.color)
  //.twoway(6,0)  
  //.collision([0,0], [0,50])
  .bind("EnterFrame", function (){    
    //check keyboard input
    if (this.isDown(original.controls[0])) {      
      this.x-=_ps;  
     // Crafty.stop();
      
   } 
    if (this.isDown(original.controls[1])) 
      this.x+=_ps; 
    //Apply gravity
    this.y+=_g;
    this.animate("jump",-1)
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
    
    if(who[0].obj.y>this.y+this.h-15){       
    this.y = this.y-_pspeed-_g;
    }
    if(who[0].obj.is_mover){ //apply mover left right 
      this.x+=who[0].obj.is_mover;
    }
    
    this.animate("walk",-1)
    
    if(who[0].obj.glass){ //apply destruction of platform in case
      //who[0].obj.y=0;
      who[0].obj.removeComponent("Platform");
      who[0].obj.removeComponent("pgreen");
      who[0].obj.addComponent("pblue");
      who[0].obj.bind("EnterFrame", function (){ who[0].obj.y+=_pspeed*3;   });
      
      
    }
    
    if(who[0].obj.fireKill){ //apply kill in case
      
       Kill(this);
      
    }
    
   
    
  }); //end of player
  
}