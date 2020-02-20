'use strict'
const start = document.querySelector('.start'),
  reset = document.querySelector('.reset'),
  box = document.querySelector('.box');

let game = false,
  left = 100,
  gameAnimate = '';

let gaming = function () {
  if (game) {
    if (left < 1600) {
      gameAnimate = requestAnimationFrame(gaming);
      left = left + 10;
      box.style.left = `${left}px`;
    }
  } else {
    cancelAnimationFrame(gameAnimate);
  }
};

let startAnimations = function () {
  if (!game) {
    game = true
    gaming();
  } else {
    game = false;
    gaming();
  }
};

let resetGame = function () {
  game = false;
  gaming();
  left = 100;
  box.style.left = left + 'px';
};

start.addEventListener('click', startAnimations);
reset.addEventListener('click', resetGame);

let date = new Date();
let date2 = date.getDate() + 1;
let date3 = date;
date3 = date3.setDate(1);

console.log(Math.floor(date3));



// function welcome() {
//   const container = document.querySelector('.container');

//   let date = new Date();

//   function getTimeOfDay(date) {
//     let timeOfDay = date.getHours();

//     if (timeOfDay > 6 && timeOfDay < 12) {
//       return 'утро';
//     } else if (timeOfDay > 12 && timeOfDay < 18) {
//       return 'день';
//     } else if (timeOfDay > 18 && timeOfDay < 24) {
//       return 'вечер';
//     } else if (timeOfDay > 0 && timeOfDay < 6) {
//       return 'ночи';
//     }
//   }

//   function timeToDate(date) {
//     let currentDate = new Date().getTime(),
//       nextDate = new Date(date).getTime();

//     return Math.floor((nextDate - currentDate) / 1000 / 60 / 60 / 24);
//   }

//   function getWeeksDay(date) {
//     return date.toLocaleString('ru', {
//       'weekday': 'long',
//     })
//   }

//   container.innerHTML = `Добрый ${getTimeOfDay(date)} <br>
//   Сегодня: ${getWeeksDay(date)}<br>
//   Текущее время: ${date.toLocaleTimeString('en')}<br>
//   До нового года осталось ${timeToDate('31 december 2020')} дней
//   `;
// }

//welcome();





