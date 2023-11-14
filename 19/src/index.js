import './scss/styles.scss';

const initLocalStorage = () => { // инизиализируем локалсторейдж
    if (!localStorage.getItem('posts')) { // если постов нету, то создаем локалсторейдж
        localStorage.setItem('posts', JSON.stringify([]));
        localStorage.setItem('lastOffset', JSON.stringify(0));
        localStorage.setItem('publicId', JSON.stringify(null))
    }

    if (JSON.parse(localStorage.getItem('publicId')) !== null) { // если пабликId !== null то фетчим посты
        fetchPosts();
    }

    if (JSON.parse(localStorage.getItem('posts')).length > 0) { // если длина постов > 0 то отрисовываем их
        const cards = JSON.parse(localStorage.getItem('posts'));
        cards.forEach((data) => {
            const [card, response] = preparedCard(data);
            addCardToContainer(card);
        });
    }
}

const isContainerScrolled = () => {
    const widgetContainer = document.querySelector('.widget__container');
    // Получаем высоту видимой области контейнера
    const containerHeight = widgetContainer.clientHeight;

    // Получаем вертикальное смещение контейнера относительно его самого верха
    const containerOffset = widgetContainer.scrollTop;

    // Получаем полную высоту контейнера
    const containerFullHeight = widgetContainer.scrollHeight;

    // Проверяем, долистали ли до конца контейнера
    console.log(containerHeight + containerOffset, containerFullHeight)
    return containerHeight + containerOffset + 1 >= containerFullHeight;
}

const scrolledContainerHandler = () => { // если скроллится до конца контейнера идет следующий запрос
    if (isContainerScrolled()) {
        fetchPosts()
    }
}

// Получаем карточки с помощью протокола JSONP
const fetchPosts = () => {
    const accessToken = 'свой аккес токен';
    const postsLimit = 10;
    const offset = JSON.parse(localStorage.getItem('lastOffset'));
    const ownerId = JSON.parse(localStorage.getItem('publicId'));

    const url = `https://api.vk.com/method/wall.get?owner_id=-${ownerId}&offset=${Number(offset)}&count=${postsLimit}&access_token=${accessToken}&v=5.154&callback=handleJSONPResponse`;

    scriptJSONP(url);

    window.handleJSONPResponse = function(response) { // получаем ответ и идем отрисовывать карточки
        response.response.items.forEach((item) => {
            const [card, data] = preparedCard(item);
            setPostToLocalStorage(data); // добавляем посты в локалсторейдж
            addCardToContainer(card); // добавляем карточки в контейнер
        })
        setOffsetLocalStorage(Number(offset) + 10);
    }
}

const scriptJSONP = (url) => { // создаем скрипт и добавляем в шапку
    const script = document.createElement('script');
    script.src = url;

    document.getElementsByTagName("head")[0].appendChild(script);
}


// удаляем первые 10 элементов из html
const containerDeleteItems = () => {
    const container = document.querySelector('.widget__container');
    for (let i = 0; i < 10; i++) {
        if (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
}


// Подгружаем карточки в локалсторейдж, так же ограничиваем максимальную вместимость его до 100 элементов.
const setPostToLocalStorage = (newValue) => {
    const maxSize = 100;
    let prevValue = JSON.parse(localStorage.getItem('posts'));

    if (prevValue.length >= maxSize) {
        prevValue = prevValue.slice(10); // удаляем первые 10 элементов
        containerDeleteItems() // удаляем первые 10 элементов из html
    }

    localStorage.setItem('posts', JSON.stringify([...prevValue, newValue]));
}

const setPublicId = (id) => {
    localStorage.setItem('publicId', JSON.stringify(id));
}

// Меняем оффсет чтобы листать паблик и грузить следующие посты
const setOffsetLocalStorage = (newValue) => {
    localStorage.setItem('lastOffset', JSON.stringify(newValue));
}


// Подготавливаем карточку
const preparedCard = (data) => {
    console.log(data)
    const template = document.querySelector('#widget-card').content;
    const clonedTemplate = template.cloneNode(true);
    const link = clonedTemplate.querySelector('#link');
    const img = clonedTemplate.querySelector('.card-img');
    const text = clonedTemplate.querySelector('.card-text');
    const likesCount = clonedTemplate.querySelector('#likes').innerText = data.likes.count;
    const commentsCount = clonedTemplate.querySelector('#comments').innerText = data.comments.count;
    const repostsCount = clonedTemplate.querySelector('#reposts').innerText = data.reposts.count;
    const viewsCount = clonedTemplate.querySelector('#views').innerText = data.views.count;

    if (data.text) {
        text.style.display = 'block';
        text.innerText = data.text;
    }

    if (data?.attachments[0]?.type === 'photo') {
        img.style.display = 'block';
        img.src = data.attachments[0].photo.sizes[data.attachments[0].photo.sizes.length - 1].url;
        link.href = `https://vk.com/igm?z=photo${data['owner_id']}_${data.attachments[0].photo.id}`
    }

    return [clonedTemplate, data];
}

// Добавляем карточку в контейнер
const addCardToContainer = (card) => {
    console.log(card)
    const container = document.querySelector('.widget__container');
    container.append(card);
}


// удаляем все карточки
const deleteAllCards = () => {
    const container = document.querySelector('.widget__container');
    const cards = Array.from(container.querySelectorAll('#link'));

    cards.forEach((card) => container.removeChild(card));
}

// отрабатываем нажатие на кнопку запустить виджет
const inputButtonHandler = () => {
    const inputValue = document.querySelector('#input-value').value

    if (inputValue.length > 0) {
        setPublicId(inputValue);
        deleteAllCards();
        localStorage.setItem('posts', JSON.stringify([]));
        localStorage.setItem('lastOffset', JSON.stringify(0));
        fetchPosts();
    }
}


// запускаем всю логику
const startApp = () => {
    initLocalStorage(); // Инициализируем localStorage для кеширования
    document.querySelector('.widget__container').addEventListener('scroll', scrolledContainerHandler); // Проверяем скролл до конца контейнера
    document.querySelector('.input-button').addEventListener('click', inputButtonHandler);
}

startApp();
