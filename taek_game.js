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

class LImage {

    constructor(src,x,y,w,h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.loaded = false;
	this.img = new Image();
	this.img.src = src;
	LImage.images.push(this);
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
	dctx.drawImage(this.img,this.x,this.y,this.w,this.h);
    }

    animate() {
    }

}
LImage.images = [];


class textBrick extends LImage {
    constructor(word,x,y,w,h) {
	super("./sprites/brick.png",x,y,w,h);
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
	textBrick.bricks.push(this);
	if (typeof(textBrick.offscreenCanvas) == 'undefined') {
	    textBrick.offscreenCanvas = document.createElement('canvas');
	    textBrick.offscreenCanvas.width = this.w;
	    textBrick.offscreenCanvas.height = this.h;
	    textBrick.v = 2;
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

    animate() {
	this.x = (this.x + textBrick.v) % canvas.width;
    }
}
textBrick.bricks = [];

class hitter extends LImage {
    constructor(top) {
	super("./sprites/sprite.png",
	      Math.floor(2*canvas.width/5),
	      backgroundy+Math.floor(backgroundh/3),
	      Math.floor(canvas.width/5),
	      Math.floor(backgroundh/3));

	this.v = 0;
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
    animate() {
	if (hitter.keydown && this.v == 0) {
	    this.v = -20;
	}

	if (this.v != 0 ) // we're animating
	{
	    this.y += this.v;
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

    background  = new LImage(
	"./sprites/background.png",
	0, 
	brickh+1,
	canvas.width,
	canvas.height-brickh-1,
	true
    );

    hit  = new hitter(backgroundy);
    
    pair = getPair();
    warr = [];
    getRandWords(pair[1],nwords-1,warr);
    ix = getRandomArbitrary(0,nwords);
    warr.splice(ix,0,pair[1]);
    
    for (i = 0 ; i < nwords ; i++) {
     	taek_word = new textBrick(warr[i],i*brickw, 0, brickw, brickh);
    }
}


// function everyX(X,t,last,do) {
//     if (t-last > X) {
// 	last = t;
// 	do();
//     }
//     return last;
// }

function mainLoop(time){
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (i in LImage.images) {
	LImage.images[i].animate();
	LImage.images[i].draw();
    }
    requestAnimationFrame(mainLoop);
}

doInit();

requestAnimationFrame(mainLoop);

