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
  
  //.twoway(6,0)  
  //.collision([0,0], [0,50])
  .onHit('Platform',function(who){

    //console.log("hit platform");
    this.inplatform=1;
    if(this.inwhichplatform==who[0].obj){}
      else{
          this.inwhichplatform=who[0].obj;
          playsound("blip",0,0.1);
        
      }


    var p = who[0].obj.y;
    var x = this.y+this.h; 
    
    //this.animate("walk",-1);
    
    
    
    //apply effect of platform on player
    who[0].obj.hitplayer(this);
    
    if(who[0].obj.y>this.y+this.h-15){   
      this.inplatform=1;    
      //this.y = this.y-_pspeed-_g;
      this.y = who[0].obj.y-50;
      //console.log("platform h",who[0].obj.h);

      this.removeComponent("tupifly");
      this.addComponent("tupiwalk");     

    }
    else{console.log("grinding");
    this.y+=_g;}

      
    
  })
  .bind("EnterFrame", function (){    
    //check keyboard input
    if (this.isDown(original.controls[0]) && !this.burned) {      
      this.x-=_ps; 
      try{

        this.grabbing.grabbingPoints-=1;
        
        if(this.grabbing.grabbingPoints==0){
          
          playsound("bird");
          this.grabbing.destroy();}
        }
      catch(err) {}
        
      
   } 
    if (this.isDown(original.controls[1])&& !this.burned) {
       this.x+=_ps;
      try{
        this.grabbing.grabbingPoints-=1;
        if(this.grabbing.grabbingPoints==0){
          playsound("bird");this.grabbing.destroy();}
        }
      catch(err) {}
    }
     
    //Apply gravity
    

    //check for umbrellas
    
    if(this.inplatform){
      //console.log("NO applied gravity");


    }
    else{ 
        
        this.y+=_g;
        if(this.umbrella){this.umbrella.effect(this);}
        //console.log("applied gravity");
        this.removeComponent("tupiwalk");
        this.addComponent("tupifly");
      }
      this.inplatform =0;



    //this.animate("jump",-1)
    
  //prevent out of bounds
    if(this.x<0){this.x=1;}
    if(this.x>_w-_pw){
      this.x=_w-_pw-1;
    }  
  })
  .onHit('DeathFloorBottom',function () { Kill(this);})
  .onHit('DeathFloorTop',function () { Kill(this);})  ; //end of player

  if(_nplayers>1){Player.color(original.color);}
   
  
}