var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;


$(document).keypress(function () {
    // if(!started){

        $("#level-title").html("Level " + level);
        nextSequence();
        started = true;
    // }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    $("#" + userChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSounds(userChosenColor);
    animatePress(userChosenColor);

    console.log("userClickedPattern:" + userClickedPattern);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        // userClickedPattern.push(userClickedPattern);
        
        console.log("userClickedPattern:"+ userClickedPattern.length);
        console.log(userClickedPattern);
        console.log("gamePattern:" + gamePattern.length);

        if(userClickedPattern.length == gamePattern.length){
            //如果完全符合，就在一秒钟之后调用“下一个”
            setTimeout(function(){
                nextSequence();
            },500);
        }
    }else{
        console.log("wrong");

        playSounds("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").html("Game Over, Press Any Key to Restart");

        // $(document).keypress(function(){
        startOver();
        // });
    }
}


function nextSequence(){

    //进入下一轮游戏之后，userClickedPattern置空
    userClickedPattern = [];

    level ++;
    
    $("#level-title").html("Level " + level);

    var randomNumber = Math.round(Math.random()*10%3);
    var randomChosenColor = buttonColors[randomNumber];
    console.log("randomChosenColor:" + randomChosenColor);
    gamePattern.push(randomChosenColor);

    //完成一次刷新后新添加的颜色块
    $('#' + randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
    //1、检测任何按键并且触发
    playSounds(randomChosenColor);
    // var audio = new Audio("sounds/" + color + ".mp3");
    // audio.play();
    
}

function playSounds(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    // console.log("sounds:" + color);
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function startOver(){
    gamePattern = [];

    // userClickedPattern = [];

    started = false;

    level = 0;
}



