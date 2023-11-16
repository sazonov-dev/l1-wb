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

    // 115314 максимальный обьем допустимых символов в кодировке UTF-8, в зависимости от символа он может занимать 1-4 байта, чтобы не прогадать указываем 4
    console.log(`Объем занимаемой памяти: ${currentUsage} байт / Максимальный размер хранилища: ${115314 * 4} байт`);
}

module.exports = {
    getLocalStorageInfo
}
