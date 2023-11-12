const array = [
    { name: "John", age: 25 },
    { name: "Alex", age: 23 },
    { name: "Anna", age: 27 },
    { name: "Svetlana", age: 22 },
    { name: "Maria", age: 30 },
    { name: "Alex", age: 27 },
];

const sortByAgeAndName = (a, b) => {
    if (a.age === b.age) {
        return a.name.localeCompare(b.name); // Если возраст одинаковый, сортируем по имени
    } else {
        return a.age - b.age; // В противном случае сортируем по возрастанию возраста
    }
};

const sortedArray = array.sort(sortByAgeAndName);

console.log(sortedArray);

