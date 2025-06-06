const questions = [
  {
  question: "What do you open first when you wake up?",
  options: ["Fridge", "Eyes", "WhatsApp", "Mouth"],
  answer: 1
},

  {
    question: "What class of food is Sugar?",
    options: ["Mineral salt", "Vitamin", "Carbohydrate", "Water"],
    answer: 2
  },
  {
  question: "What do you call a baby lizard?",
  options: ["Hatchling", "Lizzybaby", "Tiny dragon", "Mini gecko"],
  answer: 0

  },

  {
  question: "In relationship terms, what does 'breakfast' mean?",
  options: ["Anniversary", "Breaking up", "Cheating", "A nickname for a morning text"],
  answer: 1
}, 
{
  question: "He who laughs last...",
  options: [
    "Didn't get the joke", 
    "Is slow to process", 
    "Laughs best", 
    "Is watching a delayed video"
  ],
  answer: 2
},

{
  question: "He who lives in a glass house should not...",
  options: [
    "Buy mirror", 
    "Complain about sun", 
    "Throw stone", 
    "Forget to clean windows"
  ],
  answer: 2
},
  {
    question: "When life gives you lemons, make...",
    options: ["lemonade", "a phone call", "lemon soup", "lemon pie"],
    answer: 0
  },
    {
    question: "Jack of all trades, master of...",
    options: ["none", "snacks", "memes", "Netflix shows"],
    answer: 0
  },
  {
  question: "In LGBTQ, what does the 'B' stand for?",
  options: ["Biweekly", "Bisexual", "Binary", "Bigender"],
  answer: 1
},

{
  question: "In football, what does GOAT mean?",
  options: ["Greatest Of All Time", "Game On All Teams", "Goalkeeper Of All Time", "Get On And Try"],
  answer: 0
}




];

let currentQuestionIndex = 0;
const userAnswers = new Array(questions.length).fill(null);

const questionCounter = document.getElementById("question-counter");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

// ✅ Render Question
function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const optionId = `option${index}`;
    const checked = userAnswers[currentQuestionIndex] === index ? "checked" : "";

    optionsContainer.innerHTML += `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="option" id="${optionId}" value="${index}" ${checked}>
        <label class="form-check-label option-label" for="${optionId}">
          ${option}
        </label>
      </div>
    `;
  });

  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? "Submit" : "Next";
  resultDiv.style.display = "none";
  restartBtn.style.display = "none"; // Hide restart during quiz
}

// ✅ Select Answer
optionsContainer.addEventListener("change", (e) => {
  if (e.target.name === "option") {
    userAnswers[currentQuestionIndex] = parseInt(e.target.value);
  }
});

// ✅ Prev Button
prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
});

// ✅ Next/Submit Button
nextBtn.addEventListener("click", () => {
  if (userAnswers[currentQuestionIndex] === null) {
    alert("Please select an answer before continuing.");
    return;
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    showResults();
  }
});

// ✅ Restart Button (runs only when clicked)
restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  for (let i = 0; i < userAnswers.length; i++) {
    userAnswers[i] = null;
  }

  prevBtn.style.display = "inline-block";
  nextBtn.style.display = "inline-block";
  restartBtn.style.display = "none";
  renderQuestion();
});

// ✅ Show Results
function showResults() {
  let score = 0;
  userAnswers.forEach((answer, idx) => {
    if (answer === questions[idx].answer) score++;
  });

  questionText.textContent = "Quiz Completed!";
  optionsContainer.innerHTML = "";
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
  restartBtn.style.display = "inline-block";

  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <h4>Your Score: ${score} / ${questions.length}</h4>
    <p>${score === questions.length ? "Excellent! You got them all right!" : "Good effort! Try again to improve."}</p>
  `;
}

function showResults() {
  let score = 0;
  let resultsHTML = "";

  questions.forEach((question, idx) => {
    const userAnswerIndex = userAnswers[idx];
    const correctAnswerIndex = question.answer;
    const userAnswerText = userAnswerIndex !== null ? question.options[userAnswerIndex] : "No answer";
    const correctAnswerText = question.options[correctAnswerIndex];

    const isCorrect = userAnswerIndex === correctAnswerIndex;
    if (isCorrect) score++;

    resultsHTML += `
      <div style="margin-bottom: 1rem; padding: 0.5rem; border: 1px solid ${isCorrect ? 'green' : 'red'}; border-radius: 5px;">
        <strong>Q${idx + 1}: ${question.question}</strong><br>
        Your answer: <span style="color: ${isCorrect ? 'green' : 'red'};">${userAnswerText}</span><br>
        Correct answer: <span style="color: green;">${correctAnswerText}</span>
      </div>
    `;
  });

  questionText.textContent = "Quiz Completed!";
  optionsContainer.innerHTML = "";
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
  restartBtn.style.display = "inline-block";

  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
    <h4>Your Score: ${score} / ${questions.length}</h4>
    ${resultsHTML}
    <p>${score === questions.length ? "Excellent! You got them all right!" : "Good effort! Try again to improve."}</p>
  `;
}
function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  // Show current question number out of total
  questionCounter.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;

  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const optionId = `option${index}`;
    const checked = userAnswers[currentQuestionIndex] === index ? "checked" : "";

    optionsContainer.innerHTML += `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="option" id="${optionId}" value="${index}" ${checked}>
        <label class="form-check-label option-label" for="${optionId}">
          ${option}
        </label>
      </div>
    `;
  });

  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? "Submit" : "Next";
  resultDiv.style.display = "none";
  restartBtn.style.display = "none"; // Hide restart during quiz
}


// ✅ Initial Load
renderQuestion();
