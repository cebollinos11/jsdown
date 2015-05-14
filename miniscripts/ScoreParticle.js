
function ScoreParticle(x,y,n)
{
	var P = Crafty.e('2D, Color, DOM, Text')
	.bind("EnterFrame", function (){

  	this.y-=3;
  	this.TTL--;
  	if(this.TTL<0){this.destroy();}
    
    })
	.text("+"+n)
	.attr({x:x,y:y,TTL:20});

}