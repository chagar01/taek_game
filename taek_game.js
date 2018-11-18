/***

MIT License

Copyright (c) 2018 Charles Garcia-Tobin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
 
class Shape {
    constructor(x,y,w,h,add = true) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	if (add) Shape.shapes.push(this);
    }

    set(x,y,w,h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
    }

    transform(dx,dy,dw,dh) {
	this.x += dx;
	this.y += dy;
	this.w += dw;
	this.h += dh;
    }
    draw(dctx = ctx) {

    }

    animate(t) {
    }

    intersect(x,y) {
	if ((x >= this.x && x < (this.x+this.w-1)) &&
	    (y >= this.y && y < (this.y+this.h-1))) return true;
	return false;
    }
}
Shape.shapes = [];

class TextStr extends Shape {
    constructor(word,x,y,w,h, add = true, fontsize = 40, font = "Verdana") {
	super(x,y,w,h);
	this.text = word;
	this.fontSize = fontsize;
	this.font = font;
	this.align = "middle";
	this.fontset = false;
	this.marginx = Math.ceil(this.w*0.1);
	this.maxTextWidth = this.w - 2*this.marginx;
	this.maxTextHeight = Math.floor(this.h/3);
	this.marginy = Math.floor(this.h/3);
	this.setFont();
    }

    setFont() {
        this.fontStr = "bolder " + this.fontSize + "px " + this.font;
        this.textHeight = this.fontSize + Math.ceil(this.fontSize * 0.05);
    }

    setWord(word) {
	this.text = word;
    }

    draw(dctx = ctx) {
	dctx.fillStyle='white';
	do {
	    this.setFont();
            dctx.font = this.fontStr;
	    if (!this.fontset) {
		if (dctx.measureText(this.text).width < this.maxTextWidth &&
		    this.textHeight < this.maxTextHeight)
		{
		    this.fontset = true;
		    break;
		}
		this.fontSize--;
	    }
	} while (!this.fontset);
	dctx.fillText(this.text,this.x+this.marginx,this.y+this.marginy);
    }
}

class LImage extends Shape {

    constructor(src,x,y,w,h) {
	super(x,y,w,h);
	this.currImg = 0;
	this.imgs = [];
	for (var s of src) {
	    let img = new Image();
	    img.src = s;
	    this.imgs.push(img);
	}
	this.numImgs = this.imgs.length;
    }

    draw(dctx = ctx) {
	dctx.drawImage(this.imgs[this.currImg],this.x,this.y,this.w,this.h);
    }

}

class TextBrick extends LImage {
    constructor(word,x,y,w,h) {
	super(["./sprites/brick.png",
	       "./sprites/brick_broken1.png",
	       "./sprites/brick_broken2.png",
	       "./sprites/brick_broken3.png",
	       "./sprites/brick_broken4.png",
	       "./sprites/brick_broken5.png"],
	      x,y,w,h);
	this.textStr = new TextStr(word,x,y,w,h,false);
	this.hit = false;
	if (typeof(TextBrick.offscreenCanvas) == 'undefined') {
	    TextBrick.offscreenCanvas = document.createElement('canvas');
	    TextBrick.offscreenCanvas.width = this.w;
	    TextBrick.offscreenCanvas.height = this.h;
	}
    }
    
    setWord(word) {
	this.textStr.setWord(word);
    }
    
    draw() {
	let os = false; // offscreen defaults to false
	let dctx = ctx;
	let x = this.x;
	let y = this.y;
	let end = this.x+this.w;

	if (end > canvas.width) {
	    os = true; // if won't fit use offscreen
	    dctx = TextBrick.offscreenCanvas.getContext("2d");
	    this.x = 0; // hacky temporarily set coords to 0;
	    this.y = 0; 
	}
	
	super.draw(dctx);
	if (!this.hit) this.textStr.draw(dctx);

	if (this.hit) {
	    console.log("Hello");
	}

	
	if (os) { // drawing offscreen
	    this.x = x;
	    this.y = y;

	    // two images this right one
	    let w = end-canvas.width;
	    let rightimg = dctx.getImageData(0,0,this.w-w,this.h);
	    // left image
	    let leftimg = dctx.getImageData(this.w-w,0,w,this.h);
	    
	    ctx.putImageData(rightimg,this.x,this.y);
	    ctx.putImageData(leftimg,0,this.y);
	}
    }

    animate(t) {
	if (Game.theGame.state ==1 && this.hit) {
	    if (!TextBrick.last) TextBrick.last = t;
	    let p = t - TextBrick.last;
	    if (p > 250) {
		TextBrick.last = t;
		this.currImg++;
		if (this.currImg == this.numImgs) {
		    this.currImg = 0;
		    this.hit = false;
		    Game.theGame.setState(0);
		}
	    }
	}
	this.x = (this.x + TextBrick.v) % canvas.width;
	this.textStr.x = this.x;
    }
}

TextBrick.v = 2;  // 0 if we hit the right brick
TextBrick.last = null;

class Hitter extends LImage {
    constructor(top,backh) {
	super(["./sprites/fist.png",
	       "./sprites/fisthurt.png",
	       "./sprites/fist_flip.png",
	       "./sprites/fisthurt_flip.png"],
	      Math.floor(2*canvas.width/5),
	      top+Math.floor(backh/3),
	      Math.floor(canvas.width/5),
	      Math.floor(backh/3));

	this.v = 0;
	this.hitpointx = [this.x+Math.floor(0.75*this.w),
			  this.x+Math.floor(0.75*this.w),
			  this.x+Math.floor(0.25*this.w),
			  this.x+Math.floor(0.25*this.w)];
	
	this.top = top;
	this.bottom = this.y;
	this.keydown = false;
	document.addEventListener('keydown', function(event) {
            if(event.key == ' ' ) {
		Hitter.keydown = true;
            }
            if(event.key == 's' ) {
	     	TextBrick.v++;
	    }
            if(event.key == 'a' ) {
	     	TextBrick.v--;
	    }
	}, false);

	document.addEventListener('keyup', function(event) {
            if(event.key == ' ' ) {
		Hitter.keydown = false;
            }
	}, false);
    }

    animate(t) {
	if (Hitter.keydown && this.v == 0 && Game.theGame.state == 0) {
	    this.v = -20;
	}

	if (this.v != 0 ) // we're animating
	{
	    this.y += this.v;
	    let hit = Game.theGame.checkHit(this);
	    if (hit == -1) {
		this.currImg++;
		if (this.currImg == this.numImgs) this.currImg = 0;
	    }
	    
	    if (this.v < 0) {
		if (this.y < this.top) {
		    this.y = this.top;
		    this.v = -this.v;
		}
	    }
	    else {
		if (this.y >= this.bottom) {
		    this.y = this.bottom;
		    this.v = 0;
		}
	    }
	}
    }
}
Hitter.keydown = false;


class Belt extends Shape {

    constructor(belt,x,y,w,h) {
	super(x,y,w,h);
	this.belt = belt;
	let marginy = 5;
	this.by = [this.y+Math.floor(this.h/marginy)];
	this.bh = Math.floor((this.h-(marginy-2)*Math.floor(this.h/marginy))/3);
	this.by.push(this.by[0]+this.bh);
	this.by.push(this.by[0]+2*this.bh);
	this.textStr = new TextStr("Kup: "+belt.kup,
				   x,this.by[0]+3*this.bh,
				   w,this.y+this.h-(this.by[0]+3*this.bh),false);
    }

    setBelt(belt) { this.belt = belt; }
    
    draw(dctx = ctx) {
	// first 1/3 of belt
	dctx.fillStyle = 'red'; 
	dctx.fillRect(this.x,this.by[0]-2,this.w,2);
	dctx.fillStyle = this.belt.col[0]; 
	dctx.fillRect(this.x,this.by[0],this.w,this.bh);
	// second 1/3 of belt
	dctx.fillStyle = this.belt.col[1]; 
	dctx.fillRect(this.x,this.by[1],this.w,this.bh);
	// last 1/3 of belt
	dctx.fillStyle = this.belt.col[2]; 
	dctx.fillRect(this.x,this.by[2],this.w,this.bh);
	dctx.fillStyle = 'red'; 
	dctx.fillRect(this.x,this.by[2]+this.bh,this.w,2);
	// draw text
	this.textStr.draw(dctx);
    }
}

class Game {

    constructor(nwords = 5) {
	if (Game.theGame) return Game.theGame;
	Game.theGame = this;
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let x = canvas.width/2;
	let y = canvas.height-30;
	console.log(taek_data.length);
	this.allwords = taek_data[0].words;
	this.bwords = [];
	this.orig = "";
	this.trans = "";
	this.nwords = nwords;
	// states =
	// 0 - words moving ready to hit
	// 1 - hit correct word, word disintegrating
	//     input disallowed, on end new words are selected
	this.state = 0; 

	this.hits = 0;
	this.hitsToPass = 5; // hits to move onto next belt
	
	this.brickw = Math.floor(canvas.width/nwords);
	this.brickh = Math.floor(canvas.height/10);

	let backgroundh = canvas.height-this.brickh-1;
	let backgroundy = this.brickh+1;

	new LImage(
	    ["./sprites/background.png"],
	    0, 
	    this.brickh,
	    Math.floor(canvas.width/3),
	    Math.floor((canvas.height-this.brickh-1)/3)
	);

	new LImage(
	    ["./sprites/background.png"],
	    canvas.width-Math.floor(canvas.width/3), 
	    this.brickh,
	    Math.floor(canvas.width/3),
	    Math.floor((canvas.height-this.brickh-1)/3)
	);

	this.beltix = 0;
	this.belt = new Belt(taek_data[this.beltix],
			canvas.width-Math.floor(canvas.width/3),
			this.brickh+Math.floor((canvas.height-this.brickh-1)/3),
			Math.floor(canvas.width/3),
			Math.floor((canvas.height-this.brickh-1)/3)
		       );
    

	this.hit  = new Hitter(backgroundy,backgroundh);

	this.bricks = [];
	
	for (var i = 0 ; i < nwords ; i++) {
     	    this.bricks.push(new TextBrick("",i*this.brickw, 0, this.brickw, this.brickh));
	}

	this.textOrig = new TextStr("",
				    canvas.width-Math.floor(canvas.width/3),
				    this.brickh+2*Math.floor((canvas.height-this.brickh-1)/3),
				    Math.floor(canvas.width/3),
				    Math.floor((canvas.height-this.brickh-1)/3));
	this.setWords();
    }

    setWords() {
	// get first word out
	let cwords = this.allwords;
	let ix = getRandomArbitrary(0,cwords.length);
	let rw = cwords[ix];
	this.orig = Object.keys(rw)[0];
	let transl = rw[this.orig];
	this.trans = transl[getRandomArbitrary(0,transl.length)];
	cwords.splice(ix,1);
	let wl = []
	wl.push(this.trans);
	for (var i = 0; i < (this.nwords-1); i++) {
	    ix = getRandomArbitrary(0,cwords.length);
	    rw = cwords[ix];
	    let k = Object.keys(rw)[0];
	    transl = rw[k];
	    wl.push(transl[getRandomArbitrary(0,transl.length)]);
	    cwords.splice(ix,1);
	}
	// now set the words onto bricks
	ix = 0;
	while (wl.length) {
	    let ix2 = getRandomArbitrary(0,wl.length);
	    this.bricks[ix].setWord(wl[ix2]);
	    wl.splice(ix2,1);
	    ix++;
	}
	this.textOrig.setWord(this.orig);
    }

    // return 0 if hit target
    // -1 if hit wrong target
    // -2 if still flying
    checkHit(hitter) {
	for (var b  of this.bricks) {
	    if (b.intersect(hitter.hitpointx[hitter.currImg],hitter.y)) {
		if (b.textStr.text == this.trans) {
		    b.hit = true;
		    this.setState(1);
		    return 0;
		}
		else {
		    return -1;
		}
	    }
	}
	return -2;
    }
    

    setState(state) {
	if (state == 1 && this.state == 0) {
	    this.oldV = TextBrick.v;
	    TextBrick.v = 0; // stop bricks
	    this.state = state;
	    this.hits++;
	    if (this.hits == this.hitsToPass) {
		// belt up to more words required now
		this.hitsToPass+=3;
		this.hits = 0;
		this.beltix++;
		if (this.beltix == taek_data.length) {

		}
		this.belt.setBelt(taek_data[this.beltix]);
		this.allwords.concat(taek_data[this.beltix].words);
	    }
	    return;
	}
	
	if (state == 0 && this.state == 1) {
	    this.setWords();
	    TextBrick.v = this.oldV; // restart bricks
	    for (var i = 0; i < this.bricks.length; i++) {
     		this.bricks[i].set(this.brickw*i, 0, this.brickw, this.brickh);
	    }
	    this.state = state;
	    return;
	}
    }

    mainLoop(time) {
	ctx.setTransform(1,0,0,1,0,0);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle="#000000";
	ctx.fillRect(0,this.brickh,canvas.width,canvas.height-this.brickh);
	for (var s of Shape.shapes) {
	    s.animate(time);
	    s.draw();
	}
    }

    
}

Game.theGame = null;
new Game(5);

function mainLoop(time){
    Game.theGame.mainLoop(time);
    requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);

