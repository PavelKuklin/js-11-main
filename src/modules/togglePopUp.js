const togglePopUp = () => {

    const popupContent = document.querySelector('.popup-content'),
        service = document.querySelector('.service'),
        popup = document.querySelector('.popup');

    function cancelPopup() {
        const successImage = document.querySelector('.statusForm');
        if (successImage) {
            successImage.remove();
        }
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
            if (window.innerWidth > 768) {
                requestAnimationFrame(function step(curtime) {
                    let progress = (curtime - timeStart) / 1000;
                    popupContent.style.cssText = `top:${Math.floor(fromY + (popupVertyPosition * progress))}px; left: ${Math.floor(fromX + popupGorizOisition * progress)}px`
                    if (1 > progress) requestAnimationFrame(step);
                });
            }
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

export default togglePopUp;