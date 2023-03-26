// Variable Definitions
var startButton = document.querySelector("#start-button")

// Event Listiners
startButton.addEventListener("click", startQuiz);

// Function Definitions
function startQuiz() {
    startButton.style.display="none";
    showQuestion ();
    startTimer ();
}

function startTimer() {
    setInterval(function() {
        timeLeft--;
        timerEl.textContent= timeRemaining;
        if (timeRemaining === 0) endQuiz();
    }, 1000);
}