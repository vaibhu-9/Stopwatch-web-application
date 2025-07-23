let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
const timerDisplay = document.querySelector('.timer');
const lapsList = document.getElementById('lapsList');
const startPauseBtn = document.getElementById('startPause');

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const centiseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
  return `${minutes}:${seconds}.${centiseconds}`;
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  timerDisplay.textContent = formatTime(elapsedTime);
}

document.getElementById('startPause').addEventListener('click', () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startPauseBtn.textContent = 'Pause';
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    startPauseBtn.textContent = 'Start';
    isRunning = false;
  }
});

document.getElementById('reset').addEventListener('click', () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  timerDisplay.textContent = '00:00.00';
  startPauseBtn.textContent = 'Start';
  lapsList.innerHTML = '';
});

document.getElementById('lap').addEventListener('click', () => {
  if (isRunning) {
    const li = document.createElement('li');
    li.textContent = `Lap ${lapsList.children.length + 1}: ${formatTime(elapsedTime)}`;
    lapsList.appendChild(li);
  }
});