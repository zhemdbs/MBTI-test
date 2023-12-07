const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const startBtn = document.querySelector('.btn__start');

startBtn.addEventListener('click', () => {
  begin();
});

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
  }, 450);
}
