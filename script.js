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
var clearButton = document.getElementById("clear-scores");
var gobackButton = document.getElementById("go-back");
var highscoreList = document.getElementById("highscore-list");

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
    finalPage.hidden = true;
}

function setTime() {
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
    questionPage.hidden = false;
    questionsRemaining = questions.length;
    secondsLeft = questions.length * 15;
    questionsIndex = 0;
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
    finalPage.hidden = false;

    var finalPageScore = document.getElementById("final-score");
    var finalPageSubmit = document.getElementById("score-submit");    
    
    responseLine.innerHTML = "";
    finalPageScore.innerHTML = "Score: " + score + " out of 5";
    
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

    console.log(finalList.scoresList.length);
    highscoreList.innerHTML = "View Your High Scores";
    
    for (var i=0; i<finalList.initialsList.length; i++) {
        var initial = finalList.initialsList[i];
        var highScores = finalList.scoresList[i];
        var li = document.createElement("li");
        li.textContent = initial + ": " + highScores;
        li.setAttribute("scores-list",i);
        highscoreList.appendChild(li);
    }

    highscoreView.hidden = false;

    clearButton.addEventListener("click", function(event) {
        event.preventDefault();
        highscoreList.innerHTML = "";
        finalList = {
            initialsList: [],
            scoresList: [],
        }       
        // storeScores();
    })

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
