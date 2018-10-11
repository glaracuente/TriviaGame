var correctAnswers;
var wrongAnswers;
var currentTimeRemaining;
var currentQuestion;
var questions;
var answers;
var questionArray;

var numOfQuestions = 2;
var question0 = { q: "Who is Rachel's boyfriend?", a0: "Ross", a1: "Joey", a2: "Michael", a3: "Chandler", aC: "Ross" }
var question1 = { q: "Who is Ross's girlfriend?", a0: "Phoebe", a1: "Rachel", a2: "Janice", a3: "Monica", aC: "Rachel" }



// This function to shuffle array was taken from https://www.kirupa.com/html5/shuffling_array_js.htm
function shuffle(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = array[randomIndex];
        array[randomIndex] = array[i];
        array[i] = itemAtIndex;
    }
    return array;
}

var nextQuestion = function () {
    currentTimeRemaining = 5
    currentQuestion = questionArray.pop()
}

var displayCurrentQA = function () {
    $("#question").empty()
    $("#answers").empty()
    $("#question").text(currentQuestion.q)

    for (var i = 0; i < 4; i++) {
        var ans = $("<p>").addClass("ans").text(eval("currentQuestion.a" + i))
        $("#answers").append(ans)
    }
}

var countDown = function () {
    currentTimeRemaining--;
    if (currentTimeRemaining > 0) {
        setTimeout(countDown, 1000);
    }
    if (currentTimeRemaining === 0) {
        nextQuestion()
        displayCurrentQA()
        setTimeout(countDown, 1000);
    }
    $("#timer").text("Time Remaining: " + currentTimeRemaining)
}

var startGame = function () {
    correctAnswers = 0;
    wrongAnswers = 0;
    questionArray = [];

    for (var i = 0; i < numOfQuestions; i++) {
        questionArray[i] = eval("question" + i)
    }

    shuffle(questionArray)

    nextQuestion()

    displayCurrentQA()

    setTimeout(countDown, 1000);
}



startGame()


//IF CORRECT ANSWER CHOSEN
//CONGRATS
//CORRECTANSWERS++
//SETTIMEOUT OR SETALERT?...AFTER FEW SECONDS....NEXTQUESTION()


//IF THEY GET IT WRONG OR RUN OUT OF TIME
//INCORRECTANSWERS++
///DISPLAY WRRONG OT TIME UPS
//DISPLAY CORRECT ANSWER
//WAIT FEW SEC
//NEXTQUESTION()



//WHEN QUESTIONANSWERS ARRAY ISMEPTY()
//SHOW TOTAL RIGHT AND WRONG
//DISPLAY RESTART OPTION
//WHICH RESETS CORRECT AND INCORRECT VARIABLES....AND RESETS QA Array...and then run NEXTQUESTION?



//setTimeout(function () {
 //   displayImage()
//}, 1000);
//}
///function startSlideshow() {

    // TODO: Use showImage to hold the setInterval to run nextImage.
  //  showImage = setInterval(function () {
   //     nextImage()
   // }, 2000);
