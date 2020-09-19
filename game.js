let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// jQuery to detect and store user clicked buttons
$(".btn").on("click", function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

// detecting if user presses 'a' to start game
$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// plays sound of given button
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// randomly generates next sequence with audio
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").html("Level " + level.toString());

  let randomNumber = Math.round(Math.random() * 3);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}

// adding animation when button is pressed
function animatePress(currentColor) {
  $(".btn#"+currentColor).addClass("pressed");

  setTimeout(function () {
    $(".btn#"+currentColor).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
  }
}

function startOver() {
  playSound("wrong");

  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("#level-title").html("Game over, Press Any Key to Restart");
  started = false;
  level = 0;
  gamePattern = [];
}
