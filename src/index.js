const coffeeBeans = document.getElementById("coffee-beans");
const water = document.getElementById("water");
const ratio = document.getElementById("ratio");
const coffeeYield = document.getElementById("coffee-yield");

const allInputs = [coffeeBeans, water, ratio, coffeeYield];
let lastInputs = [coffeeBeans, water];

coffeeBeans.value = 8;
water.value = 128;
ratio.value = 16;
coffeeYield.value = water.value * 0.9;

function checkValidity() {
  const elements = [coffeeBeans, water, ratio, coffeeYield, timer];
  elements.forEach((element) => {
    if (element.value >= 1) {
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
    } else {
      element.classList.add("is-invalid");
      element.classList.remove("is-valid");
    }
  });
}

function roundNum(num) {
  return Math.round(num * 10) / 10;
}

function countCoffeeYield() {
  coffeeYield.value = roundNum(water.value * 0.9);
}

allInputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    if (lastInputs[0] != e.target) {
      lastInputs.unshift(e.target);
      lastInputs.pop();
    }

    if (lastInputs.includes(coffeeBeans)) {
      if (lastInputs.includes(water)) {
        ratio.value = roundNum(water.value / coffeeBeans.value);
        countCoffeeYield();
      } else if (lastInputs.includes(ratio)) {
        water.value = roundNum(coffeeBeans.value * ratio.value);
        countCoffeeYield();
      } else {
        ratio.value = roundNum(water.value / coffeeBeans.value);
        water.value = roundNum(coffeeYield.value / 0.9);
      } 
    } else if (lastInputs.includes(water)) {
      if (lastInputs.includes(ratio)) {
        coffeeBeans.value = roundNum(water.value / ratio.value);
        countCoffeeYield();
      } else if (lastInputs[0] === coffeeYield) {
        water.value = roundNum(coffeeYield.value / 0.9);
      } else  {
        countCoffeeYield();
      }
    } else {
      water.value = roundNum(coffeeYield.value / 0.9);
      coffeeBeans.value = roundNum(water.value / ratio.value);
    }

    checkValidity();
  })
})

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
  checkValidity();
});

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

resetTimer();
