var correctAnswers;
var wrongAnswers;
var currentTimeRemaining;
var currentQuestion;
var questions;
var answers;
var questionArray;

var numOfQuestions = 2;
var question0 = { q: "Who is Rachel's boyfriend?", a0: "Ross", a1: "Joey", a2: "Michael", a3: "Chandler", aC: "Ross", pic: "assets/images/coffeenotforme.jpg" }
var question1 = { q: "Who is Ross's girlfriend?", a0: "Phoebe", a1: "Rachel", a2: "Janice", a3: "Monica", aC: "Rachel", pic: "assets/images/unagi.jpg" }
var question2 = { q: "Who is Ross's girlfriend?", a0: "Phoebe", a1: "Rachel", a2: "Janice", a3: "Monica", aC: "Rachel", pic: "assets/images/unagi.jpg" }
var question3 = { q: "Who is Ross's girlfriend?", a0: "Phoebe", a1: "Rachel", a2: "Janice", a3: "Monica", aC: "Rachel", pic: "assets/images/unagi.jpg" }


$(document).ready(function () {

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


    var allDone = function () {
        $("#question").empty()
        $("#answers").empty()
        $("#rightDiv").empty()
        $("#timer").empty()

        $("#rightDiv").html("<p>Correct Answers: " + correctAnswers + "</p>" +
            "<p>Wrong Answers: " + wrongAnswers + "</p>")

        $("#timer").html("<p>GAME OVER</p>")


        //DISPLAY RESTART OPTION
        //WHICH RESETS CORRECT AND INCORRECT VARIABLES....AND RESETS QA Array...and then run NEXTQUESTION?
    }

    var nextQuestion = function () {
        console.log("nextQuestion")
        if (questionArray.length === 0) {
            allDone()
        }
        else {
            currentTimeRemaining = 20
            currentQuestion = questionArray.pop()
            displayCurrentQA()
            setTimeout(countDown, 1000);
        }
    }

    var displayCurrentQA = function () {
        console.log("displayCurrentQA")
        $("#question").empty()
        $("#answers").empty()
        $("#rightDiv").empty()
        $("#question").text(currentQuestion.q)

        for (var i = 0; i < 4; i++) {
            var ans = $("<p>").addClass("ans").text(eval("currentQuestion.a" + i))
            $("#answers").append(ans)
        }

        var currentImg = $("<img>").attr("src", currentQuestion.pic)
        $("#rightDiv").append(currentImg)
    }

    var countDown = function () {
        console.log("countdown")
        if (questionArray.length === 0) {
            return;
        }
        currentTimeRemaining--;
        if (currentTimeRemaining > 0) {
            setTimeout(countDown, 1000);
        }
        if (currentTimeRemaining <= 0) {
            gotItWrong()
        }
        $("#timer").text("Time Remaining: " + currentTimeRemaining)
    }

    var startGame = function () {
        console.log("startGame")
        correctAnswers = 0;
        wrongAnswers = 0;
        questionArray = [];

        for (var i = 0; i < numOfQuestions; i++) {
            questionArray[i] = eval("question" + i)
        }

        shuffle(questionArray)
        nextQuestion()
    }

    var gotItRight = function () {
        console.log("gotItRight")
        $("#rightDiv").empty()
        $("#rightDiv").html("<p>Your answer was CORRECT!</p>" +
            "<p>" + currentQuestion.aC + "</p>")
        correctAnswers++
        setTimeout(function () { nextQuestion(); }, 2000)
    }

    var gotItWrong = function () {
        console.log("gotItWrong")
        $("#rightDiv").empty()
        $("#rightDiv").html("<p>Your answer was WRONG or you were too slow!</p>" +
            "<p>The correct answer was:</p>" +
            "<p>" + currentQuestion.aC + "</p>")
        wrongAnswers++
        setTimeout(function () { nextQuestion(); }, 2000)
    }



    startGame()


    // $(".ans").on("click", function () {
    //WHY DIDN"T THIS WORK THE SAME!?
    // });

    $(document).on("click", '.ans', function () {
        console.log("click")
        var chosenAnswer = $(this).text()
        if (chosenAnswer === currentQuestion.aC) {
            gotItRight()
        }
        else {
            gotItWrong()
        }
    });

})

