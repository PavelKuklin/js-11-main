import animate from './animate';
const getSecondSection = () => {
    const btnToSecondSection = document.querySelector('img[src="images/scroll.svg"]');

    btnToSecondSection.addEventListener('click', (event) => {
        if (window.innerWidth > 768) {
            event.preventDefault();

            let target = event.target.closest('a').getAttribute('href');
            animate(target, 1000);
        }

    })

};

export default getSecondSection;