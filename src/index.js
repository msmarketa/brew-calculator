let coffeeBeans = document.getElementById("coffee-beans");
let water = document.getElementById("water");
let ratio = document.getElementById("ratio");
let coffeeYield = document.getElementById("coffee-yield");

coffeeBeans.value = 8;
water.value = 128;
ratio.value = 16;
coffeeYield.value = water.value * 0.9;

coffeeBeans.oninput = (event) => {
  coffeeBeans.value = Number(event.target.value);

  water.value = coffeeBeans.value * ratio.value;
  coffeeYield.value = water.value * 0.9;
};

water.oninput = (event) => {
  water.value = Number(event.target.value);

  ratio.value = water.value / coffeeBeans.value;
  coffeeYield.value = water.value * 0.9;
};

ratio.oninput = (event) => {
  ratio.value = Number(event.target.value);

  water.value = coffeeBeans.value * ratio.value;
  coffeeYield.value = water.value * 0.9;
};
