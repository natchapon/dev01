


$(function() {
	// create an new instance of a pixi stage
	var stage = new PIXI.Stage(0x66FF99);

	// create a renderer instance.
	var renderer = PIXI.autoDetectRenderer(512, 384);

	// add the renderer view element to the DOM
	//document.body.appendChild(renderer.view);
	$("#canvas").append(renderer.view);

	// create a texture from an image path
	var texture = PIXI.Texture.fromImage("images/icon.jpg");
	// create a new Sprite using the texture
	var bunny = new PIXI.Sprite(texture);
	
	
	scroller = new Scroller(stage);

	
	// center the sprites anchor point
	bunny.anchor.x = 0.5;
	bunny.anchor.y = 0.5;

	// move the sprite t the center of the screen
	bunny.position.x = 200;
	bunny.position.y = 150;

	stage.addChild(bunny);
	
	
	requestAnimFrame(loop);

	function loop() {

		requestAnimFrame(loop);
		
		
		scroller.setViewportX( scroller.viewportX + 3);
		
		
		// just for fun, lets rotate mr rabbit a little
		bunny.rotation += 0.1;

		// render the stage
		renderer.render(stage);
	}

})


