music = 1;

loadAudio = function(){
    Crafty.audio.add("title", ["audio/title.mp3" ]);
    Crafty.audio.add("gameover", ["audio/gameover.mp3" ]);
    Crafty.audio.add("game", ["audio/game.mp3" ]);
    Crafty.audio.add("highscore", ["audio/highscore.mp3" ]);

    Crafty.audio.add("bite", [    "audio/bite.mp3"    ]);
    Crafty.audio.add("fire", [    "audio/fire.mp3"    ]);
    Crafty.audio.add("bird", [    "audio/bird.mp3"    ]);
    Crafty.audio.add("glass", [    "audio/glass.mp3"    ]);
    Crafty.audio.add("blip", [    "audio/blip.mp3"    ]);

  }

  function playsound(n,killer,volume)
  {

    console.log("playing with volume",volume, "and killer",killer);

  	if(music==0) {return}
  	if(killer){Crafty.audio.stop();}
    

  	Crafty.audio.play(n,1,volume=volume);
  }