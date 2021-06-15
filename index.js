let selectArray = document.querySelectorAll('.select');
let correctArray = document.querySelectorAll('.correct');
let wrongArray = document.querySelectorAll('.wrong');

let correctedAudio = document.getElementById('correct');
let wrongAudio = document.getElementById('wrong');
let selectedMenu = null;

showSelectBox();
correctClick();
wrongClicked();

function correctClick() {
  correctArray.forEach((correct) => {
    correct.addEventListener('click', () => {
      correctedAudio.play();
      let selectBox = correct.parentNode;
      let select = correct.parentNode.parentElement.lastElementChild;

      selectBox.classList.remove('visible');
      select.classList.add('correctAnswer');
      select.textContent = '✓';
      select.parentNode.parentNode.style.opacity = 0.6;
    });
  });
}
function wrongClicked() {
  wrongArray.forEach((wrong) => {
    wrong.addEventListener('click', () => {
      wrongAudio.play();
      let select = wrong.parentNode.parentElement.lastElementChild;
      select.textContent = 'X';
      select.style.borderColor = 'red';
      setTimeout(() => {
        select.textContent = '';
        select.style.borderColor = 'black';
      }, 500);
    });
  });
}

function selectIsClicked(select) {
  selectArray.forEach((select) => {
    if (select.previousElementSibling.classList.contains('visible')) {
      select.previousElementSibling.classList.remove('visible');
    }
  });
  select.previousElementSibling.classList.add('visible');
  selectedMenu = select;
}

function showSelectBox() {
  selectArray.forEach((select) => {
    select.addEventListener('click', selectIsClicked.bind(this, select));
  });
}

document.addEventListener('click', (event) => {
  if (selectedMenu) {
    var isClickInsideElement = selectedMenu.contains(event.target);
    if (!isClickInsideElement) {
      selectedMenu.previousElementSibling.classList.remove('visible');
    }
  }
});
