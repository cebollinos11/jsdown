//gobals
var _h = 600; //height
var _w = 800; //width
var _g = 4;//gravity

//platforms
var _size = _w/3; //platform size
var _pspeed = 3; //platform speed
var _np = 4; //number of platforms
var _frequency = 40; //frequency of platforms

var _pw = 50;//player width
var _ph = 50;//player height
var _ps = 6;//player speed
var _points = 0; //current points
var _pointsCounter = 0;

var _nplayers = 1;
var _maxplayers = 3;
var _AlivePlayers = 0;
var playerlister = 0;
//var _playercontrols = [["LEFT_ARROW","RIGHT_ARROW"],["Q","W"],["N","M"]];


function Kill(who) //destroy a player, if its the last one, go to title screen
{
  
  who.destroy();
  
  
  _AlivePlayers--;
  //console.log(Crafty("Player_element")[0].player_name);
  
  if(_AlivePlayers<1)
    Crafty.scene("title");
  
  
  if(_AlivePlayers==1)
    {
      alert(Crafty("Player_element").player_name+" wins!");
    Crafty.scene("title");
    }
  
}

