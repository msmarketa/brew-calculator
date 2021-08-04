const coffeeBeans = document.getElementById("coffee-beans");
const water = document.getElementById("water");
const ratio = document.getElementById("ratio");
const coffeeYield = document.getElementById("coffee-yield");

coffeeBeans.value = 8;
water.value = 128;
ratio.value = 16;
coffeeYield.value = water.value * 0.9;

function isValid() {
  const elements = [coffeeBeans, water, ratio, coffeeYield, timer];
  elements.forEach((element) => {
    if (element.value >= 1) {
      element.classList.add('is-valid');
      element.classList.remove('is-invalid');
    } else {
      element.classList.add('is-invalid');
      element.classList.remove('is-valid');
    }
  })
}

function countCoffeeYield() {
  coffeeYield.value = Math.round(water.value * 0.9 * 10) / 10;
}

coffeeBeans.addEventListener('input', () => {
  water.value = Math.round(coffeeBeans.value * ratio.value * 10) / 10;
  countCoffeeYield();
  isValid();
});

water.addEventListener('input', () => {
  ratio.value = Math.round(water.value / coffeeBeans.value / 10) * 10;
  countCoffeeYield();
  isValid();
});

ratio.addEventListener('input', () => {
  water.value = Math.round(coffeeBeans.value * ratio.value * 10) / 10;
  countCoffeeYield();
  isValid();
});

coffeeYield.addEventListener('input', () => {
  water.value = Math.round((coffeeYield.value / 0.9) * 10) / 10;
  coffeeBeans.value = Math.round((water.value / ratio.value) * 10) / 10;
  isValid();
});

///////////////////////////////////////////////////////////////
// TIMER
///////////////////////////////////////////////////////////////
const timer = document.getElementById("timer");
const countdown = document.getElementById("countdown");

const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");

timer.value = 10;
countdown.value = `${timer.value}:00`;

let totalSec, counterId;
let running = false;

function minsToSecs() {
  totalSec = timer.value * 60;
}

function updateValue() {
  countdown.value = `${Math.floor(totalSec / 60)}:${(totalSec % 60)
    .toString()
    .padStart(2, "0")}`;
}

function decreaseValue() {
  if (totalSec > 0) {
    totalSec--;
    updateValue();
  } else {
    stopTimer();
  }
}

function runTimer() {
  running = true;
  counterId = setInterval(decreaseValue, 1000);
}

const startTimer = () => {
  if (running === false) {
    runTimer();
  }
};

const stopTimer = () => {
  running = false;
  clearInterval(counterId);
};

const resetTimer = () => {
  stopTimer();
  minsToSecs();
  updateValue();
};

timer.addEventListener("input", () => {
  minsToSecs();
  updateValue();
  isValid();
});

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

resetTimer();
