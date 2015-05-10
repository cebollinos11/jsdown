function roll(max) //dice roll to simplify randomized calculations
{
  return Math.floor((Math.random() * max) + 1);
}



//Crafty.background('url(sprites/sky.png)');


Crafty.scene("playgame", function() {  
  
  //reset alive players;
  _AlivePlayers = _nplayers;
  
  //reset globals
   _currPspeed = _pspeed;//
  _difficulty[1]=_difficulty[0];

  _currFrequency = _frequency;
  //set background
  //put background componente
  StartBackground(0);
  //Crafty.e("2D, DOM, background_component").attr({x: 0, y: 0, w: _w, h: _h,z:0})
  //.bind("EnterFrame", function (){this.y--;});

  
  //put one plat
  CreateRandomPlatform(_h);
  
   _pointsCounter = Crafty.e("2D, DOM, Text")
    .attr({x: 0, y: _h*0.05, w: _w, h: 10})    
    .textFont({ size: '30px', weight: 'bold' })
    .bind("EnterFrame", function (){    
    _pointsCounter.text("Score: "+G.score.score);      
    });//.attr({ plat_frequency: _frequency });
  
    
  Crafty.e('DeathFloorBottom, 2D, DOM ')
  .attr({x: 0, y: _h+10, w: _w, h: 10});

  Crafty.e('DeathFloorTop, 2D, DOM, Color')
  .attr({x: 0, y: -30, w: _w, h: 64,z:100});
  //.color('red');
  Crafty.e()
       
    .bind("KeyDown",function(e)
         {
           if(e.key=="p"){ //check for SPACE KEY
             //IncreaseDifficulty();             
           }           
         }); 
  //STARTing Platforms
  for(i=0;i<_np;i++)
    {
      //CreateRandomPlatform(_h*i/_np);
    }
  for(i=0;i<_nplayers;i++)
    {_playerList[i].generate_player(i);}
  
});

function StartBackground(where){
  var initial_height = 0;
  background_id = _currBG; //get random background
  background_string = "background_component"+String(background_id)
  if(where===0) initial_height = _h;
  Crafty.e('2D, DOM , '+background_string).attr({x: 0, y: where, w: _w, h: initial_height,z:-1})
  .bind("EnterFrame", function (){
    if(this.y === 0){ StartBackground(_h-2);}    
    this.y-=1;
    this.h++;
    if(this.y===-_h) {this.destroy();}
  });
}







