// Page element variables
var bodyContent = document.getElementsByClassName("container");
var startPage = document.getElementById("start-page");
var startButton = document.getElementById("start-button");
var questionPage = document.getElementById("question-pages");
var questionTitle = document.getElementById("question-title");
var buttonAnswers = document.getElementById("button-answers");
var finalPage = document.getElementById("final-page");
var timeRemaining = document.getElementById("time-remaining");
var responseLine = document.getElementById("response");
var highScore = document.getElementById("view-score");
var spidermanImage = document.getElementById("spiderman-image");
var highscoreView = document.getElementById("highscore-view");
var clearButton = document.getElementById("clear-score");
var gobackButton = document.getElementById("go-back");

var questionsIndex = 0;
var questionsRemaining = questions.length;
var timerInterval = 0;
var secondsLeft = questions.length * 15
var index = "";
var score = 0;
var finalList = {
    initialsList: [],
    scoresList: [],
}

init();

// Functions
function init() {
    var storedList = JSON.parse(localStorage.getItem("finalList"));
    var secondsLeft = questions.length * 15

    if (storedList !== null) {
        finalList = storedList;
    }
    highscoreView.hidden = true;
    startPage.hidden = false;
    spidermanImage.hidden = false;
    questionPage.hidden = true;
}

function setTime() {
    questionPage.hidden = false;
    startPage.hidden = true;

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
    startPage.hidden = true;
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
    stopTimer();
    renderFinalPage();
}

function stopTimer() {
    secondsLeft = 0;
    clearInterval(timerInterval);
}  

function renderFinalPage() {
    questionPage.hidden = true;
    var finalPageScore = document.createElement("div");
    var finalPageHeader = document.createElement("div");
    var finalPageForm = document.createElement("form");
    var finalPageLabel = document.createElement("label");
    var finalPageInput = document.createElement("input");
    var finalPageSubmit = document.createElement("button");
    
    finalPageScore.setAttribute("id","final-score");
    finalPageHeader.setAttribute("id","final-text");
    finalPageForm.setAttribute("id","input-form");
    finalPageLabel.setAttribute("for", "Enter Initials");
    finalPageInput.setAttribute("id", "input-field");
    finalPageInput.setAttribute("type", "text");
    
    finalPage.appendChild(finalPageScore);
    finalPage.appendChild(finalPageHeader);
    finalPage.appendChild(finalPageForm);
    finalPageForm.appendChild(finalPageLabel);
    finalPageForm.appendChild(finalPageInput);
    finalPageForm.appendChild(finalPageSubmit);
    
    
    responseLine.innerHTML = "";
    finalPageScore.innerHTML = "Score: " + score + " out of 5";
    finalPageHeader.innerHTML = "Congratulations! You have completed the Spider-Man test! You can save your score below.";
    finalPageLabel.innerHTML = "Enter Initials";
    finalPageSubmit.innerHTML = "Submit";
    
    finalPageSubmit.addEventListener("click", function(event) {
        event.preventDefault();

        var initialsText = document.getElementById("input-field").value
        
        finalList.initialsList.push(initialsText);
        finalList.scoresList.push(score);
        
        storeScores();
        viewHighScore();
    })
}

function storeScores() {
    localStorage.setItem("finalList",JSON.stringify(finalList));    
}

function viewHighScore() {
    spidermanImage.hidden = true;
    finalPage.hidden = true;
    
    for (var i=0; i<finalList.initialsList.length; i++) {
        var initial = finalList.initialsList[i];
        var highScores = finalList.scoresList[i];
        var li = document.createElement("li");
        li.textContent = initial + ": " + highScores;
        li.setAttribute("scores-list",i);
        highscoreView.appendChild(li);
    }
    highscoreView.hidden = false;
}

// Event Listeners
startButton.addEventListener("click", setTime);
highScore.addEventListener("click", viewHighScore);
gobackButton.addEventListener("click",init);

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
        score++;
        buttonAnswers.innerHTML = "";
        responseLine.innerHTML = "Correct";
        questionsIndex++;
        questionsRemaining--;
        checkQuestion();
    }
    
    else {
        console.log("no");
        console.log(secondsLeft);
        buttonAnswers.innerHTML = "";
        responseLine.innerHTML = "Wrong";
        secondsLeft = secondsLeft - 15;
        questionsIndex++;
        questionsRemaining--;
        checkQuestion();
    }
})
