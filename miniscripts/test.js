_test = 0;
function RunTest(){

	//Place static Platform
	var newplat = Crafty.e('2D, DOM, Color,Platform')
  	.attr({x: 0, y: _h-100, w: _w, h: 30,z:0,hitplayer:do_nothing}).color("#FFF");


  	SpawnUmbrella(_w/2+100,_h-2);
}