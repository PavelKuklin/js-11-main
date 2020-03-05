import animate from './animate';
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

export default toggleMenu;