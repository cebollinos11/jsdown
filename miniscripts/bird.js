var _birdspeed = 4;
var _birdsize = 32;
function GenBird(){
  var direction = (roll(2)==1)?-1:1;
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
    //Kill(who[0].obj);
    who[0].obj.x = this.x+this.w/2;
    who[0].obj.y = this.y+this.h/2;
    G.score.add(1);
  })
  .attr({x: -(_w-_pw)/2*(direction-1), 
    y_original: roll(0.4*_h)+0.15*_h,
     w: _birdsize, h:_birdsize, direction:direction, sinusoidal_ticks:0, amplitude:amplitude ,z:100});  
  
  }