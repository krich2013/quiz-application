// Page element variables
var bodyContent = document.getElementsByClassName("container");
var startPage = document.getElementById("start-page");
var startButton = document.getElementById("start-button");
var questionPage = document.getElementById("question-pages");
var questionTitle = document.getElementById("question-title");
var buttonAnswers = document.getElementById("button-answers");
var finalPage = document.getElementById("final-page");
var timeRemaining = document.getElementById("time-remaining");

var questionsIndex = 0;
var questionsRemaining = questions.length - parseInt(questionsIndex);
var timerInterval = 0;
var secondsLeft = questions.length * 15
var index = "";
var score = 0;

// Functions
function setTime() {
    var timerInterval = setInterval(function() {
        timeRemaining.textContent = "Time: " + secondsLeft;
        secondsLeft--;
        
        if(secondsLeft === 0 || questionsRemaining === 0 || questionsRemaining < 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
    
    startQuiz();
}

function startQuiz() {
    startPage.parentNode.removeChild(startPage);
    checkQuestion();
}

function checkQuestion() {
    if (questionsRemaining === 0 || questionsRemaining < 0) {
        timeRemaining.textContent = "Time: " + 0;
        endQuiz();
    }
    
    else {
        addQuestion();
    }
}

function addQuestion() {
    questionTitle.innerHTML = questions[questionsIndex].title;
    for (var i = 0; i < questions[questionsIndex].choices.length; i++) {
        var li = document.createElement("li")
        var choiceButton = document.createElement("button");
        index = i
        
        choiceButton.setAttribute("id",index);
        choiceButton.innerHTML = questions[questionsIndex].choices[i];
        buttonAnswers.appendChild(li);
        li.appendChild(choiceButton);
    }
}

function endQuiz() {
    questionPage.parentNode.removeChild(questionPage);
    stopTimer();
    renderFinalPage();
}

function stopTimer() {
    secondsLeft = 0;
    clearInterval(timerInterval);
}  

function renderFinalPage() {

}

// Event Listeners
startButton.addEventListener("click", setTime);
buttonAnswers.addEventListener("click", function() {
        var userChoice = event.target;
        if (userChoice.matches("button")) {
            console.log(userChoice);
            userChoice = event.target.id;
            console.log(userChoice);
        }
        
        if (questions[questionsIndex].choices[userChoice] === questions[questionsIndex].answer) {
            console.log("yes");
            console.log(secondsLeft);
            score = score + 1;
            buttonAnswers.innerHTML = "";
            questionsIndex++;
            questionsRemaining = questionsRemaining - questionsIndex;
            checkQuestion();
        }
        
        else {
            console.log("no");
            console.log(secondsLeft);
            buttonAnswers.innerHTML = "";
            secondsLeft = secondsLeft - 15;
            questionsIndex++;
            questionsRemaining = questionsRemaining - questionsIndex;
            checkQuestion();
        }
})