class Shape {
    area() {

    }

    perimeter() {

    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        super.area();
        return this.width * this.height;
    }

    perimeter() {
        super.perimeter();
        return (this.width + this.height) * 2;
    }
}

class Circle extends Shape {
    constructor(r) {
        super();
        this.r = r;
    }

    area() {
        super.area();
        return Math.PI * this.r ** 2;
    }

    perimeter() {
        super.perimeter();
        return (Math.PI * this.r) * 2;
    }
}

class Triangle extends Shape {
    constructor(a, b, c, h, sinA, r) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
        this.h = h;
        this.sinA = sinA;
        this.r = r;
    }

    area() {
        super.area();
        // Вычисление площади треугольника
        if (this.h) {
            // Используем высоту
            return 0.5 * this.a * this.h;
        } else if (this.sinA) {
            // Используем угол и две стороны
            return 0.5 * this.a * this.b * Math.sin(this.sinA);
        } else if (this.r) {
            // Используем радиус вписанной окружности
            return this.r * (this.a + this.b + this.c);
        } else {
            // Используем радиус описанной окружности
            const p = this.a + this.b + this.c;
            return 0.5 * p * this.r;
        }
    }

    perimeter() {
        super.perimeter();
        return this.a + this.b + this.c;
    }
}

const rectangle = new Rectangle(5, 10);
console.log(rectangle.area());
console.log(rectangle.perimeter());

const circle = new Circle(7);
console.log(circle.area());
console.log(circle.perimeter());

const triangle = new Triangle(5, 12, 13, 8, false, false);
// Площадь треугольника S можно вычислить, зная его сторону a и высоту h, опущенную на эту сторону:
// Площадь треугольника S также можно вычислить, зная две его стороны a и b и угол α между ними:
// Если в задаче присутствует окружность, вписанная в треугольник, площадь треугольника можно вычислить через его полупериметр p и радиус r:
// Если в задаче присутствует окружность, описанная вокруг треугольника, площадь треугольника можно вычислить через его стороны a, b и c и радиус R:
console.log(triangle.area());
console.log(triangle.perimeter());
