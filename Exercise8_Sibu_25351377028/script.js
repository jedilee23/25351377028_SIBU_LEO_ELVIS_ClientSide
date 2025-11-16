
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
	
