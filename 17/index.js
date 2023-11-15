const input = document.querySelector('#input');
const select = document.querySelector('#select');
const apiKey = 'b32991a5-5a00-41fc-b59a-1dfe0c524728';

// Функция которая отрабатывает при выполненом событии input'а, затем проверяет если длина value инпута больше 0, просит сделать запрос
const inputHandler = async (event) => {
    const target = event.target;
    const value = target.value;

    if (value.length > 0) {
        return await fetchGeo(value)
    }

    return null;
};

// Функция которая фечит данные по адресу и передает их для отрисовки
const fetchGeo = async (value) => {
    const query = new URLSearchParams({
        q: value,
        locale: 'ru',
        key: apiKey
    }).toString();

    const response = await fetch(
        `https://graphhopper.com/api/1/geocode?${query}`,
        {method: 'GET'}
    );

    const data = await response.json();

    selectUploader(data.hits);
}

// Функция которая очищает select от предыдущих option элементов
const optionCleaner = () => {
    const options = Array.from(select.querySelectorAll('option'));

    options.forEach((option) => {
        select.removeChild(option)
    })
}

// Функция которая принимает массив адресов и создает элементы option заполняя их и добавляя в select
const selectUploader = (array) => {
    optionCleaner();
    array.forEach((item) => {
        const option = document.createElement('option');
        option.innerText = `${item.country}, ${item.city}, ${item.street}, ${item.housenumber}, ${item.postcode}`;

        select.append(option);
    })
}

// Функция которая нужна для того, чтобы ограничить число выполнений переданной в нее функции
const debounce = (callback, interval = 0) => { // Принимаем функцию коллбек и интервал выполнения
    let prevTimeoutId; // Хранения ID таймаута, каждого последующего вызова для того чтобы можно было завершить выполнение функции через clearTimeout

    return (...args) => {
        clearTimeout(prevTimeoutId); // Удаляем из памяти предыдущий вызов
        prevTimeoutId = setTimeout(() => callback(...args), interval); // Аргументы мы передаем в нашу коллбек функцию
    }
}

// Функция, которая позволяет запускать переданный callback не чаще чем переданный интервал в нее
const throttle = (callback, interval) => { // Функция принимает функцию которую необходимо задержать и интервал времени
    let isThrottled = false;  // Отслеживание состояния задержки, по дефолту false, так как ничего не задерживается
    let savedArgs = null; // Переменная будет хранить аргументы последнего вызова throttleWrapper, если вызов произошел во время задержки
    let savedThis = null; // Переменная которая хранит состояние this последнего вызова throttleWrapper, если вызов произошел во время задержки

    return (...args) => {
        if (isThrottled) { // Проверка, активна ли в данный момент задержка. Если да, то сохраняются аргументы и контекст текущего вызова, и функция завершает свое выполнение, не выполняя callback.
            console.log('Сработала защита')
            savedArgs = args;
            savedThis = this;
            return;
        }

        callback.apply(this, args); // Вызов переданной функции callback с использованием текущих аргументов и контекста (this). Это происходит только в том случае, если задержка не активна.
        isThrottled = true; // Установка true статуса, чтобы предотвратить последующие вызовы callback до истечения интервала задержки.

        // Установка таймера с использованием setTimeout, который сбросит флаг задержки через указанный интервал времени (interval). Если были сохранены аргументы (savedArgs) во время задержки, то вызывается throttleWrapper с этими аргументами и сохраненным контекстом после истечения интервала. После этого savedArgs и savedThis устанавливаются в null, чтобы подготовиться к возможным будущим вызовам.
        setTimeout(() => {
            isThrottled = false;
            if (savedArgs) {
                callback.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, interval);
    }
}

const startApp = () => {
    input.addEventListener('change', throttle(debounce((event) => inputHandler(event), 3000), 3000));
};

document.addEventListener('DOMContentLoaded', startApp);
