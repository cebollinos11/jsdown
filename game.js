

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
  

  _currFrequency = _frequency;
  //set background
  //put background componente
  StartBackground(0);
  //Crafty.e("2D, DOM, background_component").attr({x: 0, y: 0, w: _w, h: _h,z:0})
  //.bind("EnterFrame", function (){this.y--;});

  
  //put one plat

  if(_test)
    {RunTest();}
  else{

    CreatePlatform(_h,1);

  }

   _pointsCounter = Crafty.e("2D, DOM, Text")
    .attr({x: 0, y: _h*0.05, w: _w, h: 10})    
    .textFont({ size: '30px', weight: 'bold' })
    .bind("EnterFrame", function (){    
    _pointsCounter.text("Score: "+G.score.score+"<br>"+G.levelmgr.currentLevel.name);      
    });//.attr({ plat_frequency: _frequency });
  
    
  Crafty.e('DeathFloorBottom, 2D, DOM ')
  .attr({x: 0, y: _h+50, w: _w, h: 10});

  G.spikes = TopLimit = Crafty.e('DeathFloorTopImage, 2D, DOM, Color, Tween')
  .attr({x: 0, y: -30, w: _w, h: 64,z:1});

  var TopLimitEffect = Crafty.e('DeathFloorTop, 2D, DOM, Color')
  .attr({x: 0, y: -50, w: _w, h: 64,z:1});

  var TopSpikesSprite = Crafty.e("2D","Color","DOM","DeathFloorTopImage").color("black")
  .attr({x: 0, y: -30-_h/2, w: _w, h: _h/2,z:1})

  TopLimit.attach(TopLimitEffect,TopSpikesSprite);



  //.color('red');

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
  //background_id = _currBG; //get random background
  background_id = G.levelmgr.currentLeveln;
  background_string = "background_component"+String(background_id)
  if(where===0) initial_height = _h;
  Crafty.e('2D, DOM , '+background_string).attr({x: 0, y: where, w: _w, h: initial_height,z:-1})
  .bind("EnterFrame", function (){
    if(this.y === 0){ 


      G.levelmgr.checkLevelUp(G.score.score);
      StartBackground(_h-2);

    }    
    this.y-=1;
    this.h++;
    if(this.y===-_h) {this.destroy();}
  });
}






function RunSpikes(){
  var spikes_speed = 5000;

  G.spikes.tween({y: _w*1/4}, spikes_speed);
  G.spikes.bind("TweenEnd", function(){ 
    G.spikes.tween({y:-30},spikes_speed/5); 
    console.log("TWEEN");
    G.spikes.unbind("TweenEnd");
  });

}

Crafty.c("DestroyOnSpikes",{

  init:function(){


    this.onHit('DeathFloorTop',function () {
      console.log(this,"on SPIKES");
      this.destroy();

      try{        this.owner.umbrella = undefined;
}
      catch(err){}


    }); 

  }
  

});


