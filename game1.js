//gobals
var _h = 800; //height
var _w = 600; //width

//functions

function Kill()
{
  console.log("Hit");
}

//create div
$("body").append('<div id="game"></div>');
                 
function NewGame()
{
  

//background
Crafty.background('black');

Crafty.e('DeathFloor, 2D, Canvas, Color')
  .attr({x: 0, y: 250, w: _w, h: 10})
  .color('red');

Crafty.e('DeathFloor, 2D, Canvas, Color')
  .attr({x: 0, y: 0, w: _w, h: 10})
  .color('red');

var Player = Crafty.e('2D, Canvas, Color, Twoway, Gravity, Collision')
  .attr({x: _w/2, y: 100, w: 50, h: 50})
  .color('#F00')
  .twoway(2,0)  
  .onHit('DeathFloor',function () { Kill();})
  .gravity();


  
}


//start game

Crafty.init(_w,_h, document.getElementById('game'));
NewGame();





