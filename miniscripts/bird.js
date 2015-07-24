var _birdspeed = 4;
var _birdsize = 32;
function GenBird(direction){
  var direction = direction;
  if (direction==undefined){
     direction = (roll(2)==1)?-1:1;
   }
  var amplitude = roll(100);
  
  var Bird = Crafty.e('spawnable,bird, 2D, Color, DOM, Collision')
  .bind("EnterFrame", function (){

  this.x+=_birdspeed*this.direction;
  if(this.x<0 || this.x>_w){this.destroy();}
    
    //add sinusoidal movemente
    this.y = Math.sin(this.sinusoidal_ticks*0.05)*this.amplitude+this.y_original;
    this.sinusoidal_ticks++;
    
    })
  .onHit('Player_element',function(who) { 
    if( who[0].obj.grabbing!=this){
      G.score.add(this.uniquepoints,who[0].obj);
      this.uniquepoints = 0;
      playsound("blip",0,0.5);
      
    }
    //Kill(who[0].obj);
    who[0].obj.grabbing = this;
    who[0].obj.x = this.x+this.w/2;
    who[0].obj.y = this.y+this.h/2;

    //prevent player out of bounds
    if(who[0].obj.x>_w-_pw){
      who[0].obj.x=_w-_pw-1;
    }  
    
    
  })
  .attr({x: -(_w-_pw)/2*(direction-1), 
    y_original: roll(0.4*_h)+0.15*_h,
     w: _birdsize, h:_birdsize, direction:direction, sinusoidal_ticks:0, amplitude:amplitude ,z:100,grabbingPoints:10,uniquepoints:30});  
  
  }


function MultiBird() //direction should be -1 or 1
{
  var t = 10;
  var direction = (roll(2)==1)?-1:1;
  for (var i = 0; i < 10; i++) {
    setTimeout(function(){GenBird(direction)},roll(2000));

  }
}