//arrray of the quiz questions, avaialble choices, and correct answers     
var questions = [{
        title: "What are variables used for in JavaScript Programs?",
        choices: ["Storing numbers, dates, or other values", "Varying randomly", "Causing high-school algebra flashbacks", "None of the above"],
        answer: "Storing numbers, dates, or other values"
    },
    {
        title: "What should appear at the very end of your JavaScript?",
        choices: ["The < script >", "The < /script >", "Title", "None of the above"],
        answer: "</script>"
    },
    {
        title: " JavaScript entities start with _______ and end with _________.",
        choices: ["Semicolon, colon", "Semicolon, ampersand", "ampersand, colon", "Ampersand, semicolon"],
        answer: "Ampersand, semicolon"
    },
    {
        title: "Using _______ statement is how you test for a specific condition.",
        choices: ["Select", "If", "Switch", "For"],
        answer: "If"
    },
    {
        title: "In JavaScript, _________ is an object of the target language data type that encloses an object of the source language.",
        choices: ["a wrapper", "a link", "a cursor", "a form"],
        answer: "a wrapper"
    }
]

//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //proceed to end the game function when timer is below 0 at any time
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}

//stop the timer to end the game 
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got a ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}


function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("<em>highscoreName</em>") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");

    resetGame();
}

//reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Click to play!   
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
    timeLeft -= 15; 
    next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
    score += 20;
    next();
}

//loops through the questions 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}