const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const startBtn = document.querySelector('.btn__start');
const saveSelect = [];
const endPoint = 12;

startBtn.addEventListener('click', () => {
  start();
});

//start
function start() {
  main.style.webkitAnimation = 'fadeOut 1s';
  main.style.animation = 'fadeOut 1s';
  setTimeout(() => {
    qna.style.webkitAnimation = 'fadeIn 1s';
    qna.style.animation = 'fadeIn 1s';
    setTimeout(() => {
      main.style.display = 'none';
      qna.style.display = 'block';
    }, 450);
    let questionIdx = 0;
    nextQuestion(questionIdx);
  }, 450);
}

// question
function nextQuestion(questionIdx) {
  var question = document.querySelector('.qBox');
  question.innerHTML = qnaList[questionIdx].q;

  for (let i in qnaList[questionIdx].a) {
    nextAnswer(qnaList[questionIdx].a[i].answer, questionIdx);
  }

  var prograssBar = document.querySelector('.progressbar');
  prograssBar.style.width = (100 / endPoint) * (questionIdx + 1) + '%';
}

// answer
function nextAnswer(answerText, questionIdx) {
  var answer = document.querySelector('.answerBox');
  var answerBtn = document.createElement('button');
  answerBtn.classList.add('answerList');

  answer.appendChild(answerBtn);
  answerBtn.innerHTML = answerText;

  answerBtn.addEventListener('click', () => {
    var answerList = document.querySelectorAll('.answerList');
    for (let i = 0; i < answerList.length; i++) {
      answerList[i].style.animation = 'fadeOut 1s';
    }
    setTimeout(() => {
      for (let i = 0; i < answerList.length; i++) {
        answerList[i].style.display = 'none';
      }
      nextQuestion(++questionIdx);
    });
  });
}
