const coffeeBeans = document.getElementById("coffee-beans");
const water = document.getElementById("water");
const ratio = document.getElementById("ratio");
const coffeeYield = document.getElementById("coffee-yield");

coffeeBeans.value = 8;
water.value = 128;
ratio.value = 16;
coffeeYield.value = water.value * 0.9;

function countCoffeeYield() {
  coffeeYield.value = water.value * 0.9;
}

coffeeBeans.oninput = () => {
  water.value = coffeeBeans.value * ratio.value;
  countCoffeeYield();
};

water.oninput = () => {
  ratio.value = water.value / coffeeBeans.value;
  countCoffeeYield();
};

ratio.oninput = () => {
  water.value = coffeeBeans.value * ratio.value;
  countCoffeeYield();
};

coffeeYield.oninput = () => {
  water.value = Math.round(coffeeYield.value / 0.9 * 10 ) / 10;
  coffeeBeans.value = Math.round(water.value / ratio.value * 10 ) / 10;
}

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

timer.oninput = () => {
  const totalSec = timer.value * 60;
  countdown.value = `${Math.floor(totalSec / 60)}:${(totalSec % 60).toString().padStart(2, "0")}`;
}

// Kliknu na start
//   zavolam startTimer() ktery ma setInterval(decrementTimer, 1000)
//   decrementTimer meni countdown.value -- vterinu

function runTimer() {
  setInterval(() => {
    
    for (let minutes = timer.value; minutes >= 0; minutes--) {
      countdown.value = `${minutes}:00`;
    }
  }, 1000)
}

const startTimer = () => {
  console.log("Starting!");
  runTimer();
}

const stopTimer = () => {
  console.log("Stopping")
}

const resetTimer = () => {
  console.log("Resetting")
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
