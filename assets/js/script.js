// Timer 
var timeLeft = document.getElementById("timer-count");
var startButton = document.getElementById("start-button");
var content = document.getElementById("content")


// Start time for quiz
var secondsLeft = 76;
var questionCounter = 0;
var timerInterval;

// Timer functionality
function setTime() {
    
    timerInterval = setInterval(function() {        
        secondsLeft--;
        timeLeft.textContent = secondsLeft;

        // Stop timer when reach zero
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            secondsLeft = 0;
        } 
    }, 1000);
    
}

function compare(a,b) {
    var comparison = 0;
    var scoreA = a.score;
    var scoreB = b.score;

    if (scoreA > scoreB) {
        comparison = 1;
    } else if (scoreA < scoreB) {
        comparison = -1;
    }
    return comparison;
}

function startQuiz() {
    setTime();
    content.innerHTML = "";
    generateQuestions(codingQuestions[questionCounter]);
}

// Hitting start will start the quiz, timer and start questions.
if (startButton) {
    startButton.addEventListener("click", startQuiz);
}


// Questions, answer choices and correct answer 
var codingQuestions = [
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: {
            a: "other arrays", b: "booleans",  c: "numbers and strings", d: "all of the above",
        },
        correctAnswer: "d"
    },

    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: {
            a: "<script>", b: "<header>", c: "<body>", d: "<javascript>",
        },
        correctAnswer: "a"
    },
    {
        question: "The condition in an if/else statement is contained in:",
        choices: {
            a: "square brackets", b: "curly braces", c: "parenthesis", d: "quotes",
        },
        correctAnswer: "b"
    },
    {
        question: "How to write an IF statement in JavaScript?",
        choices: {
            a: "if i = 5", b: "if(i == 5)", c: "if i == 5 then", d: "if i = 5 then",
        },
        correctAnswer: "b"
    },
    {
        question: "How do you add a comment in a HTML file?",
        choices: {
            a: "* This is a comment *", b: "*// This is a comment //*", c: "<!--This is a comment-->", d: "//This is a comment//",
        },
        correctAnswer: "c"
    },
]




var choices;

// function to generate HTML for the questions
function generateQuestions(questionObject) {

    // console.log(questionObject);

    var question = document.createElement("h1");
    question.setAttribute("class", "question");
    question.textContent = questionObject.question;
    content.appendChild(question);

    choices = Object.entries(questionObject.choices);

    // console.log(choices);

    for (var i=0; i < choices.length; i++) {
        var answer = choices[i];
        // answer = ["1", "answer text"]
        var button = document.createElement("button");
        button.textContent = answer[0] + ". " + answer[1];
        button.setAttribute("value", answer[0]);
        button.setAttribute("id", "answer-btn");
        button.setAttribute("class", "btn btn-md btn-secondary")
        button.addEventListener("click", function (event) {
            choiceselect(event, questionObject.correctAnswer)
        });
        content.appendChild(button);
    };

}

var rightAnswer;

// selection of answer
function choiceselect(event, correctAnswer) {

    var chosenAnswer = event.target.value;

    if (chosenAnswer === correctAnswer) {
        rightAnswer = true;
        questionCounter++;
        content.innerHTML = "";
        if (questionCounter <= choices.length) {
            generateQuestions(codingQuestions[questionCounter]);
            rightWrongText();
        } else {
            endGame();
        }
    } else {
        if (secondsLeft >= 10){
            secondsLeft -= 10;
        } else if (secondsLeft < 10 || secondsLeft > 0) {
            secondsLeft = 0;
        } else {
            secondsLeft = 0;
        }
        
        questionCounter++;
        
        rightAnswer = false;
        content.innerHTML = "";
        if (questionCounter <= choices.length) {
            generateQuestions(codingQuestions[questionCounter]);
            rightWrongText();
        } else {
            endGame();
        }
        
    }

}

// selection of answer

function rightWrongText() {
    var correct = document.createElement("p");

    if (rightAnswer) {
        correct.setAttribute("class", "right-wrong-text");
        correct.textContent = "Correct answer!";
        content.appendChild(correct);
    } else {
        correct.setAttribute("class", "right-wrong-text");
        correct.textContent = "Wrong answer!";
        content.appendChild(correct);
    } 
    
    setTimeout( function () {
        correct.setAttribute("class", "right-wrong-text hide");
    }, 1000);
    
}


var listOfScoreObjects = [];
var listOfScores = new Object();
var score;

function endGame() {
    clearInterval(timerInterval);
    score = secondsLeft;
    timeLeft.textContent = "";
    content.innerHTML = "";

    var timerEl = document.querySelector(".timer");
    timerEl.textContent = "";

    var gameOverText = document.createElement("h1");
    gameOverText.textContent = "GAME OVER";
    content.appendChild(gameOverText);

    var yourScoreText = document.createElement("p");
    yourScoreText.textContent = "Final Score: " + score;    
    content.appendChild(yourScoreText);

    initialEnter();

}



var lastScore;
var nameInput;
var initials;

function initialEnter() {

    // create form to hold initials stuff
    var initialsForm = document.createElement("form");
    initialsForm.setAttribute("class", "initials-form");
    // content.appendChild(initialsForm);


    // create text before initials box
    var enterText = document.createElement("label");
    enterText.textContent = "Enter Initials: "
    initialsForm.appendChild(enterText);

    // create input for initials
    nameInput = document.createElement("input");
    nameInput.setAttribute("id", "name-input");
    nameInput.textContent = "Enter Initials: ";
    initialsForm.appendChild(nameInput);

    // create button to submit 
    var nameSubmitBtn = document.createElement("button");
    nameSubmitBtn.textContent = "Submit";
    nameSubmitBtn.setAttribute("id", "initials-submit");
    nameSubmitBtn.setAttribute("class", "btn btn-sm btn-primary")
    initialsForm.appendChild(nameSubmitBtn);
    content.appendChild(initialsForm);

    var initialsInputEl = document.querySelector(".initials-form");

    initialsInputEl.addEventListener("submit", handleInitialSubmit);

}


init();
