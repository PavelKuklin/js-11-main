class Validator {
    constructor({ selector, pattern, method }) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
                item.type !== 'button'
        });
        this.error = new Set();
    }

    init() {
        this.applyStyle();
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
    }

    isValid(elem) {
        return false;
    }

    checkIt(event) {
        const target = event.target;
        console.log(target);

        if (this.isValid(target)) {
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.showError(target);
            this.error.add(target);
        }
        console.log(this.error);

    }

    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        console.log(elem.nextElementSibling);

        if (elem.nextElementSibling !== null &&
            elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }

        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem) {
        console.log(elem);

        elem.classList.remove('error');
        elem.classList.add('success');

        if (elem.nextElementSibling !== null &&
            elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
        input.success{
            border: 2px solid green;
        }
        input.error{
            border: 2px solid red;
        }
        .validator-error{
            font-size: 10px;
            font-family: sans-serif;
            color: red;
        }
        `;
        document.head.append(style);
    }
}