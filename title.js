title_elements = {foo:"bar"}

Crafty.scene("title", function() {

  
  

  playbackground("drop");

  

   
    //get new background
    _currBG+=1;
    if(_currBG>_maxBG){_currBG=1}
    
    StartBackground(0);
    CreatePlatform(_h);
    //Crafty.e("2D, DOM, title").attr({w:_w,h:_h});
    title_elements.startbutton = Crafty.e("2D, DOM, Text").attr({ x: 100, y: 450, w:600 })
    .text("<div id='Start' class='jsButton'>START</div>").attr({z:3})
    
    .bind("KeyDown",function(e)
         {
           if(e.key==32){ //check for SPACE KEY
             G.StartGame();  
                  
           }           
         });  
  
  updateHS();  
  title_elements.highscore = Crafty.e("2D, DOM, Text, HighScoresPanel").attr({ x: 520, y: 50 , w:250 })
   .text("<div class='menubutton'>Loading Leaderboard...</div>").attr({z:2})
  
   title_elements.header = Crafty.e("2D, DOM, Text").attr({ x: 500, y: 50 , w:200 })
   .attr({ x: 100, y: 0.08*_h,w:400}).attr({z:2})
   .text("<div class='jsPanel'><h1>Slug Down</h1></div>");

   
    
   
   title_elements.mainPanel = Crafty.e("2D, DOM, Text").attr({ x: 100, y: 150, w:400 }).attr({z:2})
   .text("<div class='jsPanel'><h1>Players</h1><br><span class='nplayers'> "+_nplayers+"</span><span></span><br><span class='info'><br><p>Create more players with + and - keys</p></span><div class='plister'>a</div></div>")
   // .bind("KeyDown",function(e)
   //       {
           
   //         if(e.key==107 || e.key==187){ //check for +
   //           _nplayers++;
   //          (_nplayers>_maxplayers) ? _nplayers=_maxplayers : {}
   //         UpdatePlayerList();}
   //         if(e.key==109 || e.key==189){ //check for -  ||
   //           _nplayers--;
   //           (_nplayers<1) ? _nplayers=1 : {}
   //         UpdatePlayerList();}         
   //            $(".nplayers").text(_nplayers);                
   //       })
   var mainPanelText = "<div class='jsPanel'><h1>Players<span style='padding-left:2em'></span><span class='nplayers'> "+_nplayers+"</span><span></span></h1><div class='plister'>"

   for(i=0;i<4;i++)
       {
         opacity = (!i)?1:0.2;
         mainPanelText+="<div id='infoplayer"+i+"' class='playercontrols' style='opacity:"+opacity+"'><p>"+_playerList[i].name+"</p><div class='playerthumbnail"+i+"'></div><p>"+ControlsForDisplay(i)+"</p></div>";
       }
       
    mainPanelText+="</div></div>"

    title_elements.mainPanel.text(mainPanelText);

    //music on off controller
   AudioControllerListener();

   
   UpdatePlayerList();

 

   title_elements.playerselect_compilator = Crafty.e("2D,Tween").attach(
    title_elements.highscore,
    title_elements.mainPanel,
    title_elements.startbutton,
    title_elements.header
    )
   .tween({x:1000},1);

   

   title_elements.main_logo_slug = Crafty.e("2D,Image,DOM,Tween")
   .attr({x:-100,y:100,z:20,alpha:0})
   .image("sprites/ui/slug.png");
   
   title_elements.main_logo_down = Crafty.e("2D,DOM,Text,Tween").text("DOWN")
   .attr({x:100,y:-500,z:20})
   .textFont({size: '200px', weight: 'bold' });

   title_elements.main_logo_slug.tween({x: 100,alpha:1.0}, 1000)
   title_elements.main_logo_down.tween({x: 100, y: 150}, 1000)

   setTimeout(placeNewGameButton, 1000);
  
  
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

 function UpdatePlayerList(){
    
    $(".playercontrols").css('opacity',0.2);
    for(i=0;i<_nplayers;i++)
    {
          $("#infoplayer"+i).css('opacity',1);

    }

     $(".nplayers").text(_nplayers); 

  }




  function placeNewGameButton(){


    title_elements.newgamebutton = Crafty.e("2D, DOM, Color, Mouse,Text")
    //.color("red")
    .text("<div class='jsButton'>New Game</div>").attr({z:3})
    //.textFont({size: '100px', weight: 'bold' })
    .attr({ x: 100, y: 350, w:600, h: 100 })
    .bind('Click', function() {
      playsound("glass");
      //title_elements.presentation_compilator.tween({y: 1000}, 500);
      UI_move_down(title_elements.presentation_compilator);
      title_elements.playerselect_compilator.tween({x:0}, 500);
      updateButtons();
      //bring_back(title_elements.mainPanel);

     });





    // title_elements.creditsbutton  = Crafty.e("2D, DOM, Color, Mouse,Text")    
    // .text("<div class='jsButton'>Credits</div>").attr({z:3})   
    // .attr({ x: 100, y: 450, w:600, h: 80 })
    // .bind('Click', function() {
    //   playsound("glass");
    //  });


    //attaching elements

    title_elements.presentation_compilator = Crafty.e("2D,Tween").attr({x:50,y:50,h:50,w:50,});


    title_elements.presentation_compilator.attach(
      title_elements.newgamebutton,
      // title_elements.creditsbutton,
      title_elements.main_logo_down,
      title_elements.main_logo_slug
      );





  }

  function StartGameFromMainMenu()
  {
    playsound("bird",1);
    //title_elements.playerselect_compilator.tween({y:1000}, 500);
    UI_move_down(title_elements.playerselect_compilator);
    title_elements.playerselect_compilator.bind("TweenEnd", function(){ console.log("tween complete");
    G.StartGame(); });
    
}


function UI_move_down(compilator){

  compilator.tween({y:1000}, 500);


}