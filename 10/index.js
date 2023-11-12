class JsonStringify {
    objectToString(obj) {
        let result = '{';
        let keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            result += `"${keys[i]}":`;
            const value = obj[keys[i]];
            if (typeof value === 'object' && value !== null) {
                // Рекурсивно преобразуем вложенные объекты и массивы
                result += this.jsonStringify(value);
            } else if (typeof value === 'string') {
                // Если значение - строка, окружаем его кавычками
                result += `"${value}"`;
            } else {
                // В остальных случаях выводим значение как есть
                result += `${value}`;
            }
            if (i < keys.length - 1) {
                result += ', ';
            }
        }
        result += '}';
        return result;
    }

    isArray(value) {
        return Array.isArray(value);
    }

    jsonStringify(json) {
        if (typeof json === 'number' || typeof json === 'boolean' || json === null) { // Если json это number, boolean или null, возвращает его обратно в строке
            return `${json}`;
        }

        if (this.isArray(json)) { // Если json это массив
            const data = json.map((obj) => this.jsonStringify(obj)).join(','); // то мы возвращаем в data правильно конвертированные значение по отдельности
            return `[${data}]`; // собираем в строку и возвращаем
        } else if (typeof json === 'object') {
            return this.objectToString(json);
        } else if (typeof json === 'string') {
            return `"${json}"`;
        }

        return null;
    }
}
const jsonStringifier = new JsonStringify();

console.log(jsonStringifier.jsonStringify([{key: 123}, ["123", "123", "123"]]));
