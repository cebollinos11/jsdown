loadAudio = function(){
    Crafty.audio.add("title", ["audio/title.mp3" ]);
    Crafty.audio.add("gameover", ["audio/gameover.mp3" ]);
    Crafty.audio.add("game", ["audio/game.mp3" ]);
    Crafty.audio.add("highscore", ["audio/highscore.mp3" ]);

    Crafty.audio.add("bite", [    "audio/bite.mp3"    ]);
    Crafty.audio.add("fire", [    "audio/fire.wav"    ]);
    Crafty.audio.add("bird", [    "audio/bird.mp3"    ]);
  }

  function playsound(n,killer)
  {
  	if(killer){Crafty.audio.stop();}
  	Crafty.audio.play(n);
  }