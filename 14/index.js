const imageParser = (url) => {
    return new Promise((resolve, reject) => { // возвращаем промис
        // используем arrayBuffer для того чтобы получить бинарные данные изображение
        return fetch(url).then((response) => response.arrayBuffer()).then((data) => { // из которого фетчим изображение и ресольвим его
            const array = new Uint8Array(data); // используем конструктор чтобы получить массив беззнаковых 8-битных целых чисел
            resolve(array); // ресольвим данные
        }).catch((error) => reject(error));
    })
}

imageParser('https://w.forfun.com/fetch/da/daf8eb568fea522f6701fb9c66378cdc.jpeg').then((data) => console.log(data)).catch((error) => console.log(error));
// из полученных данных можно вывести на страничку изображение или скачать его локально
