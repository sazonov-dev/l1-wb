const input = document.querySelector('#input');


const error = (type) => {
    const errorElement = document.querySelector('#error');

    switch (type) {
        case "SYMBOL":
            errorElement.innerText = 'Добавьте символов, например: !?.<=-'
            errorElement.style.color = 'red'
            break;
        case "NUMBER":
            errorElement.innerText = 'Добавьте цифр, например: 1 2 3 4 5'
            errorElement.style.color = 'red'
            break;
        case "STRING":
            errorElement.innerText = 'Добавьте букв, например: a b c D E'
            errorElement.style.color = 'red'
            break;
        case "STRING_UPPER":
            errorElement.innerText = 'Добавьте заглавных букв: F D A E K'
            errorElement.style.color = 'red'
            break;
        case "LENGTH":
            errorElement.innerText = 'Минимальная длина пароля 9 символов.'
            errorElement.style.color = 'red'
            break;
        case "GOOD":
            errorElement.innerText = 'Пароль годится!'
            errorElement.style.color = 'green'
            break;
    }
}

const passwordChecker = (value) => {
    const symbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    const numbers = /\d/;
    const engSymbols = /[a-zA-Z]/;
    const engUpperSymbols = /[A-Z]/;

    if (value.length < 9) {
        error('LENGTH');
    }

    if (!symbols.test(value)) {
        error('SYMBOL');
    }

    if (!numbers.test(value)) {
        error('NUMBER');
    }

    if (!engSymbols.test(value)) {
        error('STRING');
    }

    if (!engUpperSymbols.test(value)) {
        error('STRING_UPPER');
    }

    if (value.length >= 9 && symbols.test(value) && numbers.test(value) && engSymbols.test(value) && engUpperSymbols.test(value)) {
        error('GOOD');
    }
}

const inputHandler = (event) => {
    const target = event.target;
    const value = target.value;

    passwordChecker(value);
}

const startApp = () => {
    input.addEventListener('input', inputHandler);
}

document.addEventListener('DOMContentLoaded', startApp);
