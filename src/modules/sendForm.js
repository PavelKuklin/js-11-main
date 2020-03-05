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
            return fetch('./server.php', {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

        };
        postData(body).then((resolve) => {
            if (resolve.status !== 200) {
                throw new Error('error');
            }
            statusMessage.innerHTML = successMessage;
        }).catch(() => {
            statusMessage.innerHTML = errorMessage;
        }).finally(() => {
            form.reset();
        });

    });
};

export default sendForm;