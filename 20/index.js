const getLocalStorageInfo = (maxSize) => {
    // Получаем все ключи из localStorage
    const keys = Object.keys(localStorage);

    // Считаем суммарный объем занимаемой памяти
    const currentUsage = keys.reduce((acc, key) => {
        // Размер ключа
        const keySize = key.length;

        // Размер значения
        const valueSize = localStorage.getItem(key).length;

        // Суммируем размер ключа и значения
        return acc + keySize + valueSize;
    }, 0);

    console.log(`Объем занимаемой памяти: ${currentUsage} байт / Максимальный размер хранилища: ${maxSize} байт`);
}

module.exports = {
    getLocalStorageInfo
}
