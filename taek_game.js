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

/*
var x = 0;
var y = 0;
*/

var allwords = [];

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getPair() {
    belt = taek_data[getRandomArbitrary(0,taek_data.length)];
    word = belt.words[getRandomArbitrary(0,belt.words.length)];
    orig = Object.keys(word)[0]
    trans = Object.values(word)[0]
    tran = trans[getRandomArbitrary(0,trans.length)];
    return [orig,tran];
}

function getRandWords(different,count,arr) {
    words = allwords;
    ix = words.indexOf(different);
    console.assert(ix != -1);
    console.assert(count < words.length);
    for (i = 0; i < count ; i++) {
	ix = getRandomArbitrary(0,words.length);
	arr.push(words[ix]);
	words.splice(ix,1);
    }
}

class shape {
    constructor(x,y,w,h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
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
shape.shapes = [];

class LImage extends shape {

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
	shape.shapes.push(this);
    }

    draw(dctx = ctx) {
	dctx.drawImage(this.imgs[this.currImg],this.x,this.y,this.w,this.h);
    }

}


class textBrick extends LImage {
    constructor(word,x,y,w,h) {
	super(["./sprites/brick.png",
	       "./sprites/brick_broken1.png",
	       "./sprites/brick_broken2.png",
	       "./sprites/brick_broken3.png",
	       "./sprites/brick_broken4.png",
	       "./sprites/brick_broken5.png"],
	      x,y,w,h);
	this.text = word;
	this.fontSize = 40;
	this.font = "Verdana";
	this.align = "middle";
	this.scrollBox = { width : 10, color : "#78a"};
	this.fontset = false;
	this.marginx = Math.ceil(this.w*0.1);
	this.maxTextWidth = this.w - 2*this.marginx;
	this.maxTextHeight = Math.floor(this.h/3);
	this.marginy = Math.floor(this.h/3);
	this.setFont();
	this.hit = false;
	textBrick.bricks.push(this);
	if (typeof(textBrick.offscreenCanvas) == 'undefined') {
	    textBrick.offscreenCanvas = document.createElement('canvas');
	    textBrick.offscreenCanvas.width = this.w;
	    textBrick.offscreenCanvas.height = this.h;
	}
    }
    
    setFont() {
        this.fontStr = "bolder " + this.fontSize + "px " + this.font;
        this.textHeight = this.fontSize + Math.ceil(this.fontSize * 0.05);
    }
    
    draw() {
	let os = false; // offscreen defaults to false
	let dctx = ctx;
	let x = this.x;
	let y = this.y;
	let end = this.x+this.w;
	if (end > canvas.width) {
	    os = true; // if won't fit use offscreen
	    dctx = textBrick.offscreenCanvas.getContext("2d");
	    this.x = 0; // hacky temporarily set coords to 0;
	    this.y = 0; 
	}
	
	super.draw(dctx);
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
	if (textBrick.v == 0 && this.hit) {
	    if (!textBrick.last) textBrick.last = t;
	    let p = t - textBrick.last;
	    if (p > 250) {
		textBrick.last = t;
		this.currImg++;
		if (this.currImg == this.numImgs) {
		    this.currImg = 0;
		    this.hit = false;
		}
	    }
	}
	this.x = (this.x + textBrick.v) % canvas.width;
    }
}

textBrick.bricks = [];
textBrick.v = 2;  // 0 if we hit the right brick
textBrick.last = null;

class hitter extends LImage {
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
	this.hitpointx = this.x+Math.floor(0.75*this.w);
	
	this.top = top;
	this.bottom = this.y;
	this.keydown = false;
	document.addEventListener('keydown', function(event) {
            if(event.key == ' ' ) {
		hitter.keydown = true;
            }
            if(event.key == 's' ) {
	     	textBrick.v++;
	    }
            if(event.key == 'a' ) {
	     	textBrick.v--;
	    }
	}, false);

	document.addEventListener('keyup', function(event) {
            if(event.key == ' ' ) {
		hitter.keydown = false;
            }
	}, false);
    }

    // draw(dctx = ctx) {
    // 	super.draw(ctx);
    // 	ctx.beginPath();
    // 	ctx.arc(this.hitpointx,this.y,5,0,2*Math.PI);
    // 	ctx.stroke();
    // }


    animate(t) {
	if (hitter.keydown && this.v == 0) {
	    this.v = -20;
	}

	if (this.v != 0 ) // we're animating
	{
	    this.y += this.v;

	    for (var b  of textBrick.bricks) {
		if (b.intersect(this.hitpointx,this.y)) {
		    textBrick.v = 0;
		    b.hit = true;
		    this.currImg++;
		    if (this.currImg == this.numImgs) this.currImg = 0;
		}
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
hitter.keydown = false;


class belt extends shape{
    constructor(col,x,y,w,h) {
	super(x,y,w,h);
	this.col = col;
    }
}

var nwords = 5;
var keydown = false;

function doInit() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    x = canvas.width/2;
    y = canvas.height-30;
    console.log(taek_data.length);
    for (i in taek_data) {
	belt = taek_data[i];
	for (w in belt.words) {
	    word = belt.words[w];
	    orig = Object.keys(word)[0]
	    trans = Object.values(word)[0]
	    for (t in trans) {
		allwords.push(trans[t]);
	    }
	}
    }

    brickw = Math.floor(canvas.width/nwords);
    brickh = Math.floor(canvas.height/10);

    backgroundh = canvas.height-brickh-1;
    backgroundy = brickh+1;

    new LImage(
	["./sprites/background.png"],
	0, 
	brickh,
	Math.floor(canvas.width/3),
	Math.floor((canvas.height-brickh-1)/3)
    );

    new LImage(
	["./sprites/background.png"],
	canvas.width-Math.floor(canvas.width/3), 
	brickh,
	Math.floor(canvas.width/3),
	Math.floor((canvas.height-brickh-1)/3)
    );

    hit  = new hitter(backgroundy,backgroundh);
    
    pair = getPair();
    warr = [];
    getRandWords(pair[1],nwords-1,warr);
    ix = getRandomArbitrary(0,nwords);
    warr.splice(ix,0,pair[1]);
    
    for (i = 0 ; i < nwords ; i++) {
     	taek_word = new textBrick(warr[i],i*brickw, 0, brickw, brickh);
    }
}

function mainLoop(time){
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#000000";
    ctx.fillRect(0,brickh,canvas.width,canvas.height-brickh);
    for (i in shape.shapes) {
	shape.shapes[i].animate(time);
	shape.shapes[i].draw();
    }
    requestAnimationFrame(mainLoop);
}

doInit();

requestAnimationFrame(mainLoop);

