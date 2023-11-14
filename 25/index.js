const body = document.querySelector('body');

const getRandomColor = () => {
    return 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
}

const getRandomSize = () => {
    return `${Math.floor(Math.random() * 555)}px`
}

const newElement = () => {
    const div = document.createElement('div');
    div.style.backgroundColor = getRandomColor();
    div.style.width = getRandomSize();
    div.style.height = getRandomSize();

    body.append(div);
}

document.addEventListener('DOMContentLoaded', () => {
    newElement();
})
