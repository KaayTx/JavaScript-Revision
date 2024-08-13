import 'bootstrap/dist/css/bootstrap.min.css';
import questions from './utils/questions';

const App = () => {
  clearPage();
  renderQuiz();
};

function clearPage() {
  document.body.innerHTML = '';
}

function renderQuiz() {
  clearPage();
  const main = document.createElement('main');
  document.body.appendChild(main);

  // Sélectionner aléatoirement trois questions
  const selectedQuestions = getRandomQuestions(3);

  // Afficher les questions
  selectedQuestions.forEach((question, index) => {
    const questionContainer = document.createElement('div');
    questionContainer.className = 'question-container';

    const questionElement = document.createElement('h2');
    questionElement.textContent = `${index + 1}. ${question.question}`;
    questionContainer.appendChild(questionElement);

    question.answers.forEach((answer, answerIndex) => {
      const answerContainer = document.createElement('div');
      answerContainer.className = 'answer-container';

      const radioInput = document.createElement('input');
      radioInput.type = 'radio';
      radioInput.name = `question-${index}`;
      radioInput.id = `question-${index}-answer-${answerIndex}`;
      radioInput.value = answer.isCorrect;

      const label = document.createElement('label');
      label.htmlFor = radioInput.id;
      label.textContent = answer.text;

      answerContainer.appendChild(radioInput);
      answerContainer.appendChild(label);

      questionContainer.appendChild(answerContainer);
    });

    main.appendChild(questionContainer);
  });

  // Bouton pour calculer le score
  const scoreButton = document.createElement('button');
  scoreButton.textContent = 'Calculate Score';
  scoreButton.addEventListener('click', () => calculateScore(selectedQuestions));

  main.appendChild(scoreButton);
}

function getRandomQuestions(number) {
  const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
  return shuffledQuestions.slice(0, number);
}

function calculateScore(selectedQuestions) {
  let score = 0;

  selectedQuestions.forEach((question, index) => {
    const selectedAnswer = document.querySelector(`input[name="question-${index}"]:checked`);
    if (selectedAnswer && selectedAnswer.value === 'true') {
      score += 1;
    }
  });

  displayScore(score);
}

function displayScore(score) {
  const main = document.querySelector('main');
  main.innerHTML = `<h2>Your Score: ${score} / 3</h2>`;

  // Bouton pour recommencer le jeu
  const restartButton = document.createElement('button');
  restartButton.textContent = 'Restart Quiz';
  restartButton.addEventListener('click', () => renderQuiz());

  main.appendChild(restartButton);
}

App();
