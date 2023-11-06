const isStrangeNumber = (number) => {
    let sum = 0;

    for (let i = 1; i <= number / 2; i++) { // Идем циклом до половины самого числа, чтобы найти верные делители.
        if (number % i === 0) { // Проверяем делится ли число на делитель без остатка, если да, то добавляем его к сумме
            sum += i;
        }
    }

    return sum === number; // Если сумма равна заданному числу, то это странное число
}

console.log(isStrangeNumber(6)) // true
console.log(isStrangeNumber(8)) // false
console.log(isStrangeNumber(28)) // true
