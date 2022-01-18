export function getQuiz() {
  return fetch('https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple')
    .then(res => res.json())
}