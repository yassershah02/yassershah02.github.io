var hole = document.getElementById("hole");
var block = document.getElementById("block");
var character = document.getElementById("character");
var start = document.getElementById("start");
var jumping = 0;
var counter = 0;
var isStart = false;

var game = document.getElementById("game");

function startGame(){
    start.style.visibility = "hidden";
    game.style.visibility = "visible";
    isStart = true;
    block.style.animationPlayState = "running";
    hole.style.animationPlayState = "running";
    block.style.animation = '';
    hole.style.animation = '';
}
function endGame(){
    start.style.visibility = "visible";
    game.style.visibility = "hidden";
    isStart = false;
    block.style.animationPlayState = "paused";
    hole.style.animationPlayState = "paused";
}

// $(block).stop(!isStart);

hole.addEventListener('animationiteration', () => {
    var random = -((Math.random()*300)+150);
    hole.style.top = random + "px";
    counter++;
    document.getElementById("points").innerHTML = counter;
});

setInterval(function(){
    var character_top =
    parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping == 0 && isStart == true){
        character.style.top = (character_top + 2) + "px";
    }
    var block_left =
    parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var hole_top =
    parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var character_top =
    parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var c_top = -(400-character_top);

    if((character_top > 480) || ((block_left<50)&&(block_left>-6)) && ((c_top < hole_top)||(c_top > (hole_top+130)))){
        // alert("Game Over. Score: " + counter);
        endGame();
        character.style.top = 100 + "px";
        block.style.animation = "none";
        hole.style.animation = "none";
        counter = 0;
    }
},10);

function jump(){
    jumping = 1;
    jump_count = 0;
    var jump_interval = setInterval(function(){
        var character_top =
            parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((character_top > 6) && (jump_count <15)){
            character.style.top = (character_top - 4) + "px";
        }
        if(jump_count > 20){
            clearInterval(jump_interval);
            jumping = 0;
            jump_count = 0;
        }
        jump_count++;
    },10);
}