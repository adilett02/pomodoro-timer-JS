'use strict';
// window.onbeforeunload = function (e) {
//   var dialogText = 'Dialog text here';
//   e.returnValue = dialogText;
//   return dialogText;
// };

let title = document.querySelector('#title');
let minuteSpan = document.querySelector('.minutes');
let secondSpan = document.querySelector('.seconds');
let bell = new Audio('fonts/bell.mp3');
//buttons
let startBtn = document.querySelector('.start');
let pauseBtn = document.querySelector('.pause');
let continueBtn = document.querySelector('.continue');
let stopBtn = document.querySelector('.stop');
//settings
let closeModal = document.querySelector('#close-btn');
let openModal = document.querySelector('.settings');
let saveBtn = document.querySelector('#save-settings');
let pomodoroInput = document.querySelector('#pomodoro-input');
let shortBreakInput = document.querySelector('#short-break');
let longBreakInput = document.querySelector('#long-break');
let betweenBreakInput = document.querySelector('#between-break');
//variables
let minutes = minuteSpan.innerHTML;
let seconds = secondSpan.innerHTML;
let workTime = 25;
let shortBreakTime = 5;
let longBreakTime = 15;
let betweenTime = 4;
let workCounter = 0;
let timer = undefined;
let progressDuration = workTime * 60;
let status = 'work time';
// progress bar
let i = 1;
let k = (i / progressDuration) * 100;
let l = 100 - k;

pomodoroInput.value = workTime;
shortBreakInput.value = shortBreakTime;
longBreakInput.value = longBreakTime;
betweenBreakInput.value = betweenTime;

//pomodoro timer
let pomodoroTimer = () => {
  if (seconds == 0 && minutes == 0) {
    bell.play();
    if (document.querySelector('.wrapper').classList.contains('relax')) {
      document.querySelector('.wrapper').classList.toggle('relax');
      minutes = workTime;
      minuteSpan.innerHTML = minutes;
      workCounter++;
      progressDuration = workTime * 60;
      status = 'work time';
    } else if (workCounter == betweenTime) {
      document.querySelector('.wrapper').classList.toggle('relax');
      minutes = longBreakTime;
      minuteSpan.innerHTML = minutes;
      workCounter = 0;
      progressDuration = longBreakTime * 60;
      status = 'break time';
    } else {
      document.querySelector('.wrapper').classList.toggle('relax');
      minutes = shortBreakTime;
      minuteSpan.innerHTML = minutes;
      progressDuration = shortBreakTime * 60;
      status = 'break time';
    }
  }
  if (seconds == 0) {
    seconds = 60;
    minutes = minutes - 1;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    minuteSpan.innerHTML = minutes;
  }
  progressBar();
  seconds = seconds - 1;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  secondSpan.innerHTML = seconds;
  title.innerHTML = `${status} ${minutes}:${seconds}`;
};

//stop timer
let stopTimer = () => {
  clearInterval(timer);
  seconds = 0;
  minutes = workTime;
  secondSpan.innerHTML = '00';
  minuteSpan.innerHTML = workTime < 10 ? `0${workTime}` : workTime;
  workCounter = 0;
  pauseBtn.classList.add('d-none');
  continueBtn.classList.add('d-none');
  stopBtn.classList.add('d-none');
  startBtn.classList.remove('d-none');
  document.querySelector('.wrapper').classList.remove('relax');
  document.getElementById('c1').style.strokeDasharray = [100, 0];
  document.getElementById('c2').style.strokeDasharray = [0, 100];
  i = 1;
  k = (i / progressDuration) * 100;
  l = 100 - k;
  title.innerHTML = `Pomodoro-Timer`;
};

//progress bar function
let progressBar = () => {
  let time = progressDuration - 1;
  if (i > time) {
    document.getElementById('c1').style.strokeDasharray = [100, 0];
    document.getElementById('c2').style.strokeDasharray = [0, 100];
    i = 1;
    k = (i / progressDuration) * 100;
    l = 100 - k;
    return;
  }
  k = (i / time) * 100;
  l = 100 - k;
  document.getElementById('c1').style.strokeDasharray = [l, k];
  document.getElementById('c2').style.strokeDasharray = [k, l];
  document.getElementById('c1').style.strokeDashoffset = l;
  i++;
};

// validation
let validationCheck = () => {
  if (
    Number(pomodoroInput.value) <= 99 &&
    Number(pomodoroInput.value) > 0 &&
    Number(shortBreakInput.value) <= 30 &&
    Number(shortBreakInput.value) > 0 &&
    Number(longBreakInput.value) <= 50 &&
    Number(longBreakInput.value) > 0 &&
    Number(betweenBreakInput.value) <= 10 &&
    Number(betweenBreakInput.value) > 0
  ) {
    return true;
  } else {
    alert('Правильно заполните поля!');
  }
};

// onBtn click functions
closeModal.onclick = (e) => {
  e.preventDefault();
  document.querySelector('.modal').classList.toggle('d-none');
  pomodoroInput.value = workTime;
  shortBreakInput.value = shortBreakTime;
  longBreakInput.value = longBreakTime;
  betweenBreakInput.value = betweenTime;
};
openModal.onclick = (e) => {
  e.preventDefault();
  document.querySelector('.modal').classList.toggle('d-none');
};
saveBtn.onclick = (e) => {
  e.preventDefault();
  if (validationCheck()) {
    document.querySelector('.modal').classList.toggle('d-none');
    minuteSpan.innerHTML =
      pomodoroInput.value < 10 ? `0${pomodoroInput.value}` : pomodoroInput.value;
    workTime = pomodoroInput.value;
    shortBreakTime = shortBreakInput.value;
    longBreakTime = longBreakInput.value;
    betweenTime = betweenBreakInput.value;
    stopTimer();
  }
};

startBtn.onclick = () => {
  timer = setInterval(pomodoroTimer, 1000);
  workCounter++;
  startBtn.classList.add('d-none');
  pauseBtn.classList.remove('d-none');
  progressDuration = workTime * 60;
  bell.play();
};
pauseBtn.addEventListener('click', function () {
  clearInterval(timer);
  pauseBtn.classList.add('d-none');
  continueBtn.classList.remove('d-none');
  stopBtn.classList.remove('d-none');
});
continueBtn.addEventListener('click', function () {
  timer = setInterval(pomodoroTimer, 1000);
  pauseBtn.classList.remove('d-none');
  continueBtn.classList.add('d-none');
  stopBtn.classList.add('d-none');
});
stopBtn.addEventListener('click', function () {
  stopTimer();
});
