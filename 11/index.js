const mainFunc = (value) => { // запоминается значение
    return function increment(num) { // возвращаемая функция использует переданное первое значение и добавляет к нему новое значение
        return num + value;
    }
}

const sum = mainFunc(5); // запоминается
console.log(sum(15)) // добавляется к запомненому
