// Page element variables
var bodyContent = document.getElementsByClassName("container");
var startPage = document.getElementById("start-page");
var startButton = document.getElementById("start-button");
var questionPage = document.getElementById("question-pages");
var questionTitle = document.getElementById("question-title");
var buttonAnswers = document.getElementById("button-answers");
var finalPage = document.getElementById("final-page");
var timeRemaining = document.getElementById("time-remaining");

var secondsLeft = 0;
var questionsIndex = 0;
var index = "";
var score = 0;

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
    if (questionsIndex > (questions.length - 1)) {
        timeRemaining.textContent = "Time: " + 0;
        questionsIndex = questionsIndex - 1;
        endQuiz();
    }

    else {
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
                    userChoice = event.target.id;
                    console.log(userChoice);
                }
                
                    if (questions[questionsIndex].choices[userChoice] === questions[questionsIndex].answer) {
                        console.log("yes");
                        score = score + 1;
                        buttonAnswers.innerHTML = "";
                        questionsIndex = questionsIndex + 1;
                        addQuestion();
                    }
                    
                    else {
                        console.log("no");
                        secondsLeft = secondsLeft - 15;
                        buttonAnswers.innerHTML = "";
                        questionsIndex = questionsIndex + 1;
                        addQuestion();
                    }
            })
    }
}

function endQuiz() {
    questionPage.parentNode.removeChild(questionPage);
}
    
    // Event Listeners
    startButton.addEventListener("click", setTime);
    
    
