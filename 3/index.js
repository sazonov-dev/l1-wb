class MathX {
    fibonacci(n) { // вычисление N-го числа в ряду Фибоначчи
        const fibonacciCalculation = (number) => {
            if (number <= 1) {
                return number;
            }

            return fibonacciCalculation(number - 1) + fibonacciCalculation(number - 2);
            // Для того, чтобы получить N-ое число Fibonacci, нам необходимо рекурсивно вызывать функцию
            // -1 и -2 для того, чтобы можно было пойти в обратном направление со смщенеием от 0 и 1 для поиска N числа фибонначи
            // Как доходим до 0 или 1, функция начинает возвращать сумму фибоначи
            // в обратном направлении получаем 0 1 1 2 3 5 8 13 21 34 55
        }

        return fibonacciCalculation(n); // замыкаем переменную n
    }

    fibonacciNumbers(n) { // вычисление всех чисел в ряду Фибоначчи до числа N
        const fibonacciCalculation = (number, firstNumber, secondNumber, result) => { // Принимаем N, все числа фибоначи начинаются с 0 и 1, и массив
            if (firstNumber > number) { // вычисление всех чисел в ряду Фибоначчи до числа N
                return result;
            }

            result.push(firstNumber);

            return fibonacciCalculation(number, secondNumber, firstNumber + secondNumber, result);
            // Делаем смещение, чтобы получить ряд чисел фибоначи
        }

        return fibonacciCalculation(n, 0, 1, [])
    }

    isPrimeNumber(n) {
        if (n < 2) {
            return false;
        }

        if (n === 2) {
            return true;
        }

        if (n % 2 === 0) {
            return false;
        }

        for (let i = 3; i < n / 2; i++) {
            if (n % i === 0) {
                return false;
            }
        }

        return true;
    }

    primeNumbers(n) { // вычисление N-го простого числа
        let count = 0;

        const getPrimeNumber = (count) => {
            let i = 2;
            while (count < n) { // Пока счетчик не достигнит N
                if (this.isPrimeNumber(i)) { // Мы проверяем на простое число, если оно простое то увеличиваем счетчик
                    count++;
                }
                i++ // Увеличиваем число чтобы на выходе получить N простого числа
            }
            return i - 1; // -1 потому что на выходе у нас на 1 итерацию больше
        }

        return getPrimeNumber(count);
    }

    getAllPrimeNumbers(n) { // вычисление всех простых чисел до числа N
        let count = 0;
        const result = [];

        const getPrimeNumber = (count, result) => {
            let i = 2;
            while (count < n) { // Пока счетчик не достигнит N
                if (this.isPrimeNumber(i)) { // Мы проверяем на простое число, если оно простое то увеличиваем счетчик
                    count++;
                    result.push(i);
                }
                i++ // Увеличиваем число чтобы на выходе получить N простого числа
            }
            return result; // возвращаем массив всех простых чисел
        }

        return getPrimeNumber(count, result);
    }
}


const math = new MathX();

console.log(math.fibonacci(10))
console.log(math.fibonacciNumbers(10));
console.log(math.isPrimeNumber(4));
console.log(math.primeNumbers(10));
console.log(math.getAllPrimeNumbers(10))
