const isPalindrome = (string) => {
    string = string.toLowerCase();
    const result = string.split(' ').join('').split('').reverse().join('');

    return string.split(' ').join('') === result;
}

console.log(isPalindrome('Коту скоро сорок суток'))
console.log(isPalindrome('Шалаш'))
console.log(isPalindrome('мыло'))
console.log(isPalindrome('привет'))
