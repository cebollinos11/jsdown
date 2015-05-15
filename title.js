Crafty.scene("title", function() {
   
    //get new background
    _currBG+=1;
    if(_currBG>_maxBG){_currBG=1}
    
    StartBackground(0);
    CreatePlatform(_h);
    //Crafty.e("2D, DOM, title").attr({w:_w,h:_h});
    Crafty.e("2D, DOM, Text").attr({ x: 100, y: 450, w:600 })
    .text("<div id='Start' class='jsButton'>START</div>").attr({z:3})
    .bind("KeyDown",function(e)
         {
           if(e.key==32){ //check for SPACE KEY
             G.StartGame();             
           }           
         });  
  updateButtons();
  updateHS();  
  Crafty.e("2D, DOM, Text, HighScoresPanel").attr({ x: 520, y: 50 , w:250 })
   .text("<div class='menubutton'>Loading Leaderboard...</div>").attr({z:2})
  
  Crafty.e("2D, DOM, Logo").attr({ x: 500, y: 50 , w:200 })
  .attr({ x: 0.1*_w, y: 0.1*_h, w:_w, h:_h }).attr({z:2})
    
   
   var mainPanel = Crafty.e("2D, DOM, Text").attr({ x: 100, y: 150, w:400 }).attr({z:2})
   .text("<div class='jsPanel'><h1>Players</h1><br><span>+</span><span class='nplayers'> "+_nplayers+"</span><span>-</span><br><span class='info'><br><p>Create more players with + and - keys</p></span><div class='plister'>a</div></div>")
   .bind("KeyDown",function(e)
         {
           
           if(e.key==107 || e.key==187){ //check for +
             _nplayers++;
            (_nplayers>_maxplayers) ? _nplayers=_maxplayers : {}
           UpdatePlayerList();}
           if(e.key==109 || e.key==189){ //check for -  ||
             _nplayers--;
             (_nplayers<1) ? _nplayers=1 : {}
           UpdatePlayerList();}         
              $(".nplayers").text(_nplayers);                
         })
   var mainPanelText = "<div class='jsPanel'><h1>Players<span style='padding-left:2em'>+</span><span class='nplayers'> "+_nplayers+"</span><span>-</span></h1><div class='plister'>"

   for(i=0;i<4;i++)
       {
         opacity = (!i)?1:0.2;
         mainPanelText+="<div  id='infoplayer"+i+"' class='playercontrols' style='opacity:"+opacity+"'><p>"+_playerList[i].name+"</p><div class='playerthumbnail' style='background-color: "+_playerList[i].color+";'></div><p>"+ControlsForDisplay(i)+"</p></div>";
       }

    mainPanelText+="</div></div>"

    mainPanel.text(mainPanelText);
   
   UpdatePlayerList();

   function UpdatePlayerList(){
    
    $(".playercontrols").css('opacity',0.2);
    for(i=0;i<_nplayers;i++)
    {
          $("#infoplayer"+i).css('opacity',1);

    }

  }
  
   function UpdatePlayerList1(){

      $(".plister").text("FUUU");
     var TextString = "";
     if(playerlister !== 0) {playerlister.destroy();}
     for(i=0;i<_nplayers;i++)
       {
         TextString+="<p class='playercontrols'>"+_playerList[i].name+": "+_playerList[i].color+"<br>"+_playerList[i].controls[0]+" "+_playerList[i].controls[1]+"</p>";
       }
     playerlister = Crafty.e("2D, DOM, Text").attr({ x: 100,y: 350,w:400}).attr({z:2})
   //.color("black")
   //.textColor("#FF0000") 
   //.color("white")
   //.textFont({ size: '30px', weight: 'bold' })
   .text(TextString);
   }
});