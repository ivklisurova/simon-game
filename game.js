let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameHasStarted = false;
let level = 0;


function nextSequence() {
    /*    Computer chooses a random color and  play a sound.
    The random chosen color is added to corresponding array.   */
    level++;
    $("#level-title").text(`Level ${level}`);
    console.log(level)
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    // console.log(gamePattern)

}

function startOver() {
    /*    Restart the game if  user gets the sequence wrong  */
    gameHasStarted = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];

}

function playSound(name) {
    /* Returning the relevant sound depending on chosen/randomly chosen color. */
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour) {
    /* Add an animation to buttons when pressed. */

    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);

}

function checkAnswer(currentLevel) {
    /* Checks user answer against the computer choice. */
    let simonPattern = gamePattern.slice(0, currentLevel);
    console.log(simonPattern)
    if (_.isEqual(simonPattern, userClickedPattern)) {
        // console.log("Success");
        userClickedPattern = [];
        setTimeout(function () {
            nextSequence();
        }, 1000);
    } else {
        playSound('wrong')
        // console.log("Wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }
}


$(document).keydown(function () {

    if (!gameHasStarted) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        gameHasStarted = true;

    }
});

$(".btn").click(function (event) {
    /*    Checks which button is clicked by the user and add it to the user clicked pattern.    */
    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern)
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (userClickedPattern.length === level) {
        checkAnswer(level);
    }

})
