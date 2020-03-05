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

export default team;