const body = document.querySelector('body');

const newElement = () => {
    const template = document.querySelector('#card').content; // возвращает DocumentFragment объект, представляющий содержимое элемента, это содержимое включает в себя все узлы внутри элемента, такие как дочерние элементы, текстовые узлы и другие узлы.
    const clonedTemplate = template.cloneNode(true); // Клонируем содержимое шаблона для того, чтобы переиспользовать его несколько раз

    body.append(clonedTemplate); // добавляем элемент в боди
}

document.addEventListener('DOMContentLoaded', () => { // ждем когда загрузится весь дом
    newElement();
})
