var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var v = 2;
var dx = v;
var dy = -v;

var fist=new Image();
var brick = new Image();
var canDrawFist = false;
var canDrawBrick = false;

var x = 0;
var y = 0;
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

fist.src="./sprite.png";
fist.onload=function(){
    canDrawFist = true;
};


function drawFist() {
    if (!canDrawFist) return;
    ctx.drawImage(fist,x,y);
}


brick.src="./brick.png";
brick.onload=function(){
    canDrawBrick = true;
};

function drawBrick(x,y,w,h) {
    if (!canDrawBrick) return;
    ctx.drawImage(brick,x,y,w,h);
}


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

         drawBrick(this.x,this.y,this.width,this.height);
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

var scrollers = [];
var nwords = 4

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

    pair = getPair();
    warr = [];
    getRandWords(pair[1],nwords-1,warr);
    ix = getRandomArbitrary(0,nwords);
    warr.splice(ix,0,pair[1]);

    
    for (i = 0 ; i < nwords ; i++) {
	scrollers.push(createScrollText(warr[i], i*brickw, 0, brickw, brickh));
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
    for (sc in scrollers) {
	scrollers[sc].scroll((Math.sin(time/3000) + 1) * scrollers[sc].maxScroll * 0.5);
	scrollers[sc].render();
    }
//    draw()
    requestAnimationFrame(mainLoop);
}

doInit();

requestAnimationFrame(mainLoop);

