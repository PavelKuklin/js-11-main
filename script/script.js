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

    countTimer('23 may 2020');

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
            btnMenu = document.querySelector('.menu'),
            body = document.querySelector('body');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        body.addEventListener('click', (event) => {
            let target = event.target;
            if (target.closest('.menu')) {
                handlerMenu();
            } else if (target.classList.contains('close-btn')) {
                handlerMenu();
            } else if (target.closest('LI>a')) {
                event.preventDefault();
                let targetAttribute = target.getAttribute('href');
                animate(targetAttribute, 1000);
                handlerMenu();
            } else if (menu.matches('.active-menu') && !target.closest('menu')) {
                handlerMenu();
            }
        })
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
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcInput = document.querySelectorAll('.calc-item'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (+calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
                if (total > 0) {
                    animateRes(+totalValue.textContent, Math.ceil(total));
                }
            }

            function animateTotal(draw, duration = 500) {
                let start = performance.now();
                requestAnimationFrame(function step(time) {
                    let progress = ((time - start) / duration);
                    if (progress > 1) progress = 1;
                    draw(progress);
                    if (progress < 1) requestAnimationFrame(step);
                });
            }

            function animateRes(start, total) {
                let from = start,
                    to = total;
                animateTotal((progress) => {
                    totalValue.textContent = Math.ceil((to - from) * progress + from);
                })
            }
        };


        calcBlock.addEventListener('change', (event) => {
            let target = event.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });

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

    calc(100);

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

    //send ajax form
    const sendForm = (selector) => {
        const errorMessage = `<img src='images/check.png'>`,
            loadMessage = `<img src='images/loader.png'>`,
            successMessage = `<img src='images/tick.png'>`;

        const form = document.getElementById(selector);

        const statusMessage = document.createElement('div');

        statusMessage.style.cssText = `font-size: 2rem; color: white;`;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            form.append(statusMessage);
            statusMessage.innerHTML = loadMessage;

            const formData = new FormData(form);
            let body = {};
            for (let val of formData.entries()) {
                body[val[0]] = val[1];
            }

            const postData = (body) => {
                return new Promise((reselve, reject) => {
                    const request = new XMLHttpRequest();
                    request.addEventListener('readystatechange', (event) => {
                        if (request.readyState !== 4) {
                            return;
                        }
                        if (request.status === 200) {
                            reselve();
                        } else {
                            reject(request.status);
                        }
                    });

                    request.open('POST', './server.php');
                    request.setRequestHeader('Content-Type', 'application/json');
                    request.send(JSON.stringify(body));
                });
            };

            postData(body).then(() => {
                statusMessage.innerHTML = successMessage;
            }).catch(() => {
                statusMessage.innerHTML = errorMessage;
            }).finally(() => {
                form.reset();
            });
        });
    };

    sendForm('form1');
    sendForm('form2');
    sendForm('form3');

    //валидатор
    const validForm = (selector) => {
        const form = document.getElementById(selector);
        form.addEventListener('keypress', (event) => {
            let target = event.target;

            if (target.getAttribute('name') === 'user_phone') {
                event.preventDefault();
                let reg = /^[0-9+]+$/i;
                if (reg.test(event.key)) {
                    target.value += event.key;
                }
            }

            if (target.getAttribute('name') === 'user_name' || target.getAttribute('name') === 'user_message') {
                event.preventDefault();
                let reg = /^[а-яё ]+$/i;
                if (reg.test(event.key)) {
                    target.value += event.key;
                }
            }

        });
    }

    validForm('form1');
    validForm('form2');
    validForm('form3');
});