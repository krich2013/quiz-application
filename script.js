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

var questionsIndex = 0;
var questionsRemaining = questions.length - parseInt(questionsIndex);
var timerInterval = 0;
var secondsLeft = questions.length * 15
var index = "";
var score = 0;
var finalList = {
    initialsList: [],
    scoresList: [],
}

// Functions
function startOverPage() {
    spidermanImage.appendChild(startPage);
    startPage.appendChild(questionPage);
    questionPage.appendChild(finalPage);
    finalPage.appendChild(responseLine);
    setTime();
}

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
    
    function storeScores() {
        localStorage.setItem("Initials",JSON.stringify(finalList.initialsList));    
        localStorage.setItem("Score", JSON.stringify(finalList.scoresList));
    }
        finalPageSubmit.addEventListener("click", function(event) {
            event.preventDefault();
    
            var initialsText = finalPageInput.value;
    
            finalList.initialsList.push(initialsText);
            finalList.scoresList.push(score);
            finalPageInput.value = "";
    
            storeScores();
            viewHighScore();
    })
}

function viewHighScore() {
    startPage.innerHTML = "";
    spidermanImage.innerHTML = "";
    questionPage.innerHTML = "";
    finalPage.innerHTML = "";

    var storedInitials = JSON.parse(localStorage.getItem("finalList.initialsList"));
    var storedScores = JSON.parse(localStorage.getItem("finalList.scoresList"));
    
    finalList.initialsList = storedInitials;
    finalList.scoresList = storedScores;
    
    for (var i=0; i<finalList.length; i++) {
        var initial = finalList.initialsList[i];
        var highScores = finalList.scoresList[i];
        var li = document.createElement("li");
        li.textContent = initial + ": " + highScores;
        li.setAttribute("scores-list",i);
        spidermanImage.appendChild(li);
    }
    
    var startOverButton = document.createElement("button");
    var clearButton = document.createElement("button");

    startOverButton.textContent = "Start Over";
    clearButton.textContent = "Clear Scores";
    
    spidermanImage.appendChild(startOverButton);
    spidermanImage.appendChild(clearButton);
    
    startOverButton.addEventListener("click",startOverPage);
    clearButton.addEventListener("click", function() {
        finalList = {
            initialsList: [],
            scoresList: [],
        }
    })
}

// Event Listeners
startButton.addEventListener("click", setTime);
highScore.addEventListener("click", viewHighScore);



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
        questionsRemaining = questionsRemaining - questionsIndex;
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
