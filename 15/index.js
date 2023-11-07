const getDataByUrl = async (url) => { // Функция которая делает запрос и возвращает данные
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json()
        }
    } catch (e) {
        console.log(e.message);
    }
}

const getData = async () => { // Функция которая отрабатывает все асинхронные функции
    try {
        const data = await getDataByUrl('https://randomuser.me/api/');
        console.log(data)
    } catch (e) {
        console.log(e.message)
    }
}

getData()
