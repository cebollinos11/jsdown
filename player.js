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
  var Player = Crafty.e('Player_element, 2D, Color, DOM, Twoway, Collision')
  .attr({x: _w/2+_pw*order, y: _h/4, w: _pw, h: _ph, name: original.name,burned:0,killed:0,player_color:original.color,speed:_ps,z:1})  
  .attr({w:_pw*0.8,h:_ph*0.5})

    //add hitbox
  // Player.hitbox = Crafty.e("2D,DOM,hitbox_style,player_hitbox,Collision")
  // .attr({x:Player.x+0.1*Player.w,y:Player.y+0.5*Player.h,w:Player.w*0.8,h:Player.h*0.5,z:Player.z+1,owner:Player});
  // Player.attach(Player.hitbox);

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
    
    if(who[0].obj.y>this.y+this.h-this.h*0.5){   
      this.inplatform=1;    
      //this.y = this.y-_pspeed-_g;
      this.y = who[0].obj.y-this.h;
      //console.log("platform h",who[0].obj.h);

      this.sprite.removeComponent("tupifly");
      this.sprite.addComponent("tupiwalk");     

    }
    else{//console.log("grinding");
    this.y+=_g;}

      
    
  })
  .bind("EnterFrame", function (){    

    
    //check keyboard input
    if (this.isDown(original.controls[0]) && !this.burned) {      
      this.x-=this.speed; 
      try{
        
        this.grabbing.grabbingPoints-=1;
        
        if(this.grabbing.grabbingPoints==0){
          
          playsound("bird",0,0.2);
          this.grabbing.destroy();}
        }
      catch(err) {}
        
      
   } 
    if (this.isDown(original.controls[1])&& !this.burned) {
       this.x+=this.speed;
      try{
        
        this.grabbing.grabbingPoints-=1;
        if(this.grabbing.grabbingPoints==0){
          playsound("bird",0,0.2);this.grabbing.destroy();}
        }
      catch(err) {}
    }
     
    //Apply gravity
    

    //apply fat
    this.fat_component.playturn();

   
    
    if(this.inplatform){
      //console.log("NO applied gravity");


    }
    else{ 
        
        this.y+=_g;
        if(this.umbrella){this.umbrella.effect(this);}
        //console.log("applied gravity");
        this.sprite.removeComponent("tupiwalk");
        this.sprite.addComponent("tupifly");
      }
      this.inplatform =0;



    //this.animate("jump",-1)
    
  //prevent out of bounds
    if(this.x<0){this.x=1;}
    if(this.x>_w-this.w){
      this.x=_w-this.w-1;
    }  
  })
  .onHit('DeathFloorTop',function () { Kill(this);})  
  .onHit('DeathFloorBottom',function () { Kill(this);}); //end of player

  if(_nplayers>1){Player.color(original.color);}

  //add fatty
  Player.fat_component = new fat(Player);


  //add player sprite
  Player.sprite = Crafty.e("2D,DOM,tupiwalk,spawnable").attr({x:Player.x-Player.w*0.1,y:Player.y-Player.w*0.5,w:_pw,h:_ph,z:1,owner:Player});  
  Player.attach(Player.sprite);
  //alert(Player.sprite.x+","+Player.sprite.y+","+Player.sprite.w+","+Player.sprite.h);

  //alert(Player.fat_component.isfat());

  //Player.fat_component.getFat();


   
  
}



function fat(who){

  var fat_component = {};

  fat_component.who = who;

  fat_component.original_who = who;

  fat_component.fat = 0;
  fat_component._fat_frames = 800;
  fat_component.fat_frames = 0;

  fat_component.isfat=function(){return fat_component.fat;}

  fat_component.getFat = function(){
    if(fat_component.isfat()){return;}

    fat_component.fat = 1;
    fat_component.who.y-=fat_component.who.h/2;
    fat_component.who.w *= 2;
    fat_component.who.h *= 2;
    fat_component.fat_frames = fat_component._fat_frames;
    fat_component.who.speed /= 2;
  }

  fat_component.removeFat = function(){
    fat_component.fat = 0;
    fat_component.who.y+=fat_component.who.h/2;
    fat_component.who.w /= 2;
    fat_component.who.h /= 2;
    fat_component.who.speed *= 2;

  }

  fat_component.playturn=function(){
    if(!fat_component.isfat()){
      return;
    }

    fat_component.fat_frames-=1;

    if(fat_component.fat_frames<0){
      fat_component.removeFat();
    }
  }

  return fat_component;
}