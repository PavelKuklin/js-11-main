window.addEventListener('DOMContentLoaded', function () {
  'use strict'

  //Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60).toString().padStart(2, "0"),
        minutes = Math.floor((timeRemaining / 60) % 60).toString().padStart(2, "0"),
        hours = Math.floor((timeRemaining / 60 / 60) % 24).toString().padStart(2, "0"),
        day = Math.floor(timeRemaining / 60 / 60 / 24).toString().padStart(2, "0");
      if (timeRemaining <= 0) {
        seconds = '00';
        hours = '00';
        minutes = '00';
      }

      return { timeRemaining, hours, minutes, seconds, };
    }

    function updateCloack() {
      let timer = getTimeRemaining()

      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
    }

    setInterval(updateCloack, 1000);
  }
  countTimer('23 february 2020')
});
