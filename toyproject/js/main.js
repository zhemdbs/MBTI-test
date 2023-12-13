const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');
const startBtn = document.querySelector('.btn__start');

const endPoint = 12;
const saveSelect = [];

startBtn.addEventListener('click', () => {
  start();
});

// calculate result
function calResult() {
  var pointArray = [
    { name: 'mouse', value: 0, key: 0 },
    { name: 'cow', value: 0, key: 1 },
    { name: 'tiger', value: 0, key: 2 },
    { name: 'rabbit', value: 0, key: 3 },
    { name: 'dragon', value: 0, key: 4 },
    { name: 'snake', value: 0, key: 5 },
    { name: 'horse', value: 0, key: 6 },
    { name: 'sheep', value: 0, key: 7 },
    { name: 'monkey', value: 0, key: 8 },
    { name: 'chick', value: 0, key: 9 },
    { name: 'dog', value: 0, key: 10 },
    { name: 'pig', value: 0, key: 11 }
  ];

  for (let i = 0; i < endPoint; i++) {
    var selectTarget = qnaList[i].a[saveSelect[i]].type;
    for (let j = 0; j < selectTarget.length; j++) {
      for (let k = 0; k < pointArray.length; k++) {
        if (selectTarget[j] === pointArray[k].name) {
          pointArray[k].value += 1;
        }
      }
    }
  }

  //value를 기준으로 정렬을 하고 싶고, value가 제일 높은 것이 결과 값으로 나와야함
  var resultArray = pointArray.sort(function (a, b) {
    if (a.value > b.value) {
      return -1;
    }
    if (a.value < b.value) {
      return 1;
    }
    return 0;
  });
  let resultWord = resultArray[0].key;
  return resultWord;
}

function setResult() {
  var resultPoint = calResult();
  const resultName = document.querySelector('.result__name');
  const resultDesc = document.querySelector('.result__desc');

  resultName.innerHTML = infoList[resultPoint].name;
  resultDesc.innerHTML = infoList[resultPoint].desc;

  const imgWrap = document.querySelector('#resultImg');
  var resultImg = document.createElement('img');
  resultImg.classList.add('img-fluid');

  resultImg.src = `./img/image-${resultPoint}.png`;
  resultImg.alt = resultPoint;
  imgWrap.appendChild(resultImg);
}

// result 효과
function mbtiResult() {
  qna.style.webkitAnimation = 'fadeOut 1s';
  qna.style.animation = 'fadeOut 1s';
  setTimeout(() => {
    result.style.webkitAnimation = 'fadeIn 1s';
    result.style.animation = 'fadeIn 1s';
    setTimeout(() => {
      qna.style.display = 'none';
      result.style.display = 'block';
    }, 450);
  }, 450);
  setResult();
}

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
  if (questionIdx === endPoint) {
    mbtiResult();
    return;
  }

  var question = document.querySelector('.qBox');
  question.innerHTML = qnaList[questionIdx].q;

  for (let i in qnaList[questionIdx].a) {
    nextAnswer(qnaList[questionIdx].a[i].answer, questionIdx, i);
  }

  var prograssBar = document.querySelector('.progressbar');
  prograssBar.style.width = (100 / endPoint) * (questionIdx + 1) + '%';
}

// answer
function nextAnswer(answerText, questionIdx, idx) {
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
      saveSelect[questionIdx] = idx;
      for (let i = 0; i < answerList.length; i++) {
        answerList[i].style.display = 'none';
      }
      nextQuestion(++questionIdx);
    });
  });
}
