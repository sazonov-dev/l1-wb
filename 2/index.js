const isStrangeNumber = (number) => {
    let sum = 0;

    for (let i = 1; i <= number / 2; i++) {
        if (number % 1 === 0) {
            sum += i;
        }
    }

    return sum === number;
}

console.log(isStrangeNumber(6))
