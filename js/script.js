// Variable Definitions
var startButton = document.querySelector("#start-button");
var timer = document.querySelector("#timer");
var questionText = document.querySelector("#question-text");
var optionsContainer = document.querySelector("#options-container");
var resultsContainer = document.querySelector("#results-container");
var instructionsContainer = document.querySelector("#instructions-container");

let currentQuestionIndex = 0;
let timeLeft = 60;
let score = 0;
let timerInterval;

// Event Listiners
startButton.addEventListener("click", startQuiz);

// Question Index
var questions = [
    {
        question: "What does the acronym 'DOM' stand for?",
        options: ["1. Document Object Model", "2. Data Object Model", "3. Document Object Method", "4. Data Objecet Method"],
        answer: "1. Document Object Model",
    },
    {
        question: "Which of the following is not a data type in JavaScript?",
        options: ["1. string", "2. boolean", "3. object", "4. number array"],
        answer: "4. number array",
    },
    {
        question: "Which of the following is the correct syntax for an if statement in JavaScript?",
        options: ["1. if (condition) {code block}", "2. if condition {code block}", "3. if [condition] {cod block}", "4. if (condition) then {code block}"],
        answer: "1. if (condition) {code block}",
    },
    {
        question: "Which of the following is the correct syntax for an if statement in JavaScript?",
        options: ["1. if (condition) {code block}", "2. if condition {code block}", "3. if [condition] {cod block}", "4. if (condition) then {code block}"],
        answer: "1. if (condition) {code block}",
    }
]

// Function Definitions
function startQuiz() {
    instructionsContainer.style.display = "none";
    startButton.style.display = "none";
    startTimer();
    showNextQuestion();
}

function showNextQuestion() {
    questionText.textContent = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = "";
    for (let option of questions[currentQuestionIndex].options) {
        let optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.textContent = option;
        optionElement.style.cursor = "pointer";
        optionElement.style.pointerEvents = "auto";
        optionElement.addEventListener("click", selectOption);
        optionsContainer.appendChild(optionElement);
    }
}

function startTimer() {
    timerInterval = setInterval(function() {
        timeLeft--;
        timer.querySelector("span").textContent = timeLeft;
        if (timeLeft === 0) endQuiz();
    }, 1000);
}

function selectOption(event) {
    let selectedOption = event.target;
    let selectedAnswer = selectedOption.textContent;
    let correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedAnswer === correctAnswer) {
        score++;
        resultsContainer.textContent = "Correct!";
    } else {
        timeLeft -= 10;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        resultsContainer.textContent = "Incorrect!";
    }
    resultsContainer.classList.add("bordered");
    resultsContainer.setAttribute("data-content", resultsContainer.textContent);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(function() {
            resultsContainer.textContent = "";
            resultsContainer.classList.remove("bordered");
            showNextQuestion();
        }, 2000);
    } else {
        setTimeout(function() {
            resultsContainer.textContent = "";
            resultsContainer.classList.remove("bordered");
            endQuiz();
        }, 2000);
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    questionText.textContent = "Game Over!";
    optionsContainer.innerHTML = "";
    
    let scoreMessage = document.createElement("h3");
    scoreMessage.textContent = "Your Score: " + score;
    scoreMessage.style.textAlign = "center";
    optionsContainer.appendChild(scoreMessage);
    
    let initialsInput = document.createElement("input");
    initialsInput.setAttribute("type", "text");
    initialsInput.setAttribute("placeholder", "Enter your initials");
    optionsContainer.appendChild(initialsInput);
  
    let saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", function() {
        let initials = initialsInput.value;
        let highScores = localStorage.getItem("highScores") || "";
        highScores += initials + ": " + score + ";";
        localStorage.setItem("highScores", highScores);
    });
    optionsContainer.appendChild(saveButton);
  }