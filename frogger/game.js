var xF = 179;// Starting x-coordinate of the frog
var yF = 490; //Starting y-coordinate of the frog
var lives = 5; //The number of lives
var gOver = false;//Is game over? (i.e., you have no more lives left)
var level = 1;//Level number
var time = 0;//Time
var fCount = 0;
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
  rand = Math.floor(Math.random()*350);
  locsVX[i] = (rand);
  locsVY[i] = locsVY[i-1] + 36;
  locsVX[i+1] = locsVX[i] + 90;
  locsVY[i+1] = locsVY[i-1] + 36;
  locsVX[i+2] = locsVX[i+1] + 90;
  locsVY[i+2] = locsVY[i-1] + 36;
}
for(i=1;i<5;i++){
  rand = Math.floor(Math.random()*150);
  locsLX[i] = rand;
  locsLY[i] = locsLY[i-1] + 35;
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


for(x = 0; x < 5; x++){
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

function start_game(){
	canvas = document.getElementById('game');
	// Check if canvas is supported on browser
	if (canvas.getContext) {
		                gameLoop();
                setInterval(gameLoop,1000/30);
                    }
       else {
           alert('Sorry, canvas is not supported on your browser!');
       }
}
function gameLoop(){
   update(xF,yF,lives,level,locsVX,locsLX, locsVY, locsLY,sL,sV,score,hs);
   draw(xF,yF,lives,level,locsVX,locsLX, locsVY, locsLY,sL,sV,score,hs);
}
function update(xF,yF,lives,level,locsVX,locsLX, locsVY, locsLY,sL,sV,score,hs){
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
                  if(locsVX[i] <= xF && (locsVX[i] +50) > xF && locsVY[i] <= yF && locsVY[i] +50 > yF){
                    lives--;
                    xF = 179;
                    yF = 490;

                }
  }
    for(i=0;i<5; i+=2){
                  locsLX[i] -= (sL);
                  rand = Math.floor(Math.random()*3);
                  randLoc = Math.floor(Math.random()*20);
                  if(locsLX[i] >= canvas.width + 150){
                    locsLX[i] = -150 + randLoc;
                    lId[i] = rand;
                  }
                  if(locsLX[i] <= -151){
                    locsLX[i] = canvas.width +149 - randLoc;
                    lId[i] = rand;
                  }
                }
      for(i=1;i<5; i+=2){
                  rand = Math.floor(Math.random()*3);
                  randLoc = Math.floor(Math.random()*20);
                  locsLX[i] += (sL);
                  if(locsLX[i] >= canvas.width + 150){
                    locsLX[i] = -150 + randLoc;
                    lId[i] = rand;
                  }
                  if(locsLX[i] <= -151){
                    locsLX[i] = canvas.width +149 - randLoc;
                    lId[i] = rand;
                  }
                }
}

function draw(xF, yF, lives, level, locsVX,  locsLX, locsVY, locsLY,  sL,  sV,  score,  highscore){
	ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,canvas.width, canvas.height);
        //Board Rendering
	ctx.fillStyle = "#191970";
	ctx.fillRect (0, 0, 399, 282);
	ctx.fillStyle = "#000000";
	ctx.fillRect (0,282,399,282);
        if(loaded=true){
        ctx.drawImage(bg, 0, 0,334,50,20,0,334,50);
	ctx.drawImage(bg,0,50,399,50,0,50,399,50);
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
	ctx.fillText("Highscore: " + highscore ,50,556);
	//Frog Rendering
	ctx.drawImage(bg, 10, 365, 25,25, xF,yF,30,30);

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
}

