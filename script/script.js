window.addEventListener('DOMContentLoaded', function () {
  'use strict'

  //Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds'),
      dateStop = new Date(deadline);

    function getNewDateStop(deadline) {
      let NewDateStop = new Date();
      NewDateStop.setDate(deadline.getDate() + 1);
      dateStop = NewDateStop.getTime();
      return dateStop;

    }

    function getTimeRemaining(deadline) {
      let dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60).toString().padStart(2, "0"),
        minutes = Math.floor((timeRemaining / 60) % 60).toString().padStart(2, "0"),
        hours = Math.floor((timeRemaining / 60 / 60) % 24).toString().padStart(2, "0"),
        day = Math.floor(timeRemaining / 60 / 60 / 24).toString().padStart(2, "0");
      if (timeRemaining <= 0) {
        hours = '00';
        minutes = '00';
        seconds = '00';
        getNewDateStop(dateStop)
        getTimeRemaining();
      }

      return { timeRemaining, hours, minutes, seconds, };
    }


    function updateCloack(deadline) {
      let timer = getTimeRemaining()

      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
    }

    setInterval(updateCloack, 1000);
  }

  countTimer('21 february 2020 11:30:30');

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
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close'),
      popupContent = document.querySelector('.popup-content')
    let top = 10;
    //анимация popup
    const popupAnimation = () => {
      if (document.documentElement.clientWidth > 768) {
        if (top < 35) {
          top++;
          popupContent.style.cssText = `top: ${top}%;`
          requestAnimationFrame(popupAnimation);
        } else {
          cancelAnimationFrame(popupAnimation);
          top = 10;
        }
      }
    };
    popupBtn.forEach(item => {
      item.addEventListener('click', () => {
        popup.style.display = 'block';
        popupAnimation();

      });
    });

    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';

    });
  };

  togglePopUp();
});