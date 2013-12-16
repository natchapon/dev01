
Scroller.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
Scroller.prototype.constructor = Scroller;

function Scroller(stage){
    PIXI.DisplayObjectContainer.call(this);
//    var midTexture = PIXI.Texture.fromFrame("actor.png");
//
//	this.mid = new TileBg(midTexture, 460 , 530);
//	this.mid.deltaX = 0.64;
//	this.mid.position.x = 0;
//
//	this.window = new PIXI.Sprite.fromFrame("window.png")
//
//    this.windowClose = new PIXI.Sprite.fromFrame("window_close.png");
//
	this.viewportX = 0;
    this.rowList = [];
    this.index = 0;
    this.position.x = 100;

    for (var i=0; i < 5; i++){

        var row = new SeatRow(this);
        row.position.x =  i * 480;
        this.rowList.push(row);

        this.addChild(row);
    }

    stage.addChild(this);
}

Scroller.prototype.next = function(){
    this.index++;
    console.log(this);
}

Scroller.prototype.update = function(){
    var offset = -100;
    if(this.position.x + offset > -(this.index * 480 )){
        this.position.x -= 5;
    }
}

Scroller.prototype.setViewportX = function(x) {
  //this.far.setViewportX(x);
  //this.mid.setViewportX(x);
  this.viewportX = x;
};



SeatRow.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
SeatRow.prototype.constructor = SeatRow;

function SeatRow(scroller){

    PIXI.DisplayObjectContainer.call(this);

    this.bg = PIXI.Sprite.fromFrame("actor.png");
    this.windowClose = PIXI.Sprite.fromFrame("window_close.png");
    this.windowClose.position.x = 5;
    this.windowClose.position.y = 80;
    this.windowClose.oriHeight = this.windowClose.height;

    this.window = PIXI.Sprite.fromFrame("window.png");
    this.window.position.x = 5;
    this.window.position.y = 80;

    this.addChild(this.bg);
    this.addChild(this.window);
    this.addChild(this.windowClose);


    this.windowClose.interactive = true;
    this.windowClose.buttonMode = true;

    this.windowClose.mousedown = this.windowClose.touchstart = function(data)
    {
        // stop the default event...
        data.originalEvent.preventDefault();

        // store a refference to the data
        // The reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = data;
        this.alpha = 0.9;
        this.dragging = true;

        this.startPos = this.data.global.y;


        console.log(data);
    };

    // set the events for when the mouse is released or a touch is released
    this.windowClose.mouseout = this.windowClose.mouseup = this.windowClose.mouseupoutside = this.windowClose.touchend = this.windowClose.touchendoutside = function(data)
    {
        this.alpha = 1
        this.dragging = false;
        // set the interaction data to null
        this.data = null;

    };

    // set the callbacks for when the mouse or a touch moves
    this.windowClose.mousemove = this.windowClose.touchmove = function(data)
    {
        if(this.dragging)
        {
            // need to get parent coords..
            //var newPosition = this.data.getLocalPosition(this.parent);

            var diff = this.startPos - this.data.global.y;

            if( diff > this.oriHeight * 0.9 ){

                diff = this.oriHeight * 0.9;

                score();
            }

            if( diff < 0 ){
                diff = 0;
            }
            this.height = this.oriHeight - (diff * 0.9);
        }
    }

    var scored = false;

    function score(){
        if( !scored ){
            scored = true;
            setTimeout( function(){scroller.next() }, 1000)

            //scroller.next();

            console.log("whee");
        }
    }
}



// Tile Bg Class
function TileBg(texture, width, height) {
  PIXI.TilingSprite.call(this, texture, width, height);
  this.width = width;
  this.height = height;
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
