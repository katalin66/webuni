// npm install --save-dev webpack webpack-cli webpack-dev-server cpoy-webpack-plugin css-loader style-loader
// npm start
import { getQuiz } from './api';
import './styles.css';
import { shuffleArray } from './utils';

let points = 10;
let answered = false;

document.addEventListener('DOMContentLoaded', async () => {
  let { results } = await getQuiz();
  results = results.map(result => {
    result.answers = shuffleArray([result.correct_answer, ...result.incorrect_answers]);
    return result;
  })
  console.log(results)
  renderPoints();
  renderQuiz(results);
})

function renderPoints() {
  document.getElementById('points').innerHTML = points;
}

function renderQuiz(quiz) {
  const quizContainer = document.getElementById('quiz-container');

  function createAnswerElement(answer, question) {
    const questionAnswerElement = document.createElement('div');
    questionAnswerElement.classList.add('answer');
    questionAnswerElement.innerHTML = `<p>${answer}</p>`;
    questionAnswerElement.addEventListener('click', () => {
      if (answer === question.correct_answer) {
        points++;
        questionAnswerElement.classList.add('correct');
      } else {
        points--;
        questionAnswerElement.classList.add('incorrect');
      }
      renderPoints()
    })
    // questionAnswerElement.removeEventListener('click');
    return questionAnswerElement
  }

  function createQuestionElement(question, index) {
    const quizElement = document.createElement('div');
    quizElement.classList.add('question');
    const quizHeaderElement = document.createElement('div');
    quizHeaderElement.classList.add('question-header');
    const quizAnswersElement = document.createElement('div');
    quizAnswersElement.classList.add('question-answers');

    quizHeaderElement.innerHTML = `<h3>${index + 1}. ${question.question}</h3>`;
    quizElement.appendChild(quizHeaderElement);
    quizElement.appendChild(quizAnswersElement);
    question.answers.forEach(answer => {
      const questionAnswerElement = createAnswerElement(answer, question);
      quizAnswersElement.appendChild(questionAnswerElement)
    })
    quizElement.appendChild(quizAnswersElement);
    return quizElement;
  }


  quiz.forEach((question, index) => {
    const quizElement = createQuestionElement(question, index);
    quizContainer.appendChild(quizElement)
  })
}