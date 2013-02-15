function start_game(){
	canvas = document.getElementById('game');
	       
	// Check if canvas is supported on browser
	if (canvas.getContext) {
		var xF = 179;// Starting x-coordinate of the frog
		var yF = 490; //Starting y-coordinate of the frog
		var lives = 3; //The number of lives (typically 3 lives to start with)
		var gOver = false;//Is game over? (i.e., you have no more lives left)
		var level = 1;//Level number
		var time = 0;//Time

		
		
		locsV = new Object();//Locations of vehicles
		locsV[0] = [130,350];
		locsV[1]  = new loc(170,390);
		locsV.length = 2;
		locsL = new Object();//Locations of logs
		locsL['l1'] = [170,190];
		sV = new Object();//Speed of vehicles
		sV[0] = 10;
		sV[1]  = 10;
		sL = new Object();//Speed of logs
		sL[0] = 5;
		
		var score = 0;
		var hs = 0;
		draw(xF,yF,lives,level,locsV,locsL,sL,sV,score,hs);
			
	}
       else {
           alert('Sorry, canvas is not supported on your browser!');
       }
}

function draw(xF, yF, lives, level, locsV,  locsL,  sL,  sV,  score,  highscore){
	ctx = canvas.getContext('2d');
	
	//Board Rendering
	ctx.fillStyle = "#191970";
	ctx.fillRect (0, 0, 399, 282);
	
	ctx.fillStyle = "#000000";
	ctx.fillRect (0,282,399,282);
	
	bg = new Image();
        bg.src = 'assets/frogger_sprites.png';
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
	ctx.fillText("Level " + level, 50, 536);
	
	
	ctx.font = "10px Arial";
	ctx.fillText("Score: " + score, 0, 556);
	ctx.fillText("Highscore: " + highscore ,50,556);

	//Frog Rendering
	ctx.drawImage(bg, 10, 365, 25,25, xF,yF,30,30); 

	//Vehicle Rendering
	for(var z=0; z<locsV.length;z++){
	ctx.drawImage(bg,10,295,30,35,130,350,40,40);	
	ctx.drawImage(bg,10,295,30,35,170,390,40,40);
	}	
	//Log Rendering
	ctx.drawImage(bg,10,193,120,35,170,190,120,40);
}

