const getWordEnding = (number, words) => {
    if (number % 10 === 1 && number % 100 !== 11) { // Если число оканчивается на 1, но не на 11
        return `${number} ${words[0]}`;
    }

    if (number % 10 >= 2 && number % 10 <= 4){ // Если число оканчивается от 2 до 4
        return `${number} ${words[1]}`
    }

    return `${number} ${words[2]}`; // В любом другом случае
}

module.exports = getWordEnding;
