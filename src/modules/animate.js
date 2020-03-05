export default function animate(selector, time) {
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