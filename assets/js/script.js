// Variable definitions (DOM elements)
var instructionsContainer = document.querySelector("#instructions-container");
var startButton = document.querySelector("#start-button");
var timer = document.querySelector("#timer");
var quizContainer = document.querySelector("#quiz-container");
var questionText = document.querySelector("#question-text");
var optionsContainer = document.querySelector("#options-container");
var resultsContainer = document.querySelector("#results-container");
var highScoresContainer = document.querySelector("#high-scores-container");
// Quiz variables
let currentQuestionIndex = 0;
let timeLeft = 75;
let score = 0;
let timerInterval;
let optionSelected = false;

// Event listeners
// Calls startQuiz when 'Start Quiz' button is clicked
startButton.addEventListener("click", startQuiz);
// Calls showHighScores when 'View high scores' link is clicked
document.getElementById("high-scores-link").addEventListener("click", function () {
showHighScores();
// Hide the 'View high scores' link when viewing high scores
document.getElementById("high-scores-link").style.display = "none";
});
// Array - questions and answers
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
        options: ["1. if (condition) {code block}", "2. if condition {code block}", "3. if [condition] {code block}", "4. if (condition) then {code block}"],
        answer: "1. if (condition) {code block}",
    },
    {
      question: "Which operator is used to concatenate two strings in JavaScript?",
      options: ["1. +", "2. -", "3. *", "4. /"],
      answer: "1. +",
    },
    {
      question: "Which operator is used to compare two values in JavaScript?",
      options: ["1. =", "2. ==", "3. ===", "4. !=="],
      answer: "4. !==",
    },
    {
      question: "Which method is used to add an element to the end of an array in JavaScript?",
      options: ["1. push()", "2. pop()", "3. shift()", "4. unshift()"],
      answer: "1. push()",
    },
    {
      question: "Which method is used to remove the last element from an array in JavaScript?",
      options: ["1. push()", "2. pop()", "3. shift()", "4. unshift()"],
      answer: "2. pop()",
    },
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      options: ["1. var", "2. let", "3. const", "4. All of the above"],
      answer: "4. All of the above",
    },
    {
      question: "Which method is used to remove whitespace from both sides of a string in JavaScript?",
      options: ["1. slice()", "2. splice()", "3. trim()", "4. split()"],
      answer: "3. trim()",
    },
    {
      question: "Which method is used to return the index of the first occurence of a specified value in an array in JavaScript?",
      options: ["1. indexOf()", "2. find()", "3. filter()", "4. map()"],
      answer: "1. indexOf()",
    },
]

// Function definitions
// Start quiz
function startQuiz() {
    // Hides instructions and start button, shows quiz container
    instructionsContainer.style.display = "none";
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    // Starts timer and shows first question
    startTimer();
    showNextQuestion();
    }     
// Show next question
function showNextQuestion() {
  // Hides results container and displays current question and options
  resultsContainer.style.display = "none";
  questionText.textContent = questions[currentQuestionIndex].question;
  optionsContainer.innerHTML = "";
  // Displays and creates a button for each option
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
// Start timer
function startTimer() {
    timerInterval = setInterval(function() {
    timeLeft--;
    timer.querySelector("span").textContent = timeLeft;
    // Ends quiz if time runs out
    if (timeLeft === 0) endQuiz();
  }, 1000);
}
// Select answers
function selectOption(event) {
  // Gets the selected option and answer from event object and questions array
  // Compares selected answer with correct answer and updates score and time left
  // Displays the result message and moves to the next question or ends the quiz
    let selectOption = event.target;
    let selectedAnswer = selectOption.textContent;
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
      // If there are more questions, hides the results message and shows the next question after 1 second
      setTimeout(function() {
        resultsContainer.style.display = "none";
        resultsContainer.classList.remove("bordered");
        showNextQuestion();
      }, 1000);
      // If there are no more questions, hides the results message and calls endQuiz() function to finish the quiz after 1 second
    } else {
      setTimeout(function() {
        resultsContainer.style.display = "none";
        resultsContainer.classList.remove("bordered");
        endQuiz();
      }, 1000);
    }
}
// End quiz
function endQuiz() {
    // Stops the timer and displays the final score
    clearInterval(timerInterval);
    questionText.textContent = "All done!";
    optionsContainer.innerHTML = "";

    let formContainer = document.createElement("div");
    formContainer.classList.add("form-container");
    // Displays final score
    let scoreMessage = document.createElement("h4");
    scoreMessage.textContent = "Your final score is " + score + ".";
    optionsContainer.appendChild(scoreMessage); 
    let initialsLabel = document.createElement("label");
    initialsLabel.textContent = "Enter initials: ";
    initialsLabel.classList.add("initials-label");
    formContainer.appendChild(initialsLabel);
    // Input box for initials
    let initialsInput = document.createElement("input");
    initialsInput.setAttribute("type", "text");
    formContainer.appendChild(initialsInput);
    // Submit button
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
    // Gets high scores from local storage
    let highScores = localStorage.getItem("highScores") || "";
    // Displays list of high scores
    let scoresList = document.createElement("ul");
    scoresList.style.listStyleType = "none";


    let highScoresArr = highScores.split(";");
    highScoresArr.sort(function (a, b) {
      return b.split(":")[1] - a.split(":")[1];
    });
    if (highScoresArr.length > 0) {
      for (let i = 0; i < highScoresArr.length && i < 10; i++) {
        let [initials, score] = highScoresArr[i].split(":");
        let scoreItem = document.createElement("li");
        scoreItem.textContent = `${i + 1}. ${initials.toUpperCase()} - ${score}`;
        scoresList.appendChild(scoreItem);
      }
    // Goes back and resets quiz
    let backButton = document.createElement("button");
    backButton.textContent = "Go Back";
    backButton.addEventListener("click", function () {
      highScoresContainer.style.display = "none";
      instructionsContainer.style.display = "block";
      timeLeft = 75;
      currentQuestionIndex = 0;
      score = 0;
      clearInterval(timerInterval);
      startButton.style.display = "block";
      document.getElementById("high-scores-link").style.display = "block";
      timer.style.display = "block";
    });
    // Clears high scores
    let clearButton = document.createElement("button");
    clearButton.textContent = "Clear High Scores";
    clearButton.addEventListener("click", function () {
      localStorage.removeItem("highScores");
      scoresList.remove();
      scoresItem.remove();
      showHighScores();
    });

    highScoresContainer.innerHTML = "";
    let title = document.createElement("score-list");
    title.textContent = "High Scores";
    highScoresContainer.appendChild(title);
    highScoresContainer.appendChild(scoresList);
    highScoresContainer.appendChild(backButton);
    highScoresContainer.appendChild(clearButton);

    instructionsContainer.style.display = "none";
    quizContainer.style.display = "none";
    highScoresContainer.style.display = "block";
    document.getElementById("high-scores-link").style.display = "none";
    timer.style.display = "none";
  }
}