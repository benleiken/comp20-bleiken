var xF = 179;// Starting x-coordinate of the frog
var yF = 490; //Starting y-coordinate of the frog
var lives = 5; //The number of lives
var gOver = false;//Is game over? (i.e., you have no more lives left)
var level = 1;//Level number
var time = 0;//Time
var fCount = 0;
var frogDir = 1;
var farthest = 490;
var frogsHome = 0;
var dead = false;
var dX = 0;
var dY = 0;
var dCount = 0;
var isHome = false;
var jump = document.createElement('audio');
jump.setAttribute('src', 'assets/LOZ_Hit.wav');
jump.load();
var death = document.createElement('audio');
death.setAttribute('src', 'assets/LOZ_Bomb_Blow.wav');
death.load();
var home = document.createElement('audio');
home.setAttribute('src', 'assets/LOZ_Fanfare.wav');
home.load();


locsVX = new Array();//Locations of vehicles
locsVY = new Array();//Locations of vehicles
locsLX = new Array();//Locations of logs
locsLY = new Array();//Locations of logs
vId    = new Array();//vehicle types
lId    = new Array();//log types
locsVX[0] = 10;
locsVY[0] = 295;
locsLX[0] = 10;
locsLY[0] = 90;
for(i=1;i<13; i+=3){
  rand = Math.floor(Math.random()*200);
  locsVX[i] = (rand);
  locsVY[i] = locsVY[i-1] + 36;
  locsVX[i+1] = locsVX[i] + 90;
  locsVY[i+1] = locsVY[i-1] + 36;
  locsVX[i+2] = locsVX[i+1] + 90;
  locsVY[i+2] = locsVY[i-1] + 36;
}
for(i=1;i<9;i+=2){
  rand = Math.floor(Math.random()*150);
  locsLX[i] = rand;
  locsLY[i] = locsLY[i-1] + 35;
  locsLX[i+1] = locsLX[i] + 200;
  locsLY[i+1] = locsLY[i-1] +35;
}
for(x = 0; x < 13; x++){
  rand = Math.floor(Math.random()*3);
  vId[x] = rand;
}
vId[1] = 3;
vId[2] = 3;
vId[3] = 3;
vId[7] = 3;
vId[8] = 3;
vId[9] = 3;


for(x = 0; x < 10; x++){
  rand = Math.floor(Math.random()*3);
  lId[x] = rand;
}
var sV = 3;
var sL = 2;
var score = 0;
var hs = 0;
var x = 0;
var bg = new Image();
var loaded = false;
bg.src = 'assets/frogger_sprites.png';
bg.onload = function(){
  loaded = true;
};
var dF = new Image();
dF.src = 'assets/dead_frog.png';
dF.onload = function(){
  loaded = true;
};

function start_game(){
	canvas = document.getElementById('game');
	// Check if canvas is supported on browser
	if (canvas.getContext) {
          setInterval(document.addEventListener("keydown", function(event) {
           if (event.keyCode == 37) {
             event.preventDefault();
            frogDir = 0;
           if(xF > 10){
            xF -= 29;
            if(!isHome && !dead){
            jump.play();
            }
           }
           }
           if (event.keyCode ==38){
             event.preventDefault();
             frogDir = 1;
             if(yF > 60){
              yF -= 36;
              if(!isHome && !dead){
            jump.play();
            }

             }
           }
          else if (event.keyCode == 39){
             frogDir = 2;
              event.preventDefault(); 
              if(xF < 350){
              xF += 29;
              if(!isHome && !dead){
            jump.play();
            }


              }
          }
           else if (event.keyCode == 40){
             frogDir = 3;
             event.preventDefault();
             if(yF < 490){
             yF += 36;
             if(!isHome && !dead){
            jump.play();
            }


             }
               }
          }),1000/30);
		gameLoop();
                setInterval(gameLoop,1000/30);
                    }
       else {
           alert('Sorry, canvas is not supported on your browser!');
       }
}
function gameLoop(){
   if(!gOver){
   update(locsVX,locsLX, locsVY, locsLY);
   draw(locsVX,locsLX, locsVY, locsLY);
   }
}
function update(locsVX,locsLX, locsVY, locsLY){
  if (lives <= 0){
    gOver = true;
  }
  var rand;
  fCount++;
  for(i=0;i<13; i++){
                  if(vId[i] ==3){
                  locsVX[i] += sV + 2;
                  }
                  else{
                  locsVX[i] -= (sV);
                  }
                  rand = Math.floor(Math.random()*3);
                  randLoc = Math.floor(Math.random()*20);
                  if(locsVX[i] >= canvas.width + 50 && fCount > 2){
                    locsVX[i] = -49 + randLoc;
                  }
                  if(locsVX[i] <= -50 && fCount > 2){
                    locsVX[i] = canvas.width +49 - randLoc;
                  }
                  if(locsVX[i] <= xF+15 && (locsVX[i] +50) > xF+15 && locsVY[i] <= yF+15 && locsVY[i] +50 > yF+15){
                    dead = true;
                    dX = xF;
                    dY= yF;
                    lives--;
                    xF = 179;
                    yF = 490;
                    farthest = 490;

                }
    }
  locsLX[0] += (sL);
  rand = Math.floor(Math.random()*3);
  randLoc = Math.floor(Math.random()*20);
  if(locsLX[0] >= canvas.width + 150){
    locsLX[0] = -150 + randLoc;
  }
  if(locsLX[0] <= -151){
    locsLX[0] = canvas.width +149 - randLoc;
  }
  for(i=1;i<10; i+=4){
                  locsLX[i] -= (sL);
                  rand = Math.floor(Math.random()*3);
                  randLoc = Math.floor(Math.random()*20);
                  if(locsLX[i] >= canvas.width + 150){
                    locsLX[i] = -150 + randLoc;
                  }
                  if(locsLX[i] <= -151){
                    locsLX[i] = canvas.width +149 - randLoc;
                  }
                  locsLX[i+1] -= (sL);
                  rand = Math.floor(Math.random()*3);
                  randLoc = Math.floor(Math.random()*20);
                  if(locsLX[i+1] >= canvas.width + 150){
                    locsLX[i+1] = -150 + randLoc;
                  }
                  if(locsLX[i+1] <= -151){
                    locsLX[i+1] = canvas.width +149 - randLoc;
                  }
                }
  for(i=3;i<10; i+=4){
                  rand = Math.floor(Math.random()*3);
                  randLoc = Math.floor(Math.random()*20);
                  locsLX[i] += (sL);
                  if(locsLX[i] >= canvas.width + 150){
                    locsLX[i] = -150 + randLoc;
                  }
                  if(locsLX[i] <= -151){
                    locsLX[i] = canvas.width +149 - randLoc;
                  }
                  rand = Math.floor(Math.random()*3);
                  randLoc = Math.floor(Math.random()*20);
                  locsLX[i+1] += (sL);
                  if(locsLX[i+1] >= canvas.width + 150){
                    locsLX[i+1] = -150 + randLoc;
                  }
                  if(locsLX[i+1] <= -151){
                    locsLX[i+1] = canvas.width +149 - randLoc;
                  }
                }
      if(yF<90 && xF >0 && xF <30){
        score += 50;
        yF=490;
        xF=179;
        farthest = 490;
        frogsHome++;
        isHome = true;
      }
      else if(yF<90 && xF >80 && xF <110){
        score += 50;
        yF=490;
        xF=179;
        farthest = 490;
        frogsHome++;
        isHome = true;
      }
      else if(yF<90 && xF >160 && xF <190){
        score += 50;
        yF=490;
        xF=179;
        farthest = 490;
        frogsHome++;
        isHome = true;
      }
      else if(yF<90 && xF >240 && xF <270){
        score += 50;
        yF=490;
        xF=179;
        farthest = 490;
        frogsHome++;
        isHome = true;
      }
      else if(yF<90 && xF >340 && xF <370){
        score += 50;
        yF=490;
        xF=179;
        farthest = 490;
        frogsHome++;
        isHome = true;
      }
      if(frogsHome == 5){
        frogsHome = 0;
        score +=1000;
        level++;
        sL++;
        sV++;
      }
      onLog = false;
      for(i =0; i <10; i++){
        if(lId[i] == 0 && locsLX[i] <= xF+15 && (locsLX[i] +110) > xF+15 && locsLY[i] <= yF+15 && locsLY[i] +60 > yF+15 || yF > 262){
          onLog = true;
        }
        else if(lId[i] == 1 && locsLX[i] <= xF+15 && (locsLX[i] +110) > xF+15 && locsLY[i] <= yF+15 && locsLY[i] +60 > yF+15 || yF > 262){
          onLog = true;
        }
        else if(lId[i] == 2 && locsLX[i] <= xF+15 && (locsLX[i] +180) > xF+15 && locsLY[i] <= yF+15 && locsLY[i] +60 > yF+15 || yF > 262){
          onLog = true;
        }
      }
      if(onLog == false){
          dead = true;
          dX = xF;
          dY= yF;
          lives--;
          yF = 490;
          xF = 179;
          farthest = 490;
      }
      if(yF < farthest){
        farthest = yF;
        score +=10;
      } 
}
function draw(locsVX,  locsLX, locsVY, locsLY){
	ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,canvas.width, canvas.height);
        //Board Rendering
	ctx.fillStyle = "#191970";
	ctx.fillRect (0, 0, 399, 282);
	ctx.fillStyle = "#000000";
	ctx.fillRect (0,282,399,282);
        if(loaded=true){
        ctx.drawImage(bg, 0, 0,334,50,20,0,334,50);
	ctx.drawImage(bg,0,60,399,55,0,50,410,50);
	ctx.drawImage(bg,0,110,399,50,0,260,399,50);
	ctx.drawImage(bg,0,110,399,50,0,480,399,50);
	//Lives Rendering
	var x = 0;

	for(var i =0; i<lives; i++){
		ctx.drawImage(bg,10, 335, 25,25, x, 525, 15,15);
		x += 17;
	}
	//Text rendering
	ctx.fillStyle = "#66FF00";
	ctx.font = "bold 16px Arial";
	ctx.fillText("Level " + level, 90, 536);
	ctx.font = "10px Arial";
	ctx.fillText("Score: " + score, 0, 556);
	ctx.fillText("Highscore: " + hs,50,556);

	//Vehicle Rendering
	for(var z=0; z<locsVX.length;z++){
          if(vId[z] == 0){
	  ctx.drawImage(bg,80,255,30,35,locsVX[z],locsVY[z],50,50);
          }
          else if(vId[z] == 1){
	  ctx.drawImage(bg,10,255,30,35,locsVX[z],locsVY[z],50,50);
          }
          else if(vId[z] ==2){
	  ctx.drawImage(bg,10,295,30,35,locsVX[z],locsVY[z],50,50);
          }
          else{
          ctx.drawImage(bg,40,255,30,35,locsVX[z],locsVY[z],50,50);
          }
        }
	//Log Rendering
        for(var i=0; i<locsLX.length;i++){
          if(lId[i] == 0){
	    ctx.drawImage(bg,10,193,120,35,locsLX[i],locsLY[i],120,50);
          }
          else if(lId[i] == 1){
	    ctx.drawImage(bg,10,223,110,35,locsLX[i],locsLY[i],120,50);
          }
          else{
	    ctx.drawImage(bg,10,158,180,35,locsLX[i],locsLY[i],180,50);
          }
        }
        }
        if(dead == true){
          ctx.drawImage(dF,0,0,30,29,dX,dY,30,29);
          dCount++;
          death.play();
          if(dCount == 30){
           dead = false;
           dCount =0;
          }
        }
        if(isHome == true){
          home.play();
          isHome = false;
        }
	//Frog Rendering
        if(frogDir == 1){
	ctx.drawImage(bg, 10, 365, 25,25, xF,yF,30,30);
        }
        else if(frogDir == 0){
          ctx.drawImage(bg, 80, 335, 25,25, xF,yF,30,30);
        }
        else if(frogDir == 2){
          ctx.drawImage(bg, 10, 335, 25,25, xF,yF,30,30);
        }
        else{
          ctx.drawImage(bg, 80, 365, 25,25, xF,yF,30,30);
        }
}
