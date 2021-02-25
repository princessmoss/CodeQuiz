// Timer setup
var startButton = document.getElementById("start-button");

var timeLeft = document.getElementById("timer-count");

var content = document.getElementById("content");

var scorePage = document.getElementById("score-page");

// Starting time for quiz
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

var answers;

// function to generate HTML for the questions
function generateQuestions(questionObject) {

    // console.log(questionObject);

    var question = document.createElement("h3");
    question.setAttribute("class", "question");
    question.textContent = questionObject.question;
    content.appendChild(question);

    answers = Object.entries(questionObject.answers);

    // console.log(answers);

    for (var i=0; i < answers.length; i++) {
        var answer = answers[i];
        // answer = ["1", "answer text"]
        var button = document.createElement("button");
        button.textContent = answer[0] + ". " + answer[1];
        button.setAttribute("value", answer[0]);
        button.setAttribute("id", "answer-btn");
        button.setAttribute("class", "btn btn-md btn-secondary")
        button.addEventListener("click", function (event) {
            answerSelect(event, questionObject.correctAnswer)
        });
        content.appendChild(button);
    };

}

var rightAnswer;

// what happens when user selects an answer
function answerSelect(event, correctAnswer) {

    var chosenAnswer = event.target.value;

    if (chosenAnswer === correctAnswer) {
        rightAnswer = true;
        questionCounter++;
        content.innerHTML = "";
        if (questionCounter <= answers.length) {
            generateQuestions(quizQuestions[questionCounter]);
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
        if (questionCounter <= answers.length) {
            generateQuestions(quizQuestions[questionCounter]);
            rightWrongText();
        } else {
            endGame();
        }
        
    }

}

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

    var gameOverText = document.createElement("h2");
    gameOverText.textContent = "GAME OVER";
    content.appendChild(gameOverText);

    var yourScoreText = document.createElement("p");
    yourScoreText.textContent = "Final Score: " + score;    
    content.appendChild(yourScoreText);

    initialEnter();

}



var lastScore;

var nameInput;

var rawInitials;

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

var displayScores;

if (scorePage) {

    displayScores = JSON.parse(localStorage.getItem("unordered-scores"));
    // storeData();
    
    var backBtnEl = document.getElementById("back-btn");
    backBtnEl.addEventListener("click", returnToQuiz);

    var clearBtnEl = document.getElementById("clear-btn");
    clearBtnEl.addEventListener("click", clearScores)

}

function returnToQuiz(event) {
    event.preventDefault();

    document.location.href = ("index.html");
}

function clearScores(event) {
    event.preventDefault();
    localStorage.clear();
    scorePage.textContent="";
}

// function storeData () {

//     console.log(unorderedScores);

//     localStorage.setItem("scores", JSON.stringify(listOfScores));
// }

var unorderedScores = [];

function handleInitialSubmit(event) {

    event.preventDefault();
    
    rawInitials = document.getElementById("name-input").value;
    
    listOfScores[score] = rawInitials;

    unorderedScores.push({"score": score, "name": rawInitials,});

    localStorage.setItem("unordered-scores", JSON.stringify(unorderedScores));
    

    // open next html page with high scores list
    document.location.href = ("scores.html");


}

function init() {
    var storedScores = JSON.parse(localStorage.getItem("unordered-scores"));

    if (storedScores !==null) {
        unorderedScores = storedScores;
    }

    if (scorePage) {
        // console.log(unorderedScores.sort(compare).reverse());

        var sortedScores = unorderedScores.sort(compare).reverse();

        for (var i=0; i < sortedScores.length; i++) {
            var scoreObject = sortedScores[i];
            // console.log(scoreObject)

            var scoreFromObject = scoreObject["score"];
            var nameFromObject = scoreObject["name"];

            var li = document.createElement("li");
            li.textContent = scoreFromObject + " - " + nameFromObject;
            li.setAttribute("data-index", i);
            scorePage.appendChild(li);

        }
    }
}

var sortedScores;


// source: https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
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
    generateQuestions(quizQuestions[questionCounter]);
}

// When start clicked, start the quiz game (start timer and load questions)
if (startButton) {
    startButton.addEventListener("click", startQuiz);
}

init();

// Establish questions and answers as objects in an array
// the answers are another object
var quizQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: {
            1: "strings",
            2: "booleans",
            3: "alerts",
            4: "numbers",
        },
        correctAnswer: "3"
    },
    {
        question: "The condition in an if/else statement is contained in:",
        answers: {
            1: "quotes",
            2: "curly braces",
            3: "parenthesis",
            4: "square brackets",
        },
        correctAnswer: "3"
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        answers: {
            1: "numbers and strings",
            2: "other arrays",
            3: "booleans",
            4: "all of the above",
        },
        correctAnswer: "4"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: {
            1: "commas",
            2: "curly braces",
            3: "quotes",
            4: "parenthesis",
        },
        correctAnswer: "3"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: {
            1: "JavaScript",
            2: "terminal/bash",
            3: "for loops",
            4: "console.log",
        },
        correctAnswer: "4"
    },
]