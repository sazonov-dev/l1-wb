const form = document.querySelector('form')
const body = document.querySelector('body');

const openModal = (name, surname, email) => {
    const template = document.querySelector('#modal').content;
    const clonedTemplate = template.cloneNode(true);

    clonedTemplate.querySelector('.name').innerText = `Ваше имя: ${name}`;
    clonedTemplate.querySelector('.surname').innerText = `Ваша фамилия: ${surname}`;
    clonedTemplate.querySelector('.email').innerText = `Ваша почта: ${email}`;

    body.append(clonedTemplate);
}

const formHandler = (event) => {
    event.preventDefault();
    const target = event.target;
    const name = target.querySelector('#name').value;
    const surname = target.querySelector('#surname').value;
    const email = target.querySelector('#email').value;

    console.log(name, surname, email)

    openModal(name, surname, email);
}

const startApp = () => {
    form.addEventListener('submit', formHandler)
}

document.addEventListener('DOMContentLoaded', startApp);
