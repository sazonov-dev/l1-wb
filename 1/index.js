const isPalindrome = (string) => {
    string = string.toLowerCase(); // Приводим строку к нижнему регистру
    const result = string.split(' ').join('').split('').reverse().join(''); // Набор методов с помощью которого получается перевернутая строка

    return string.split(' ').join('') === result; // Проверяем является ли исходная строка палиндромом измененной строки
}

console.log(isPalindrome('Коту скоро сорок суток')) // true
console.log(isPalindrome('Шалаш')) // true
console.log(isPalindrome('мыло')) // false
console.log(isPalindrome('привет')) // false
