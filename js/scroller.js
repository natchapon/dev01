
function Scroller(stage){
	var farTexture = PIXI.Texture.fromImage("images/bg-far.png");
	this.far = new TileBg(farTexture, 512 , 256);
	this.far.deltaX = 0.128;
	stage.addChild(this.far);
	

	var midTexture = PIXI.Texture.fromImage("images/bg-mid.png");
	this.mid = new TileBg(midTexture, 512 , 256);
	this.mid.deltaX = 0.64;
	this.mid.position.y = 128;
	
	this.viewportX = 0;
	
	stage.addChild(this.mid); 
}

Scroller.prototype.update = function() {
  this.far.tilePosition.x -= 0.128;
  this.mid.tilePosition.x -= 0.64;
};

Scroller.prototype.setViewportX = function(x) {
  this.far.setViewportX(x);
  this.mid.setViewportX(x);
  this.viewportX = x;
};




function TileBg(texture, width, height) {
  PIXI.TilingSprite.call(this, texture, width, height);
	
  this.position.x = 0;
  this.position.y = 0;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
  this.viewportX = 0;
}

TileBg.constructor = TileBg;

TileBg.prototype = Object.create(PIXI.TilingSprite.prototype);
TileBg.prototype.setViewportX = function(x){
	var d = x - this.viewportX;
	this.viewportX = x;
	this.tilePosition.x -= (d * this.deltaX);
}
