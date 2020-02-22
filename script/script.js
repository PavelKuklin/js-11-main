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
  const toggleMenu = (event) => {


    const menu = document.querySelector('menu'),
      menuItems = menu.querySelectorAll('ul>li'),
      btnMenu = document.querySelector('.menu');

    const animate = (selector, time) => {
      let to = document.querySelector(selector),
        start = performance.now(),
        from = window.pageYOffset;
      to = to.getBoundingClientRect().top;
      requestAnimationFrame(function step(nowTime) {
        let progress = ((nowTime - start) / time);
        window.scrollTo(0, from + to * progress | 0);
        if (1 > progress) requestAnimationFrame(step);
      });
    };

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', (event) => {
      let target = event.target;
      if (target.closest('.menu')) {
        handlerMenu();
      }
    });

    menu.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('close-btn')) {
        handlerMenu();
      } else if (target.closest('LI>a')) {
        event.preventDefault();
        let targetAttribute = target.getAttribute('href');
        animate(targetAttribute, 1000);

      }
    });

  };

  //кнопка в шапке
  const getSecondSection = () => {
    const btnToSecondSection = document.querySelector('img[src="images/scroll.svg"]');

    const animate = (selector, time) => {
      let to = document.querySelector(selector),
        start = performance.now(),
        from = window.pageYOffset;
      to = to.getBoundingClientRect().top;
      requestAnimationFrame(function step(nowTime) {
        let progress = ((nowTime - start) / time);
        window.scrollTo(0, from + to * progress | 0);
        if (1 > progress) requestAnimationFrame(step);
      });
    };

    btnToSecondSection.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target.closest('a').getAttribute('href');
      animate(target, 1000);
    })

  };
  getSecondSection();

  toggleMenu();

  //popUP
  const togglePopUp = () => {

    const popupContent = document.querySelector('.popup-content'),
      service = document.querySelector('.service'),
      popup = document.querySelector('.popup');

    function cancelPopup() {
      popup.style.display = 'none';
      popupContent.style.cssText = `top = 0px; left = 0px`;
    }

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

      }

      popup.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('popup-close')) {
          cancelPopup();
        } else {
          target = target.closest('.popup-content');
          if (!target) cancelPopup();
        }

      });

    }

    service.addEventListener('click', anim);
  };

  togglePopUp();

  //tabs
  const tabs = () => {

    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (i === index) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');

        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, index) => {
          if (item === target) {
            toggleTabContent(index);
          }
        });
      }
    });
  };

  tabs();



});