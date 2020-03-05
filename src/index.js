'use strict';

import countTimer from './modules/countTimer';
import animate from './modules/animate';
import getSecondSection from './modules/getSecondSection';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import team from './modules/team';
import sendForm from './modules/sendForm';
import validForm from './modules/validator';

countTimer('23 may 2020');
getSecondSection();
toggleMenu();
togglePopUp();
tabs();
slider();
calc(100);
team();
sendForm('form1');
sendForm('form2');
sendForm('form3');
validForm('form1');
validForm('form2');
validForm('form3');