// Variable Definitions
var startButton = document.querySelector("#start-button");
var timer = document.querySelector("#timer-span");
var questionText = document.querySelector("#question-text");
var optionsContainer = document.querySelector("#options-container");
var resultsContainer = document.querySelector("#results-container")

let currentQuestionIndex = 0;
let timeLeft = 60;
let score = 0;
let TimerInterval;

// Event Listiners
startButton.addEventListener("click", startQuiz);

// Question Index
var questions = [
    {
        question: "Question 1",
        options: ["option 1", "option 2", "option 3", "option 4"],
        answer: "option 1",
    },
    {
        question: "Question 2",
        options: ["option 1", "option 2", "option 3", "option 4"],
        answer: "option 2",
    },
    {
        question: "Question 3",
        options: ["option 1", "option 2", "option 3", "option 4"],
        answer: "option 3",
    }
]

// Function Definitions
function startQuiz() {
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
        optionElement.addEventListener("click", selectOption);
        optionsContainer.appendChild(optionElement);
    }
}

currentQuestionIndex++;
if (currentQuestionIndex < questions.length) {
    questionText.textContent = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = "";
    for (let option of questions[currentQuestionIndex].options) {
        let optionElement = document.createElement("div");
        optionElement.classList.add("option");
        optionElement.textContent = option;
        optionElement.addEventListener("click", selectOption);
        optionsContainer.appendChild(optionElement);
    }
} else {
    endQuiz();
}

function startTimer() {
    timerInterval= setInterval(function() {
        timeLeft--;
        timer.textContent= timeLeft;
        if (timeLeft === 0) endQuiz();
    }, 1000);
}

function selectOption(event) {
    let selectedOption = event.target;
    let selectedAnswer = selectedOption.textContent;
    let correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedAnswer === correctAnswer) {
        score++;
        resultContainer.textContent = "Correct!";
    } else {
        timeLeft -= 10;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        resultContainer.textContent = "Incorrect!";
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(showNextQuestion, 1000);
    } else {
        setTimeout(endQuiz, 1000);
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    questionText.textContent = "Game Over!";
    optionsContainer.innerHTML = "";
    resultsContainer.innerHTML = "Your Score: " + score;

    let initialsInput = document.createElement("input");
    initialsInput.setAttribute("type", "text");
    initialsInput.setAttribute("placeholder", "Enter your initials");
    resultsContainer.appendChild(initialsInput);

    let saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", function() {
        let initials = initialsInput.value;
        let highScores = localStorage.getItem("highScores") || "";
        highScores += initials + ": " + score + ";";
        localStorage.setItem("highScores", highScores);
    });
    resultsContainer.appendChild(saveButton);
}