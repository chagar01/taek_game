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

    constructor(src,x,y,w,h,add) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.loaded = false;
	this.img = new Image();
	this.img.src = src;
	if (add) LImage.images.push(this);
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

    draw() {
	ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
    }

    drawXY(x,y,w,h) {
	this.set(x,y,w,h);
	this.draw();
    }
}
LImage.images = [];


class textBrick extends LImage {
    constructor(word,x,y,w,h) {
	super("./sprites/brick.png",x,y,w,h, true);
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
    }
    
    setFont() {
        this.fontStr = "bolder " + this.fontSize + "px " + this.font;
        this.textHeight = this.fontSize + Math.ceil(this.fontSize * 0.05);
    }
    
    draw() {
	super.draw();
	ctx.fillStyle='white';
	do {
	    this.setFont();
            ctx.font = this.fontStr;
	    if (!this.fontset) {
		if (ctx.measureText(this.text).width < this.maxTextWidth &&
		    this.textHeight < this.maxTextHeight)
		{
		    this.fontset = true;
		    break;
		}
		this.fontSize--;
	    }
	} while (!this.fontSet);

        ctx.fillText(this.text,this.x+this.marginx,this.y+this.marginy);
    }
}


/*
const textScrollBox = {
    dirty : true, // indicates that variouse setting need update
    
    cleanit(dontFitText){
        if(this.dirty){
             this.setFont();
             this.getTextPos();
             this.dirty = false;
             if(!dontFitText){
                 this.fitText();
             }
         }         
    },
    scrollY : 0,
    fontSize : 24,
    font : "Arial",
    align : "middle",
    scrollBox : {
        width : 10,
        color : "#78a",
    },
    fontStyle : "black",
    brickimg  : new LImage("./sprites/brick.png",0,0,0,0,false),
    setOptions(options){
        Object.keys(this).forEach((key) =>{
            if(options[key] !== undefined){
                this[key] = options[key];
                this.dirty = true;
            }
        })
    },
    setFont(){
        this.fontStr = this.fontSize + "px " + this.font;
        this.textHeight = this.fontSize + Math.ceil(this.fontSize * 0.05);
    },
    getTextPos(){
        if(this.align === "left"){ this.textPos = 0 }
        else if(this.align === "right"){ this.textPos = Math.floor(this.width - this.scrollBox.width -this.fontSize / 4) }
        else { this.textPos = Math.floor((this.width- - this.scrollBox.width) / 2) }
    },  
    fitText(){
        this.cleanit(true); // MUST PASS TRUE or will recurse to call stack overflow
	
        ctx.font = this.fontStr;
        ctx.textAlign = this.align;
        ctx.textBaseline = "top";
        var words = this.text.split(" ");
        this.lines.length = 0;
        var line = "";
        var space = "";
        while(words.length > 0){
            var word = words.shift();
            var width = ctx.measureText(line + space +  word).width;
            if(width < this.width - this.scrollBox.width - this.scrollBox.width){
                line += space + word;
                space = " ";
            }
	    else {
                if(space === ""){ // if one word too big put it in anyways
                    line += word;
                }
		else {
                    words.unshift(word);
                }
                this.lines.push(line);
                space = "";
                line = "";
            }
        }
        if(line !== ""){
            this.lines.push(line);
        }
        this.maxScroll = ((this.lines.length + 0.5) * this.textHeight) - this.height;
    },             
    scroll(pos){
        this.cleanit();        
        this.scrollY = -pos;
        if(this.scrollY > 0){
            this.scrollY = 0;
        }else if(this.scrollY < -this.maxScroll ){
            this.scrollY = -this.maxScroll ;
        }
    },
    render(){
        this.cleanit(); 
        ctx.font = this.fontStr;
        ctx.textAlign = this.align;
        ctx.save(); // need this to reset the clip area
	
        this.brickimg.drawXY(this.x,this.y,this.width,this.height);
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.width-this.scrollBox.width,this.height);
        ctx.clip();         
        // Important text does not like being place at fractions of a pixel
        // make sure you round the y pos;
        ctx.setTransform(1,0,0,1,this.x, Math.floor(this.y + this.scrollY)); 
        ctx.fillStyle = this.fontStyle;
        for(var i = 0; i < this.lines.length; i ++){
            // Important text does not like being place at fractions of a pixel
            // make sure you round the y pos;
            ctx.fillText(this.lines[i],this.textPos,Math.floor(i * this.textHeight));
        }
        ctx.restore(); // remove the clipping
    }
}     

function createScrollText( text, x, y, width, height, options = {} ){
  return Object.assign({},
    textScrollBox,{
        text,x, y, width, height,
        lines : [],
    },
    options
  );
}
*/

//var scrollers = [];
var nwords = 5;
var keydown = false;
var sprite;

function animate() {
    if (keydown) v = 10;
    else v = 0;
    sprite.transform(0,-v,0,0);
}

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

    document.addEventListener('keydown', function(event) {
        if(event.key == ' ' ) {
            keydown = true;
        }
    }, false);

    document.addEventListener('keyup', function(event) {
        if(event.key == ' ' ) {
            keydown = false;
        }
    }, false);

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

    sprite  = new LImage(
	"./sprites/sprite.png",
	Math.floor(2*canvas.width/5),
	backgroundy+Math.floor(backgroundh/3),
	Math.floor(canvas.width/5),
	Math.floor(backgroundh/3),
	true
    );
    
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
    for (i in LImage.images) { LImage.images[i].draw(); }
    animate();
    requestAnimationFrame(mainLoop);
}

doInit();

requestAnimationFrame(mainLoop);

