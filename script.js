let timerInterval;
let timeLeft = 0;
let isFocusTime = true;
let isTimerRunning = false;

const displayElement = document.getElementById("display");
const minutesInput = document.getElementById("minutes");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");

//時間格式化
function formatTime(time) {
  const minutes = Math.floor(time / 60).toString().padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function startNextPhaseTimer() {
  if (!isTimerRunning) {
    if (isFocusTime) {
      timeLeft = 25 * 60; // 專注時間 25 分鐘
      document.title = "蕃茄專注鐘";
    } else {
      timeLeft = 5 * 60; // 放鬆時間 5 分鐘
      document.title = "蕃茄放鬆鐘";
    }
    isTimerRunning = true;
    timerInterval = setInterval(updateTimer, 1000);
    startButton.style.display = "none";
    pauseButton.style.display = "inline-block";
    resetButton.style.display = "inline-block";
    pauseButton.textContent = '暫停';
  }
}

function updateRelaxTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    clearInterval(timerInterval);
    isTimerRunning = false;
    pauseButton.style.display = 'none'; // 放鬆計時結束時隱藏暫停按鈕
    startButton.style.display = 'inline-block'; // 並顯示開始按鈕
  }
}

//暫停&回復計時
function pauseTimer() {
  if (isTimerRunning) {
    clearInterval(timerInterval);
    isTimerRunning = false;
    pauseButton.textContent = "恢復";
  } else {
    timerInterval = setInterval(updateTimer, 1000);
    isTimerRunning = true;
    pauseButton.textContent = "暫停";
  }
}

// 11. 設定計時結束後自動進行放鬆計時
function endTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  timeLeft = 0;
  updateDisplay();

  if (isFocusTime) {
    alert("放鬆時間到！");
    isFocusTime = false; // 如果是專注時間結束，則進入放鬆時間
    document.title = "蕃茄放鬆鐘";
  } else {
    alert("專注時間到！");
    isFocusTime = true; // 如果是放鬆時間結束，則進入專注時間
    document.title = "蕃茄專注鐘";
  }

  startNextPhaseTimer(); // 開始下一個階段的計時器
}

//結束計時並且重置
function resetTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  timeLeft = 0;
  minutesInput.value = "25";
  updateDisplay();
  startButton.style.display = "inline-block";
  pauseButton.style.display = "none";
  resetButton.style.display = "none";
  pauseButton.textContent = "暫停";
}

//更新計時
function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    clearInterval(timerInterval);
    isTimerRunning = false;
    startButton.style.display = "inline-block";
    pauseButton.style.display = "none";
    resetButton.style.display = "none";
    pauseButton.textContent = "暫停";
  }
}

//更新顯示
function updateDisplay() {
  displayElement.textContent = formatTime(timeLeft);
}

//輸入專注時間(未啟用)
function validateInput() {
  const minutes = parseInt(minutesInput.value);
  if (isNaN(minutes) || minutes < 1 || minutes > 60) {
    alert("請輸入有效的分鐘數（1到60之間的數字）！");
    return false;
  }
  return true;
}

startButton.addEventListener("click", startNextPhaseTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", endTimer);
