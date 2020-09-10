//work on multiplayer, and having an end button
//remember to set increment and bodyincrement
//make dropdown for speed and theme
var posxHead = 0;
var posyHead = 0;
var posxApple = 0;
var posyApple = 0;
var time = 0;

var fieldHeight = 25;//30,25
var fieldWidth = 55;//65,55

var listx = [];
var listy = [];
var snakeLen = 0;
var highScore;
if(localStorage.getItem("highScore") == null){
    highScore = 0;
    localStorage.setItem("highScore",highScore);
} else{
    highScore = localStorage.getItem("highScore");
}
//implement for scoring systems


var started = false;
function wait(millis){
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < millis);
}
function clear(what){
    var x;
    var y;
    for (y = 0; y <= fieldHeight; y++) {
        for (x = 0; x <= fieldWidth; x++) {
            $("."+x.toString()+"-"+y.toString()).removeClass(what);
        }
    }
}
function isTouching(){
    var x;
    var y;
    var returner;
    for (y = 0; y <= fieldHeight; y++) {
        for (x = 0; x <= fieldWidth; x++) {
            if($("."+x.toString()+"-"+y.toString()).hasClass("mainHead") && $("."+(x).toString()+"-"+(y).toString()).hasClass("head")){
                returner = true;
            }
        }
    }
    return returner;
}//work on this part
function applePos(x,y){
    $("."+x.toString()+"-"+y.toString()).addClass("apple");
}//give gradient classes(css too) to classes around apple
function headPos(x,y){
    $("."+x.toString()+"-"+y.toString()).addClass("head");
}
function mainHeadPos(x,y){
    clear("mainHead");
    $("."+x.toString()+"-"+y.toString()).addClass("mainHead");
    $("."+x.toString()+"-"+y.toString()).removeClass("head");
}
function randApple(){
    $("."+posxApple.toString()+"-"+posyApple.toString()).removeClass("apple");
    posxApple = Math.round((Math.random()*(fieldWidth-1))+1);
    posyApple = Math.round((Math.random()*(fieldHeight-1))+1);
    while($("."+posxApple.toString()+"-"+posyApple.toString()).hasClass("head")){
        posxApple = Math.round((Math.random()*(fieldWidth-1))+1);
        posyApple = Math.round((Math.random()*(fieldHeight-1))+1);
    }
    applePos(posxApple,posyApple);
}
function chart(x,y,lenner){
    // if(snakeLen > 1){
        listx.unshift(x); 
        listy.unshift(y);
        var i;
        for(i = 0; i<=lenner;i++){
            $("."+listx[lenner-i].toString()+"-"+listy[lenner-i].toString()).addClass("head");
        }
        $("."+listx[lenner+1].toString()+"-"+listy[lenner+1].toString()).removeClass("head");
    // }
    // else{
    //     clear("head");
    // }
}
posxHead = Math.round((Math.random()*(fieldWidth-1))+1);
posyHead = Math.round((Math.random()*(fieldHeight-1))+1);
var thisx = 0;
var thisy = 0;
var lastkey = "";
var intervals = [];

var increment =  40;//75 for easy, 30 for hard, 60 for regular //55 preferred or 40
var bodyIncrement = 3;//1 for regular //becomes harder when super high becomes tedious when super low maybe 2
function checkScore(){
    if(snakeLen>highScore){
        highScore = snakeLen
        localStorage.setItem("highScore",highScore);
    }
    document.getElementById("highscore").innerHTML = "High Score: " + (highScore/bodyIncrement).toString();
    document.getElementById("score").innerHTML = "Score: " + (snakeLen/bodyIncrement).toString();
    // document.getElementById("highscore").innerHTML = "High Score: " + (Math.round((highScore/bodyIncrement) * (((100-increment)+100)/100))).toString();
}
function start(){
    if(time == 0){
        for(var x = 1; x<=fieldWidth; x++){
            var thatone = $("#mainRow").append("<div class = \""+"col col-" + x.toString()+"\"></div>");
            for(var y = 1; y<=fieldHeight; y++){
                $(".col-"+x.toString()).append("<span class = \"blockGround "+x.toString()+"-"+y.toString()+"\"></span>");
            }
        }
    }
    listx = [];
    listy = [];
    clear("head");
    clear("mainHead");
    clear("youLost");
    
    intervals.forEach(window.clearInterval);//can comment out for continous movement
    randApple();
    $("."+posxHead.toString()+"-"+posyHead.toString()).removeClass("head");
    $("."+posxHead.toString()+"-"+posyHead.toString()).removeClass("mainHead");
    
    posxHead = Math.round((Math.random()*(fieldWidth-1))+1);
    posyHead = Math.round((Math.random()*(fieldHeight-1))+1);
    headPos(posxHead,posyHead);
    started = true;
    
    // document.getElementById("speed").innerHTML = "Speed: " + increment.toString();
    // document.getElementById("bodyIncrement").innerHTML = "Amount added per apple: " + bodyIncrement.toString();
    snakeLen = 0;
    checkScore();
    // if(posxHead>23){
    //     lastkey = "left";
    // } else if(posxHead<=23){
    //     lastkey = "right";
    // } 
    time++;
}
function appleTouched(){
    snakeLen+=bodyIncrement;
    checkScore()
    randApple();
}
function isGameOver(){
    return (posxHead>fieldWidth || posxHead<=0 || posyHead>=fieldHeight+1 || posyHead<=0 || isTouching()) && snakeLen !== (fieldHeight*fieldWidth);
}
function endGame(){
    //animation
    // for(var y = 6; y<=24; y++){
    //     $(".6-"+y.toString()).addClass("youLost");
    // }
    // for(var y = 6; y<=9; y++){
    //     for(var x = 9; x<=12; x++){
    //         $("."+x.toString()+"-"+y.toString()).addClass("youLost"); 
    //         console.log([x,y]);
    //     }
    // }
    
    // window.setTimeout(start,1500); //cool effect
    // document.getElementById("speed").innerHTML = "You Lost";
    start();

}
class arrows{
    static left(){
        if(isGameOver()){
            endGame();
        }
        if($("."+(posxApple+1).toString()+"-"+posyApple.toString()).hasClass("mainHead") ){
            appleTouched()
        }
        lastkey = "left";
        thisx = posxHead;
        thisy = posyHead;
        posxHead-=1; 
        mainHeadPos(posxHead,posyHead);
        chart(thisx,thisy,snakeLen);
    }
    static right(){
        if(isGameOver()){
            endGame();
        }
        if($("."+(posxApple-1).toString()+"-"+posyApple.toString()).hasClass("mainHead")){
            appleTouched()
        }
        thisx = posxHead;
        thisy = posyHead;
        lastkey = "right";  
        posxHead+=1; 
        mainHeadPos(posxHead,posyHead);
        chart(thisx,thisy,snakeLen);
    }
    static up(){
        if(isGameOver()){
            endGame();
        }
        if($("."+(posxApple).toString()+"-"+(posyApple+1).toString()).hasClass("mainHead")){
            appleTouched()
        }
        thisx = posxHead;
        thisy = posyHead;
        lastkey = "up";
        posyHead-=1; 
        mainHeadPos(posxHead,posyHead);
        chart(thisx,thisy,snakeLen);
    }
    static down(){
        if(isGameOver()){
            endGame();
        }//think about putting if statement in isgameover and condensing
        if($("."+(posxApple).toString()+"-"+(posyApple-1).toString()).hasClass("mainHead")){
            appleTouched()
        }
        lastkey = "down";
        thisx = posxHead;
        thisy = posyHead;
        posyHead+=1; 
        mainHeadPos(posxHead,posyHead);
        chart(thisx,thisy,snakeLen);
    }
}
function end(){
    started = !started;
}//fix this part

function keydown(event) {
    var key = event.key;
    if(key === " "){
        start();
    }
    if(started){ 
        if(snakeLen === fieldHeight*fieldWidth){
            window.alert("You Won! Congratulations");
        } else if((key == "ArrowLeft" || key == "a") && (lastkey!=="right" || snakeLen === 0)){
            intervals.forEach(window.clearInterval);
            var l = window.setInterval(arrows.left, increment);
            intervals.push(l);
        } else if((key ==  "ArrowRight" || key == "d") && (lastkey!=="left" || snakeLen === 0)) {
            intervals.forEach(window.clearInterval);
            var r = window.setInterval(arrows.right, increment);
            intervals.push(r);
        } else if((key == "ArrowUp" || key == "w") && (lastkey!=="down" || snakeLen === 0)){
            intervals.forEach(window.clearInterval);
            var u = window.setInterval(arrows.up, increment);
            intervals.push(u);
        } else if((key == "ArrowDown" || key == "s") && (lastkey!=="up" || snakeLen === 0)){
            intervals.forEach(window.clearInterval);
            var d = window.setInterval(arrows.down, increment);
            intervals.push(d);
        }
    }
}
//make it so that if it touches itself it dies
window.addEventListener('keydown', keydown);
// Created By Jathan Pai