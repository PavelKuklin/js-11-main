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

  countTimer('23 february 2020');

  //меню
  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', () => {
      handlerMenu();

    });

    closeBtn.addEventListener('click', () => {
      handlerMenu();
    });

    menuItems.forEach(element => {
      element.addEventListener('click', handlerMenu)
    })
  };

  toggleMenu();

  //popUP
  const togglePopUp = () => {

    const popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close'),
      popupContent = document.querySelector('.popup-content'),
      body = document.querySelector('body'),
      popup = document.querySelector('.popup');

    function anim() {
      if (event.target.classList.contains('popup-btn')) {
        popup.style.display = 'inline-block';
        let windowHeight = document.documentElement.clientHeight,
          popupHeight = (popupContent.clientHeight),
          popupVertyPosition = (Math.floor((windowHeight - popupHeight) / 2)),
          windowWidth = document.documentElement.clientWidth,
          popupWidth = popupContent.clientWidth,
          popupGorizOisition = ((windowWidth - popupWidth) / 2 | 0),
          timeStart = performance.now(),
          fromX = 0,
          fromY = 0;
        popupContent.style.cssText = `top = ${fromX}px; left = ${fromY}px`;

        requestAnimationFrame(function step(curtime) {
          let progress = (curtime - timeStart) / 1000;
          popupContent.style.cssText = `top:${Math.floor(fromY + (popupVertyPosition * progress))}px; left: ${Math.floor(fromX + popupGorizOisition * progress)}px`
          if (1 > progress) requestAnimationFrame(step);
        });
      } else if (event.target === popupClose) {
        popup.style.display = 'none';
        popupContent.style.cssText = `top = 0px; left = 0px`;
      }

    }

    body.addEventListener('click', anim);
  };
  togglePopUp();

  //
});