const getDomContent = (element) => {
    console.log(`Element: ${element.tagName}, ${element.textContent}`)

    // Рекурсивно обходим дочерние элементы, если они есть
    if (element.children.length > 0) {
        getDomContent(element.children[0]);
    }

    // Рекурсивно обходим следующий соседний элемент, если он есть
    if (element.nextElementSibling) {
        getDomContent(element.nextElementSibling);
    }
}

const startApp = () => {
    const element = document.body;

    getDomContent(element);
}

document.addEventListener('DOMContentLoaded', startApp);
