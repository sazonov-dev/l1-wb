const sortContainer = document.querySelector('#sort');
const ascButtons = Array.from(sortContainer.querySelectorAll('#asc'));
const descButtons = Array.from(sortContainer.querySelectorAll('#desc'));

const postLimit = 50;
let launch = 1;
let launchData = {}

// Функция сортировки по возрастанию
const sortByAsc = (data, key) => {
    const sortedData = data.sort((a, b) => {
        if (a[key] > b[key]) {
            return 1;
        }
        if (b[key] > a[key]) {
            return -1;
        }

        return 0;
    });
    launchData = {...launchData, [launch]: sortedData}; // сохраняем новые отсортированные данные текущей страницы
    cardHandler(sortedData)
}

// Функция сортировки по убыванию
const sortByDesc = (data, key) => {
    const sortedData = data.sort((a, b) => {
        if (a[key] < b[key]) {
            return 1;
        }

        if (a[key] > b[key]) {
            return -1;
        }

        return 0;
    })
    launchData = {...launchData, [launch]: sortedData}; // сохраняем новые отсортированные данные текущей страницы
    cardHandler(sortedData);
}

// Функция которая получает ключ по которому надо фильтровать (столбец)
const sortButtonHandler = (event, callback) => {
    const target = event.target;
    const sortId = target.closest('#sort-container').dataset.id;

    return callback(launchData[launch], sortId);
}


// Функция которая отрабатывает при нажатии предыдущая / следующая страница
const launchFunc = (type) => {
    let newValue;
    switch (type) {
        case "PREV":
            newValue = launch - 1;
            if (newValue < 1) { // Если страница номер 1, то мы ничего не делаем
                return null;
            } else {
                launch = newValue; // В другом случае перелистываем страницу
                if (!launchData[launch]) { // Если данных о странице нету то фетчим их
                    fetchData();
                } else { // Если данные есть то отрисовываем их
                    cardHandler(launchData[launch]);
                }
            }
            break;
        case "NEXT":
            newValue = launch + 1;
            launch = newValue;
            if (!launchData[launch]) {
                fetchData();
            } else {
                cardHandler(launchData[launch]);
            }
            break;
        default:
            console.log('Не известный type');
    }
}


// Функция которая делает запрос для получения данных
const fetchData = async () => {
    const response = await fetch(`http://www.filltext.com/?rows=${postLimit}&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true`);
    const data = await response.json();
    launchData = {...launchData, [launch]: data}; // сохраняем полученные данные для каждой страницы
    return cardHandler(data);
}


// Функция очистки контейнера
const cardSectionCleaner = () => {
    const container = document.querySelector('.grid');
    const allCards = Array.from(container.querySelectorAll('#card'));

    if (allCards.length === 0) {
        return null
    } else {
        allCards.forEach((card) => container.removeChild(card));
    }
}

// Функция добавление карточек в контейнер
const cardAdder = (cards) => {
    const container = document.querySelector('.grid');
    cardSectionCleaner();
    cards.forEach((card) => container.append(card));
}


// Функция которая обрабатывает дату из запроса и добавляет в контейнер карточки
const cardHandler = (data) => {
    const preparedCards = data.map((card) => {
        return preparedCard(card);
    })

    cardAdder(preparedCards);
}

// Функция которая возвращает готовый элемент карточки со всеми данными
const preparedCard = (data) => {
    const template = document.querySelector('#table-line').content;
    const clonedTemplate = template.cloneNode(true);
    const name = clonedTemplate.querySelector('#name').innerText = data.fname;
    const surname = clonedTemplate.querySelector('#surname').innerText = data.lname;
    const tel = clonedTemplate.querySelector('#tel').innerText = data.tel;
    const address = clonedTemplate.querySelector('#address').innerText = data.address;
    const city = clonedTemplate.querySelector('#city').innerText = data.city;
    const state = clonedTemplate.querySelector('#state').innerText = data.state;
    const zip = clonedTemplate.querySelector('#zip').innerText = data.zip;

    return clonedTemplate;
}

const startApp = () => {
    fetchData(); // При первом запуске фетчим первую страницу
    document.querySelector('#prev').addEventListener('click', () => launchFunc('PREV')); // Добавляем слушатель на кнопку предыдущий страницы
    document.querySelector('#next').addEventListener('click', () => launchFunc('NEXT')); // Добавляем слушатель на кнопку следующей страницы
    ascButtons.forEach((button) => button.addEventListener('click', (event) => sortButtonHandler(event, sortByAsc))); // Добавляем слушатель на кнопку сортировка столбца страницы по возрастанию
    descButtons.forEach((button) => button.addEventListener('click', (event) => sortButtonHandler(event, sortByDesc))); // Добавляем слушатель на кнопку сортировка столбца страницы по убыванию
}


document.addEventListener('DOMContentLoaded', startApp);
