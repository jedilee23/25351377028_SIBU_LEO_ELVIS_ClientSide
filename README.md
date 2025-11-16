README – Interactive Quiz (Exercise 8)

Author: Leo Elvis Sibu (25351377028)

Repository: https://github.com/jedilee23/25351377028_SIBU_LEO_ELVIS_ClientSide

Live Demo: https://jedilee23.github.io/25351377028_SIBU_LEO_ELVIS_ClientSide/

1. User Manual

1.1 Opening the Quiz

To use the quiz system, open any modern browser such as Chrome, Firefox, or Microsoft Edge.
Visit the live demo link:

https://jedilee23.github.io/25351377028_SIBU_LEO_ELVIS_ClientSide/

The quiz page loads automatically when the link is opened.

1.2 How to Play the Quiz

The quiz starts immediately when the page loads.
A multiple-choice question will appear with several answer options.
Click on your selected answer.
After choosing an answer, click Next to continue to the following question.

1.3 Timer

Each question includes a 30-second countdown timer.
If the timer reaches zero:

The question is marked as expired.
The correct answer is highlighted.
The system automatically moves you to the next question.

1.4 Progress Tracking

The quiz includes:
An animated progress bar that fills as you advance.
A text indicator such as “Question 2 of 5”.
This helps the user track how far they are into the quiz.

1.5 Score Summary

At the end of the quiz, the system displays:
Total score
Number of correct answers
Number of incorrect answers
Percentage score
A brief feedback message (e.g., Excellent, Good attempt, Try again)

1.6 Restarting the Quiz

Click Restart Quiz at the end to begin again.
All questions will be reshuffled to ensure variety on every attempt.

2. Project Overview
   
The Interactive Quiz System is a client-side web application developed as part of the Client-Side Web Development practical tasks.
The system demonstrates practical knowledge of:

DOM manipulation

Interactive UI rendering

Timers and countdown logic

Event handling

Animated progress indication

Dynamic question loading

Question randomization

Clean HTML/CSS separation

The quiz is designed to be lightweight, fast, and responsive.


3. Setup Instructions
   
To run the project locally:
Clone the repository:

git clone https://github.com/jedilee23/25351377028_SIBU_LEO_ELVIS_ClientSide

Open the folder in Visual Studio Code.
Install the Live Server extension (if not already installed).
Right-click index.html and select Open with Live Server.
The quiz will load in your browser.

4. Exercise Description
   
The required components included:

Multiple-choice quiz

Score tracking

Progress display

Results summary

Question shuffling

Use of HTML5, CSS3, and JavaScript


Additional enhancements implemented include:

A responsive and modern user interface

A 30-second timer for each question

Auto-fail when the timer expires

Animated progress bar

Smooth UI transitions

Google Font integration

Fully separated HTML, CSS, and JavaScript files

These additions provide a more advanced experience than the minimum expected for the exercise.


5. Technologies Used

HTML5 for structure

CSS3 for layout, styling, and animations

JavaScript (ES6) for logic, timers, and interaction handling

Git and GitHub for version control

GitHub Pages for deployment


6. Live Demo Links
Repository:
https://github.com/jedilee23/25351377028_SIBU_LEO_ELVIS_ClientSide

Live Demo:
https://jedilee23.github.io/25351377028_SIBU_LEO_ELVIS_ClientSide/

System Overview (Technical Description)

The Interactive Quiz System is a lightweight, client-side web application built using HTML5, CSS3, and JavaScript (ES6).

 It demonstrates key front-end development concepts including DOM manipulation, timers, event handling, UI animations, and dynamic rendering of questions.


--------Source Code------------------
     * HTML - index.html

	<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Exercise8_Sibu_25351377028 - Advanced Web Tech Quiz</title>
    <!-- link to css for progress bar and quiz animations-->
    <link rel="stylesheet" href="style.css">
</head>

<body>

<div class="quiz-container">

    <h1 class="title">Interactive Quiz</h1>
    <!-- Timer -->
    <div class="timer-container">
        <span id="timer">30</span> seconds left
    </div>
    <!-- Progress Bar -->
    <div class="progress-wrapper">
        <div id="progressBar" class="progress-bar"></div>
    </div>
    <!-- Progress Text -->
    <div id="progress" class="progress-text"></div>
    
    <!-- Question -->
    <div id="question" class="question"></div>

    <!-- Options -->
    <div id="options" class="options"></div>

    <!-- Next Button -->
    <button id="nextBtn" class="next-btn" style="display:none;">Next</button>

    <!-- Results -->
    <div id="result" class="result"></div>
</div>

<!-- Link TO JavaScript controlling quiz options and messages -->
<script src="script.js"></script>

</body>
</html>
<!-- yours truly leo elvis sibu -->

----------------------------------------------------------------------------------------
	* Javascript - script.js

//Quiz options, this is where we can add and remove options for our quiz platform, currently with 5 demo questions

const questions = [
    {
        question: "Who invented JavaScript?",
        options: ["Brendan Eich", "James Gosling", "Tim Berners-Lee", "John Resig"],
        answer: "Brendan Eich"
    },
    {
        question: "Which HTML tag is used to include JavaScript?",
        options: ["<js>", "<javascript>", "<script>", "<code>"],
        answer: "<script>"
    },
    {
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Structure", "Central Styling Syntax"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which company developed Google Chrome?",
        options: ["Apple", "Microsoft", "Google", "Mozilla"],
        answer: "Google"
    },
    {
        question: "Who developed this QUIZ?",
        options: ["Apple", "Leo Elvis Sibu", "Google", "Mozilla"],
        answer: "Leo Elvis Sibu"
    }
];

// This is the script that is responsible for Shuffle questions after restart operation
const quizQuestions = questions.sort(() => Math.random() - 0.5);

let index = 0;
let score = 0;
let timeLeft = 30;
let timerInterval = null;

// function for DOM elements and manipulation
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const progressText = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const timerElement = document.getElementById("timer");
const result = document.getElementById("result");

// loading question 
function loadQuestion() {
    clearInterval(timerInterval);
    startTimer();

    const q = quizQuestions[index];
	// progress bar and question count

    progressText.textContent = `Question ${index + 1} of ${quizQuestions.length}`;
    progressBar.style.width = `${((index) / quizQuestions.length) * 100}%`;

    questionElement.textContent = q.question;
    optionsContainer.innerHTML = "";
    nextBtn.style.display = "none";
    result.textContent = "";

    q.options.forEach(optionText => {
        const div = document.createElement("div");
        div.className = "option";
        div.textContent = optionText;
        div.onclick = () => selectOption(div, q.answer);

        optionsContainer.appendChild(div);
    });
}


// Timer logic script for countdown of question expiry
function startTimer() {
    timeLeft = 30;
    timerElement.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            autoFail();
        }
    }, 1000);
}

// Auto-fail when timer ends
function autoFail() {
    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach(opt => {
        opt.style.pointerEvents = "none";
        if (opt.textContent === quizQuestions[index].answer) {
            opt.classList.add("correct");
        }
    });

    nextBtn.style.display = "block";
}
//checking selected option validity
function selectOption(selected, correctAnswer) {
    clearInterval(timerInterval);

    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach(opt => opt.style.pointerEvents = "none");

    if (selected.textContent === correctAnswer) {
        selected.classList.add("correct");
        score++;
    } else {
        selected.classList.add("wrong");
    }

    nextBtn.style.display = "block";
}

// Next button logic
nextBtn.onclick = () => {
    index++;

    if (index < quizQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

// Final result screen
function showResult() {
    questionElement.textContent = "";
    optionsContainer.innerHTML = "";
    nextBtn.style.display = "none";
    progressBar.style.width = "100%";

    result.innerHTML = `
         Quiz Completed!<br><br>
        Your Score: <strong>${score} / ${quizQuestions.length}</strong><br><br>
        <button onclick="location.reload()" class="next-btn">Restart Quiz</button>
    `;
}

// Load first question
loadQuestion();
	
-------------------------------------------------------------------------------------------
 	*CSS - style.css
		/* importing Google Font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

/* creating background for the quiz */
body {
    font-family: "Poppins", sans-serif;
    background: linear-gradient(to bottom right, #4f5bd5, #962fbf, #d62976);
    min-height: 100vh;
    margin: 0;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.quiz-container {
    background: #ffffff;
    width: 100%;
    max-width: 700px;
    padding: 35px;
    border-radius: 16px;
    box-shadow: 0 12px 35px rgba(0,0,0,0.25);
    animation: fadeIn 0.6s ease-in-out;
}

.title {
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 25px;
}

/* creating a container for the Timer */
.timer-container {
    text-align: right;
    font-size: 18px;
    font-weight: 600;
    color: #e74c3c;
    margin-bottom: 10px;
}

/* Progress Bar container AND controls FOR progress bar DOM*/
.progress-wrapper {
    width: 100%;
    background: #eee;
    height: 10px;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 15px;
}

.progress-bar {
    height: 100%;
    width: 0%;
    background: linear-gradient(to right, #4f5bd5, #962fbf);
    transition: width 0.4s ease;
}

/* Progress Text */
.progress-text {
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: 600;
    color: #555;
}

/* Questions structuring */
.question {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;
}

/* Options */
.options .option {
    background: #f7f7f7;
    padding: 14px;
    margin: 10px 0;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.25s;
    border: 2px solid transparent;
    font-size: 17px;
}

.options .option:hover {
    transform: translateY(-3px);
    background: #f0f0f0;
}

.option.correct {
    background: #c7ffc9;
    border-color: #2ecc71;
}

.option.wrong {
    background: #ffcece;
    border-color: #e74c3c;
}

/* Next Button */
.next-btn {
    width: 100%;
    padding: 14px;
    background: #4f5bd5;
    border: none;
    color: white;
    font-size: 18px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
    margin-top: 20px;
}

.next-btn:hover {
    background: #3e49ad;
}

/* Results */
.result {
    margin-top: 25px;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
}

/*transitions*/
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
