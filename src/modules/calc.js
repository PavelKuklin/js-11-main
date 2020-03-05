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
        if (+calcSquare.value === 0 || +calcSquare.value === '') {
            countValue = 0;
            dayValue = 0;
            total = 0;
            totalValue.textContent = 0;
        }
        if (calcCount.value > 1) {
            countValue += (+calcCount.value - 1) / 10;
        }
        if (squareValue === 0 || !squareValue) {
            value = 0;
            totalValue.innerHTML = 0;
        }



        if (calcDay.value && calcDay.value > 0 && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10 && calcDay.value > 0) {
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

export default calc;