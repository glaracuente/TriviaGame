var correctAnswers;
var wrongAnswers;
var currentTimeRemaining;
var currentQuestion;
var questions;
var answers;
var questionArray;
var timer;

var numOfQuestions = 10;
var question0 = { q: "Who is Rachel's boyfriend?", a0: "Ross", a1: "Joey", a2: "Michael", a3: "Chandler", aC: "Ross", pic: "assets/images/wewereonabreak.jpg" }
var question1 = { q: "Who is Chandler's girlfriend?", a0: "Phoebe", a1: "Rachel", a2: "Janice", a3: "Amanda", aC: "Janice", pic: "assets/images/janice.jpg" }
var question2 = { q: "Who is Ross's friend from college?", a0: "Daniel", a1: "Joey", a2: "Michael", a3: "Chandler", aC: "Chandler", pic: "assets/images/yemn.jpg" }
var question3 = { q: "Who is Ross's alternate ego with an anger problem?", a0: "Hulk Ross", a1: "Red Ross", a2: "Raging Ross", a3: "The Bull", aC: "Red Ross", pic: "assets/images/mysandwhich.jpg" }
var question4 = { q: "What does Unagi stand for?", a0: "Shrimp Roll", a1: "Alaskin Roll", a2: "Salmon Skin Roll", a3: "Sushi Mama", aC: "Salmon Skin Roll", pic: "assets/images/unagi2.jpg" }
var question5 = { q: "What was Monica’s nickname when she was a field hockey goalie?", a0: "Biggie Smalls", a1: "Big Fat Goalie", a2: "Food Goals", a3: "The Wall", aC: "Big Fat Goalie", pic: "assets/images/monicaclean.jpg" }
var question6 = { q: "Joey plays an actor's butt in a movie...name that actor!", a0: "Denzel Washington", a1: "Robert Dinero", a2: "Al Pacino", a3: "Joey Diaz", aC: "Al Pacino", pic: "assets/images/joeyfood.jpg" }
var question7 = { q: "Who never falls in love with Rachel?", a0: "Ross", a1: "Chandler", a2: "Joey", a3: "Gunther", aC: "Chandler", pic: "assets/images/coffeenotforme.jpg" }
var question8 = { q: "Which one is NOT one of Phoebe's jobs?", a0: "Taxi Driver", a1: "Masseuse", a2: "Musician", a3: "Painter", aC: "Painter", pic: "assets/images/regina.jpg" }
var question9 = { q: "On what holiday is the football game played?", a0: "Christmas", a1: "Halloween", a2: "Thanksgiving", a3: "July 4th", aC: "Thanksgiving", pic: "assets/images/gellercup.jpg" }



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

        var restartBtn = $("<button>").addClass("restartButton").text("Restart")
        $("#timer").append(restartBtn)
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
            $("#timer").text("Time Remaining: 20")
            timer = setInterval(function () { countDown(); }, 1000);
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
        currentImg.addClass("hintImg")
        $("#rightDiv").append(currentImg)
    }

    var countDown = function () {
        if (questionArray.length < 0) {
            return;
        }

        currentTimeRemaining--;

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

        $("#timer").text("Time Remaining: 20")

        shuffle(questionArray)
        nextQuestion()
    }

    var gotItRight = function () {
        console.log("gotItRight")
        clearInterval(timer)
        $("#rightDiv").empty()
        $("#rightDiv").html("<p>Your answer was CORRECT!</p>" +
            "<p>" + currentQuestion.aC + "</p>")
        correctAnswers++
        setTimeout(function () { nextQuestion(); }, 2000)
    }

    var gotItWrong = function () {
        console.log("gotItWrong")
        clearInterval(timer)
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
            $("#answers").empty()
            gotItRight()
        }
        else {
            $("#answers").empty()
            gotItWrong()
        }
    });

    $(document).on("click", '.restartButton', function () {
        startGame();
    });
   



})

