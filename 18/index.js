// 115314 символов доступно для записи в Google Chrome браузер
// Для этого необходимо использовать функцию localStorageUploader до краша index.html страницы
// После этого использовать функцию getLocalStorageSize, для того чтобы получить кол-во символов возможное для записи в локалсторейдж

const localStorageUploader = () => {
    let key = ''

    while (true) {
        key += 'a'
        localStorage.setItem('value', key)
    }
}

const getLocalStorageSize = () => {
    return localStorage.getItem('value').length
}

