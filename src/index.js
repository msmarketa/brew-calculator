const coffeeBeans = document.getElementById("coffee-beans");
const water = document.getElementById("water");
const ratio = document.getElementById("ratio");
const coffeeYield = document.getElementById("coffee-yield");

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

coffeeBeans.addEventListener("input", () => {
  if (!lastInputs[0] === coffeeBeans) {
    lastInputs.unshift(coffeeBeans);
    lastInputs.pop();
  }

  if (lastInputs.includes(water)) {
    ratio.value = roundNum(water.value / coffeeBeans.value);
    countCoffeeYield();
    console.log('beans + water');
  } else if (lastInputs.includes(ratio)) {
    water.value = roundNum(coffeeBeans.value * ratio.value);
    countCoffeeYield();
    console.log('beans + ratio');
  } else {
    water.value = roundNum(coffeeBeans.value * ratio.value);
    ratio.value = roundNum(water.value / coffeeBeans.value);
    console.log('beans + yield');
  }

  checkValidity();
});

water.addEventListener("input", () => {
  if (!lastInputs[0] === water) {
    lastInputs.unshift(water);
    lastInputs.pop();
  }

  if (lastInputs.includes(coffeeBeans)) {
    ratio.value = roundNum(water.value / coffeeBeans.value);
    countCoffeeYield();
  } else if (lastInputs.includes(ratio)) {
    coffeeBeans.value = roundNum(water.value / ratio.value);
  } else {
    countCoffeeYield();
  }

  checkValidity();
});

ratio.addEventListener("input", () => {
  if (!lastInputs[0] === ratio) {
    lastInputs.unshift(ratio);
    lastInputs.pop();
  }

  if (lastInputs.includes(water)) {
    coffeeBeans.value = roundNum(water.value / ratio.value);
    countCoffeeYield();
  } else if (lastInputs.includes(coffeeYield)) {
    water.value = roundNum(coffeeBeans.value * ratio.value);
    coffeeBeans.value = roundNum(water.value / ratio.value);
  } else {
    water.value = roundNum(coffeeBeans.value * ratio.value);
    countCoffeeYield();
  }

  checkValidity();
});

coffeeYield.addEventListener("input", () => {
  if (!lastInputs[0] === coffeeYield) {
    lastInputs.unshift(coffeeYield);
    lastInputs.pop();
  }

  if (lastInputs.includes(ratio)) {
    coffeeBeans.value = roundNum(water.value / ratio.value);
    water.value = roundNum(coffeeYield.value / 0.9);
    console.log('yield + ratio');
  } else if (lastInputs.includes(coffeeBeans)) {
    water.value = roundNum(coffeeYield.value / 0.9);
    ratio.value = roundNum(water.value / coffeeBeans.value);
    console.log('yield + beans');
  } else {
    water.value = roundNum(coffeeYield.value / 0.9);
    console.log('yield + water');
  }

  checkValidity();
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
  checkValidity();
});

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

resetTimer();
