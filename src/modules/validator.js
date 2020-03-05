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

export default validForm;