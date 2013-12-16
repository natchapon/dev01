
var testSS;

$(function() {
	// create an new instance of a pixi stage
	var stage = new PIXI.Stage(0x66FF99,true);

	// create a renderer instance.
	var renderer = PIXI.autoDetectRenderer(810, 724);

	// add the renderer view element to the DOM
	//document.body.appendChild(renderer.view);
	$("#canvas").append(renderer.view);

//	// create a texture from an image path
//	var texture = PIXI.Texture.fromImage("images/icon.jpg");
//	// create a new Sprite using the texture
//	var bunny = new PIXI.Sprite(texture);
//
//
//	var scroller = new Scroller(stage);
//
//
//	// center the sprites anchor point
//	bunny.anchor.x = 0.5;
//	bunny.anchor.y = 0.5;
//
//	// move the sprite t the center of the screen
//	bunny.position.x = 200;
//	bunny.position.y = 150;
//
//	stage.addChild(bunny);
    var assetsToLoader = [ "images/pack.json"];

    // create a new loader
    var loader = new PIXI.AssetLoader(assetsToLoader);

    // use callback
    loader.onComplete = onAssetsLoaded;


    //begin load
    loader.load();
    var scroller;
    function onAssetsLoaded(){

        scroller = new Scroller(stage);

        testSS = scroller;
        requestAnimFrame(loop);

    }

	function loop() {

		requestAnimFrame(loop);
		
		
		scroller.update( );


		// render the stage
		renderer.render(stage);
	}

})


