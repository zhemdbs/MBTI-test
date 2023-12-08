const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const startBtn = document.querySelector('.btn__start');
const endPoint = 12;

startBtn.addEventListener('click', () => {
  begin();
});

function addAnswer(answerText, qIdx) {
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  answer.classList.add('fadeIn');

  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener('click', () => {
    var children = document.querySelectorAll('.answerList');
    for (let i = 0; i < children.length; i++) {
      children[i].disabled = true;
      children[i].style.webkitAnimation = 'fadeOut 0.5s';
      children[i].style.animation = 'fadeOut 0.5s';
    }
    setTimeout(() => {
      for (let i = 0; i < children.length; i++) {
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    }, 450);
  });
}

function goNext(qIdx) {
  var status = document.querySelector('.statusBar');
  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;

  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx);
  }

  status.style.width = (100 / endPoint) * (qIdx + 1) + '%';
}

function begin() {
  main.style.webkitAnimation = 'fadeOut 1s';
  main.style.animation = 'fadeOut 1s';
  setTimeout(() => {
    qna.style.webkitAnimation = 'fadeIn 1s';
    qna.style.animation = 'fadeIn 1s';
    setTimeout(() => {
      main.style.display = 'none';
      qna.style.display = 'block';
    }, 450);
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}
