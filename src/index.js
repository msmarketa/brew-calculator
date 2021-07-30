let coffeeBeans = document.getElementById("coffee-beans");
let water = document.getElementById("water");
let ratio = document.getElementById("ratio");
let coffeeYield = document.getElementById("coffee-yield");

coffeeBeans.value = 8;
water.value = 128;
ratio.value = 16;
coffeeYield.value = water.value * 0.9;

function countCoffeeYield() {
  coffeeYield.value = water.value * 0.9;
}

// TODO: all values must be > 0
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
  water.value = parseFloat(coffeeYield.value / 0.9).toFixed(1);
  coffeeBeans.value = parseFloat(water.value / ratio.value).toFixed(1);
}