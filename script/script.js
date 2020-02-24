/* eslint-disable indent */
'use strict'
window.addEventListener('DOMContentLoaded', () => {
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

  //анимация 
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

  //меню
  const toggleMenu = (event) => {

    const menu = document.querySelector('menu'),
      menuItems = menu.querySelectorAll('ul>li'),
      btnMenu = document.querySelector('.menu');

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
        handlerMenu();

      }
    });

  };

  //кнопка в шапке
  const getSecondSection = () => {
    const btnToSecondSection = document.querySelector('img[src="images/scroll.svg"]');

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

  //slider
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      btn = document.querySelectorAll('.portfolio-btn'),
      slider = document.querySelector('.portfolio-content'),
      portfolioDots = document.querySelector('.portfolio-dots');


    let currentSlide = 0,
      interval,
      dot = document.querySelectorAll('.dot');

    const getDots = () => {
      const dots = slide.length;

      for (let i = 0; i < dots; i++) {
        let newDots = document.createElement('li');
        newDots.classList.add('dot');
        portfolioDots.append(newDots);
      }

      dot = document.querySelectorAll('.dot');
      dot[0].classList.add('dot-active');
    };
    getDots();

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    }

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (target.matches('.portfolio-btn, .dot')) {
        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');

        if (target.matches('#arrow-right')) {
          currentSlide++;
        } else if (target.matches('#arrow-left')) {
          currentSlide--;
        } else if (target.matches('.dot')) {
          dot.forEach((item, index) => {
            if (item === target) {
              currentSlide = index;
            }
          });
        }
        if (currentSlide >= slide.length) {
          currentSlide = 0;
        }
        if (currentSlide < 0) {
          currentSlide = slide.length - 1;
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
      }

    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') ||
        event.target.matches('.dot')) {
        startSlide(1500);
      }
    });

    startSlide(1500);

  };

  slider();

  //калькулятор 
  const calc = () => {
    const calcBlock = document.querySelector('.calc-block'),
      calcInput = document.querySelectorAll('.calc-item');

    calcInput.forEach(item => {
      if (item.getAttribute('type' === 'number')) {
        item.addEventListener('keypress', () => {
          event.preventDefault();
          let currentValue = item.value;

          currentValue = currentValue.replace(/\d/, '');
          item.value = currentValue;
        });
      }
    });
  };

  calc();

  //наша команда.

  const team = () => {
    const comrad = document.querySelectorAll('.command__photo'),
      command = document.querySelector('.command');

    let targetSrc = '';

    command.addEventListener('mouseover', () => {
      const target = event.target;

      if (target.matches('.command__photo')) {
        targetSrc = target.getAttribute('src');
        target.src = target.dataset.img;
      }
    });

    command.addEventListener('mouseout', () => {
      const target = event.target;

      if (target.matches('.command__photo')) {
        target.src = targetSrc;
      }
    });

  };

  team();

});