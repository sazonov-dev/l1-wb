class Book {
    constructor() {
        this.book = { // Первичные состояние книги
            title: 'Грокаем алгоритмы',
            author: 'Бхаргава Адитья',
            release: '2022'
        }
    }

    getBookDetails() { // Получаем данные книги
        return this.book;
    }

    setBookTitle(title) { // Меняем титульник
        title = String(title);
        this.book = {...this.book, title}
    }

    setBookAuthor(author) { // Меняем автора
        author = String(author);
        this.book = {...this.book, author}
    }

    setBookRelease(release) { // Меняем дату выпуска
        release = String(release);
        this.book = {...this.book, release}
    }
}

const book = new Book();

console.log(book.getBookDetails());
book.setBookTitle('Привет')
console.log(book.getBookDetails());
book.setBookAuthor('Привет')
console.log(book.getBookDetails());
book.setBookRelease('Привет')
console.log(book.getBookDetails());

