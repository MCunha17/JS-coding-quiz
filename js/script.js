// Variable Definitions
var startButton = document.querySelector("#start-button");
var timer = document.querySelector("timer span");
var questionText = document.querySelector("#question-text");
var optionsContainer = document.querySelector("#options-container");

let currentQuestionIndex = 0;
let timeLeft = 0;
let TimerInterval;

// Event Listiners
startButton.addEventListener("click", startQuiz);

// Question Index
var questions = [
    {
        question: "Question 1",
        options: ["option 1", "option 2", "option 3", "option 4"],
        answer: "answer",
    },
    {
        question: "Question 1",
        options: ["option 1", "option 2", "option 3", "option 4"],
        answer: "answer",
    },
    {
        question: "Question 1",
        options: ["option 1", "option 2", "option 3", "option 4"],
        answer: "answer",
    }
]

// Function Definitions
function startQuiz() {
    questionText.textContent= questions[currentQuestionIndex].question;
    optionsContainer.innerHTML= "";
    for (let option of questions[currentQuestionIndex].options) 
    {
    let option = document.createElement("div");
    option.classList.add("option");
    option.textContent= option;
    option.addEventListener("click", selectOption);
    optionsContainer.appendChild(option);
}
    startTimer ();
}

function startTimer() {
    timerInterval= setInterval(function() {
        timeLeft--;
        timer.textContent= timeRemaining;
        if (timeRemaining === 0) endQuiz();
    }, 1000);
}

