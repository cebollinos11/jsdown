
function ScoreParticle(x,y,n)
{
	var P = Crafty.e('2D, DOM, Text')
	.bind("EnterFrame", function (){
		
  	this.y-=3;
  	this.TTL--;
  	if(this.TTL<0){this.destroy();}
    
    })
	.text('<div class="ScoreParticle">+'+n+'</div>')
	.attr({x:x,y:y,TTL:20});

}