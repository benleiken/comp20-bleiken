
	   function draw() {
	       canvas = document.getElementById('simple');
	       
	       // Check if canvas is supported on browser
	       if (canvas.getContext) {
		ctx = canvas.getContext('2d');
		bg = new Image();
                bg.src = 'pacman10-hp-sprite.png';
		ghost = new Image();
		//ghost.src = 'pacman10-hp-sprite.png";
                ctx.drawImage(bg, -323, 0);

		ctx.drawImage(bg,0,80,20,20,4,4,20,20);
		
		ctx.drawImage(bg,80,40,20,20,4,20,20,20);
		
	       }
	       else {
	           alert('Sorry, canvas is not supported on your browser!');
	       }
	   }


