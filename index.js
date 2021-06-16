let selectArray = document.querySelectorAll('.select');
let correctArray = document.querySelectorAll('.correct');
let wrongArray = document.querySelectorAll('.wrong');
let pageOneShowed = false;
let pageTwoShowed = false;

let correctedAudio = document.getElementById('correct');
let wrongAudio = document.getElementById('wrong');
let question1 = document.querySelector('.question1');
let question2 = document.querySelector('.question2');
let question3 = document.querySelector('.question3');
let question4 = document.querySelector('.question4');
let question5 = document.querySelector('.page2 .question1');

let question6 = document.querySelector('.page2 .question2');
let question7 = document.querySelector('.page2 .question3');
let question8 = document.querySelector('.page2 .question4');
let firstPageQuestions = [question1, question2, question3, question4];
let secondPageQuestions = [question5, question6, question7, question8];

let selectedMenu = null;
let index = 1;
let reload = document.getElementById('reload');
let unCheck = document.getElementById('uncheck');
let show = document.getElementById('show');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let box = document.getElementById('box');

checkIndex();
showSelectBox();
correctClick();
wrongClicked();
function checkDataSet(select) {
  if (
    select.dataset.choose ===
    select.parentNode.parentNode.parentNode.dataset.choose
  ) {
    return true;
  } else {
    return false;
  }
}

function correctClick() {
  correctArray.forEach((correct) => {
    correct.addEventListener('click', () => {
      let selectBox = correct.parentNode;
      let select = correct.parentNode.parentElement.lastElementChild;

      if (checkDataSet(correct)) {
        selectBox.classList.remove('visible');
        select.classList.add('correctAnswer');
        select.textContent = '✓';
        select.parentNode.parentNode.style.opacity = 0.6;
        correctedAudio.play();
      } else {
        wrongAudio.play();
      }
    });
  });
}
function wrongClicked() {
  wrongArray.forEach((wrong) => {
    wrong.addEventListener('click', () => {
      let select = wrong.parentNode.parentElement.lastElementChild;
      if (checkDataSet(wrong)) {
        select.textContent = 'X';
        select.classList.add('correctAnswer');
        correctedAudio.play();
        select.parentNode.parentNode.style.opacity = 0.6;

        return;
      }
      wrongAudio.play();
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
function checkIndex() {
  if (index === 1) {
    prev.classList.add('disabled');
    next.classList.remove('disabled');
  } else if (index === 2) {
    prev.classList.remove('disabled');
    next.classList.add('disabled');
  }
}

next.onclick = () => {
  index++;
  box.textContent = '2 of 2';
  checkIndex();
  checkShowStatus();
};
prev.onclick = () => {
  checkShowStatus();
  index--;

  box.textContent = '1 of 2';
  checkIndex();
  checkShowStatus();
};
show.onclick = () => {
  if (index === 1) {
    showCorrectAnswers(question1);
    showCorrectAnswers(question2);
    showCorrectAnswers(question3);
    showCorrectAnswers(question4);
  } else {
    showCorrectAnswers(question5);
    showCorrectAnswers(question6);
    showCorrectAnswers(question7);
    showCorrectAnswers(question8);
  }
};

function showCorrectAnswers(question) {
  let select = question.lastElementChild.lastElementChild;
  checkShowStatus();
  select.classList.add('correctAnswer');
  if (index === 1) {
    pageOneShowed = true;
  } else {
    pageTwoShowed = true;
  }
  if (question.dataset.choose === 'wrong') {
    select.textContent = 'X';

    question.style.opacity = 0.6;
  } else {
    select.textContent = '✓';
    question.style.opacity = 0.6;
  }
}
function checkShowStatus() {
  if (index === 1) {
    if (pageOneShowed) {
      show.classList.add('disabled');
    } else {
      show.classList = '';
    }
  } else if (index === 2) {
    if (pageTwoShowed) {
      show.classList.add('disabled');
    } else {
      show.classList = '';
    }
  }
}

function resetValue() {
  if (index === 1) {
    firstPageQuestions.forEach((question) => {
      let select = question.lastElementChild.lastElementChild;
      select.parentElement.parentElement.style.opacity = 1;
      select.classList.remove('correctAnswer');
      select.textContent = '';
      pageOneShowed = false;
      checkShowStatus();
    });
  } else if (index === 2) {
    secondPageQuestions.forEach((question) => {
      let select = question.lastElementChild.lastElementChild;
      select.parentElement.parentElement.style.opacity = 1;

      select.classList.remove('correctAnswer');
      select.textContent = '';
      pageTwoShowed = false;
    });
    checkShowStatus();
  }
}

unCheck.onclick = () => {
  resetValue();
};

reload.onclick = () => {
  firstPageQuestions.forEach((question) => {
    let select = question.lastElementChild.lastElementChild;
    select.parentElement.parentElement.style.opacity = 1;

    select.classList.remove('correctAnswer');
    select.textContent = '';
  });
  secondPageQuestions.forEach((question) => {
    let select = question.lastElementChild.lastElementChild;
    select.parentElement.parentElement.style.opacity = 1;

    select.classList.remove('correctAnswer');
    select.textContent = '';
  });
  pageTwoShowed = false;
  pageOneShowed = false;
  checkShowStatus();
};

window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loader').classList.add('hideLoader');
  }, 1000);
});
