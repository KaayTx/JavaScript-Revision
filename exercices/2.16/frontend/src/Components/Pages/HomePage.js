const HomePage = () => {
  fetch('http://localhost:3000/questions')
    .then((response) => {
      if(!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then((questions) => {
      renderQuestions(questions);
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    }) 
};

function renderQuestions(questions) {
  const questionsHtml = getQuestionsHtml(questions);

  const main = document.querySelector('main');

  main.innerHTML += questionsHtml;
}

function getQuestionsHtml(questions) {
  let questionsHtml = '';

  questions?.forEach((question, index) => {
    const answers = question.answers.map((answer, i) => `
      <div>
        <input type="radio" id="question-${index}-answer-${i}" name="question-${index}" value="${answer}">
        <label for="question-${index}-answer-${i}">${answer.text}</label>
      </div>
    `).join('');

    questionsHtml += `
      <div class="question-block">
        <div class="question-title">${question.question}</div>
        <div class="answers">${answers}</div>
        
      </div>
    `;
  });

  questionsHtml += '<button id="calculate-score" class="btn btn-primary mt-3">Calculate Score</button>';

  return questionsHtml;
}

export default HomePage;