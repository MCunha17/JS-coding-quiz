// Variable definitions (DOM elements)
var startButton = document.querySelector("#start-button");
  var timer = document.querySelector("#timer");
  var quizContainer = document.querySelector("#quiz-container");
  var questionText = document.querySelector("#question-text");
  var optionsContainer = document.querySelector("#options-container");
  var resultsContainer = document.querySelector("#results-container");
  var instructionsContainer = document.querySelector("#instructions-container");
  var highScoresContainer = document.querySelector("#high-scores-container");

// Quiz variables
let currentQuestionIndex = 0;
let timeLeft = 60;
let score = 0;
let timerInterval;
let optionSelected = false;

  // Event listeners
  startButton.addEventListener("click", startQuiz);
  document.getElementById("high-scores-link").addEventListener("click", showHighScores);

// Question questions
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
]

// Function definitions
function startQuiz() {
        instructionsContainer.style.display = "none";
        startButton.style.display = "none";
        quizContainer.style.display = "block";
        startTimer();
        showNextQuestion();
      }
      

function showNextQuestion() {
  resultsContainer.style.display = "none";
  questionText.textContent = questions[currentQuestionIndex].question;
  optionsContainer.innerHTML = "";
  for (let option of questions[currentQuestionIndex].options) {
    let optionButton = document.createElement("button");
    optionButton.classList.add("option");
    optionButton.textContent = option;
    optionButton.style.cursor = "pointer";
    optionButton.style.pointerEvents = "auto";
    optionButton.addEventListener("click", selectOption);
    optionButton.style.display = "block";
    optionsContainer.appendChild(optionButton);
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
    let resultMessage = "";
    if (selectedAnswer === correctAnswer) {
      score++;
      resultMessage = "Correct!";
    } else {
      timeLeft -= 10;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      resultMessage = "Wrong!";
    }
    resultsContainer.textContent = resultMessage;
    resultsContainer.classList.add("bordered");
    resultsContainer.style.display = "block";
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      setTimeout(function() {
        resultsContainer.style.display = "none";
        resultsContainer.classList.remove("bordered");
        // Remove the following line
        // resultsContainer.removeAttribute("data-content");
        showNextQuestion();
      }, 2000);
    } else {
      setTimeout(function() {
        resultsContainer.style.display = "none";
        resultsContainer.classList.remove("bordered");
        // Remove the following line
        // resultsContainer.removeAttribute("data-content");
        endQuiz();
      }, 1000);
    }
}

  
function endQuiz() {
    clearInterval(timerInterval);
    questionText.textContent = "All done!";
    optionsContainer.innerHTML = "";
  
    let formContainer = document.createElement("div");
    formContainer.classList.add("form-container");
  
    let scoreMessage = document.createElement("h4");
    scoreMessage.textContent = "Your final score is " + score + ".";
    optionsContainer.appendChild(scoreMessage);
  
    let initialsLabel = document.createElement("label");
    initialsLabel.textContent = "Enter initials: ";
    initialsLabel.classList.add("initials-label");
    formContainer.appendChild(initialsLabel);
  
    let initialsInput = document.createElement("input");
    initialsInput.setAttribute("type", "text");
    formContainer.appendChild(initialsInput);
  
    let saveButton = document.createElement("button");
    saveButton.textContent = "Submit";
    saveButton.addEventListener("click", function () {
      let initials = initialsInput.value;
      let highScores = localStorage.getItem("highScores") || "";
      highScores += initials + ": " + score + ";";
      localStorage.setItem("highScores", highScores);
      showHighScores();
    });
    formContainer.appendChild(saveButton);
    optionsContainer.appendChild(formContainer);
  }
  
  
  function showHighScores() {
    // Get high scores from local storage
    let highScores = localStorage.getItem("highScores") || "";
  
    // Create an unordered list to display high scores
    let scoresList = document.createElement("ul");
    scoresList.style.listStyleType = "none";
  
    // Loop through high scores and add each one as a list item
    let highScoresArr = highScores.split(";");
    highScoresArr.sort(function (a, b) {
      return b.split(":")[1] - a.split(":")[1];
    });
    for (let i = 0; i < highScoresArr.length && i < 10; i++) {
      let [initials, score] = highScoresArr[i].split(":");
      let scoreItem = document.createElement("li");
      scoreItem.textContent = `${i + 1}. ${initials.toUpperCase()} - ${score}`;
      scoresList.appendChild(scoreItem);
    }
  
    // Create buttons to go back and clear high scores
    let backButton = document.createElement("button");
    backButton.textContent = "Go Back";
    backButton.addEventListener("click", function() {
      highScoresContainer.style.display = "none";
      instructionsContainer.style.display = "block";
    });
    let clearButton = document.createElement("button");
    clearButton.textContent = "Clear High Scores";
    clearButton.addEventListener("click", function() {
      localStorage.removeItem("highScores");
      showHighScores();
    });
  
    // Clear and update high scores container
    highScoresContainer.innerHTML = "";
    let title = document.createElement("h2");
    title.textContent = "High Scores";
    highScoresContainer.appendChild(title);
    highScoresContainer.appendChild(scoresList);
    highScoresContainer.appendChild(backButton);
    highScoresContainer.appendChild(clearButton);

// Hide quiz and show high scores container
instructionsContainer.style.display = "none";
quizContainer.style.display = "none";
highScoresContainer.style.display = "block";
};