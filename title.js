Crafty.scene("title", function() {
  
  
    StartBackground(0);
    CreateRandomPlatform(_h);
    //Crafty.e("2D, DOM, title").attr({w:_w,h:_h});
    Crafty.e("2D, DOM, Text").attr({ x: 100, y: 450, w:600 })
    .text("<H1>Press SPACE to START!!</H1>").attr({z:2})
    .bind("KeyDown",function(e)
         {
           if(e.key==32){ //check for SPACE KEY
             Crafty.scene("playgame");             
           }           
         });  
  
  Crafty.e("2D, DOM, Text").attr({ x: 500, y: 50 , w:200 })
   .text("<H1>Highest Record: "+Math.floor(_points/10)+"</H1>").attr({z:2})
  
  Crafty.e("2D, DOM, Logo").attr({ x: 500, y: 50 , w:200 })
  .attr({ x: 0.1*_w, y: 0.1*_h, w:_w, h:_h }).attr({z:2})
    
   
   Crafty.e("2D, DOM, Text").attr({ x: 200, y: 250, w:200 }).attr({z:2})
   .text("<H1>Number of Players:<br><br> - <span>"+_nplayers+"</span> +</H1>")   
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
                              
              this.text("<H1>Number of Players:<br><br> - <span>"+_nplayers+"</span> +</H1>");
         })
   
   UpdatePlayerList();
  
   function UpdatePlayerList(){
     var TextString = "";
     if(playerlister !== 0) {playerlister.destroy();}
     for(i=0;i<_nplayers;i++)
       {
         TextString+="<p>"+_playerList[i].name+": "+_playerList[i].color+"<br>"+_playerList[i].controls+"</p>";
       }
     playerlister = Crafty.e("2D, DOM, Text").attr({ x: 450,y: 200,w:300}).attr({z:2})
   //.color("black")
   //.textColor("#FF0000") 
   //.color("white")
   //.textFont({ size: '30px', weight: 'bold' })
   .text(TextString);
   }
});