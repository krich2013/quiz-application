// Page element variables
var bodyContent = document.getElementsByClassName("container");
var startPage = document.getElementById("start-page");
var startButton = document.getElementById("start-button");
var questionPage = document.getElementById("question-page");
var questionTitle = document.getElementById("question-title");
var buttonAnswers = document.getElementById("button-answers");
var timeRemaining = document.getElementById("time-remaining");

var secondsLeft = 0;
var questionsIndex = 0;
var index = "";

// Setting up functions
function setTime() {
    var secondsLeft = questions.length * 15;
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeRemaining.textContent = "Time: " + secondsLeft;

        if(secondsLeft === 0) {
        clearInterval(timerInterval);
        }
    }, 1000);

    startQuiz();
}

function startQuiz() {
    startPage.parentNode.removeChild(startPage);
    addQuestion();
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

    
    buttonAnswers.addEventListener("click", function() {
        var userChoice = event.target;
        if (userChoice.matches("button")) {
            console.log(userChoice);
        }
        userChoice = event.target.id;
        console.log(userChoice);
        console.log(questions[questionsIndex].choices[userChoice]);
        
        if (questions[questionsIndex].choices[userChoice] === questions[questionsIndex].answer) {
            console.log("yes");
        }
        
        else {
            console.log("no");
        }
    })
    
    questionsIndex + 1;
}



// Event Listeners
startButton.addEventListener("click", setTime);
